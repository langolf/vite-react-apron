# Copilot Instructions for vite-react-apron

## Architecture Overview

This project uses **Simplified Feature-Sliced Design (FSD)** - a React + TypeScript codebase with strict layer hierarchy and component organization patterns.

### Layer Hierarchy & Import Rules
```
app/          ← Application layer (React Query, routing, MSW)
  ↓
pages/        ← Route composition from widgets
  ↓
features/     ← User-facing actions (create-user, update-user, delete-user)
  ↓
entities/     ← Business entities (currently just user data)
  ↓
shared/       ← Framework-agnostic UI components, API layer, utilities
```

**Critical Import Rules:**
- `shared/` cannot import from any other layer
- `features/` cannot import from other `features/` (use `entities/` for shared data)
- `pages/` should import from `features/`, not directly from `entities/`

## Key Patterns

### 1. Compound Component Pattern (Form)
Forms use compound pattern with all sub-components as properties:
```tsx
<Form form={form} onSubmit={handleSubmit}>
  <Form.Field name="username" render={({ field }) => (
    <Form.Item>
      <Form.Label>Username</Form.Label>
      <Form.Control><Input {...field} /></Form.Control>
      <Form.Message />
    </Form.Item>
  )} />
</Form>
```

### 2. Component Structure (shared/ui)
Every component follows this exact structure:
```
ComponentName/
├── index.ts          ← Public API exports
├── ComponentName.tsx ← Main implementation
├── ComponentName.stories.tsx ← Storybook stories
└── types.ts          ← Component-specific types (if needed)
```

### 3. Feature Structure
Features represent user actions, not entities:
```
features/action-name/
├── ui/ComponentName/  ← Feature UI components
├── api/              ← Feature-specific mutations/queries
└── index.ts          ← Public API
```

### 4. API Layer (shared/api)
Unified API using contract-first design with Zod validation:
- `api.contracts.ts` - Zod schemas defining contracts
- `api.services.ts` - Axios-based service functions
- `api.query-keys.ts` - React Query keys and hooks
- `api.lib.ts` - Response parsing with `responseContract()`

### 5. React Query Patterns
- Use `userKeys` factory for consistent query keys
- Optimistic updates in mutations with automatic rollback
- `queryClient.cancelQueries()` before optimistic updates

## Development Workflow

### Essential Commands
```bash
npm run dev          # Development server (port 5173)
npm run storybook    # Component development (port 6006)
npm run test:e2e     # Playwright tests
npm run test:e2e:ui  # Playwright UI mode
npm run tsc          # Type checking
npm run lint         # ESLint
npm run format       # Prettier formatting
```

### Component Creation Workflow
1. Create folder in appropriate layer (`shared/ui/`, `features/action-name/ui/`)
2. Always include: `index.ts`, `Component.tsx`, `Component.stories.tsx`
3. Use `tv()` from tailwind-variants for styling variants
4. Export through barrel exports in `index.ts`

### Form Development
- Always use React Hook Form + Zod validation via `zodResolver`
- Use compound pattern: `Form.Field`, `Form.Item`, `Form.Label`, `Form.Control`, `Form.Message`
- Validation schemas in `shared/api/api.contracts.ts`

## Technology Stack

### Core
- **React 19** + TypeScript + Vite
- **React Router 7** for routing
- **Tailwind CSS 4** + tailwind-variants for styling
- **React Hook Form** + Zod for forms
- **React Query** for server state

### UI & Testing
- **Radix UI** for accessible primitives
- **MSW** for API mocking
- **Playwright** for e2e testing
- **Storybook** for component development

### Key Dependencies
- `@radix-ui/*` - Accessible UI primitives
- `tailwind-variants` - Component variants
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client with contract validation

## Project-Specific Conventions

### File Naming
- Components: PascalCase (`CreateUserDialog.tsx`)
- Files: kebab-case for non-components (`api.contracts.ts`)
- Folders: kebab-case (`create-user/`, `alert-dialog/`)

### API Contracts
All API interactions use Zod schemas from `api.contracts.ts`:
```tsx
const response = await createUser(data);
const validatedData = CreateUserSchema.parse(response.data);
```

### MSW Integration
- Handlers in `src/app/msw/handlers.ts`
- Repository pattern for mock data storage
- Automatically validates requests/responses using Zod schemas

## Debugging & Troubleshooting

### Common Issues
- **Import errors**: Check FSD layer hierarchy rules
- **Form validation**: Ensure Zod schema matches form fields exactly
- **MSW not working**: Check if browser MSW is started in `src/app/msw/browser.ts`
- **Type errors**: Run `npm run tsc` for detailed TypeScript diagnostics

### Development Tools
- React Query DevTools enabled in development
- MSW request logging in browser console
- Storybook for isolated component development
- Playwright test reports in `playwright-report/`

## Critical Files to Understand
- `src/app/routes.ts` - Route configuration with nested dialogs
- `src/shared/api/api.contracts.ts` - All API schemas and types
- `src/shared/ui/form/form.tsx` - Compound form pattern implementation
- `src/app/msw/handlers.ts` - API mocking with validation
- `docs/Architecture Changes Summary.md` - Detailed architecture decisions
