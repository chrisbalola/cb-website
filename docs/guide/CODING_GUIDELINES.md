# Chris Balola Website Coding Guidelines

## Table of Contents

1. [Introduction](#introduction)
2. [4-Layer Clean Architecture](#4-layer-clean-architecture)
3. [Domain Layer](#domain-layer)
4. [Data Layer](#data-layer)
5. [Application Layer](#application-layer)
6. [Presentation Layer](#presentation-layer)
7. [Shared Layer](#shared-layer)
8. [Dependency Injection](#dependency-injection)
9. [Coding Standards](#coding-standards)
   - [TanStack Query Keys](#tanstack-query-keys)
   - [TanStack Query Cache Management](#tanstack-query-cache-management)
   - [Hooks Organization](#hooks-organization)
   - [Infinite Lists with AppPagedList](#infinite-lists-with-apppagedlist)
   - [Dynamic Imports](#dynamic-imports)
10. [Feature Development Workflow](#feature-development-workflow)
11. [Error Handling](#error-handling)

## Introduction

This document outlines the coding guidelines and architectural patterns for the Chris Balola website application. The codebase follows **Clean Architecture** principles with a **4-layer structure** in a Next.js environment.

### Core Principles

- **Separation of Concerns**: Clear boundaries between layers
- **Dependency Inversion**: Dependencies point toward abstractions
- **Server-First**: Leverage Next.js App Router and Server Actions
- **Type Safety**: Comprehensive TypeScript usage throughout
- **Snapshots for Serialization**: Entities return snapshots for server/client boundary

## 4-Layer Clean Architecture

**Not all layers are required.** Features only need the layers and subfolders that are actually used. The structure is about correct placement, not completeness — if a feature has no domain logic, don't create a `domain/` folder.

### Directory Structure

```
src/
├── app/                              # Next.js App Router (routing only)
│   ├── layout.tsx                    # Root layout with providers
│   └── [locale]/                     # i18n locale routing (en, de)
│       ├── layout.tsx                # Locale layout with AppLayoutProvider
│       ├── page.tsx                  # Locale root redirect
│       ├── [feedType]/               # Dynamic feed routes (trending, latest, following)
│       │   └── page.tsx              # Feed page routing
│       ├── chats/
│       │   └── page.tsx              # Chats page routing
│       ├── create/
│       │   └── page.tsx              # Create page routing
│       ├── explore/
│       │   └── page.tsx              # Explore page routing
│       ├── settings/
│       │   └── page.tsx              # Settings page routing
│       ├── (auth)/                   # Auth route group (sign-in, sign-up, etc.)
│       │   └── */page.tsx            # Auth pages
│       ├── (post)/                   # Post route group
│       │   └── post/[postId]/page.tsx
│       └── (user)/                   # User route group
│           └── user/[username]/page.tsx
├── features/
│   └── [feature-name]/
│       ├── container.ts              # DI registration
│       ├── types.ts                  # Feature type definitions
│       ├── domain/                   # Business logic layer
│       │   ├── entities/             # Domain objects with behavior
│       │   ├── snapshots/            # Immutable data interfaces
│       │   ├── repositories/         # Repository interfaces
│       │   ├── commands/             # Command interfaces (mutations)
│       │   ├── queries/              # Query interfaces (reads)
│       │   └── enums/                # Domain enumerations
│       ├── data/                     # Data access layer
│       │   ├── dto/                  # API response/request types
│       │   ├── mappers/              # DTO ↔ Entity conversion
│       │   └── repositories/         # Repository implementations
│       ├── application/              # Use case orchestration layer
│       │   ├── actions/
│       │   │   ├── commands/         # Server actions for mutations
│       │   │   └── queries/          # Server actions for reads
│       │   └── schemas/              # Zod schemas (feature-specific)
│       └── presentation/             # UI layer
│           ├── components/           # Components shared across pages in this feature
│           ├── pages/                # Feature page components
│           │   └── [page-name]/      # Each page gets its own folder
│           │       ├── [page-name]-page.tsx  # The page component itself
│           │       └── components/   # Components specific to this page only
│           ├── hooks/                # Feature-specific hooks
│           │   ├── mutations/        # TanStack Query mutation hooks
│           │   ├── queries/          # TanStack Query query hooks
│           │   └── *.ts              # Utility/composite hooks
│           ├── stores/               # Client-side state (Zustand)
│           ├── keys/                 # TanStack Query/Mutation keys
│           │   ├── index.ts          # Re-exports
│           │   ├── query-keys.ts     # Query keys
│           │   └── mutation-keys.ts  # Mutation keys
│           └── utils/                # Presentation utilities
│               └── [entity]-cache.ts # Cache management utilities
├── shared/                           # Shared across features
│   ├── domain/                       # Shared domain logic
│   │   ├── errors/                   # Error handling
│   │   ├── repositories/             # Shared repository interfaces
│   │   ├── enums/                    # Shared enums
│   │   └── vo/                       # Value objects (pagination)
│   ├── data/                         # Shared data access
│   │   ├── dto/                      # Shared DTOs
│   │   └── repositories/             # Shared repository implementations
│   ├── application/                  # Shared application utilities
│   │   └── schemas/                  # Shared Zod schemas
│   └── presentation/                 # Shared UI
│       ├── components/               # Reusable components
│       │   └── layout/               # Layout system
│       │       ├── app-shell/        # Centralized layout system
│       │       │   ├── layouts/
│       │       │   │   ├── base-layout.tsx           # Foundation sidebar container
│       │       │   │   ├── main-layout.tsx           # Standard app layout
│       │       │   │   └── index.ts                  # Layout exports
│       │       │   ├── components/
│       │       │   │   ├── header/                   # Header components
│       │       │   │   ├── sidebar/                  # Sidebar components
│       │       │   │   └── wrappers/                 # Page wrappers
│       │       │   ├── types.ts                      # Layout types
│       │       │   └── index.ts                      # Public exports
│       ├── hooks/                    # Shared React hooks
│       ├── providers/                # Context providers
│       └── guards/                   # Route guards
├── core/                             # Cross-cutting infrastructure
│   ├── config/                       # Configuration management
│   ├── infrastructure/               # External services
│   │   ├── api/                      # API client
│   │   └── firebase/                 # Firebase setup
│   └── utils/                        # Core utilities
└── di/                               # Dependency injection
    ├── container.ts                  # Main container
    └── types.ts                      # DI type definitions
```

### Layer Dependencies

```
Presentation → Application → Domain ← Data
     ↓              ↓           ↑        ↑
  Next.js    Server Actions  Business  Infrastructure
  React                       Rules
```

**Critical Rule**: Dependencies point inward. Domain has no external dependencies.

## Domain Layer

The domain layer contains pure business logic with no framework dependencies.

### Snapshots

Snapshots are **readonly interfaces** representing immutable data contracts. They enable safe serialization across the server/client boundary.

```typescript
// domain/snapshots/user-snapshot.ts
export interface UserSnapshot {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly name: string;
  readonly username: string | null;
  readonly visibility: UserVisibility | null;
  readonly bio: string | null;
  readonly userStats: UserStatsSnapshot | null;
}
```

### Entities

Entities are **classes** that implement snapshots and add computed properties and behavior.

```typescript
// domain/entities/user-entity.ts
export class UserEntity implements UserSnapshot {
  readonly id!: string;
  readonly createdAt!: Date;
  readonly name!: string;
  readonly username!: string | null;
  // ... all snapshot fields

  private constructor(data: UserSnapshot) {
    Object.assign(this, data);
  }

  static create(data: UserSnapshot): UserEntity {
    return new UserEntity(data);
  }

  // Computed properties
  get hasSetupProfile(): boolean {
    return this.name !== null && this.username !== null;
  }

  get displayName(): string | null {
    if (this.name) return this.name;
    if (this.username) return `@${this.username}`;
    return null;
  }

  get age(): number | null {
    if (!this.dateOfBirth) return null;
    return dayjs().diff(dayjs(this.dateOfBirth), 'year');
  }

  // Convert back to snapshot for serialization
  toSnapshot(): UserSnapshot {
    return { ...this };
  }
}
```

**Key Points:**

- Private constructor with static `create()` factory
- All properties are `readonly`
- Computed getters for derived data
- `toSnapshot()` method for serialization

### Commands and Queries

Commands and queries are simple interfaces (not classes) defining operation parameters.

```typescript
// domain/commands/update-current-user-command.ts
export interface UpdateCurrentUserCommand {
  name?: string;
  username?: string;
  bio?: string;
  gender?: UserGender;
  visibility?: UserVisibility;
}

// domain/queries/get-users-query.ts
export interface GetUsersQuery {
  cursor?: string;
  limit: number;
  searchQuery?: string;
}
```

### Repository Interfaces

Define data access contracts in the domain layer:

```typescript
// domain/repositories/user-repository.ts
export interface UserRepository {
  getCurrentUser(): Promise<UserEntity>;
  getUserById(query: GetUserByIdQuery): Promise<UserEntity>;
  updateCurrentUser(command: UpdateCurrentUserCommand): Promise<UserEntity>;
  getUsers(query: GetUsersQuery): Promise<CursorPaginated<UserEntity>>;
  deleteCurrentUserAccount(command: DeleteCurrentUserAccountCommand): Promise<void>;
}
```

## Data Layer

The data layer handles external data sources and transformations.

### DTOs (Data Transfer Objects)

DTOs represent API response/request shapes exactly as the API defines them:

```typescript
// data/dto/user-dto.ts
export interface UserDto {
  id: string;
  createdAt?: string; // API returns ISO strings
  updatedAt?: string;
  name: string;
  username?: string;
  visibility?: 'PUBLIC' | 'PRIVATE'; // API uses string literals
  email?: string;
  profilePicture?: MediaDto; // Nested DTOs
  userStats?: UserStatsDto;
}
```

### Mappers

Mappers convert between DTOs and entities with proper type transformations:

```typescript
// data/mappers/user-mapper.ts
export class UserMapper {
  private static mapVisibility(visibility?: string): UserVisibility | null {
    const mapping: Record<string, UserVisibility> = {
      PUBLIC: UserVisibility.PUBLIC,
      PRIVATE: UserVisibility.PRIVATE,
    };
    return visibility ? (mapping[visibility] ?? null) : null;
  }

  static toEntity(dto: UserDto): UserEntity {
    return UserEntity.create({
      id: dto.id,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : new Date(),
      name: dto.name,
      username: dto.username ?? null,
      visibility: this.mapVisibility(dto.visibility),
      userStats: dto.userStats ? UserStatsMapper.toEntity(dto.userStats) : null,
    });
  }
}
```

### Repository Implementations

Concrete implementations of domain repository interfaces:

```typescript
// data/repositories/api-user-repository.ts
export class ApiUserRepository implements UserRepository {
  private readonly apiService: ApiService;

  constructor({ apiService }: { apiService: ApiService }) {
    this.apiService = apiService;
  }

  async getCurrentUser(): Promise<UserEntity> {
    const result = await this.apiService.get<UserDto>('users/me');
    return UserMapper.toEntity(result);
  }

  async updateCurrentUser(command: UpdateCurrentUserCommand): Promise<UserEntity> {
    const result = await this.apiService.put<UserDto>('users/me', {
      data: {
        name: command.name,
        username: command.username,
        bio: command.bio,
      },
    });
    return UserMapper.toEntity(result);
  }
}
```

## Application Layer

The application layer contains **server actions** that orchestrate domain operations. This is the bridge between presentation and domain/data layers.

### Server Actions

All application layer files are server actions marked with `'use server'`.

**Commands (mutations):**

```typescript
// application/actions/commands/update-current-user-action.ts
'use server';

import { container } from '@/di/container';
import { UserRepository } from '@/features/profile/domain/repositories/user-repository';
import { UpdateCurrentUserCommand } from '@/features/profile/domain/commands/update-current-user-command';
import { UserSnapshot } from '@/features/profile/domain/snapshots/user-snapshot';

export async function updateCurrentUserAction(command: UpdateCurrentUserCommand): Promise<UserSnapshot> {
  const userRepository = container.resolve<UserRepository>('userRepository');
  const user = await userRepository.updateCurrentUser(command);
  return user.toSnapshot();
}
```

**Queries (reads):**

```typescript
// application/actions/queries/get-current-user-action.ts
'use server';

import { container } from '@/di/container';
import { UserRepository } from '@/features/profile/domain/repositories/user-repository';
import { UserSnapshot } from '@/features/profile/domain/snapshots/user-snapshot';

export async function getCurrentUserAction(): Promise<UserSnapshot> {
  const userRepository = container.resolve<UserRepository>('userRepository');
  const user = await userRepository.getCurrentUser();
  return user.toSnapshot();
}
```

**Key Patterns:**

- Always use `'use server'` directive
- Resolve dependencies through DI container
- Accept command/query interfaces from domain
- Always return snapshots (not entities) for serialization
- No business logic - only orchestration

## Presentation Layer

The presentation layer handles UI rendering and user interactions.

### Layout Architecture

The application uses **native Next.js route groups** combined with **domain-driven layouts** for a clean, maintainable structure that follows Next.js conventions.

#### Layout Organization

- **Shared layouts** (`shared/presentation/components/layout/app-shell/`): Foundation components like `BaseLayout` and `MainLayout`
- **Feature layouts** (`features/*/presentation/layouts/`): Domain-specific layouts like `HomePageLayout` and `AuthPageLayout`
- **Route groups** (`app/[locale]/(group)/`): Next.js route groups apply layouts

#### Layout Components

**1. BaseLayout** - Foundation sidebar container:

```tsx
// shared/.../app-shell/layouts/base-layout.tsx
<BaseLayout activePage="home" requiresAuth={true} hideSidebar={false}>
  {children}
</BaseLayout>
```

- Sidebar navigation
- Optional authentication guard (`requiresAuth`)
- Can hide sidebar for focused experiences (`hideSidebar`)

**2. MainLayout** - Standard app layout with configurable header:

```tsx
// shared/.../app-shell/layouts/main-layout.tsx
<MainLayout
  activePage="chats"
  headerTitle="Chats"
  headerLeft={<BackButton />}
  headerRight={<SettingsButton />}
  headerAddons={[<NotificationButton key="notif" />]}
>
  {children}
</MainLayout>
```

- Extends `BaseLayout`
- Flexible header slots: `headerTitle`, `headerLeft`, `headerRight`, `headerAddons`
- Can hide header entirely (`hideHeader`)

**3. HomePageLayout** - Feed-specific layout (in `features/home`):

```tsx
// features/home/presentation/layouts/home-page-layout.tsx
<HomePageLayout feedType="trending" showSideSections={true}>
  {children}
</HomePageLayout>
```

- Feed tabs (trending/latest/following)
- Search bar, notifications, wallet
- Side sections (trending topics, suggestions)
- Mobile footer navigation

**4. AuthPageLayout** - Minimal auth layout (in `features/auth`):

```tsx
// features/auth/presentation/layouts/auth-page-layout.tsx
<AuthPageLayout>
  <SignInForm />
</AuthPageLayout>
```

- Centered container
- No sidebar or header
- Minimal styling

#### Route Groups

Use Next.js route groups to apply layouts without affecting URL structure:

```
app/[locale]/
├── (home)/           # HomePageLayout group
│   ├── layout.tsx    # Applies HomePageLayout
│   └── [feedType]/   # /trending, /latest, /following
│       └── page.tsx
├── (main)/           # MainLayout group
│   ├── layout.tsx    # Passthrough (pages apply MainLayout individually)
│   ├── chats/
│   │   └── page.tsx  # Uses MainLayout with ChatsPageTitle
│   ├── explore/
│   │   └── page.tsx  # Uses MainLayout with ExplorePageTitle
│   └── create/
│       └── page.tsx
├── (auth)/           # AuthPageLayout group
│   ├── layout.tsx    # Applies AuthPageLayout
│   ├── sign-in/
│   │   └── page.tsx
│   └── sign-up/
│       └── page.tsx
├── (post)/
│   └── post/[postId]/
│       └── page.tsx  # Posts with minimal header layout
└── (user)/
    └── user/[username]/
        └── page.tsx  # Profile with user action buttons
```

#### Example: Route Group Layout

```tsx
// app/[locale]/(home)/layout.tsx
import { HomePageLayout } from '@/features/home/presentation/layouts';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <HomePageLayout>{children}</HomePageLayout>;
}
```

#### Example: Route Group with MainLayout

```tsx
// app/[locale]/(main)/chats/layout.tsx
import { ReactNode } from 'react';
import { MainLayout } from '@/shared/presentation/components/layout/app-shell';
import { PageTitle } from '@/shared/presentation/components/layout/app-shell';

export default function ChatsLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout activePage="chats" headerTitle={<PageTitle translationKey="chats" />}>
      {children}
    </MainLayout>
  );
}
```

```tsx
// app/[locale]/(main)/chats/page.tsx
import { ChatsPage } from '@/features/chat/presentation/pages';

export default function Page() {
  return <ChatsPage />;
}
```

#### Example: Custom Layout Configuration

Route groups can define custom MainLayout configurations for special cases:

```tsx
// app/[locale]/(post)/layout.tsx
import { ReactNode } from 'react';
import { MainLayout } from '@/shared/presentation/components/layout/app-shell';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/core/i18n/navigation';

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout
      activePage="home"
      hideAvatar
      headerAddons={[]}
      headerLeft={
        <Link href="/trending" className="flex items-center gap-2 hover:opacity-70">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Post</span>
        </Link>
      }
    >
      {children}
    </MainLayout>
  );
}
```

```tsx
// app/[locale]/(post)/post/[postId]/page.tsx
import { PostDetailsPage, generatePostMetadata } from '@/features/content/presentation/pages/post-details-page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generatePostMetadata(params);
}

export default async function Page({ params }: PageProps) {
  const postId = (await params).postId;
  return <PostDetailsPage postId={postId} />;
}
```

#### Benefits of Layout Architecture

1. **Next.js Native**: Uses route groups - file tree shows structure
2. **Domain-Driven**: Feature-specific layouts live in their features
3. **Composable**: Small, focused layouts that compose together
4. **Type Safe**: TypeScript ensures correct props
5. **Flexible**: Header slots and props cover all use cases
6. **Minimal Shared Code**: Only truly shared layouts in shared/

### Page Components

Feature pages live in the presentation layer, while app router files only handle routing. Each page gets its own folder with a `components/` subfolder for page-specific components.

**Component placement rule:**

- `presentation/components/` — components shared across multiple pages within the feature
- `pages/[page-name]/components/` — components used only by that specific page

```
features/profile/presentation/
├── components/
│   └── section-header.tsx          # Used by multiple pages in this feature
├── pages/
│   └── user-profile/
│       ├── user-profile-page.tsx   # The page component
│       └── components/
│           ├── user-card.tsx       # Only used by user-profile page
│           └── user-stats.tsx      # Only used by user-profile page
```

```tsx
// app/[locale]/(user)/user/[username]/page.tsx - Routing only
import { UserProfilePage, generateUserMetadata } from '@/features/profile/presentation/pages/user-profile/user-profile-page';
import { SharedPageParams } from '@/shared/types';

interface Props {
  params: SharedPageParams<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return generateUserMetadata(username);
}

export default async function Page({ params }: Props) {
  const { username } = await params;
  return <UserProfilePage username={username} />;
}
```

```tsx
// features/profile/presentation/pages/user-profile/user-profile-page.tsx - Business logic
import { cache } from 'react';
import type { Metadata } from 'next';
import { getUserPreviewByUsernameAction } from '../../../application/actions/queries/get-user-preview-by-username-action';
import { UserPreviewEntity } from '../../../domain/entities/user-preview-entity';
import { UserCard } from './components/user-card';

const getUser = cache(async (username: string) => {
  const snapshot = await getUserPreviewByUsernameAction({ username });
  return UserPreviewEntity.create(snapshot);
});

export async function UserProfilePage({ username }: { username: string }) {
  const user = await getUser(username);
  return <UserCard user={user} />;
}

/**
 * Generate metadata for user profile page.
 * Uses the same cached getUser function to avoid duplicate requests.
 */
export async function generateUserMetadata(username: string): Promise<Metadata> {
  const user = await getUser(username); // Cached - same request
  return {
    title: `${user.displayName} (@${user.username}) - Chris Balola`,
    description: user.bio || `View ${user.displayName}'s profile on Chris Balola`,
  };
}
```

### Client Components with Server Actions

```tsx
'use client';

import { useState } from 'react';
import { updateCurrentUserAction } from '@/features/profile/application/actions/commands/update-current-user-action';
import { UserEntity } from '@/features/profile/domain/entities/user-entity';

export function ProfileEditor({ initialUser }: { initialUser: UserSnapshot }) {
  const [user, setUser] = useState(() => UserEntity.create(initialUser));

  const handleSave = async (data: UpdateCurrentUserCommand) => {
    const snapshot = await updateCurrentUserAction(data);
    setUser(UserEntity.create(snapshot));
  };

  return <ProfileForm user={user} onSave={handleSave} />;
}
```

## Shared Layer

The shared layer contains code used across multiple features, organized by architectural layer.

```
shared/
├── domain/
│   ├── errors/           # AppException, error codes
│   ├── repositories/     # Shared repository interfaces
│   ├── enums/            # Shared enums
│   └── vo/               # Value objects (CursorPaginated, OffsetPaginated)
├── data/
│   ├── dto/              # Shared DTOs
│   └── repositories/     # Shared repository implementations
├── application/
│   └── validation/       # Shared Zod schemas
└── presentation/
    ├── components/       # Shared UI components
    ├── hooks/            # Shared React hooks
    ├── providers/        # Context providers
    └── guards/           # Route guards
```

### Value Objects

```typescript
// shared/domain/vo/cursor-paginated.ts
export interface CursorPaginated<T> {
  readonly data: T[];
  readonly nextCursor: string | null;
  readonly hasMore: boolean;
}
```

## Dependency Injection

### Feature Module Registration

```typescript
// features/profile/container.ts
import { AwilixContainer, asClass, Lifetime } from 'awilix';
import { ApiUserRepository } from './data/repositories/api-user-repository';

export function registerProfileModule(container: AwilixContainer) {
  container.register({
    userRepository: asClass(ApiUserRepository, { lifetime: Lifetime.SINGLETON }),
  });
}
```

### Main Container

```typescript
// di/container.ts
import { createContainer, InjectionMode } from 'awilix';

const appContainer = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true,
});

registerCoreModule(appContainer);
registerSharedModule(appContainer);
registerAuthModule(appContainer);
registerProfileModule(appContainer);
// ... all feature modules

export const container = appContainer;
```

## Coding Standards

### File Naming Conventions

```
entities/          user-entity.ts
snapshots/         user-snapshot.ts
dto/               user-dto.ts
mappers/           user-mapper.ts
repositories/      api-user-repository.ts (impl), user-repository.ts (interface)
actions/commands/  update-current-user-action.ts
actions/queries/   get-current-user-action.ts
components/        user-profile-card.tsx
keys/              query-keys.ts, mutation-keys.ts
utils/             post-cache.ts, user-cache.ts
```

### TanStack Query Keys

Each feature should have a centralized `keys/` folder in the presentation layer that defines all query and mutation keys for that feature. This ensures consistency and makes key management easier.

**Location:** `features/[feature]/presentation/keys/`

```
keys/
├── index.ts          # Re-exports
├── query-keys.ts     # Query keys
└── mutation-keys.ts  # Mutation keys
```

**Query Keys:**

```typescript
// features/auth/presentation/keys/query-keys.ts

/**
 * Centralized TanStack Query keys for the auth feature.
 */
export const authQueryKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authQueryKeys.all, 'currentUser'] as const,
};
```

**Mutation Keys:**

```typescript
// features/auth/presentation/keys/mutation-keys.ts

/**
 * Centralized TanStack mutation keys for the auth feature.
 */
export const authMutationKeys = {
  all: ['auth'] as const,
  login: {
    email: () => [...authMutationKeys.all, 'login', 'email'] as const,
  },
  oauth: {
    google: () => [...authMutationKeys.all, 'oauth', 'google'] as const,
    apple: () => [...authMutationKeys.all, 'oauth', 'apple'] as const,
  },
  signOut: () => [...authMutationKeys.all, 'signout'] as const,
};
```

**Index Re-exports:**

```typescript
// features/auth/presentation/keys/index.ts
export { authQueryKeys } from './query-keys';
export { authMutationKeys } from './mutation-keys';
```

**Usage in hooks:**

```typescript
// features/auth/presentation/hooks/use-sign-in-with-google-mutation.ts
import { authMutationKeys } from '../keys/mutation-keys';

export function useSignInWithGoogleMutation() {
  return useMutation({
    mutationKey: authMutationKeys.oauth.google(),
    mutationFn: async () => {
      /* ... */
    },
  });
}
```

**Key Patterns:**

- Use factory functions (e.g., `currentUser()`) for keys that may have parameters
- Use `as const` for type safety and autocomplete
- Prefix with feature name (e.g., `authQueryKeys`, `profileMutationKeys`)
- Separate query keys and mutation keys into distinct files
- All keys in a feature should share the same base (e.g., `['auth']`)

### TanStack Query Cache Management

**Location:** `features/[feature]/presentation/utils/[entity]-cache.ts`

For entities that appear across multiple queries (feeds, lists, details), use centralized cache utilities to manage optimistic updates consistently.

#### Cache Utilities Pattern

Cache utilities provide three core functions:

```typescript
// features/content/presentation/utils/post-cache.ts
import { QueryClient } from '@tanstack/react-query';
import { contentQueryKeys } from '../keys/query-keys';
import { PostEntity } from '../../domain/entities/post-entity';
import { OffsetPaginated } from '@/shared/domain/vo/offset-paginated';
import { CursorPaginated } from '@/shared/domain/vo/cursor-paginated';

export interface PostCacheContext {
  previousItem?: PostEntity;
  previousLists: Array<{
    queryKey: readonly unknown[];
    data: unknown;
  }>;
}

/**
 * Updates a post in both detail and list caches.
 * Returns previous state for rollback.
 */
export function updatePostCache(queryClient: QueryClient, postId: string, updater: (post: PostEntity) => PostEntity): PostCacheContext {
  // Update detail query
  const previousItem = queryClient.getQueryData<PostEntity>(contentQueryKeys.posts.byId(postId));

  if (previousItem) {
    queryClient.setQueryData(contentQueryKeys.posts.byId(postId), updater(previousItem));
  }

  // Update in all list queries (feeds, user posts, etc.)
  const previousLists: PostCacheContext['previousLists'] = [];

  queryClient
    .getQueriesData<PaginatedPost | PostEntity[] | InfinitePost>({
      queryKey: contentQueryKeys.posts.all(),
    })
    .forEach(([queryKey, data]) => {
      if (!data) return;

      previousLists.push({ queryKey, data });

      // Handle paginated results
      if ('data' in data && Array.isArray(data.data)) {
        queryClient.setQueryData(queryKey, {
          ...data,
          data: data.data.map((post) => (post.id === postId ? updater(post) : post)),
        });
      }
      // Handle infinite queries
      else if ('pages' in data && 'pageParams' in data) {
        queryClient.setQueryData(queryKey, {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            data: Array.isArray(page.data) ? page.data.map((post) => (post.id === postId ? updater(post) : post)) : page.data,
          })),
        });
      }
      // Handle simple arrays
      else if (Array.isArray(data)) {
        queryClient.setQueryData(
          queryKey,
          data.map((post) => (post.id === postId ? updater(post) : post))
        );
      }
    });

  return { previousItem, previousLists };
}

/**
 * Rolls back post cache updates using saved context.
 */
export function rollbackPostCache(queryClient: QueryClient, postId: string, context: PostCacheContext): void {
  if (context.previousItem) {
    queryClient.setQueryData(contentQueryKeys.posts.byId(postId), context.previousItem);
  }

  context.previousLists.forEach(({ queryKey, data }) => {
    queryClient.setQueryData(queryKey, data);
  });
}

/**
 * Invalidates all post queries to refetch from server.
 */
export function invalidatePostCache(queryClient: QueryClient, postId?: string): void {
  if (postId) {
    void queryClient.invalidateQueries({
      queryKey: contentQueryKeys.posts.byId(postId),
    });
  } else {
    void queryClient.invalidateQueries({
      queryKey: contentQueryKeys.posts.all(),
    });
  }
}
```

#### Using Cache Utilities in Mutations

```typescript
// features/engagement/presentation/hooks/use-like-post.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePostAction } from '@/features/engagement/application/actions/commands/like-post-action';
import { updatePostCache, rollbackPostCache, PostCacheContext } from '@/features/content/presentation/utils/post-cache';

export function useLikePost({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  return useMutation<PostSnapshot, Error, { isLiked: boolean }, PostCacheContext>({
    mutationKey: engagementMutationKeys.like(postId),
    mutationFn: async ({ isLiked }) => {
      return isLiked ? unlikePostAction({ postId }) : likePostAction({ postId });
    },
    onMutate: async ({ isLiked }) => {
      // Cancel outgoing queries to prevent race conditions
      await queryClient.cancelQueries({
        queryKey: contentQueryKeys.posts.all(),
      });

      // Optimistically update all caches containing this post
      const context = updatePostCache(queryClient, postId, (post) =>
        post.with({
          isLikedByCurrentUser: !isLiked,
          likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
        })
      );

      return context;
    },
    onSuccess: (serverPost) => {
      // Update cache with confirmed server data
      updatePostCache(queryClient, postId, (post) =>
        post.with({
          isLikedByCurrentUser: serverPost.isLikedByCurrentUser,
          likesCount: serverPost.likesCount,
        })
      );
    },
    onError: (_error, _variables, context) => {
      if (context) {
        rollbackPostCache(queryClient, postId, context);
      }
    },
  });
}
```

#### When to Invalidate vs Update Cache

**Use Direct Cache Updates (Preferred):**

- ✅ Simple mutations with predictable changes (like, save, follow)
- ✅ When server response contains the full updated entity
- ✅ Changes to single entity properties
- ✅ Better performance (no extra network requests)

**Use Invalidation:**

- ⚠️ Complex mutations affecting unknown parts of data
- ⚠️ Creating/deleting entities (affects lists, counts)
- ⚠️ Server might return unexpected data (admin actions, bulk operations)
- ⚠️ Periodic background refreshes (not mutation-triggered)

**Example - Simple mutation (no invalidation):**

```typescript
onSuccess: (serverPost) => {
  // Just update cache with server response
  updatePostCache(queryClient, postId, (post) => post.with(serverPost));
};
// No onSettled - no invalidation needed!
```

**Example - Complex mutation (with invalidation):**

```typescript
onSuccess: () => {
  // Post was deleted - invalidate all queries
  invalidatePostCache(queryClient);
};
```

#### Best Practices

1. **Create cache utilities for entities that appear in multiple queries** (posts, users, comments)
2. **Always use optimistic updates** for better UX
3. **Cancel outgoing queries** in `onMutate` to prevent race conditions
4. **Return context** from `onMutate` for proper rollback
5. **Use server response** in `onSuccess` to confirm changes (not invalidation)
6. **Only invalidate** when absolutely necessary
7. **Reuse cache utilities** across multiple mutations (like, save, repost)

### Hooks Organization

Feature hooks are organized into subfolders based on their type:

**Location:** `features/[feature]/presentation/hooks/`

```
hooks/
├── mutations/                           # TanStack Query mutation hooks
│   ├── use-sign-in-with-google-mutation.ts
│   ├── use-sign-in-with-apple-mutation.ts
│   └── use-sign-out-mutation.ts
├── queries/                             # TanStack Query query hooks
│   └── use-current-user-query.ts
├── use-auth.ts                          # Composite hooks
├── use-auth-listener.ts                 # Side-effect hooks
└── use-oauth-flow.ts                    # Utility hooks
```

**Hook Categories:**

- **mutations/**: TanStack Query `useMutation` hooks that modify data
- **queries/**: TanStack Query `useQuery` hooks that fetch data
- **Root level**: Utility hooks, composite hooks, and side-effect hooks that don't fit the TanStack Query pattern

**Naming Conventions:**

- Mutation hooks: `use-[action]-mutation.ts` (e.g., `use-sign-in-with-google-mutation.ts`)
- Query hooks: `use-[resource]-query.ts` (e.g., `use-current-user-query.ts`)
- Composite hooks: `use-[feature].ts` (e.g., `use-auth.ts`)
- Utility hooks: `use-[utility].ts` (e.g., `use-oauth-flow.ts`)

### Infinite Lists with AppPagedList

**Use `AppPagedList` for all infinite scroll lists with 50+ items.**

`AppPagedList` is a high-performance virtualized list component that integrates seamlessly with TanStack Query's `useInfiniteQuery`. It only renders visible items, making it ideal for large datasets.

**Location:** `src/shared/presentation/components/compositions/paged-list/paged-list.tsx`

**When to Use:**

- Lists with 50+ items that need virtualization
- Infinite scroll with cursor-based pagination
- Any `useInfiniteQuery` usage

**Pattern:**

```typescript
// 1. Create infinite query hook
// features/content/presentation/hooks/queries/use-posts-query.ts
export function usePostsQuery({ userId }: { userId: string }) {
  return useInfiniteQuery({
    queryKey: contentQueryKeys.posts.byUser(userId),
    queryFn: async ({ pageParam }) => {
      const result = await getPostsAction({
        userId,
        limit: 20,
        ...(pageParam && { cursor: pageParam }),
      });

      return {
        data: result.data.map(PostEntity.create),
        nextCursor: result.nextCursor,
      };
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// 2. Create reusable list component with smart defaults
// features/content/presentation/components/post/post-list.tsx
export function PostList({
  pages,
  isLoading,
  isError,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onPostClick,
}: PostListProps) {
  return (
    <AppPagedList
      // TanStack Query props
      pages={pages}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      // Rendering
      renderItem={(post) => <PostCard post={post} onExpand={onPostClick} />}
      getItemKey={(post) => post.id}
      // Virtualization
      estimateSize={200}
      gap={16}
      // Smart defaults
      loadingState={<PostListSkeleton />}
      emptyState={<PostEmptyState />}
      errorState={<PostErrorState />}
    />
  );
}

// 3. Use in page/tab component
// features/profile/presentation/pages/user-profile/components/tabs/created-tab.tsx
export function CreatedTab({ userId }: { userId: string }) {
  const query = usePostsQuery({ userId });

  return <PostList {...query} onPostClick={handlePostClick} />;
}
```

**Key Props:**

- `pages`: From `query.data?.pages` (TanStack Query infinite query result)
- `isLoading`: Initial loading state
- `isError`: Error state
- `hasNextPage`: Whether more pages exist (`query.hasNextPage ?? false`)
- `isFetchingNextPage`: Loading next page state
- `fetchNextPage`: Function to load next page
- `renderItem`: Function to render each item
- `getItemKey`: Function to extract unique key (use item ID, not index)
- `estimateSize`: Approximate item height in pixels (critical for performance)
- `gap`: Space between items in pixels

**Scroll Modes:**

- `auto` (default): Automatically loads when scrolling near bottom
- `sentinel`: Shows "Load More" button
- `manual`: No auto-loading, developer handles externally

**Performance Tips:**

- Set accurate `estimateSize` (measure typical item height)
- Too small = blank space during scroll
- Too large = unnecessary rendering
- Use `overscan={5}` (default) for smooth scrolling

**See full documentation:** [`docs/components/app-paged-list-guide.md`](../components/app-paged-list-guide.md)

### Import Organization

```typescript
// External libraries
import { Metadata } from 'next';
import { cache } from 'react';

// Core/shared
import { AppException } from '@/shared/domain/errors/app-exception';
import { container } from '@/di/container';

// Feature-specific
import { UserEntity } from '../../domain/entities/user-entity';
import { getUserAction } from '../actions/queries/get-user-action';
```

### Code Quality Tools

```bash
pnpm lint          # ESLint check
pnpm lint:fix      # Auto-fix linting issues
pnpm format        # Format with Prettier
pnpm format:ci     # Check formatting (CI)
```

## Feature Development Workflow

### Implementation Order

1. **Domain Layer First**
   - Define snapshots (data contracts)
   - Create entities with behavior
   - Define command/query interfaces
   - Define repository interfaces

2. **Data Layer**
   - Create DTOs matching API
   - Implement mappers
   - Implement repositories

3. **Application Layer**
   - Create server actions for commands
   - Create server actions for queries

4. **Presentation Layer**
   - Create page components
   - Create feature components
   - Wire up to app router

5. **DI Registration**
   - Register in feature container
   - Add to main container

## Error Handling

### AppException

```typescript
// shared/domain/errors/app-exception.ts
export class AppException extends Error {
  constructor(
    public readonly code: AppExceptionCodeEnum,
    public readonly details?: {
      message?: string;
      statusCode?: number;
    }
  ) {
    super(details?.message ?? code);
  }

  get isNotFound(): boolean {
    return this.details?.statusCode === 404;
  }

  // For server/client boundary
  toSerializableError(): Error {
    return new Error(
      JSON.stringify({
        code: this.code,
        message: this.details?.message,
        statusCode: this.details?.statusCode,
      })
    );
  }

  static fromError(error: unknown): AppException {
    // Reconstruct from serialized error
  }
}
```

### Error Handling in Pages

```typescript
const getUser = cache(async (username: string) => {
  try {
    const snapshot = await getUserAction({ username });
    return UserEntity.create(snapshot);
  } catch (e) {
    if (e instanceof AppException && e.isNotFound) {
      return notFound();
    }
    throw e;
  }
});
```

---

## Summary

| Layer            | Contains                                                      | Returns   |
| ---------------- | ------------------------------------------------------------- | --------- |
| **Domain**       | Entities, Snapshots, Commands, Queries, Repository Interfaces | Entities  |
| **Data**         | DTOs, Mappers, Repository Implementations                     | Entities  |
| **Application**  | Server Actions                                                | Snapshots |
| **Presentation** | Components, Pages, Hooks                                      | JSX       |

**Key Rules:**

1. Server actions always return snapshots (serializable)
2. Client code recreates entities from snapshots when needed
3. Dependencies point inward (domain has no dependencies)
4. No business logic in application layer - only orchestration
