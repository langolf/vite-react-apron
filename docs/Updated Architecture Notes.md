---
title: Updated Architecture Notes
type: note
permalink: docs/updated-architecture-notes
---

# Updated Architecture Notes

## Project Structure Philosophy
**Simplified Feature-Sliced Design (FSD)** - A pragmatic approach to FSD focusing on clear separation of concerns without over-engineering.

## Directory Structure

```
src/
├── app/                          # Application layer
│   ├── providers/                # App-wide providers
│   │   ├── index.ts
│   │   ├── QueryProvider.tsx
│   │   └── Providers.tsx
│   ├── router/                   # Routing configuration
│   │   ├── index.ts
│   │   └── Router.tsx
│   ├── error-boundary/           # Global error boundary
│   │   ├── index.ts
│   │   └── ErrorBoundary.tsx
│   ├── msw/                      # Mock Service Worker setup
│   │   ├── browser.ts
│   │   ├── handlers.ts
│   │   └── storage.ts
│   ├── styles/                   # Global styles
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── index.tsx                 # App entry point
│
├── pages/                        # Pages layer (routes)
│   ├── users/
│   │   ├── ui/                   # Page-specific widgets
│   │   │   ├── UsersTable/
│   │   │   │   ├── index.ts
│   │   │   │   ├── UsersTable.tsx
│   │   │   │   └── UsersTable.module.css
│   │   │   ├── UsersHeader/
│   │   │   │   ├── index.ts
│   │   │   │   ├── UsersHeader.tsx
│   │   │   │   └── UsersHeader.module.css
│   │   │   └── UsersFooter/
│   │   │       ├── index.ts
│   │   │       ├── UsersFooter.tsx
│   │   │       └── UsersFooter.module.css
│   │   ├── index.ts
│   │   └── UsersPage.tsx
│   ├── not-found/
│   │   ├── index.ts
│   │   └── NotFoundPage.tsx
│   └── index.ts
│
├── features/                     # Features layer (user actions)
│   ├── create-user/
│   │   ├── ui/
│   │   │   ├── CreateUserDialog/
│   │   │   │   ├── index.ts
│   │   │   │   ├── CreateUserDialog.tsx
│   │   │   │   └── CreateUserDialog.module.css
│   │   │   └── CreateUserForm/
│   │   │       ├── index.ts
│   │   │       ├── CreateUserForm.tsx
│   │   │       └── CreateUserForm.module.css
│   │   ├── model/
│   │   │   ├── index.ts
│   │   │   └── useCreateUser.ts
│   │   └── index.ts
│   ├── edit-user/
│   │   ├── ui/
│   │   │   ├── EditUserDialog/
│   │   │   │   ├── index.ts
│   │   │   │   ├── EditUserDialog.tsx
│   │   │   │   └── EditUserDialog.module.css
│   │   │   └── EditUserForm/
│   │   │       ├── index.ts
│   │   │       ├── EditUserForm.tsx
│   │   │       └── EditUserForm.module.css
│   │   ├── model/
│   │   │   ├── index.ts
│   │   │   └── useUpdateUser.ts
│   │   └── index.ts
│   ├── delete-user/
│   │   ├── ui/
│   │   │   └── DeleteUserAlert/
│   │   │       ├── index.ts
│   │   │       ├── DeleteUserAlert.tsx
│   │   │       └── DeleteUserAlert.module.css
│   │   ├── model/
│   │   │   ├── index.ts
│   │   │   └── useDeleteUser.ts
│   │   └── index.ts
│   └── sort-users/
│       ├── lib/
│       │   ├── index.ts
│       │   └── sort.ts
│       ├── model/
│       │   ├── index.ts
│       │   └── useSortUsers.ts
│       └── index.ts
│
├── entities/                     # Entities layer (business entities)
│   └── user/
│       ├── model/
│       │   ├── index.ts
│       │   ├── schema.ts         # Zod schemas
│       │   └── types.ts          # TypeScript types
│       ├── api/
│       │   ├── index.ts
│       │   ├── queries.ts        # React Query hooks (read)
│       │   └── mutations.ts      # React Query mutations (write)
│       └── index.ts
│
└── shared/                       # Shared layer (reusable code)
    ├── api/                      # Unified API layer
    │   ├── index.ts
    │   ├── api.instance.ts       # Base fetch configuration
    │   ├── api.types.ts          # API types
    │   └── api.errors.ts         # Error handling
    ├── types/                    # Shared TypeScript types
    │   ├── index.ts
    │   └── common.ts
    ├── ui/                       # Reusable UI components
    │   ├── Button/
    │   │   ├── index.ts
    │   │   ├── Button.tsx
    │   │   ├── Button.module.css
    │   │   ├── Button.spec.ts
    │   │   ├── Button.stories.tsx
    │   │   └── assets/
    │   ├── Dialog/
    │   │   ├── index.ts
    │   │   ├── Dialog.tsx
    │   │   ├── Dialog.module.css
    │   │   ├── Dialog.spec.ts
    │   │   └── Dialog.stories.tsx
    │   ├── Input/
    │   │   ├── index.ts
    │   │   ├── Input.tsx
    │   │   ├── Input.module.css
    │   │   ├── Input.spec.ts
    │   │   └── Input.stories.tsx
    │   ├── Select/
    │   │   ├── index.ts
    │   │   ├── Select.tsx
    │   │   ├── Select.module.css
    │   │   ├── Select.spec.ts
    │   │   └── Select.stories.tsx
    │   ├── Table/
    │   │   ├── index.ts
    │   │   ├── Table.tsx
    │   │   ├── Table.module.css
    │   │   ├── Table.spec.ts
    │   │   └── Table.stories.tsx
    │   ├── Skeleton/
    │   │   ├── index.ts
    │   │   ├── Skeleton.tsx
    │   │   ├── Skeleton.module.css
    │   │   ├── Skeleton.spec.ts
    │   │   └── Skeleton.stories.tsx
    │   ├── AlertDialog/
    │   │   ├── index.ts
    │   │   ├── AlertDialog.tsx
    │   │   ├── AlertDialog.module.css
    │   │   ├── AlertDialog.spec.ts
    │   │   └── AlertDialog.stories.tsx
    │   └── Toast/
    │       ├── index.ts
    │       ├── Toast.tsx
    │       ├── Toast.module.css
    │       ├── Toast.spec.ts
    │       └── Toast.stories.tsx
    ├── lib/                      # Utility functions
    │   ├── index.ts
    │   ├── cn.ts                 # classnames utility
    │   ├── logger.ts
    │   └── validators.ts
    ├── hooks/                    # Shared React hooks
    │   ├── index.ts
    │   ├── useDebounce.ts
    │   └── useLocalStorage.ts
    ├── fonts/                    # Font files
    │   └── dm-sans/
    ├── images/                   # Shared images
    │   └── logo.svg
    └── config/                   # Configuration constants
        ├── index.ts
        └── constants.ts
```

