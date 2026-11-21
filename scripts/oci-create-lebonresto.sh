#!/usr/bin/env bash
# Create the "lebonresto" Always Free instance on Oracle Cloud, retrying when
# Oracle answers "Out of capacity". Safe to run again and again: if the
# instance already exists it only prints its public IP and exits.
#
# Required environment variables (set them as GitHub secrets):
#   OCI_TENANCY_OCID   tenancy OCID (also used as the compartment = root)
#   OCI_REGION         e.g. af-casablanca-1
#   SSH_PUBLIC_KEY     content of your SSH public key (ssh-rsa/ssh-ed25519 ...)
# The OCI CLI must already be configured (~/.oci/config), the workflow does it.
#
# Optional:
#   INSTANCE_NAME (lebonresto)  OCPUS (2)  MEMORY_GB (12)  BOOT_GB (150)
#   MAX_MINUTES (50)  WAIT_SECONDS (150)
set -uo pipefail

NAME="${INSTANCE_NAME:-lebonresto}"
OCPUS="${OCPUS:-2}"
MEMORY_GB="${MEMORY_GB:-12}"
BOOT_GB="${BOOT_GB:-150}"
MAX_MINUTES="${MAX_MINUTES:-50}"
WAIT_SECONDS="${WAIT_SECONDS:-150}"
SHAPE="VM.Standard.A1.Flex"
COMP="${OCI_TENANCY_OCID:?OCI_TENANCY_OCID is missing}"
export OCI_CLI_REGION="${OCI_REGION:?OCI_REGION is missing}"
: "${SSH_PUBLIC_KEY:?SSH_PUBLIC_KEY is missing}"

log() { echo "[$(date -u +%H:%M:%S)] $*"; }
out() { [ -n "${GITHUB_OUTPUT:-}" ] && echo "$1=$2" >> "$GITHUB_OUTPUT"; return 0; }

# ---------- 1. Already created? ----------
existing=$(oci compute instance list --compartment-id "$COMP" --display-name "$NAME" \
  --query 'data[?"lifecycle-state"!=`TERMINATED` && "lifecycle-state"!=`TERMINATING`] | [0].id' \
  --raw-output 2>/dev/null || true)

print_ip() {
  local id="$1" ip=""
  for _ in $(seq 1 20); do
    ip=$(oci compute instance list-vnics --instance-id "$id" \
      --query 'data[0]."public-ip"' --raw-output 2>/dev/null || true)
    [ -n "$ip" ] && [ "$ip" != "null" ] && break
    sleep 15
  done
  log "Instance $NAME is ready. Public IP: ${ip:-not assigned yet}"
  log "Connect with:  ssh -i <your-private-key> ubuntu@${ip:-<public-ip>}"
  out public_ip "${ip:-}"
  [ -n "${GITHUB_STEP_SUMMARY:-}" ] && echo "### ✅ $NAME is running — public IP: \`${ip:-pending}\`" >> "$GITHUB_STEP_SUMMARY"
}

if [ -n "$existing" ] && [ "$existing" != "null" ]; then
  log "Instance $NAME already exists ($existing). Nothing to create."
  out created true
  print_ip "$existing"
  exit 0
fi

# ---------- 2. Network (created once, reused afterwards) ----------
VCN_NAME="${NAME}-vcn"
vcn=$(oci network vcn list --compartment-id "$COMP" --display-name "$VCN_NAME" \
  --query 'data[?"lifecycle-state"==`AVAILABLE`] | [0].id' --raw-output 2>/dev/null || true)
if [ -z "$vcn" ] || [ "$vcn" = "null" ]; then
  log "Creating VCN $VCN_NAME"
  vcn=$(oci network vcn create --compartment-id "$COMP" --display-name "$VCN_NAME" \
    --cidr-blocks '["10.0.0.0/16"]' --dns-label lebonresto \
    --wait-for-state AVAILABLE --query 'data.id' --raw-output) || { log "VCN creation failed"; exit 1; }
fi

igw=$(oci network internet-gateway list --compartment-id "$COMP" --vcn-id "$vcn" \
  --query 'data[0].id' --raw-output 2>/dev/null || true)
if [ -z "$igw" ] || [ "$igw" = "null" ]; then
  log "Creating internet gateway"
  igw=$(oci network internet-gateway create --compartment-id "$COMP" --vcn-id "$vcn" \
    --is-enabled true --display-name "${NAME}-igw" \
    --wait-for-state AVAILABLE --query 'data.id' --raw-output) || { log "IGW creation failed"; exit 1; }
fi

rt=$(oci network vcn get --vcn-id "$vcn" --query 'data."default-route-table-id"' --raw-output)
sl=$(oci network vcn get --vcn-id "$vcn" --query 'data."default-security-list-id"' --raw-output)

log "Route 0.0.0.0/0 -> internet gateway"
oci network route-table update --rt-id "$rt" --force \
  --route-rules "[{\"destination\":\"0.0.0.0/0\",\"destinationType\":\"CIDR_BLOCK\",\"networkEntityId\":\"$igw\"}]" >/dev/null

