---
title: Updated Development Tasks and Roadmap
type: note
permalink: project/updated-development-tasks-and-roadmap-1
---

# Updated Development Tasks & Roadmap

## Implementation Phases (Revised for Simplified FSD)

### Phase 1: Project Setup & Configuration ⏱️ ~2 hours

#### Task 1.1: Initialize Project
- [ ] Create Vite React TypeScript app: `yarn create vite vite-react-apron --template react-ts`
- [ ] Initialize git repository
- [ ] Create initial README.md
- [ ] Set up .gitignore

#### Task 1.2: Install Dependencies
```bash
# Core dependencies
yarn add react-router-dom @tanstack/react-query zod @hookform/resolvers react-hook-form lucide-react class-variance-authority clsx msw

# Dev dependencies
yarn add -D @types/node @playwright/test playwright vitest @testing-library/react @testing-library/jest-dom @storybook/react-vite storybook eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier
```

#### Task 1.3: Configure Build Tools
- [ ] Configure vite.config.ts
  - Set up path aliases (`@/` → `src/`)
  - Configure CSS Modules
- [ ] Configure TypeScript (tsconfig.json)
  - Strict mode
  - Path mapping
- [ ] Set up PostCSS (if needed)

#### Task 1.4: Set Up Code Quality
- [ ] Configure ESLint (.eslintrc.json)
- [ ] Configure Prettier (.prettierrc)
- [ ] Add scripts to package.json:
  - `lint`, `format`, `type-check`
- [ ] Test that linting and formatting work

#### Task 1.5: Set Up Testing & Storybook
- [ ] Configure Vitest (vitest.config.ts)
- [ ] Set up Testing Library
- [ ] Initialize Storybook: `npx storybook@latest init`
- [ ] Configure Playwright (playwright.config.ts)

---

### Phase 2: Folder Structure & Base Setup ⏱️ ~1.5 hours

#### Task 2.1: Create Directory Structure
```bash
mkdir -p src/{app,pages,features,entities,shared}
mkdir -p src/app/{providers,router,error-boundary,msw,styles}
mkdir -p src/shared/{api,types,ui,lib,hooks,fonts,images,config}
mkdir -p src/entities/user/{model,api}
mkdir -p src/pages/{users,not-found}
mkdir -p src/features/{create-user,edit-user,delete-user,sort-users}
```

#### Task 2.2: Set Up shared/api (Unified API Layer)
- [ ] Create `shared/api/api.instance.ts`
  - ApiInstance class with get/post/put/delete methods
  - Zod schema validation
  - Error handling
  - Timeout support
- [ ] Create `shared/api/api.types.ts`
  - ApiResponse interfaces
  - PaginatedResponse
- [ ] Create `shared/api/api.errors.ts`
  - ApiError class
  - Error handling utilities
- [ ] Create `shared/api/index.ts` (barrel export)

#### Task 2.3: Set Up shared/types
- [ ] Create `shared/types/common.ts`
  - Common TypeScript types
- [ ] Create `shared/types/index.ts`

#### Task 2.4: Set Up shared/lib
- [ ] Create `shared/lib/cn.ts`
  ```typescript
  import { clsx, type ClassValue } from 'clsx';
  
  export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
  }
  ```
- [ ] Create `shared/lib/logger.ts`
- [ ] Create `shared/lib/index.ts`

#### Task 2.5: Add Fonts
- [ ] Download DM Sans font files to `shared/fonts/dm-sans/`
- [ ] Or add Google Fonts link in index.html

---

### Phase 3: App Layer (Global Setup) ⏱️ ~2 hours

#### Task 3.1: Global Styles
- [ ] Create `app/styles/globals.css`
  - CSS reset
  - Base typography
  - Font family (DM Sans)
- [ ] Create `app/styles/theme.css`
  - CSS variables for colors
  - Apron brand palette
- [ ] Create `app/styles/tailwind.css`
  - Tailwind directives
- [ ] Import styles in main.tsx

#### Task 3.2: Providers
- [ ] Create `app/providers/QueryProvider.tsx`
  ```typescript
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
      },
    },
  });
  
  export const QueryProvider = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  ```
