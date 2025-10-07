---
title: Technical Documentation
type: note
permalink: docs/technical-documentation
---

# Technical Documentation

## Technology Stack

### Core Framework
- **Node.js**: Latest LTS version
- **Package Manager**: yarn
- **Build Tool**: Vite
- **Framework**: React 18+ with TypeScript

### Routing & State Management
- **Router**: React Router (latest)
- **Data Fetching**: @tanstack/react-query
- **Form Management**: React Hook Form with @hookform/resolvers

### Validation & Type Safety
- **Schema Validation**: Zod
- **Type System**: TypeScript (strict mode)
- **Contracts**: Shared Zod schemas between UI and MSW handlers

### UI Framework
- **Styling**: TailwindCSS with custom CSS variables
- **Component Library**: shadcn/ui
- **Icons**: lucide-react
- **Typography**: DM Sans font (loaded via CDN in index.html)

### Mock Backend
- **Service Worker**: MSW (Mock Service Worker)
- **Data Persistence**: localStorage with in-memory fallback
- **Request/Response Validation**: Zod schemas on both ends

### Testing
- **E2E Testing**: Playwright (minimum one test for user creation flow)
- **Unit Testing**: Vitest (optional)

### Code Quality
- **Linter**: ESLint with @typescript-eslint
- **Formatter**: Prettier
- **Pre-commit**: ESLint + Prettier (optional)

### Deployment
- **Platform**: Vercel
- **Configuration**: vercel.json with SPA rewrites

## Data Model

### Country Enum
Supported countries (≤ 50 total):
- UK, Ireland, US, France, Germany, Spain, Italy, Netherlands, Belgium, Switzerland, Austria, Denmark, Norway, Sweden, Finland, Poland, Portugal, Czechia, Slovakia, Hungary, Greece, Romania, Bulgaria, Croatia, Slovenia, Estonia, Latvia, Lithuania
- Canada, Mexico, Brazil, Argentina, Chile
- Australia, NewZealand, Japan, SouthKorea, India, Singapore, UAE, SouthAfrica

### User Entity Schema

```typescript
{
  id: string;          // UUID
  firstName: string;   // 5-20 characters, required
  lastName: string;    // 5-20 characters, required
  age: number;         // integer, country-specific minimum
  country: Country;    // enum from list above
}
```

### Age Validation Rules
- **UK or Ireland**: Minimum age 25
- **US**: Minimum age 21
- **All other countries**: Minimum age 18

### Zod Contracts
1. **User** - Full entity with id (server response)
2. **UserCreate** - Omit id (client request for POST)
3. **UserUpdate** - Partial fields (client request for PUT)
4. **Refinement**: Custom Zod refinement validates age >= minimum based on selected country

## API Specification

### Base URL
```
/api
```

### Endpoints

#### GET /api/users
**Response**: `User[]`
- Returns all users
- 200 OK

#### POST /api/users
**Request Body**: `UserCreate`
**Response**: `User`
- Creates new user with generated UUID
- 201 Created on success
- 400 Bad Request with validation errors

#### PUT /api/users/:id
**Request Body**: `UserUpdate`
**Response**: `User`
- Merges partial update into existing user
- Validates complete merged entity
- 200 OK on success
- 400 Bad Request with validation errors
- 404 Not Found if user doesn't exist

#### DELETE /api/users/:id
**Response**: `{ ok: true }`
- 200 OK on success
- 404 Not Found if user doesn't exist

### Error Responses
```typescript
{
  errors: string[];  // Array of validation error messages
}
```

## MSW Handler Requirements
- Validate all incoming requests with Zod schemas
- Return 400 with error array on validation failure
- For PUT: merge partial update, then validate full User entity
- Validate all responses before returning
- Seed 3 valid users on first initialization
- Persist to localStorage["users"] (JSON string)
- Fallback to in-memory storage when localStorage unavailable (test environment)

## CSS Variable System

### Custom Tokens (in :root)
```css
--color-primary
--color-bg
--color-fg
--color-accent
--color-muted
--color-border
```

Colors derived from getapron.com brand palette. Map shadcn theme variables to these custom tokens for consistent theming.