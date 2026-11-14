# Emigisha

The company website for Emigisha, LLC, the company behind Meneja. One page, built with Next.js.

This app is a package in the websites monorepo. Install from the repo root with `pnpm install`.

## Running

From this directory, or from the repo root with `pnpm --filter @websites/emigisha <script>`:

```bash
pnpm dev                 # http://localhost:3001
pnpm build
pnpm lint:check
```

## Environment variables

Every variable has a default in `src/core/config/client-config.ts`, so the app runs without any env file. To override, copy `.env.example` to `.env` in this directory.

## Adding a product

1. Add an entry to `src/features/home/presentation/pages/home/products.ts`.
2. Add its name and description under `products.items` in `src/features/home/presentation/i18n/en.json`.

A product with status `live` turns one more diamond yellow in the hero.

## Docs

- [`docs/guide/BRAND_GUIDE.md`](docs/guide/BRAND_GUIDE.md): colours, type, the diamond mark
- [`docs/product/ABOUT.md`](docs/product/ABOUT.md): what the company is and what the site says
- [`docs/proposals/brand/`](docs/proposals/brand/README.md): the directions and layouts that were considered
