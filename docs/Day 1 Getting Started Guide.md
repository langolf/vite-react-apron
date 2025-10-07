---
title: Day 1 Getting Started Guide
type: note
permalink: docs/day-1-getting-started-guide
---

# Day 1 Getting Started Guide

A step-by-step walkthrough to get started with ApronReact development.

---

## 🎯 Goal

By the end of this guide, you'll have:
- ✅ Project initialized and running
- ✅ All dependencies installed
- ✅ Development environment configured
- ✅ Basic folder structure created
- ✅ First component running

**Estimated Time**: 30-45 minutes

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js LTS installed (v18 or higher)
  ```bash
  node --version  # Should be v18.x.x or higher
  ```

- [ ] Yarn installed
  ```bash
  yarn --version  # Should be 1.22.x or higher
  ```

- [ ] Git installed
  ```bash
  git --version
  ```

- [ ] Code editor (VS Code recommended)

- [ ] Terminal/Command line access

---

## 🚀 Step-by-Step Setup

### Step 1: Create New Vite Project (5 min)

```bash
# Navigate to your projects folder
cd ~/projects  # or wherever you keep projects

# Create new Vite React TypeScript project
yarn create vite vite-react-apron --template react-ts

# Navigate into project
cd vite-react-apron

# Initialize git
git init
git add .
git commit -m "Initial commit: Vite React TypeScript template"
```

**✓ Checkpoint**: You should see a basic Vite project structure:
```
vite-react-apron/
├── src/
├── public/
├── index.html
├── package.json
└── tsconfig.json
```

---

### Step 2: Install Dependencies (5 min)

```bash
# Core dependencies
yarn add react-router-dom @tanstack/react-query zod @hookform/resolvers react-hook-form lucide-react class-variance-authority clsx msw

# Dev dependencies
yarn add -D @types/node @playwright/test playwright vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event eslint-config-prettier
```

**✓ Checkpoint**: Check `package.json` - all packages should be listed

```bash
# Verify installation
yarn list --depth=0 | grep react-query
# Should show @tanstack/react-query
```

---

### Step 3: Configure Path Aliases (3 min)

#### Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
```

#### Update `tsconfig.json`:

Add to `compilerOptions`:
```json
{
  "compilerOptions": {
    // ... existing options
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**✓ Checkpoint**: No TypeScript errors when you open the project

---

### Step 4: Set Up ESLint & Prettier (5 min)

#### Create `.eslintrc.json`:

Copy content from [[Configuration Templates]]

#### Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

#### Create `.prettierignore`:

```
dist
node_modules
coverage
*.md
```

#### Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

**✓ Checkpoint**: Run linter
```bash
yarn lint
# Should complete without errors
```

---

### Step 5: Create Folder Structure (5 min)

```bash
# Navigate to src directory
cd src

# Create main folders
mkdir -p app/{providers,router,error-boundary,msw,styles}
mkdir -p pages/{users,not-found}
mkdir -p features/{create-user,edit-user,delete-user,sort-users}
mkdir -p entities/user/{model,api}
mkdir -p shared/{api,types,ui,lib,hooks,fonts,images,config}

# Navigate back to root
cd ..
```

**✓ Checkpoint**: Verify structure
```bash
tree src -L 2
# Should show all created folders
```

Alternative if `tree` not available:
```bash
ls -R src
```

---

### Step 6: Set Up Global Styles (5 min)

#### Create `src/app/styles/globals.css`:

Copy from [[Configuration Templates]]

#### Create `src/app/styles/theme.css`:

Copy from [[Configuration Templates]]

#### Update `index.html` to load DM Sans:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- DM Sans Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    
    <title>ApronReact</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### Update `src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './app/styles/globals.css';
import './app/styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**✓ Checkpoint**: Start dev server
```bash
yarn dev
```

Open http://localhost:3000 - should see Vite + React page with DM Sans font

---

### Step 7: Create First Shared Utility (5 min)

#### Create `src/shared/lib/cn.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

#### Create `src/shared/lib/index.ts`:

```typescript
export { cn } from './cn';
```

**✓ Checkpoint**: Test import
```typescript
// In src/App.tsx
import { cn } from '@/shared/lib';
console.log(cn('test', 'classes')); // Should log: 'test classes'
```

---

### Step 8: Create First Component (10 min)

Let's create a simple Button component to verify everything works.

#### Create folder structure:

```bash
mkdir -p src/shared/ui/Button
cd src/shared/ui/Button
```

#### Create `Button.tsx`:

```typescript
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### Create `Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  border: none;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background: var(--color-primary, #3b82f6);
  color: white;
}

.primary:hover:not(:disabled) {
  opacity: 0.9;
}

.secondary {
  background: var(--color-muted, #f1f5f9);
  color: var(--color-fg, #0f172a);
}

.ghost {
  background: transparent;
  color: var(--color-fg, #0f172a);
}

.ghost:hover:not(:disabled) {
  background: var(--color-muted, #f1f5f9);
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

#### Create `index.ts`:

```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

---

#### Test the Button in App.tsx:

```typescript
import { Button } from '@/shared/ui/Button';
import './app/styles/globals.css';
import './app/styles/theme.css';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>ApronReact</h1>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}

export default App;
```

**✓ Checkpoint**: 
- Buttons should render with proper styles
- Hover effects should work
- Different variants and sizes visible

---

### Step 9: Set Up Git Workflow (3 min)

#### Create `.gitignore`:

```
# Dependencies
node_modules

# Build outputs
dist
dist-ssr

# Testing
coverage
.nyc_output
test-results
playwright-report

# Environment
.env
.env.local
.env.production

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*

# Misc
*.local
```

#### Make initial commit:

```bash
git add .
git commit -m "Setup: Initial project configuration

- Configure path aliases (@/)
- Set up ESLint and Prettier
- Create folder structure (FSD)
- Add global styles and theme
- Create first Button component
"
```

---

### Step 10: Verify Everything Works (5 min)

Run all checks:

```bash
# Type check
yarn type-check
# Should pass with no errors

# Lint
yarn lint
# Should pass with 0 warnings

# Format check
yarn format:check
# All files should be formatted

# Dev server
yarn dev
# Should start on http://localhost:3000
```

---

## ✅ Success Checklist

After completing all steps, you should have:

- [x] Project initialized with Vite + React + TypeScript
- [x] All dependencies installed
- [x] Path aliases configured (@/)
- [x] ESLint and Prettier set up
- [x] Folder structure created (FSD)
- [x] Global styles and theme configured
- [x] DM Sans font loaded
- [x] First shared component (Button) created
- [x] CSS Modules working
- [x] Dev server running without errors
- [x] Git initialized with commits

---

## 🎉 You're Ready!

Your development environment is now set up and ready for implementation.

### Next Steps:

1. **Review the architecture**:
   - Read [[Updated Architecture Notes]]
   - Understand FSD layer rules

2. **Start Phase 4**: Shared UI Components
   - Create remaining components (Input, Dialog, Select, etc.)
   - Follow the Button pattern for each

3. **Reference guides**:
   - [[Quick Reference Guide]] for patterns
   - [[Configuration Templates]] for configs
   - [[Troubleshooting and FAQ]] if issues arise

---

## 📸 Visual Checkpoint

At this point, your browser should show:

```
ApronReact
[Primary] [Secondary] [Ghost]
[Small] [Medium] [Large]
```

All buttons should:
- Render with proper spacing
- Show hover effects
- Display correct sizes
- Use DM Sans font

---

## 🐛 If Something Went Wrong

### Common Issues:

**Issue**: Buttons don't show styles
- Check `Button.module.css` is created
- Verify import in `Button.tsx`
- Check browser DevTools for CSS loading

**Issue**: Path alias not working
- Restart VS Code
- Restart dev server (Ctrl+C, then `yarn dev`)
- Check both `tsconfig.json` and `vite.config.ts`

**Issue**: TypeScript errors
- Run `yarn type-check` to see all errors
- Check all imports use `@/` prefix
- Verify all files are saved

**Full troubleshooting**: See [[Troubleshooting and FAQ]]

---

## 🎯 What We Built

```
vite-react-apron/
├── src/
│   ├── app/
│   │   └── styles/
│   │       ├── globals.css ✅
│   │       └── theme.css ✅
│   ├── pages/
│   ├── features/
│   ├── entities/
│   └── shared/
│       ├── api/
│       ├── lib/
│       │   ├── cn.ts ✅
│       │   └── index.ts ✅
│       └── ui/
│           └── Button/ ✅
│               ├── index.ts
│               ├── Button.tsx
│               └── Button.module.css
├── .eslintrc.json ✅
├── .prettierrc ✅
├── .gitignore ✅
├── vite.config.ts ✅
├── tsconfig.json ✅
└── package.json ✅
```

---

## 💾 Save Your Progress

```bash
# Make a checkpoint commit
git add .
git commit -m "Day 1 complete: Development environment ready"

# Optionally create a branch for feature work
git checkout -b feature/ui-components
```

---

## 📚 Recommended Reading Before Day 2

Before continuing with implementation:

1. Review [[Updated Architecture Notes]] - Understand the structure
2. Skim [[Quick Reference Guide]] - Know what's available
3. Check [[Updated Development Tasks and Roadmap]] - See what's next

---

**Great job! You're now ready to start building the actual application.** 🚀

The foundation is solid, and you have all the tools and patterns in place to continue development efficiently.

Next session, you'll create the remaining shared UI components following the same pattern as the Button component.