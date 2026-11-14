# Websites

Turborepo monorepo for my websites. Each site is a Next.js app under `apps/`.

## Layout

```
apps/
├── chrisbalola/   # chrisbalola.com
└── emigisha/      # Emigisha, LLC company site

packages/
└── tsconfig/      # shared TypeScript presets
```

## Quickstart

```bash
pnpm install         # install workspace deps
pnpm dev             # run all apps in parallel
pnpm build           # build all apps
pnpm lint:check      # lint all apps
pnpm format          # format the workspace with prettier
```

`dev`, `build`, `lint` and `lint:check` go through turbo, so reruns hit the cache.

Per-app:

```bash
pnpm --filter @websites/chrisbalola dev    # http://localhost:3000
pnpm --filter @websites/emigisha dev       # http://localhost:3001
```

## Requirements

- Node `>=20`
- pnpm `10.19.0`

Each app keeps its own environment files. Copy the app's `.env.example` to `.env` in the same directory and fill in the values.

## Adding a site

1. Create `apps/<name>` with a `package.json` named `@websites/<name>`.
2. Extend `@websites/tsconfig/nextjs.json` in its `tsconfig.json`.
3. Give `dev` its own port so the apps can run side by side.
4. Add a service for it in `.railway/railway.ts`.

## Docs

- [`docs/guide/CODING_GUIDELINES.md`](docs/guide/CODING_GUIDELINES.md): architecture and coding rules shared by every app
- [`.railway/README.md`](.railway/README.md): hosting
- `apps/<name>/docs/`: brand guide and product notes for that site
