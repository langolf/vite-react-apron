---
title: Quick Reference Guide
type: note
permalink: docs/quick-reference-guide
---

# Quick Reference Guide

A quick reference for common patterns and conventions in the ApronReact project.

---

## 🚀 Getting Started Commands

```bash
# Install dependencies
yarn install

# Start development server (with MSW)
yarn dev

# Run tests
yarn test              # Vitest unit tests
yarn test:e2e          # Playwright E2E tests

# Code quality
yarn lint              # ESLint
yarn format            # Prettier
yarn type-check        # TypeScript

# Build & deploy
yarn build             # Production build
yarn preview           # Preview production build
yarn storybook         # Start Storybook

# Storybook
yarn storybook         # Start dev server
yarn build-storybook   # Build static site
```

---

## 📁 Where Does It Go?

| What | Where | Example |
|------|-------|---------|
| Reusable UI component | `shared/ui/ComponentName/` | Button, Dialog |
| API client logic | `shared/api/` | api.instance.ts |
| Global utilities | `shared/lib/` | cn.ts, logger.ts |
| Custom hooks | `shared/hooks/` | useDebounce.ts |
| TypeScript types | `shared/types/` | common.ts |
| Business entity | `entities/entity-name/` | entities/user/ |
| Zod schemas | `entities/entity-name/model/` | schema.ts, types.ts |
| React Query hooks | `entities/entity-name/api/` | queries.ts, mutations.ts |
| User action feature | `features/action-name/` | create-user/ |
| Feature UI | `features/action-name/ui/` | CreateUserDialog/ |
| Feature logic | `features/action-name/model/` | useCreateUser.ts |
| Page component | `pages/page-name/` | users/ |
| Page widget | `pages/page-name/ui/` | UsersTable/ |
| Global styles | `app/styles/` | globals.css |
| Providers | `app/providers/` | QueryProvider.tsx |
| Fonts | `shared/fonts/` | dm-sans/ |
| Images | `shared/images/` | logo.svg |

---

## 🧩 Component Structure Template

Every component in `shared/ui/` follows this structure:

```
ComponentName/
├── index.ts                    # Barrel export
├── ComponentName.tsx           # Implementation
├── ComponentName.module.css    # Styles
├── ComponentName.spec.ts       # Tests
├── ComponentName.stories.tsx   # Storybook
└── assets/                     # Component assets (optional)
```

### index.ts Template
```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### Component.tsx Template
```typescript
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './ComponentName.module.css';

const componentVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

export const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={componentVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </element>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Component.module.css Template
```css
.base {
  /* Base styles */
}

/* Variants */
.primary {
  /* Primary variant */
}

.secondary {
  /* Secondary variant */
}

/* Sizes */
.sm {
  /* Small size */
}

.md {
  /* Medium size */
}

.lg {
  /* Large size */
}
```

### Component.spec.ts Template
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders children', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant className', () => {
    render(<ComponentName variant="primary">Test</ComponentName>);
    const element = screen.getByText('Test');
    expect(element.className).toContain('primary');
  });
  
  // More tests...
});
```

### Component.stories.tsx Template
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Shared/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Component Name',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Component Name',
  },
};
```

---

## 🎨 CSS Modules Pattern

### Using CSS Modules
```typescript
import styles from './Component.module.css';

// Single class
<div className={styles.container}>

// Multiple classes
<div className={`${styles.container} ${styles.active}`}>

// With cn() utility (recommended)
import { cn } from '@/shared/lib';
<div className={cn(styles.container, isActive && styles.active)}>
```

### CSS Custom Properties
```css
/* Define in app/styles/theme.css */
:root {
  --color-primary: #3b82f6;
  --color-bg: #ffffff;
  --color-fg: #000000;
  --radius: 8px;
}

/* Use in component CSS */
.button {
  background: var(--color-primary);
  border-radius: var(--radius);
}
```

---

## 🔄 Import Patterns

### Always Use Barrel Exports
```typescript
// ❌ Bad - Direct file import
import { Button } from '@/shared/ui/Button/Button';

// ✅ Good - Barrel export
import { Button } from '@/shared/ui/Button';
```

