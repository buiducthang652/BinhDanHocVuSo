# 🚨 SECURITY ALERT - Secrets Exposed on GitHub

## What Happened
File `config.yml` containing private keys and passwords was pushed to GitHub on 2025-12-19.

## Actions Taken
✅ Removed config.yml from Git history using `git filter-branch`
✅ Added .gitignore to prevent future leaks
✅ Created config.example.yml as template

## REQUIRED ACTIONS
⚠️ **YOU MUST** change all secrets in config.yml:
1. Generate new JWT_RSA_PRIVATE_KEY
2. Change all passwords (MySQL, SMTP, etc.)
3. Regenerate all API keys

## Commands
```bash
# Generate new JWT key
openssl genrsa 2048

# Generate new passwords
openssl rand -base64 16
```

See full guide: Run `tutor config save` to regenerate secrets.
