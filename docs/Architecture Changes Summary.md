---
title: Architecture Changes Summary
type: note
permalink: docs/architecture-changes-summary
---

# Architecture Changes Summary

## Overview of Changes

This document outlines the key architectural changes from the original plan to the simplified Feature-Sliced Design (FSD) approach.

## Major Structural Changes

### 1. Component Organization (shared/ui)

#### Before (Original Plan)
```
src/shared/ui/
├── button.tsx
├── dialog.tsx
├── input.tsx
└── table.tsx
```

#### After (Simplified FSD)
```
src/shared/ui/
├── Button/
│   ├── index.ts
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.spec.ts
│   ├── Button.stories.tsx
│   └── assets/
├── Dialog/
│   ├── index.ts
│   ├── Dialog.tsx
│   ├── Dialog.module.css
│   ├── Button.spec.ts
│   └── Dialog.stories.tsx
└── Input/
    ├── index.ts
    ├── Input.tsx
    ├── Input.module.css
    ├── Input.spec.ts
    └── Input.stories.tsx
```

**Why?**
- Follows popular library conventions (MUI, Ant Design, Chakra UI)
- Co-locates all component-related files
- Makes testing and documentation mandatory
- Easier to maintain and refactor
- Better for Storybook integration

---

### 2. API Layer Unification

#### Before (Original Plan)
```
src/features/users/
└── api/
    ├── fetchers.ts      # Fetch functions
    ├── queries.ts       # React Query hooks
    └── keys.ts          # Query keys
```

#### After (Simplified FSD)
```
src/shared/api/
├── index.ts
├── api.instance.ts      # Unified fetch wrapper
├── api.types.ts         # API types
└── api.errors.ts        # Error handling

src/entities/user/
└── api/
    ├── queries.ts       # React Query read hooks
    └── mutations.ts     # React Query write hooks
```

**Why?**
- Single source of truth for API configuration
- Consistent error handling across all requests
- Easier to add interceptors, auth, etc.
- Reduces code duplication
- Inspired by proven patterns (realworld-react-fsd)

---

### 3. Features Structure

#### Before (Original Plan)
```
src/features/users/
├── model/               # Zod schemas, types
├── api/                 # Fetchers, queries
├── ui/                  # All user UI components
│   ├── table.tsx
│   ├── dialogs.tsx
│   └── form.tsx
└── lib/                 # Utilities
```

#### After (Simplified FSD)
```
src/features/
├── create-user/         # One feature = one user action
│   ├── ui/
│   │   ├── CreateUserDialog/
│   │   └── CreateUserForm/
│   ├── model/
│   │   └── useCreateUser.ts
│   └── index.ts
├── edit-user/
│   ├── ui/
│   │   ├── EditUserDialog/
│   │   └── EditUserForm/
│   ├── model/
│   │   └── useUpdateUser.ts
│   └── index.ts
└── delete-user/
    ├── ui/
    │   └── DeleteUserAlert/
    ├── model/
    │   └── useDeleteUser.ts
    └── index.ts
```

**Why?**
- Each feature is a distinct user capability
- Features are isolated and reusable
- Easier to understand what each feature does
- Better for code splitting
- Follows FSD principles (feature = user action)

---

### 4. Entity Layer Introduction

#### Before (Original Plan)
No separate entity layer - everything in features

#### After (Simplified FSD)
```
src/entities/user/
├── model/
│   ├── schema.ts        # Zod schemas
│   └── types.ts         # TypeScript types
├── api/
│   ├── queries.ts       # useUsers() hook
│   └── mutations.ts     # Create/Update/Delete mutations
└── index.ts
```

**Why?**
- Separates business entities from user actions
- Entities are shared across features
- Clear ownership of data layer
- Makes testing easier
- Follows Domain-Driven Design principles

---

### 5. Widgets in Pages

#### Before (Original Plan)
```
src/pages/users/
└── UsersPage.tsx        # Everything in one file
```

#### After (Simplified FSD)
```
src/pages/users/
├── ui/
│   ├── UsersHeader/     # Widget
│   ├── UsersTable/      # Widget
│   └── UsersFooter/     # Widget
├── UsersPage.tsx        # Composes widgets
└── index.ts
```

**Why?**
- Pages become thin composition layers
- Widgets are reusable page sections
- Better separation of concerns
- Easier to test page sections
- Follows FSD widget layer concept

---

### 6. Global Styles Location

#### Before (Original Plan)
```
src/shared/styles/
├── globals.css
└── theme.css
```

#### After (Simplified FSD)
```
src/app/styles/
├── globals.css
├── tailwind.css
└── theme.css
```

**Why?**
- App-level concerns belong in app/
- shared/ should be framework-agnostic
- Global styles are app-specific
- Clearer separation of concerns