log "Opening ports 22, 80, 443 in the security list"
tcp() { echo "{\"protocol\":\"6\",\"source\":\"0.0.0.0/0\",\"isStateless\":false,\"tcpOptions\":{\"destinationPortRange\":{\"min\":$1,\"max\":$1}}}"; }
ingress="[$(tcp 22),$(tcp 80),$(tcp 443),{\"protocol\":\"1\",\"source\":\"0.0.0.0/0\",\"isStateless\":false,\"icmpOptions\":{\"type\":3,\"code\":4}},{\"protocol\":\"1\",\"source\":\"10.0.0.0/16\",\"isStateless\":false,\"icmpOptions\":{\"type\":3}}]"
egress='[{"protocol":"all","destination":"0.0.0.0/0","isStateless":false}]'
oci network security-list update --security-list-id "$sl" --force \
  --ingress-security-rules "$ingress" --egress-security-rules "$egress" >/dev/null

subnet=$(oci network subnet list --compartment-id "$COMP" --vcn-id "$vcn" \
  --query 'data[?"prohibit-public-ip-on-vnic"==`false`] | [0].id' --raw-output 2>/dev/null || true)
if [ -z "$subnet" ] || [ "$subnet" = "null" ]; then
  log "Creating public subnet"
  subnet=$(oci network subnet create --compartment-id "$COMP" --vcn-id "$vcn" \
    --cidr-block 10.0.0.0/24 --display-name "${NAME}-public-subnet" --dns-label public \
    --route-table-id "$rt" --security-list-ids "[\"$sl\"]" --prohibit-public-ip-on-vnic false \
    --wait-for-state AVAILABLE --query 'data.id' --raw-output) || { log "Subnet creation failed"; exit 1; }
fi

# ---------- 3. Image + availability domain ----------
image=$(oci compute image list --compartment-id "$COMP" --operating-system "Canonical Ubuntu" \
  --operating-system-version "24.04" --shape "$SHAPE" --sort-by TIMECREATED --sort-order DESC \
  --query 'data[?!contains("display-name", `Minimal`)] | [0].id' --raw-output)
[ -z "$image" ] || [ "$image" = "null" ] && { log "No Ubuntu 24.04 aarch64 image found"; exit 1; }
ads=$(oci iam availability-domain list --compartment-id "$COMP" --query 'data[].name' --raw-output | tr -d '[]", ' | grep -v '^$')

# ---------- 4. Files for cloud-init (opens 80/443 in Ubuntu's own firewall) ----------
tmp=$(mktemp -d)
printf '%s\n' "$SSH_PUBLIC_KEY" > "$tmp/key.pub"
cat > "$tmp/cloud-init.yaml" <<'EOF'
#cloud-config
package_update: true
runcmd:
  - iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
  - iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
  - netfilter-persistent save
EOF

# ---------- 5. Launch, retrying on "Out of capacity" for up to MAX_MINUTES ----------
deadline=$(( $(date +%s) + MAX_MINUTES * 60 ))
attempt=0
while [ "$(date +%s)" -lt "$deadline" ]; do
  for ad in $ads; do
    attempt=$((attempt + 1))
    # A previous attempt may have succeeded late: never create a second one.
    again=$(oci compute instance list --compartment-id "$COMP" --display-name "$NAME" \
      --query 'data[?"lifecycle-state"!=`TERMINATED` && "lifecycle-state"!=`TERMINATING`] | [0].id' \
      --raw-output 2>/dev/null || true)
    if [ -n "$again" ] && [ "$again" != "null" ]; then
      log "Instance $NAME now exists ($again)."
      oci compute instance get --instance-id "$again" --wait-for-state RUNNING \
        --max-wait-seconds 900 >/dev/null 2>&1 || true
      out created true; print_ip "$again"; exit 0
    fi
    left=$(( (deadline - $(date +%s)) / 60 ))
    log "Attempt $attempt in $ad ($OCPUS OCPU, $MEMORY_GB GB RAM, $BOOT_GB GB disk) - ${left} min left in this run"
    if result=$(oci --no-retry compute instance launch --compartment-id "$COMP" \
        --availability-domain "$ad" --display-name "$NAME" \
        --shape "$SHAPE" --shape-config "{\"ocpus\":$OCPUS,\"memoryInGBs\":$MEMORY_GB}" \
        --image-id "$image" --boot-volume-size-in-gbs "$BOOT_GB" \
        --subnet-id "$subnet" --assign-public-ip true \
        --ssh-authorized-keys-file "$tmp/key.pub" --user-data-file "$tmp/cloud-init.yaml" \
        --query 'data.id' --raw-output 2>&1); then
      log "Launch accepted: $result"
      oci compute instance get --instance-id "$result" --wait-for-state RUNNING \
        --max-wait-seconds 900 >/dev/null 2>&1 || true
      out created true
      print_ip "$result"
      exit 0
    fi
    pause="$WAIT_SECONDS"
    if echo "$result" | grep -qiE "out of (host )?capacity|OutOfCapacity|InternalError"; then
      log "Out of capacity in $ad."
    elif echo "$result" | grep -qiE "LimitExceeded|TooManyRequests|Too many requests"; then
      log "Oracle rate limit, waiting longer."
      pause=$((WAIT_SECONDS * 2))
    elif echo "$result" | grep -qiE "timed out|timeout|Connection|ServiceUnavailable|503|502"; then
      log "Temporary network/service error, retrying."
    else
      log "Unexpected error, stopping:"; echo "$result"; exit 1
    fi
    [ $(( $(date +%s) + pause )) -lt "$deadline" ] || break 2
    sleep "$pause"
  done
done

log "Still no capacity after $attempt attempts. The next run will try again."
out created false
[ -n "${GITHUB_STEP_SUMMARY:-}" ] && echo "### ⏳ No Ampere capacity yet — the next run starts automatically" >> "$GITHUB_STEP_SUMMARY"
exit 0