- [ ] Create `app/providers/Providers.tsx` (combines all providers)
- [ ] Create `app/providers/index.ts`

#### Task 3.3: Error Boundary
- [ ] Create `app/error-boundary/ErrorBoundary.tsx`
  - Class component with componentDidCatch
  - Retry button to invalidate queries
  - Error UI
- [ ] Create `app/error-boundary/index.ts`

#### Task 3.4: Router
- [ ] Create `app/router/Router.tsx`
  ```typescript
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { UsersPage } from '@/pages/users';
  import { NotFoundPage } from '@/pages/not-found';
  
  export const Router = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
  ```
- [ ] Create `app/router/index.ts`

#### Task 3.5: MSW Setup
- [ ] Create `app/msw/storage.ts`
  - UserStorage interface
  - LocalStorageAdapter class
  - InMemoryAdapter class
  - createUserStorage factory
- [ ] Create `app/msw/handlers.ts`
  - MSW handlers for all endpoints
  - Request/response validation
- [ ] Create `app/msw/browser.ts`
  - Initialize MSW worker
- [ ] Update main.tsx to start MSW in dev

#### Task 3.6: Main Entry
- [ ] Update `main.tsx`
  - Import Providers
  - Import ErrorBoundary
  - Import Router
  - Start MSW before rendering
  ```typescript
  if (import.meta.env.DEV) {
    const { worker } = await import('./app/msw/browser');
    await worker.start();
  }
  ```

---

### Phase 4: Shared UI Components ⏱️ ~4 hours

For each component, create the full structure:
- index.ts (barrel export)
- ComponentName.tsx
- ComponentName.module.css
- ComponentName.spec.ts
- ComponentName.stories.tsx

#### Task 4.1: Button Component
- [ ] Create `shared/ui/Button/` folder
- [ ] Implement Button.tsx with variants (primary, secondary, ghost)
- [ ] Create Button.module.css
- [ ] Write Button.spec.ts tests
- [ ] Create Button.stories.tsx
- [ ] Export via index.ts

#### Task 4.2: Input Component
- [ ] Create `shared/ui/Input/` folder
- [ ] Implement Input.tsx (forwardRef for RHF)
- [ ] Create Input.module.css
- [ ] Write Input.spec.ts tests
- [ ] Create Input.stories.tsx
- [ ] Export via index.ts

#### Task 4.3: Select Component
- [ ] Create `shared/ui/Select/` folder
- [ ] Implement Select.tsx
- [ ] Create Select.module.css
- [ ] Write Select.spec.ts tests
- [ ] Create Select.stories.tsx
- [ ] Export via index.ts

#### Task 4.4: Dialog Component
- [ ] Create `shared/ui/Dialog/` folder
- [ ] Implement Dialog.tsx
  - Backdrop blur
  - ESC to close
  - Click outside to close
  - Focus trap
- [ ] Create Dialog.module.css
- [ ] Write Dialog.spec.ts tests
- [ ] Create Dialog.stories.tsx
- [ ] Export via index.ts

#### Task 4.5: Table Component
- [ ] Create `shared/ui/Table/` folder
- [ ] Implement Table.tsx with sub-components:
  - Table.Header
  - Table.Row
  - Table.Head
  - Table.Body
  - Table.Cell
- [ ] Create Table.module.css (horizontal scroll on mobile)
- [ ] Write Table.spec.ts tests
- [ ] Create Table.stories.tsx
- [ ] Export via index.ts

#### Task 4.6: Skeleton Component
- [ ] Create `shared/ui/Skeleton/` folder
- [ ] Implement Skeleton.tsx
- [ ] Create Skeleton.module.css (shimmer animation)
- [ ] Write Skeleton.spec.ts tests
- [ ] Create Skeleton.stories.tsx
- [ ] Export via index.ts

#### Task 4.7: AlertDialog Component
- [ ] Create `shared/ui/AlertDialog/` folder
- [ ] Implement AlertDialog.tsx (confirmation dialogs)
- [ ] Create AlertDialog.module.css
- [ ] Write AlertDialog.spec.ts tests
- [ ] Create AlertDialog.stories.tsx
- [ ] Export via index.ts