---

### 7. Assets Organization

#### Before (Original Plan)
Fonts loaded via CDN in index.html

#### After (Simplified FSD)
```
src/shared/
├── fonts/
│   └── dm-sans/
│       ├── DMSans-Regular.woff2
│       └── DMSans-Bold.woff2
└── images/
    ├── logo.svg
    └── icon.png
```

**Why?**
- Self-hosted fonts for better performance
- Version controlled assets
- Offline support
- Better for production builds

---

## Styling Changes

### Before (Original Plan)
- Inline Tailwind classes everywhere
- No CSS Modules
- No component-specific styles

### After (Simplified FSD)
- **CSS Modules** for component styles
- Tailwind for utilities only
- Co-located styles with components
- CSS custom properties for theming

**Example:**
```typescript
// Before
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>

// After
import styles from './Button.module.css';

<button className={styles.button}>
  Click me
</button>
```

**Why?**
- Better component encapsulation
- Easier to maintain complex styles
- Reduces className bloat
- Better for theme switching
- Follows popular library patterns

---

## Testing Changes

### Before (Original Plan)
- Playwright only (E2E)
- Optional Vitest

### After (Simplified FSD)
- **Vitest for unit tests** (mandatory for shared/ui)
- Playwright for E2E
- **Storybook for component docs** (mandatory)
- Each component has .spec.ts and .stories.tsx

**Why?**
- Testing becomes part of development workflow
- Component tests catch bugs early
- Storybook serves as living documentation
- Better confidence in refactoring

---

## Import Rules (FSD Layers)

### Layer Hierarchy
```
app/          (can import all)
  ↓
pages/        (can import features, entities, shared)
  ↓
features/     (can import entities, shared)
  ↓
entities/     (can import shared only)
  ↓
shared/       (can import nothing - framework only)
```

### Forbidden Imports
- ❌ `shared/` importing from any app layer
- ❌ `entities/` importing from `features/` or `pages/`
- ❌ `features/` importing from other `features/`
- ❌ `pages/` importing from `entities/` directly (use features)

### Allowed Imports
- ✅ `pages/` → `features/create-user`
- ✅ `features/create-user` → `entities/user`
- ✅ `entities/user` → `shared/api`
- ✅ `features/create-user` → `shared/ui/Button`

---

## Barrel Exports Pattern

Every folder must have an `index.ts` that exports its public API:

```typescript
// ❌ Bad - importing internal files
import { Button } from '@/shared/ui/Button/Button';

// ✅ Good - using barrel export
import { Button } from '@/shared/ui/Button';

// ❌ Bad - importing everything
import { useCreateUser } from '@/features/create-user/model/useCreateUser';

// ✅ Good - using barrel export
import { useCreateUser } from '@/features/create-user';
```

**Why?**
- Encapsulates implementation details
- Makes refactoring easier
- Cleaner imports
- Clear public API

---

## Migration Checklist

If you're migrating from the original plan:

### Phase 1: Restructure Folders
- [ ] Create new folder structure
- [ ] Move shared/ui components to new structure
- [ ] Add index.ts to all component folders
- [ ] Create CSS Modules for each component

### Phase 2: Extract Entities
- [ ] Create entities/user/model with schemas
- [ ] Move React Query hooks to entities/user/api
- [ ] Update imports across codebase

### Phase 3: Unify API Layer
- [ ] Create shared/api/api.instance.ts
- [ ] Migrate all fetch calls to use apiInstance
- [ ] Remove duplicate fetch logic

### Phase 4: Split Features
- [ ] Create separate folders for each action
- [ ] Move UI components to feature/ui/
- [ ] Create feature-specific hooks in model/
- [ ] Update page imports

### Phase 5: Reorganize Pages
- [ ] Extract widgets from page components
- [ ] Create ui/ folder with widget components
- [ ] Update page to compose widgets

### Phase 6: Add Testing
- [ ] Write .spec.ts for each component
- [ ] Create .stories.tsx for Storybook
- [ ] Set up Vitest configuration
- [ ] Run tests and fix failures

### Phase 7: Move Styles
- [ ] Move global styles to app/styles/
- [ ] Create CSS Modules for components
- [ ] Update imports
- [ ] Test responsive design

---

## Benefits of New Structure

### Developer Experience
- **Predictability**: Every component follows same structure
- **Discoverability**: Easy to find related files
- **Maintainability**: Changes are localized
- **Testability**: Tests co-located with code

### Code Quality
- **Type Safety**: Zod + TypeScript throughout
- **Test Coverage**: Mandatory tests for shared components
- **Documentation**: Storybook stories serve as docs
- **Consistency**: Enforced patterns via FSD rules

