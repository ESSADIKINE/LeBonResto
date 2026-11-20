# Auto-create the lebonresto server on Oracle Cloud (Always Free)

Oracle often answers **"Out of capacity"** for free Ampere servers in Casablanca.
This GitHub Action tries again **every 30 minutes**. As soon as a place is free it:

- creates the `lebonresto` instance: Ampere A1, 2 OCPU, 12 GB RAM, 150 GB disk, Ubuntu 24.04 (all Always Free)
- creates the network if needed (`lebonresto-vcn`, public subnet, internet gateway)
- gives it a **public IP** and opens ports **22, 80, 443**
- shows the public IP in the run summary, then **turns itself off**

## 1. Copy the files into your lebonresto GitHub repo

```
.github/workflows/oci-create-lebonresto.yml
scripts/oci-create-lebonresto.sh
```

## 2. Create an Oracle API key (lets GitHub talk to Oracle)

1. Oracle Console → profile icon (top right) → **My profile** → **API keys** → **Add API key**
2. Choose **Generate API key pair** → **Download private key** (a `.pem` file) → **Add**
3. Oracle shows a "Configuration file preview". Keep it open; you need `user`, `fingerprint`, `tenancy`, `region` from it.

## 3. Add the GitHub secrets

GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name        | Value                                                        |
|--------------------|--------------------------------------------------------------|
| `OCI_USER_OCID`    | `user=` value from the preview (`ocid1.user...`)             |
| `OCI_FINGERPRINT`  | `fingerprint=` value                                         |
| `OCI_TENANCY_OCID` | `tenancy=` value (`ocid1.tenancy...`)                        |
| `OCI_REGION`       | `af-casablanca-1`                                            |
| `OCI_PRIVATE_KEY`  | full content of the API `.pem` file (including BEGIN/END lines) |
| `SSH_PUBLIC_KEY`   | content of your SSH **public** key (`ssh-rsa ...` or `ssh-ed25519 ...`) |

For `SSH_PUBLIC_KEY`, use the public key you downloaded from the Oracle form ("Download public key"),
or make a new pair on your PC: `ssh-keygen -t ed25519 -f ~/.ssh/lebonresto` and paste `~/.ssh/lebonresto.pub`.
Keep the matching **private** key; it's how you log in.

## 4. Start it

GitHub repo → **Actions** → **Create lebonresto instance** → **Run workflow**.
After that it runs by itself every 30 minutes.

- ⏳ "No Ampere capacity yet" → normal, it will retry.
- ✅ "lebonresto is running — public IP: x.x.x.x" → done. Log in with:
  `ssh -i <your-private-key> ubuntu@x.x.x.x`

## Notes

- Public repo: GitHub Actions minutes are free. Private repo: ~1–2 min per run ≈ 1,500–2,800 min/month,
  close to the free 2,000. If needed change `*/30` to `0 * * * *` (every hour) in the workflow.
- Smaller size finds capacity faster: add `OCPUS: "1"` and `MEMORY_GB: "6"` under `env:` of the
  "Create instance" step (you can resize to 2/12 later for free).
- Running it again after success does nothing harmful: it sees `lebonresto` exists and just prints the IP.