## FSD Layers Explained

### 1. **app/** - Application Layer
- Initialization logic
- Global providers (React Query, Router)
- Global styles
- Error boundaries
- MSW setup

### 2. **pages/** - Pages Layer
- Route-level components
- Page composition from widgets
- Page-specific widgets in `ui/` subfolder
- No business logic (only composition)

### 3. **features/** - Features Layer
- User-facing actions/capabilities
- Each feature is a separate folder (e.g., `create-user`, `edit-user`)
- Contains UI and business logic for specific action
- Features are isolated and reusable

**Structure of a feature:**
```
features/feature-name/
├── ui/           # Feature UI components
├── model/        # Business logic (hooks, state)
├── lib/          # Feature-specific utilities (optional)
└── index.ts      # Public API
```

### 4. **entities/** - Entities Layer
- Business entities (User, Product, etc.)
- Data schemas and types
- API methods for CRUD operations
- React Query hooks

**Structure of an entity:**
```
entities/entity-name/
├── model/        # Schemas, types, domain logic
├── api/          # API methods, React Query hooks
└── index.ts      # Public API
```

### 5. **shared/** - Shared Layer
- Framework-agnostic code
- Reusable UI components
- Utilities and helpers
- API infrastructure
- Common types

## Component Structure (shared/ui)

Every component in `shared/ui/` follows this structure:

```
ComponentName/
├── index.ts                    # Barrel export
├── ComponentName.tsx           # Component implementation
├── ComponentName.module.css    # CSS Modules styles
├── ComponentName.spec.ts       # Vitest unit tests
├── ComponentName.stories.tsx   # Storybook stories
└── assets/                     # Component-specific assets
    └── icon.svg
```