### Path Aliases
```typescript
import { Button } from '@/shared/ui/Button';
import { useUsers } from '@/entities/user';
import { CreateUserDialog } from '@/features/create-user';
import { UsersPage } from '@/pages/users';
```

### Import Order Convention
```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party imports
import { useQuery } from '@tanstack/react-query';

// 3. Shared layer imports
import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib';

// 4. Entity imports
import { useUsers } from '@/entities/user';

// 5. Feature imports
import { CreateUserDialog } from '@/features/create-user';

// 6. Relative imports (same layer)
import { UsersTable } from './ui/UsersTable';
import styles from './UsersPage.module.css';

// 7. Type imports (last)
import type { User } from '@/entities/user';
```

---

## 🗄️ Data Fetching Patterns

### Using Unified API Instance
```typescript
// In entities/user/api/queries.ts
import { apiInstance } from '@/shared/api';
import { usersArraySchema } from '../model/schema';

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => apiInstance.get('/users', usersArraySchema),
  });
};
```

### Mutations with Optimistic Updates
```typescript
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreate) =>
      apiInstance.post('/users', data, userSchema),
      
    onMutate: async (newUser) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });
      
      // Snapshot
      const previousUsers = queryClient.getQueryData(userKeys.lists());
      
      // Optimistic update
      queryClient.setQueryData(userKeys.lists(), (old: User[] = []) => [
        ...old,
        { ...newUser, id: `temp-${Date.now()}` },
      ]);
      
      return { previousUsers };
    },
    
    onError: (err, newUser, context) => {
      // Rollback
      queryClient.setQueryData(userKeys.lists(), context?.previousUsers);
    },
    
    onSettled: () => {
      // Refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
```

---

## 📋 Zod Schema Patterns

### Basic Schema
```typescript
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(5).max(20),
  lastName: z.string().min(5).max(20),
  age: z.number().int().positive(),
  country: z.enum(['UK', 'US', 'France']),
});
```

### Schema with Refinement
```typescript
const userBaseSchema = z
  .object({
    firstName: z.string().min(5).max(20),
    lastName: z.string().min(5).max(20),
    age: z.number().int().positive(),
    country: CountryEnum,
  })
  .refine(
    (data) => {
      const minAge = data.country === 'UK' ? 25 : 18;
      return data.age >= minAge;
    },
    {
      message: 'Age does not meet minimum for country',
      path: ['age'],
    }
  );
```

### Deriving Types
```typescript
export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
```

---

## 🎯 Feature Structure Pattern

```
features/action-name/
├── ui/
│   ├── ComponentA/
│   │   ├── index.ts
│   │   ├── ComponentA.tsx
│   │   └── ComponentA.module.css
│   └── ComponentB/
│       ├── index.ts
│       ├── ComponentB.tsx
│       └── ComponentB.module.css
├── model/
│   ├── index.ts
│   └── useFeature.ts
├── lib/                        # Optional
│   ├── index.ts
│   └── helpers.ts
└── index.ts
```

### Feature Hook Pattern
```typescript
// features/create-user/model/useCreateUser.ts
import { useCreateUserMutation } from '@/entities/user';
import { toast } from '@/shared/ui/Toast';

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

  return {
    createUser,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
```

---

## 📄 Page Pattern

### Page Composition
```typescript
// pages/users/UsersPage.tsx
import { useUsers } from '@/entities/user';
import { UsersHeader } from './ui/UsersHeader';
import { UsersTable } from './ui/UsersTable';
import { UsersFooter } from './ui/UsersFooter';
import styles from './UsersPage.module.css';

export const UsersPage = () => {
  const { data: users, isLoading, error } = useUsers();

  if (error) {
    return <div>Error loading users</div>;
  }

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

### Widget Pattern (in pages/*/ui/)
```typescript
// pages/users/ui/UsersTable/UsersTable.tsx
import { Table } from '@/shared/ui/Table';
import { EditUserDialog } from '@/features/edit-user';
import { DeleteUserAlert } from '@/features/delete-user';
import type { User } from '@/entities/user';
import styles from './UsersTable.module.css';

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

