# Railway infrastructure

Railway hosting for chrisbalola.com is defined in code in `railway.ts`
(Railway Infrastructure as Code): the service, its build and start commands,
custom domains, and the names of environment variables.

Config as Code (`railway.json` / `railway.toml`) is deprecated on Railway and
new services cannot use it. Do not add those files.

## What is on Railway

| Environment  | Branch | Services            |
| ------------ | ------ | ------------------- |
| `production` | `main` | chrisbalola-website |

## Setup

The CLI and the `railway/iac` SDK are both needed. The SDK is a dev
dependency, so `pnpm install` covers it.

```bash
brew install railway
railway login
railway link          # pick project "chrisbalola", environment "production"
railway status
```

The link is stored in `~/.railway/config.json`, keyed by this directory. It is
not part of the repo.

## Commands

```bash
railway config plan            # diff railway.ts against Railway, changes nothing
railway config plan --verbose  # same, with full change details
railway config apply           # show the plan, ask for confirmation, apply
railway config pull --force    # overwrite railway.ts with what Railway has now
```

## Workflow

1. Edit `railway.ts`.
2. `railway config plan`. It should show only the change you intended.
3. `railway config apply`.
4. Commit the file with the code change it belongs to.

## Environment variables

Values are never written to `railway.ts`. Every variable is declared as
`preserve()`, which keeps whatever value Railway already has. The file owns
the set of names; Railway owns the values.

`NEXT_PUBLIC_*` variables are inlined at build time, so they must be set
before the first deploy. Setting a value triggers a redeploy unless you pass
`--skip-deploys`.

```bash
railway variable set NAME=value --service chrisbalola-website
railway variable list --service chrisbalola-website
```

### Add a variable

1. Set the value on Railway first. `preserve()` never creates a variable: a
   name with no value on Railway is ignored by `plan` and `apply`.
2. Add `NAME: preserve()` to the service's `env` block in `railway.ts`.
3. `railway config plan`. The new name should not appear in the plan; if it
   does, the value is missing.
4. Commit the file with the code change that reads the variable.

Do not use `railway config pull --include-variables`. It decrypts secrets into
the file.

## Domains

`chrisbalola.com` and `www.chrisbalola.com` both point at port 8080, the port
Railway assigns through `PORT`. After the first apply, add the DNS records
Railway shows under Service > Settings > Networking.
