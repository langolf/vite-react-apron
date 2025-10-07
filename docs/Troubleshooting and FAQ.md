---
title: Troubleshooting and FAQ
type: note
permalink: docs/troubleshooting-and-faq
---

# Troubleshooting & FAQ

Common issues and solutions for the ApronReact project.

---

## 🔧 Setup Issues

### Issue: `yarn install` fails with peer dependency errors

**Symptoms:**
```
error "package-name@version" has incorrect peer dependency "react@^17.0.0"
```

**Solution:**
```bash
# Use --legacy-peer-deps flag
yarn install --legacy-peer-deps

# Or update yarn to latest version
npm install -g yarn@latest
```

---

### Issue: Path alias `@/` not working

**Symptoms:**
```
Cannot find module '@/shared/ui/Button'
```

**Solutions:**

1. **Check tsconfig.json**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. **Check vite.config.ts**:
```typescript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

3. **Restart dev server and VS Code**

---

### Issue: TypeScript errors in `.tsx` files

**Symptoms:**
```
JSX element implicitly has type 'any'
```

**Solution:**

Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

---

## 🎨 Styling Issues

### Issue: CSS Modules not working

**Symptoms:**
- Styles not applying
- `styles` object is undefined

**Solutions:**

1. **Check file naming**: Must be `*.module.css`
```
✅ Button.module.css
❌ Button.css
```

2. **Check import**:
```typescript
import styles from './Button.module.css';
```

3. **Add type declaration** in `src/vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

---

### Issue: Tailwind classes not working

**Symptoms:**
- Utility classes have no effect

**Solution:**

1. **Check `tailwind.config.js` content paths**:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

