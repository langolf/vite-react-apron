# Vite React Apron

A modern React application built with Vite, TypeScript, React Router, TanStack Query, and MSW for API mocking.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## Setup

Install dependencies:

```bash
yarn
```

Initialize Playwright browsers (for E2E tests):

```bash
npx playwright install
```

## Running the Application

Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Testing

### E2E Tests

Run Playwright tests:

```bash
yarn test:e2e
```

Run tests in UI mode:

```bash
yarn test:e2e:ui
```

### Linting

Run ESLint:

```bash
yarn lint
```

### Type Checking

Run TypeScript compiler:

```bash
yarn tsc
```

## Building for Production

Build the application:

```bash
yarn build
```

Preview the production build:

```bash
yarn preview
```

## Storybook

Run Storybook for component development:

```bash
yarn storybook
```

Build Storybook:

```bash
yarn build-storybook
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v7** - Routing
- **TanStack Query** - Data fetching and caching
- **MSW** - API mocking
- **Radix UI** - Accessible component primitives
- **Tailwind CSS v4** - Styling
- **React Hook Form + Zod** - Form handling and validation
- **Playwright** - E2E testing
- **Storybook** - Component documentation