#### Task 4.8: Toast Component
- [ ] Create `shared/ui/Toast/` folder
- [ ] Implement Toast.tsx and toast() helper
- [ ] Create Toast.module.css
- [ ] Write Toast.spec.ts tests
- [ ] Create Toast.stories.tsx
- [ ] Export via index.ts

---

### Phase 5: Entity Layer - User ⏱️ ~2 hours

#### Task 5.1: User Model
- [ ] Create `entities/user/model/schema.ts`
  - CountryEnum
  - userBaseSchema with age refinement
  - userSchema (with id)
  - userCreateSchema
  - userUpdateSchema
  - usersArraySchema
- [ ] Create `entities/user/model/types.ts`
  ```typescript
  export type User = z.infer<typeof userSchema>;
  export type UserCreate = z.infer<typeof userCreateSchema>;
  export type UserUpdate = z.infer<typeof userUpdateSchema>;
  export type Country = User['country'];
  ```
- [ ] Create `entities/user/model/index.ts`

#### Task 5.2: User API - Queries
- [ ] Create `entities/user/api/queries.ts`
  - userKeys factory
  - useUsers() hook using React Query
  - Uses apiInstance.get() with schema validation
- [ ] Create `entities/user/api/index.ts`

#### Task 5.3: User API - Mutations
- [ ] Create `entities/user/api/mutations.ts`
  - useCreateUserMutation() with optimistic updates
  - useUpdateUserMutation() with optimistic updates
  - useDeleteUserMutation() with optimistic updates
  - All with proper rollback on error
- [ ] Export from `entities/user/api/index.ts`

#### Task 5.4: Entity Index
- [ ] Create `entities/user/index.ts`
  - Re-export types, schemas, hooks
  - Public API for the user entity

---

### Phase 6: Features Layer ⏱️ ~4 hours

#### Task 6.1: create-user Feature

**Task 6.1.1: Create User Model**
- [ ] Create `features/create-user/model/useCreateUser.ts`
  - Wraps useCreateUserMutation
  - Adds toast notifications
  - Handles success callback
  ```typescript
  export const useCreateUser = (onSuccess?: () => void) => {
    const mutation = useCreateUserMutation();
    
    const createUser = async (data: UserCreate) => {
      try {
        await mutation.mutateAsync(data);
        toast.success('User created successfully');
        onSuccess?.();
      } catch (error) {
        toast.error('Failed to create user');
        throw error;
      }
    };
    
    return { createUser, isLoading: mutation.isPending };
  };
  ```
- [ ] Create `features/create-user/model/index.ts`

**Task 6.1.2: Create User Form**
- [ ] Create `features/create-user/ui/CreateUserForm/` folder
- [ ] Implement CreateUserForm.tsx
  - React Hook Form + zodResolver
  - Fields: country, firstName, lastName, age
  - Inline validation errors
- [ ] Create CreateUserForm.module.css
- [ ] Create CreateUserForm.spec.ts
- [ ] Create CreateUserForm.stories.tsx
- [ ] Create index.ts

**Task 6.1.3: Create User Dialog**
- [ ] Create `features/create-user/ui/CreateUserDialog/` folder
- [ ] Implement CreateUserDialog.tsx
  - Uses Dialog component
  - Title "Add user"
  - Contains CreateUserForm
  - Cancel and Save buttons
- [ ] Create CreateUserDialog.module.css
- [ ] Create index.ts

**Task 6.1.4: Feature Index**
- [ ] Create `features/create-user/index.ts`
  - Export CreateUserDialog
  - Export useCreateUser

#### Task 6.2: edit-user Feature

**Task 6.2.1: Edit User Model**
- [ ] Create `features/edit-user/model/useUpdateUser.ts`
  - Wraps useUpdateUserMutation
  - Toast notifications
- [ ] Create `features/edit-user/model/index.ts`

