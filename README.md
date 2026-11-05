# Chris Balola — Personal Website

The personal website for [chrisbalola.com](https://chrisbalola.com), built with Next.js and Clean Architecture principles.

## Architecture Overview

This project follows **Clean Architecture** with clear separation of concerns across layers:

- **Domain Layer**: Business entities, interfaces, and core business rules
- **Data Layer**: Repository implementations, data mappers, and external service adapters
- **Presentation Layer**: React components, Next.js pages, and server actions

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- pnpm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up husky pre-commit hooks:
   ```bash
   pnpm prepare
   ```

### Environment Variables

Create environment files based on `.env.example`:

- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

### Running the Development Server

```bash
pnpm dev                 # Uses .env.local or default
pnpm start:development   # Uses .env.development
pnpm start:production    # Uses .env.production
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Key Technologies

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **DI Container**: Awilix
- **UI Components**: Radix UI + shadcn/ui
- **i18n**: next-intl (English, French, Swahili)