### Example: Button Component

**index.ts**
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

**Button.tsx**
```typescript
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './Button.module.css';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      ghost: styles.ghost,
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Button.module.css**
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s;
  border-radius: var(--radius);
  cursor: pointer;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  opacity: 0.9;
}

.secondary {
  background: var(--color-muted);
  color: var(--color-fg);
}

.ghost {
  background: transparent;
  color: var(--color-fg);
}

.ghost:hover:not(:disabled) {
  background: var(--color-muted);
}

/* Sizes */
.sm {
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
}

.md {
  height: 40px;
  padding: 0 16px;
  font-size: 16px;
}

.lg {
  height: 48px;
  padding: 0 24px;
  font-size: 18px;
}
```

**Button.spec.ts**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

**Button.stories.tsx**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

## Unified API Layer (shared/api)

Inspired by [realworld-react-fsd](https://github.com/yurisldk/realworld-react-fsd/blob/master/src/shared/api/api.instance.ts)

### api.instance.ts
```typescript
import { z } from 'zod';

export interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: string[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiInstance {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.timeout
    );

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Request failed',
          response.status,
          errorData.errors
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }
      throw new ApiError('Network error', 0);
    }
  }

  async get<T, S extends z.ZodType>(
    endpoint: string,
    schema?: S
  ): Promise<z.infer<S>> {
    const data = await this.request<T>(endpoint, { method: 'GET' });
    return schema ? schema.parse(data) : data;
  }

  async post<T, S extends z.ZodType>(
    endpoint: string,
    body: unknown,
    schema?: S
  ): Promise<z.infer<S>> {
    const data = await this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return schema ? schema.parse(data) : data;
  }

  async put<T, S extends z.ZodType>(
    endpoint: string,
    body: unknown,
    schema?: S
  ): Promise<z.infer<S>> {
    const data = await this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return schema ? schema.parse(data) : data;
  }

  async delete<T, S extends z.ZodType>(
    endpoint: string,
    schema?: S
  ): Promise<z.infer<S>> {
    const data = await this.request<T>(endpoint, { method: 'DELETE' });
    return schema ? schema.parse(data) : data;
  }
}

export const apiInstance = new ApiInstance({
  baseURL: '/api',
});
```

### api.types.ts
```typescript
export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### api.errors.ts
```typescript
import { ApiError } from './api.instance';

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.errors && error.errors.length > 0) {
      return error.errors.join(', ');
    }
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
```

## Entity Layer: User

### entities/user/model/schema.ts
```typescript
import { z } from 'zod';

export const CountryEnum = z.enum([
  'UK',
  'Ireland',
  'US',
  'France',
  'Germany',
  // ... all countries
]);

const userBaseSchema = z
  .object({
    firstName: z.string().min(5).max(20),
    lastName: z.string().min(5).max(20),
    age: z.number().int().positive(),
    country: CountryEnum,
  })
  .refine(
    (data) => {
      const minAge =
        ['UK', 'Ireland'].includes(data.country) ? 25 :
        data.country === 'US' ? 21 : 18;
      return data.age >= minAge;
    },
    (data) => ({
      message: `Must be at least ${
        ['UK', 'Ireland'].includes(data.country) ? 25 :
        data.country === 'US' ? 21 : 18
      } years old for ${data.country}`,
      path: ['age'],
    })
  );

export const userSchema = userBaseSchema.extend({
  id: z.string().uuid(),
});

export const userCreateSchema = userBaseSchema;

export const userUpdateSchema = userBaseSchema.partial();