2. **Ensure Tailwind directives in CSS**:
```css
/* src/app/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Import CSS in main.tsx**:
```typescript
import './app/styles/globals.css';
```

---

### Issue: CSS custom properties not working

**Symptoms:**
- `var(--color-primary)` not applying

**Solution:**

1. **Ensure theme.css is imported**:
```typescript
// src/main.tsx
import './app/styles/theme.css';
```

2. **Check CSS variable definition**:
```css
:root {
  --color-primary: #3b82f6;
}
```

3. **Use correct syntax**:
```css
.button {
  background: var(--color-primary);
}
```

---

## 🔄 MSW Issues

### Issue: MSW not intercepting requests

**Symptoms:**
- 404 errors for `/api/*` requests
- Data not loading

**Solutions:**

1. **Check MSW is started in main.tsx**:
```typescript
async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./app/msw/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  // Render app
});
```

2. **Check browser console** for MSW start message:
```
[MSW] Mocking enabled.
```

3. **Verify handler URLs match exactly**:
```typescript
// ✅ Correct
http.get('/api/users', ...)

// ❌ Wrong
http.get('/users', ...)
```

4. **Check Network tab** - should see `(ServiceWorker)` in Size column

---

### Issue: MSW handlers not updating after changes

**Symptoms:**
- Old data still appears after changing seed data

**Solution:**

1. **Clear localStorage**:
```javascript
// In browser console
localStorage.clear();
```

2. **Hard refresh**: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

3. **Restart dev server**

---

### Issue: localStorage quota exceeded

**Symptoms:**
```
QuotaExceededError: Failed to execute 'setItem' on 'Storage'
```

**Solution:**

1. **Clear localStorage**:
```javascript
localStorage.clear();
```

2. **Implement in-memory fallback** (already in architecture):
```typescript
try {
  localStorage.setItem('users', JSON.stringify(users));
} catch (error) {
  console.warn('localStorage unavailable, using in-memory storage');
  // Fallback to Map
}
```

---

## ⚛️ React Query Issues

### Issue: Query not refetching

**Symptoms:**
- Stale data showing
- Updates not reflecting

**Solutions:**

1. **Check staleTime configuration**:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

2. **Manual invalidation**:
```typescript
queryClient.invalidateQueries({ queryKey: ['users'] });
```

3. **Check React Query DevTools**:
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

### Issue: Optimistic update not rolling back on error

**Symptoms:**
- UI shows success even when mutation fails

**Solution:**

Ensure `onError` is implemented:
```typescript
useMutation({
  mutationFn: createUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ['users'] });
    const previousUsers = queryClient.getQueryData(['users']);
    
    queryClient.setQueryData(['users'], (old) => [...old, newUser]);
    
    return { previousUsers }; // ⚠️ Must return context
  },
  onError: (err, newUser, context) => {
    // ⚠️ Must rollback using context
    queryClient.setQueryData(['users'], context?.previousUsers);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

---

## 📝 Form Issues

### Issue: React Hook Form validation not working

**Symptoms:**
- Form submits invalid data
- No error messages showing

**Solutions:**

1. **Check zodResolver is used**:
```typescript
const form = useForm({
  resolver: zodResolver(schema), // ⚠️ Required
});
```

2. **Check validation mode**:
```typescript
const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onChange', // or 'onBlur', 'onSubmit'
});
```

3. **Display errors**:
```typescript
{form.formState.errors.firstName && (
  <span>{form.formState.errors.firstName.message}</span>
)}
```

---

### Issue: Form values not updating

**Symptoms:**
- Input changes don't register
- Form values always empty

**Solution:**

Ensure `register` is used correctly:
```typescript
// ✅ Correct
<input {...form.register('firstName')} />

// ❌ Wrong
<input name="firstName" />
```

For controlled components:
```typescript
import { Controller } from 'react-hook-form';

<Controller
  name="country"
  control={form.control}
  render={({ field }) => (
    <Select {...field} />
  )}
/>
```

---

### Issue: Age input accepts decimals

**Symptoms:**
- User can enter 25.5 for age

**Solution:**

Use `valueAsNumber` with `step="1"`:
```typescript
<input
  type="number"
  step="1"
  {...form.register('age', { valueAsNumber: true })}
/>
```

---

## 🧪 Testing Issues

### Issue: Vitest tests failing with "Cannot find module"

**Symptoms:**
```
Error: Cannot find module '@/shared/ui/Button'
```

**Solution:**

Ensure `vitest.config.ts` has path alias:
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

### Issue: `@testing-library/jest-dom` matchers not working

**Symptoms:**
```
Property 'toBeInTheDocument' does not exist
```

**Solution:**

1. **Create test setup file** `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
```

2. **Configure in vitest.config.ts**:
```typescript
export default defineConfig({
  test: {
    setupFiles: './src/test/setup.ts',
  },
});
```

---

### Issue: Playwright tests timing out

**Symptoms:**
```
Test timeout of 30000ms exceeded
```

**Solutions:**

1. **Increase timeout**:
```typescript
test('long test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
});
```

2. **Wait for specific conditions**:
```typescript
// ❌ Wrong
await page.waitForTimeout(5000);

// ✅ Correct
await page.waitForSelector('button');
await page.waitForLoadState('networkidle');
```

3. **Check MSW is running** in test environment

---

### Issue: Playwright can't find elements

**Symptoms:**
```
Selector "button" did not match any elements
```

**Solutions:**

1. **Use more specific selectors**:
```typescript
// Better selectors
await page.getByRole('button', { name: 'Add user' });
await page.getByTestId('user-table');
await page.getByLabel('First Name');
```

2. **Wait for element**:
```typescript
await page.waitForSelector('button:has-text("Add user")');
```

3. **Check selector in Playwright Inspector**:
```bash
yarn test:e2e --debug
```

---

## 📦 Build Issues

### Issue: Build failing with TypeScript errors

**Symptoms:**
```
error TS2304: Cannot find name 'xxx'
```

**Solution:**

1. **Run type check**:
```bash
yarn type-check
```

2. **Fix errors incrementally**

3. **Check for missing types**:
```bash
yarn add -D @types/node
```

---

### Issue: Build bundle too large

**Symptoms:**
- Build size > 500KB
- Slow page loads

**Solutions:**

1. **Analyze bundle**:
```bash
yarn build --mode analyze
```

2. **Lazy load routes**:
```typescript
import { lazy } from 'react';

const UsersPage = lazy(() => import('@/pages/users'));
```

3. **Check for duplicate dependencies**:
```bash
yarn dedupe
```

---

## 🚀 Deployment Issues

### Issue: Vercel deployment fails

**Symptoms:**
- Build succeeds locally but fails on Vercel

**Solutions:**

1. **Check Node version** matches locally:
```json
// package.json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. **Check build command** in Vercel settings:
```
yarn build
```

3. **Check output directory**: `dist`

4. **Verify vercel.json** exists with SPA rewrites

---

### Issue: Routes return 404 on refresh

**Symptoms:**
- Direct navigation to `/users` returns 404
- Works when navigating from home page

**Solution:**

Ensure `vercel.json` has rewrites:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Issue: Environment variables not working in production

**Symptoms:**
- `import.meta.env.VITE_API_URL` is undefined

**Solution:**

1. **Prefix with `VITE_`**:
```
VITE_API_URL=https://api.example.com
```

2. **Add to Vercel environment variables**

3. **Rebuild after adding**

---

## 🎨 Storybook Issues

### Issue: Storybook not starting

**Symptoms:**
```
Error: Cannot find module '@storybook/react-vite'
```

**Solution:**

```bash
# Reinstall Storybook
yarn add -D @storybook/react-vite storybook
```

---

### Issue: Stories not loading styles

**Symptoms:**
- Components appear unstyled in Storybook

**Solution:**

Import styles in `.storybook/preview.ts`:
```typescript
import '../src/app/styles/globals.css';
import '../src/app/styles/theme.css';
```

---

## 💡 Performance Issues

### Issue: App is slow/laggy

**Symptoms:**
- Slow renders
- UI feels sluggish

**Solutions:**

1. **Check React DevTools Profiler**

2. **Memoize expensive computations**:
```typescript
const sortedUsers = useMemo(
  () => sortUsers(users, sortConfig),
  [users, sortConfig]
);
```

3. **Memoize components**:
```typescript
export const UserRow = memo(({ user }) => {
  // ...
});
```

4. **Virtualize long lists** (if > 100 items):
```bash
yarn add react-virtual
```

---

## 📱 Mobile Issues

### Issue: Table not scrolling horizontally on mobile

**Symptoms:**
- Table is cut off on mobile
- Can't see all columns

**Solution:**

Wrap table in scroll container:
```typescript
<div className={styles.tableContainer}>
  <Table className={styles.table} />
</div>
```

```css
.tableContainer {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
}

.table {
  min-width: 640px; /* Minimum table width */
}
```

---

### Issue: Dialog too large on mobile

**Symptoms:**
- Dialog doesn't fit screen
- Can't see all content

**Solution:**

Make dialog responsive:
```css
.dialog {
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
}