**Task 6.2.2: Edit User Form**
- [ ] Create `features/edit-user/ui/EditUserForm/` folder
- [ ] Implement EditUserForm.tsx (similar to CreateUserForm)
- [ ] Create EditUserForm.module.css
- [ ] Create index.ts

**Task 6.2.3: Edit User Dialog**
- [ ] Create `features/edit-user/ui/EditUserDialog/` folder
- [ ] Implement EditUserDialog.tsx
  - Pre-filled with user data
  - Title "Edit user"
- [ ] Create EditUserDialog.module.css
- [ ] Create index.ts

**Task 6.2.4: Feature Index**
- [ ] Create `features/edit-user/index.ts`

#### Task 6.3: delete-user Feature

**Task 6.3.1: Delete User Model**
- [ ] Create `features/delete-user/model/useDeleteUser.ts`
  - Wraps useDeleteUserMutation
  - Toast notifications
- [ ] Create `features/delete-user/model/index.ts`

**Task 6.3.2: Delete User Alert**
- [ ] Create `features/delete-user/ui/DeleteUserAlert/` folder
- [ ] Implement DeleteUserAlert.tsx
  - Uses AlertDialog
  - Confirmation message
  - Cancel and Delete buttons
- [ ] Create DeleteUserAlert.module.css
- [ ] Create index.ts

**Task 6.3.3: Feature Index**
- [ ] Create `features/delete-user/index.ts`

#### Task 6.4: sort-users Feature

**Task 6.4.1: Sort Utilities**
- [ ] Create `features/sort-users/lib/sort.ts`
  - Comparator functions for each column
  - Type-safe sorting logic
- [ ] Create `features/sort-users/lib/index.ts`

**Task 6.4.2: Sort Hook**
- [ ] Create `features/sort-users/model/useSortUsers.ts`
  ```typescript
  export const useSortUsers = (users: User[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
      column: null,
      direction: null,
    });
    
    const sortedUsers = useMemo(() => {
      // Sorting logic
    }, [users, sortConfig]);
    
    const toggleSort = (column: SortColumn) => {
      // Toggle logic: asc → desc → none
    };
    
    return { sortedUsers, sortConfig, toggleSort };
  };
  ```
- [ ] Create `features/sort-users/model/index.ts`

**Task 6.4.3: Feature Index**
- [ ] Create `features/sort-users/index.ts`

---

### Phase 7: Pages Layer with Widgets ⏱️ ~3 hours

#### Task 7.1: Users Page Widgets

**Task 7.1.1: UsersHeader Widget**
- [ ] Create `pages/users/ui/UsersHeader/` folder
- [ ] Implement UsersHeader.tsx
  - Title "Users"
  - "+ Add user" button (opens CreateUserDialog)
- [ ] Create UsersHeader.module.css
- [ ] Create index.ts

**Task 7.1.2: UsersTable Widget**
- [ ] Create `pages/users/ui/UsersTable/` folder
- [ ] Implement UsersTable.tsx
  - Uses Table component from shared/ui
  - Columns: Country, First Name, Last Name, Age, Actions
  - Sortable headers (uses sort-users feature)
  - Edit and Delete buttons in Actions
  - Skeleton loading state
  - Mobile horizontal scroll
- [ ] Create UsersTable.module.css
- [ ] Create index.ts

**Task 7.1.3: UsersFooter Widget**
- [ ] Create `pages/users/ui/UsersFooter/` folder
- [ ] Implement UsersFooter.tsx
  - Chat icon (MessageCircle from lucide-react)
  - Sticky or fixed positioning
- [ ] Create UsersFooter.module.css
- [ ] Create index.ts

#### Task 7.2: Users Page
- [ ] Create `pages/users/UsersPage.tsx`
  - Fetch users with useUsers()
  - Compose UsersHeader, UsersTable, UsersFooter
  - Handle loading and error states
  ```typescript
  export const UsersPage = () => {
    const { data: users, isLoading, error } = useUsers();
    
    if (error) return <ErrorMessage />;
    
    return (
      <div className={styles.page}>
        <UsersHeader />
        <main className={styles.main}>
          <UsersTable users={users || []} isLoading={isLoading} />
        </main>
        <UsersFooter />
      </div>
    );
  };
  ```