export const UsersTable = ({ users, isLoading }: UsersTableProps) => {
  // Widget logic here
  return (
    <div className={styles.container}>
      {/* Table implementation */}
    </div>
  );
};
```

---

## 🧪 Testing Patterns

### Component Test Pattern
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### E2E Test Pattern
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('user flow', async ({ page }) => {
    // Arrange
    await page.click('button:has-text("Action")');
    
    // Act
    await page.fill('[name="field"]', 'value');
    await page.click('button:has-text("Submit")');
    
    // Assert
    await expect(page.locator('.success')).toBeVisible();
  });
});
```

---

## 🔧 Common Utilities

### cn() - ClassNames Utility
```typescript
import { cn } from '@/shared/lib';

// Conditional classes
<div className={cn(
  styles.base,
  isActive && styles.active,
  isDisabled && styles.disabled
)} />

// Multiple class arrays
<div className={cn(styles.button, styles.primary, className)} />
```

### React Hook Form + Zod
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userCreateSchema } from '@/entities/user';

const form = useForm({
  resolver: zodResolver(userCreateSchema),
  defaultValues: {
    firstName: '',
    lastName: '',
    age: 18,
    country: 'UK',
  },
  mode: 'onChange',
});

// In JSX
<input
  {...form.register('firstName')}
  aria-invalid={!!form.formState.errors.firstName}
/>
{form.formState.errors.firstName && (
  <span>{form.formState.errors.firstName.message}</span>
)}
```

---

## 🎭 MSW Handler Pattern

```typescript
import { http, HttpResponse } from 'msw';
import { userCreateSchema, userSchema } from '@/entities/user';

export const handlers = [
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    
    // Validate request
    const result = userCreateSchema.safeParse(body);
    
    if (!result.success) {
      return HttpResponse.json(
        { errors: result.error.issues.map(i => i.message) },
        { status: 400 }
      );
    }
    
    // Process
    const newUser = storage.create(result.data);
    
    // Validate response
    const validatedUser = userSchema.parse(newUser);
    
    return HttpResponse.json(validatedUser, { status: 201 });
  }),
];
```

---

## 📦 Barrel Export Pattern

### Feature Index
```typescript
// features/create-user/index.ts
export { CreateUserDialog } from './ui/CreateUserDialog';
export { useCreateUser } from './model/useCreateUser';
```

### Entity Index
```typescript
// entities/user/index.ts
export * from './model/types';
export * from './model/schema';
export * from './api/queries';
export * from './api/mutations';
```

### Component Index
```typescript
// shared/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Don't
```typescript
// Direct imports
import { Button } from '@/shared/ui/Button/Button.tsx';

// Cross-feature imports
import { EditDialog } from '@/features/edit-user';

// Pages importing entities
import { useUsers } from '@/entities/user';

// Business logic in pages
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const createUser = async () => { /* logic */ };
};
```

### ✅ Do
```typescript
// Barrel exports
import { Button } from '@/shared/ui/Button';

// Use shared entities
import { User } from '@/entities/user';

// Pages use features
import { CreateUserDialog } from '@/features/create-user';

// Logic in features
const UsersPage = () => {
  const { users } = useUsers();
};
```

---

## 🎯 Quick Wins

### Add New Component
1. Create folder: `shared/ui/NewComponent/`
2. Add files: index.ts, NewComponent.tsx, .module.css, .spec.ts, .stories.tsx
3. Implement component
4. Export via index.ts
5. Test in Storybook

### Add New Feature
1. Create folder: `features/new-action/`
2. Add ui/ and model/ folders
3. Create UI components in ui/
4. Create hook in model/
5. Export via index.ts
6. Use in page

### Add New Entity
1. Create folder: `entities/new-entity/`
2. Define schemas in model/schema.ts
3. Export types in model/types.ts
4. Create React Query hooks in api/
5. Export via index.ts

---

**Need more details? Check the full documentation:**
- [[Updated Architecture Notes]]
- [[Updated Development Tasks and Roadmap]]
- [[Architecture Changes Summary]]