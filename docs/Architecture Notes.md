---
title: Architecture Notes
type: note
permalink: docs/architecture-notes
---

> **⚠️ SUPERSEDED**: This document has been replaced by [[Updated Architecture Notes]]. Please refer to the updated version for the current simplified FSD approach.

---

# Architecture Notes

## Project Structure Philosophy
**Feature-Driven Modular Architecture** - Code organized by features rather than technical layers, promoting scalability and maintainability.

## Directory Structure

```
src/
├── app/                    # Application shell & initialization
│   ├── providers/          # React Query, Router providers
│   ├── router/             # Route configuration
│   ├── error-boundary/     # Top-level error boundary
│   └── msw/                # MSW setup and handlers
│       ├── browser.ts      # MSW browser setup
│       ├── handlers.ts     # API handlers
│       └── storage.ts      # localStorage repository
│
├── pages/                  # Route-level page components
│   ├── users/
│   │   └── UsersPage.tsx   # Main users list page
│   └── NotFoundPage.tsx    # 404 page
│
├── features/               # Feature modules
│   └── users/
│       ├── model/          # Data contracts & types
│       │   ├── schema.ts   # Zod schemas (User, UserCreate, UserUpdate)
│       │   └── types.ts    # TypeScript types derived from schemas
│       ├── api/            # Data fetching layer
│       │   ├── fetchers.ts # Fetch functions
│       │   ├── queries.ts  # React Query hooks (useUsers, useCreateUser, etc.)
│       │   └── keys.ts     # Query keys factory
│       ├── ui/             # Feature-specific components
│       │   ├── UsersTable.tsx
│       │   ├── AddUserDialog.tsx
│       │   ├── EditUserDialog.tsx
│       │   ├── DeleteUserAlert.tsx
│       │   └── UserForm.tsx
│       └── lib/            # Feature utilities
│           ├── sort.ts     # Sorting comparators
│           └── mappers.ts  # Data transformations
│
└── shared/                 # Shared/common code
    ├── ui/                 # shadcn/ui component wrappers
    │   ├── button.tsx
    │   ├── dialog.tsx
    │   ├── input.tsx
    │   ├── label.tsx
    │   ├── select.tsx
    │   ├── table.tsx
    │   ├── skeleton.tsx
    │   ├── alert-dialog.tsx
    │   └── toaster.tsx
    ├── lib/                # Shared utilities
    │   ├── fetch.ts        # Fetch wrapper with validation
    │   ├── logger.ts       # Logging utility
    │   └── utils.ts        # cn() and other helpers
    └── styles/             # Global styles
        ├── globals.css     # Global CSS
        ├── tailwind.css    # Tailwind directives
        └── theme.css       # CSS custom properties
```

## Architectural Patterns

### 1. Feature-Driven Organization
Each feature (users) contains:
- **model/**: Data layer (schemas, types)
- **api/**: Service layer (fetchers, queries)
- **ui/**: Presentation layer (components)
- **lib/**: Feature-specific utilities

Benefits: Co-location, clear boundaries, easy to scale

### 2. Separation of Concerns
- **Pages**: Layout and routing orchestration
- **Features**: Business logic and domain code
- **Shared**: Reusable infrastructure

### 3. Contract-First Design
Zod schemas define contracts shared between:
- Frontend validation
- MSW handler validation
- TypeScript types (derived via z.infer)

### 4. Optimistic UI Updates
React Query mutations implement:
- Optimistic updates (immediate UI feedback)
- Automatic rollback on error
- Cache invalidation on success

### 5. Error Boundaries
Layered error handling:
- Top-level error boundary catches crashes
- React Query error handling for failed requests
- Form validation for user input errors

## Data Flow

### Read Flow (GET Users)
1. Component calls `useUsers()` hook
2. React Query checks cache
3. If stale/missing, fetcher executes
4. Fetcher calls MSW handler via `/api/users`
5. MSW reads from localStorage
6. Response validated via Zod
7. Data cached and returned to component

### Write Flow (Create/Update/Delete)
1. Component calls mutation hook (e.g., `useCreateUser()`)
2. Optimistic update applied to cache
3. Mutation executes via fetcher
4. MSW handler validates request with Zod
5. On success:
   - MSW updates localStorage
   - Response validated
   - Cache invalidated
   - UI reflects real data
6. On error:
   - Rollback to previous cache state
   - Display error toast

## Component Architecture

### Smart vs Presentational
- **Smart Components** (in features/*/ui/): Connected to React Query, contain logic
- **Presentational Components** (in shared/ui/): Pure, reusable, props-driven

### Dialog Pattern
All dialogs follow consistent structure:
- Blur overlay (backdrop-blur)
- Close icon (X button)
- ESC key handler
- Click-outside to close
- Focus trap and restoration
- Footer with Cancel (ghost) and Save (primary) buttons

### Form Pattern
All forms use React Hook Form + Zod:
- zodResolver for validation
- Inline error messages
- Disabled submit during validation/submission
- Form state managed by RHF

## State Management Strategy

### Server State
Managed by React Query:
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling

### Client State
Managed by React useState/useReducer:
- Dialog open/closed state
- Sort column/direction
- Form state (via RHF)

### Persistent State
MSW + localStorage:
- User data persists across sessions
- Fallback to in-memory for tests

## Styling Architecture

### Tailwind Configuration
- Custom CSS variables in :root
- Tailwind theme extends these variables
- shadcn components use theme tokens

### Mobile-First Approach
- Base styles target mobile
- Use responsive breakpoints for larger screens
- Horizontal scroll for table on mobile

### Dark Mode Support
Optional: CSS variables enable easy dark mode toggle

## Testing Strategy

### E2E Testing (Playwright)
- Test critical user flows
- Minimum: Create user flow
- Tests run against MSW-mocked backend

### Integration Testing (Optional - Vitest)
- Test React Query hooks
- Test form validation logic
- Test MSW handlers

### Type Safety
TypeScript strict mode catches errors at compile time

## Performance Considerations

### Code Splitting
Vite automatically code-splits routes

### Lazy Loading
React.lazy() for route components if needed

### Memoization
- React.memo for expensive renders
- useMemo for expensive calculations (sorting)
- useCallback for stable references

### Query Optimization
- Stale time configured per query
- Cache time prevents redundant fetches
- Optimistic updates reduce perceived latency

## Security Considerations

### Input Validation
All user inputs validated via Zod schemas

### XSS Prevention
React escapes all rendered content by default

### CSRF
Not applicable (mock backend, no cookies)

## Scalability Path

### Adding Features
1. Create new feature folder under features/
2. Follow same structure: model, api, ui, lib
3. Register routes in app/router

### Adding Entities
1. Define Zod schemas in feature/model
2. Create MSW handlers
3. Create React Query hooks
4. Build UI components

### Backend Migration
When ready to switch from MSW to real backend:
1. Update fetchers in features/*/api/fetchers.ts
2. Remove MSW initialization
3. Schemas remain unchanged
4. React Query logic remains unchanged