@media (min-width: 640px) {
  .dialog {
    max-width: 500px;
  }
}
```

---

## 🔍 Debugging Tips

### Enable React Query DevTools

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Check MSW in Browser

Open DevTools → Application → Service Workers
- Should see worker active
- Check "Update on reload" for development

### Inspect localStorage

```javascript
// Browser console
console.log(localStorage.getItem('users'));

// Pretty print
console.log(JSON.parse(localStorage.getItem('users') || '[]'));
```

### TypeScript Type Debugging

```typescript
// See inferred type
type UserType = typeof user;
//   ^? Hover to see type

// Assert expected type
const user: User = data;
```

---

## 🆘 Still Stuck?

1. **Check documentation**:
   - [[Updated Architecture Notes]]
   - [[Quick Reference Guide]]
   - [[Configuration Templates]]

2. **Review examples** in Storybook

3. **Check browser console** for errors

4. **Check Network tab** for failed requests

5. **Enable verbose logging**:
   ```typescript
   console.log('Debug:', { users, isLoading, error });
   ```

6. **Try minimal reproduction**:
   - Create new component with minimal code
   - Gradually add complexity until issue reproduces

---

## 📚 Useful Commands for Debugging

```bash
# Clear all caches
rm -rf node_modules dist .vite coverage
yarn install

# Check dependency issues
yarn why <package-name>

# Update dependencies
yarn upgrade-interactive

# Check for security issues
yarn audit

# Generate bundle analysis
yarn build --mode analyze

# Run tests with verbose output
yarn test --reporter=verbose

# Run single test file
yarn test src/path/to/test.spec.ts

# Run E2E in debug mode
yarn test:e2e --debug
```