export const usersArraySchema = z.array(userSchema);
```

### entities/user/model/types.ts
```typescript
import { z } from 'zod';
import { userSchema, userCreateSchema, userUpdateSchema } from './schema';

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type Country = User['country'];
```

### entities/user/api/queries.ts
```typescript
import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@/shared/api';
import { usersArraySchema } from '../model/schema';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: unknown) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => apiInstance.get('/users', usersArraySchema),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
```

### entities/user/api/mutations.ts
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiInstance } from '@/shared/api';
import { userSchema } from '../model/schema';
import type { User, UserCreate, UserUpdate } from '../model/types';
import { userKeys } from './queries';

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserCreate) =>
      apiInstance.post('/users', data, userSchema),
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });
      const previousUsers = queryClient.getQueryData(userKeys.lists());

      queryClient.setQueryData(userKeys.lists(), (old: User[] = []) => [
        ...old,
        { ...newUser, id: `temp-${Date.now()}` } as User,
      ]);

      return { previousUsers };
    },
    onError: (err, newUser, context) => {
      queryClient.setQueryData(userKeys.lists(), context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdate }) =>
      apiInstance.put(`/users/${id}`, data, userSchema),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });
      const previousUsers = queryClient.getQueryData(userKeys.lists());

      queryClient.setQueryData(userKeys.lists(), (old: User[] = []) =>
        old.map((user) =>
          user.id === id ? { ...user, ...data } : user
        )
      );

      return { previousUsers };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(userKeys.lists(), context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiInstance.delete(`/users/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });
      const previousUsers = queryClient.getQueryData(userKeys.lists());

      queryClient.setQueryData(userKeys.lists(), (old: User[] = []) =>
        old.filter((user) => user.id !== id)
      );

      return { previousUsers };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(userKeys.lists(), context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
```

## Feature Layer Examples

### features/create-user/

**features/create-user/model/useCreateUser.ts**
```typescript
import { useCreateUserMutation } from '@/entities/user';
import { toast } from '@/shared/ui/Toast';
import type { UserCreate } from '@/entities/user';

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
    isError: mutation.isError,
    error: mutation.error,
  };
};
```

**features/create-user/ui/CreateUserDialog/CreateUserDialog.tsx**
```typescript
import { useState } from 'react';
import { Dialog } from '@/shared/ui/Dialog';
import { CreateUserForm } from '../CreateUserForm';
import { useCreateUser } from '../../model/useCreateUser';
import styles from './CreateUserDialog.module.css';

interface CreateUserDialogProps {
  trigger: React.ReactNode;
}

export const CreateUserDialog = ({ trigger }: CreateUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const { createUser, isLoading } = useCreateUser(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen} trigger={trigger}>
      <div className={styles.content}>
        <h2 className={styles.title}>Add user</h2>
        <CreateUserForm onSubmit={createUser} isLoading={isLoading} />
      </div>
    </Dialog>
  );
};
```

## Pages Layer with Widgets

### pages/users/ui/UsersTable/

**UsersTable.tsx**
```typescript
import { Table } from '@/shared/ui/Table';
import { Button } from '@/shared/ui/Button';
import { EditUserDialog } from '@/features/edit-user';
import { DeleteUserAlert } from '@/features/delete-user';
import type { User } from '@/entities/user';
import styles from './UsersTable.module.css';

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

export const UsersTable = ({ users, isLoading }: UsersTableProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>Country</Table.Head>
            <Table.Head>First Name</Table.Head>
            <Table.Head>Last Name</Table.Head>
            <Table.Head>Age</Table.Head>
            <Table.Head>Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.country}</Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
              <Table.Cell>
                <div className={styles.actions}>
                  <EditUserDialog user={user} />
                  <DeleteUserAlert user={user} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
```

## Import Rules (FSD)

**Strict layer dependency rules:**

1. ✅ `shared` can import: nothing (framework only)
2. ✅ `entities` can import: `shared`
3. ✅ `features` can import: `shared`, `entities`
4. ✅ `pages` can import: `shared`, `entities`, `features`
5. ✅ `app` can import: all layers

**Forbidden:**
- ❌ Lower layers importing higher layers
- ❌ Cross-imports within same layer (features/A → features/B)
- ❌ Direct entity imports in pages (should use features)

## Benefits of This Architecture

1. **Clear Component Structure**: Every component follows the same pattern
2. **Testable**: Each component has its own test file
3. **Documentable**: Storybook stories for each component
4. **Maintainable**: CSS Modules prevent style conflicts
5. **Scalable**: Unified API layer, clear separation of concerns
6. **Type-Safe**: Zod schemas + TypeScript throughout
7. **Predictable**: FSD rules prevent spaghetti code

## Migration from Original Plan

Key changes:
- Component structure standardized (index + component + CSS + tests + stories)
- API layer unified in `shared/api`
- User entity extracted to `entities/user`
- Features are action-based (`create-user`, not `users/ui/AddUserDialog`)
- Widgets live in `pages/*/ui/`
- Global styles in `app/styles/`
- Assets organized in `shared/fonts` and `shared/images`