- [ ] Create `pages/users/index.ts`

#### Task 7.3: Not Found Page
- [ ] Create `pages/not-found/NotFoundPage.tsx`
  - "Page not found" message
  - Link back to "/"
- [ ] Create `pages/not-found/index.ts`

---

### Phase 8: MSW Implementation ⏱️ ~2 hours

#### Task 8.1: Complete Storage Implementation
- [ ] Implement LocalStorageAdapter in `app/msw/storage.ts`
  - getAll(), getById(), create(), update(), delete()
  - JSON serialization
  - UUID generation for new users
- [ ] Implement InMemoryAdapter as fallback
- [ ] Implement seedUsers() with 3 initial users

#### Task 8.2: Complete MSW Handlers
- [ ] Implement GET /api/users handler
  - Return all users from storage
  - Validate response with usersArraySchema
- [ ] Implement POST /api/users handler
  - Validate body with userCreateSchema
  - Return 400 with errors on validation failure
  - Generate UUID and save
  - Return 201 with new user
- [ ] Implement PUT /api/users/:id handler
  - Validate body with userUpdateSchema
  - Merge with existing user
  - Validate merged result with userSchema
  - Return 400 or 404 as needed
  - Return updated user
- [ ] Implement DELETE /api/users/:id handler
  - Return 404 if not found
  - Delete and return { ok: true }

#### Task 8.3: Test MSW in Browser
- [ ] Start dev server: `yarn dev`
- [ ] Verify 3 seeded users load
- [ ] Test create in browser console
- [ ] Test update in browser console
- [ ] Test delete in browser console
- [ ] Verify localStorage persistence (refresh page)

---

### Phase 9: Testing ⏱️ ~2.5 hours

#### Task 9.1: Unit Tests for Shared Components
- [ ] Complete Button.spec.ts
- [ ] Complete Input.spec.ts
- [ ] Complete Select.spec.ts
- [ ] Run: `yarn test`

#### Task 9.2: Unit Tests for Features
- [ ] Test sort-users/lib/sort.ts
- [ ] Test form validation logic
- [ ] Run: `yarn test`

#### Task 9.3: Configure Playwright
- [ ] Complete playwright.config.ts
  - Set base URL
  - Configure browsers (chromium, firefox, webkit)
  - Set up test directories

#### Task 9.4: Write E2E Test
- [ ] Create `tests/e2e/user-create.spec.ts`
  ```typescript
  test('create user flow', async ({ page }) => {
    await page.goto('/');
    
    // Count initial rows
    const initialCount = await page.locator('tbody tr').count();
    
    // Open dialog
    await page.click('button:has-text("Add user")');
    
    // Fill form
    await page.selectOption('[name="country"]', 'UK');
    await page.fill('[name="firstName"]', 'TestJohn');
    await page.fill('[name="lastName"]', 'TestDoe');
    await page.fill('[name="age"]', '30');
    
    // Submit
    await page.click('button:has-text("Save")');
    
    // Verify
    await expect(page.locator('dialog')).not.toBeVisible();
    const finalCount = await page.locator('tbody tr').count();
    expect(finalCount).toBe(initialCount + 1);
  });
  ```
- [ ] Run: `yarn test:e2e`

#### Task 9.5: Storybook Stories
- [ ] Verify all .stories.tsx files work
- [ ] Run: `yarn storybook`
- [ ] Test interactions in Storybook

---

### Phase 10: Polish & Optimization ⏱️ ~2 hours

#### Task 10.1: Code Quality
- [ ] Run linter: `yarn lint`
- [ ] Fix all lint errors
- [ ] Run formatter: `yarn format`
- [ ] Run type check: `yarn type-check`
- [ ] Remove console.logs
- [ ] Remove commented code

#### Task 10.2: Accessibility
- [ ] Test keyboard navigation (Tab, Enter, ESC)
- [ ] Verify focus trap in dialogs
- [ ] Check color contrast (WCAG AA)
- [ ] Add ARIA labels where needed
- [ ] Test with screen reader (basic)

