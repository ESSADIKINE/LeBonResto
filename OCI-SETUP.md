# Auto-create the lebonresto server on Oracle Cloud (Always Free)

Workflow: `.github/workflows/oci-create-lebonresto.yml` (same logic as `ESSADIKINE/oracle-a1-retry`).

Oracle often answers **"Out of capacity"** for free Ampere servers in Casablanca.
Each run makes 3 tries, 2 minutes apart. If there is no capacity it starts the next run itself (nonstop); the 10-minute schedule is a backup. As soon as a place is free it:

- creates the `lebonresto` server: Ampere A1, 1 OCPU, 6 GB RAM, 150 GB disk (can be resized to 2 OCPU / 12 GB later for free), Ubuntu 24.04 (all Always Free)
- in the existing `lebonresto-public-subnet` (network already created), with a **public IP**, ports 80/443 open
- **opens a GitHub issue "Oracle server created!"** (GitHub emails you), then **turns itself off**

## GitHub secrets used (already set)

| Secret | Value |
|---|---|
| `OCI_USER_OCID` | `user=` from Oracle's API key "Configuration file preview" |
| `OCI_FINGERPRINT` | `fingerprint=` |
| `OCI_TENANCY_OCID` | `tenancy=` |
| `OCI_REGION` | `af-casablanca-1` |
| `OCI_PRIVATE_KEY` | full content of the API key `.pem` file |
| `SSH_PUBLIC_KEY` | your SSH public key (`ssh-ed25519 ...` / `ssh-rsa ...`) |

## Start it manually

GitHub → **Actions** → **Get Oracle A1 server (lebonresto)** → **Run workflow**.

When it succeeds, open Oracle Cloud → Compute → Instances → `lebonresto` for the public IP, and log in with
`ssh -i <your-private-key> ubuntu@<public-ip>`.