### Performance
- **Code Splitting**: Features can be lazy loaded
- **Tree Shaking**: Better with barrel exports
- **CSS Modules**: No global style conflicts
- **Optimized Builds**: Smaller bundle sizes

### Scalability
- **Adding Features**: Clear pattern to follow
- **Adding Components**: Scaffoldable structure
- **Team Collaboration**: Clear ownership boundaries
- **Refactoring**: Changes are isolated

---

## Quick Reference: Where Does It Go?

| What | Where | Why |
|------|-------|-----|
| Reusable UI component | `shared/ui/ComponentName/` | Framework-agnostic |
| User action (create, edit) | `features/action-name/` | User-facing capability |
| Business entity (User) | `entities/entity-name/` | Domain model |
| Page layout | `pages/page-name/` | Route composition |
| API configuration | `shared/api/` | Infrastructure |
| Global styles | `app/styles/` | App-level config |
| Types used across app | `shared/types/` | Shared contracts |
| Utility functions | `shared/lib/` | Helpers |
| Custom hooks | `shared/hooks/` | Reusable logic |
| Page-specific widget | `pages/page-name/ui/WidgetName/` | Page composition |
| Feature-specific component | `features/feature-name/ui/ComponentName/` | Feature UI |
| React Query hooks | `entities/entity-name/api/` | Data layer |
| Zod schemas | `entities/entity-name/model/` | Data contracts |

---

## Example: Creating a New Feature

Let's say you want to add a "duplicate user" feature:

### Step 1: Create Feature Folder
```bash
mkdir -p src/features/duplicate-user/{ui,model}
mkdir -p src/features/duplicate-user/ui/DuplicateUserButton
```

### Step 2: Create Component
```typescript
// src/features/duplicate-user/ui/DuplicateUserButton/DuplicateUserButton.tsx
import { Button } from '@/shared/ui/Button';
import { useDuplicateUser } from '../../model/useDuplicateUser';

export const DuplicateUserButton = ({ user }) => {
  const { duplicateUser, isLoading } = useDuplicateUser();
  
  return (
    <Button 
      onClick={() => duplicateUser(user)}
      isLoading={isLoading}
    >
      Duplicate
    </Button>
  );
};
```

### Step 3: Create Hook
```typescript
// src/features/duplicate-user/model/useDuplicateUser.ts
import { useCreateUserMutation } from '@/entities/user';
import { toast } from '@/shared/ui/Toast';

export const useDuplicateUser = () => {
  const createMutation = useCreateUserMutation();
  
  const duplicateUser = async (user: User) => {
    const { id, ...userData } = user; // Remove id
    try {
      await createMutation.mutateAsync(userData);
      toast.success('User duplicated');
    } catch {
      toast.error('Failed to duplicate user');
    }
  };
  
  return {
    duplicateUser,
    isLoading: createMutation.isPending,
  };
};
```

### Step 4: Export Public API
```typescript
// src/features/duplicate-user/index.ts
export { DuplicateUserButton } from './ui/DuplicateUserButton';
export { useDuplicateUser } from './model/useDuplicateUser';
```

### Step 5: Use in Page
```typescript
// src/pages/users/ui/UsersTable/UsersTable.tsx
import { DuplicateUserButton } from '@/features/duplicate-user';

// In table actions column:
<DuplicateUserButton user={user} />
```

---

## Common Pitfalls to Avoid

### ❌ Don't: Import implementation details
```typescript
import { Button } from '@/shared/ui/Button/Button.tsx';
```

### ✅ Do: Use barrel exports
```typescript
import { Button } from '@/shared/ui/Button';
```

---

### ❌ Don't: Put business logic in pages
```typescript
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  
  const createUser = async (data) => {
    const response = await fetch('/api/users', { ... });
    // ... lots of logic
  };
};
```

### ✅ Do: Use features for logic
```typescript
const UsersPage = () => {
  const { users } = useUsers();
  // Page just composes, no logic
};
```

---

### ❌ Don't: Import entities directly in pages
```typescript
import { useUsers } from '@/entities/user';
```

### ✅ Do: Use features that wrap entities
```typescript
import { useCreateUser } from '@/features/create-user';
```

---

### ❌ Don't: Cross-import between features
```typescript
// In features/create-user/
import { EditUserDialog } from '@/features/edit-user';
```

### ✅ Do: Share via entities or shared
```typescript
// Both features import from entities
import { useCreateUserMutation } from '@/entities/user';
```

---

## Conclusion

The simplified FSD structure provides:
- Clear rules and boundaries
- Predictable project organization
- Better scalability and maintainability
- Improved developer experience
- Industry-standard patterns

While it requires more initial setup (tests, stories, CSS Modules), the long-term benefits far outweigh the upfront cost. The structure scales well as the project grows and makes onboarding new developers easier.