#### Task 10.3: Mobile Testing
- [ ] Test on mobile viewport (320px, 375px, 414px)
- [ ] Verify table horizontal scroll works
- [ ] Test all dialogs on mobile
- [ ] Verify touch interactions
- [ ] Test header and footer on mobile

#### Task 10.4: Performance
- [ ] Audit with Lighthouse
- [ ] Optimize bundle size if needed
- [ ] Verify lazy loading works
- [ ] Check for unnecessary re-renders

#### Task 10.5: Error Scenarios
- [ ] Test invalid form submissions
- [ ] Test age validation for all countries
- [ ] Simulate API errors (modify MSW handlers temporarily)
- [ ] Verify error boundary catches errors
- [ ] Test all toast notifications

---

### Phase 11: Deployment ⏱️ ~1 hour

#### Task 11.1: Vercel Configuration
- [ ] Create `vercel.json`
  ```json
  {
    "buildCommand": "yarn build",
    "outputDirectory": "dist",
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

#### Task 11.2: Build & Preview
- [ ] Run `yarn build`
- [ ] Verify dist/ created without errors
- [ ] Run `yarn preview`
- [ ] Test all functionality in preview
- [ ] Check console for errors

#### Task 11.3: Deploy to Vercel
- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Configure build settings
- [ ] Deploy
- [ ] Test deployed app
- [ ] Verify all features work in production

#### Task 11.4: Documentation
- [ ] Write comprehensive README.md
  - Project description
  - Tech stack
  - Architecture overview
  - Installation steps
  - Available scripts
  - Running tests
  - Building for production
  - Deployment
  - Folder structure
  - Contributing guidelines

---

## Updated Time Estimates

| Phase | Estimated Time |
|-------|----------------|
| 1. Project Setup | 2 hours |
| 2. Folder Structure | 1.5 hours |
| 3. App Layer | 2 hours |
| 4. Shared UI Components | 4 hours |
| 5. Entity Layer | 2 hours |
| 6. Features Layer | 4 hours |
| 7. Pages & Widgets | 3 hours |
| 8. MSW Implementation | 2 hours |
| 9. Testing | 2.5 hours |
| 10. Polish | 2 hours |
| 11. Deployment | 1 hour |
| **Total** | **~26 hours** |

## Key Differences from Original Plan

### Component Structure
- **Old**: Flat files in shared/ui/button.tsx
- **New**: Folders with Button/index.ts, Button.tsx, Button.module.css, Button.spec.ts, Button.stories.tsx

### API Layer
- **Old**: Scattered fetchers in features
- **New**: Unified apiInstance in shared/api

### Features
- **Old**: features/users/ui/AddUserDialog.tsx
- **New**: features/create-user/ui/CreateUserDialog/

### Entities
- **Old**: Mixed with features
- **New**: Separate entities/user/ with model and api

### Styles
- **Old**: shared/styles/
- **New**: app/styles/ and CSS Modules per component

### Assets
- **Old**: Unclear organization
- **New**: shared/fonts/ and shared/images/

## FSD Import Rules Checklist

Before committing any code, verify:
- [ ] No lower layer imports higher layer
- [ ] No cross-imports within same layer
- [ ] Pages don't import entities directly (use features)
- [ ] Shared layer has no app-specific imports
- [ ] All public APIs exported via index.ts

## Success Criteria

### Must Have
- ✅ All CRUD operations work
- ✅ Validation prevents invalid data
- ✅ Data persists in localStorage
- ✅ Mobile responsive (320px+)
- ✅ All component tests pass
- ✅ E2E test passes
- ✅ Storybook stories work
- ✅ Clean build, no errors
- ✅ Deploys to Vercel

### Code Quality
- ✅ All components follow structure
- ✅ CSS Modules used consistently
- ✅ FSD rules followed
- ✅ TypeScript strict mode
- ✅ Linter passes
- ✅ Properly formatted

### Nice to Have
- ⏳ 100% test coverage
- ⏳ Dark mode
- ⏳ Advanced filtering
- ⏳ CSV export