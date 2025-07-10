name: "Next.js PRP Template - TypeScript + Tailwind + Supabase"
description: |

## Purpose

Template optimized for Next.js applications with TypeScript, Tailwind CSS, and Supabase authentication. Focuses on component-based architecture with proper type safety and user experience.

## Core Principles

1. **TypeScript First**: All code must be properly typed
2. **Component Composition**: Build reusable, composable components
3. **Server-Side Security**: Use Supabase server client for sensitive operations
4. **Mobile-First**: Design for mobile, enhance for desktop
5. **Performance**: Optimize for Core Web Vitals

---

## Goal

[What needs to be built - be specific about the feature and user experience]

## Why

- [Business value and user impact]
- [Integration with existing features]
- [Problems this solves and for whom]

## What

[User-visible behavior and technical requirements]

### Success Criteria

- [ ] [Specific measurable outcomes]
- [ ] TypeScript compilation passes
- [ ] Responsive design works on mobile and desktop
- [ ] Authentication state handled correctly
- [ ] Error states provide clear feedback

## All Needed Context

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- file: CLAUDE.md
  why: Project-specific coding standards and patterns

- file: src/components/ui/[component].tsx
  why: Existing UI component patterns to follow

- file: src/lib/types/index.ts
  why: Current type definitions and patterns

- url: https://nextjs.org/docs
  section: [Specific Next.js feature documentation]
  why: [How this relates to your feature]

- url: https://ui.shadcn.com/docs/components/[component]
  why: UI component API and usage patterns

- url: https://supabase.com/docs/reference/javascript/[method]
  why: Supabase method for data operations

- docfile: [PRPs/ai_docs/file.md]
  why: [Additional context you've added]
```

### Current Project Structure

```bash
src/
├── app/
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes
│   └── api/             # API routes
├── components/
│   ├── ui/              # Base UI components
│   ├── auth/            # Auth-related components
│   ├── profile/         # Profile components
│   └── layout/          # Layout components
├── lib/
│   ├── supabase/        # Supabase configuration
│   └── types/           # TypeScript definitions
└── middleware.ts        # Route protection
```

### Desired Structure Changes

```bash
# Files to be added/modified
src/
├── components/
│   └── [feature]/       # New feature components
├── lib/
│   └── [feature]/       # Feature-specific utilities
└── app/
    └── [routes]/        # New routes if needed
```

### Known Gotchas & Project Patterns

```typescript
// CRITICAL: Next.js 15 App Router patterns
// Use Server Components by default, Client Components when needed
'use client' // Only when using hooks, events, or browser APIs

// CRITICAL: Supabase authentication patterns
// Always use server client for sensitive operations
import { createClient } from '@/lib/supabase/server'

// CRITICAL: TypeScript patterns in this project
// Use interfaces for component props, types for unions
interface ComponentProps {
  // ...
}

// CRITICAL: Tailwind patterns
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

// CRITICAL: Form validation patterns
// Use Zod schemas with react-hook-form
import { z } from 'zod'
import { useForm } from 'react-hook-form'
```

## Implementation Blueprint

### Data Models & Types

Define TypeScript interfaces and Zod schemas for type safety:

```typescript
// src/lib/types/[feature].ts
export interface FeatureData {
  id: string
  name: string
  // ... other fields
}

// Zod schema for validation
export const featureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  // ... other validations
})

export type FeatureFormData = z.infer<typeof featureSchema>
```

### Component Architecture

```typescript
// Component hierarchy and responsibilities
- FeatureContainer (Server Component)
  - FeatureClient (Client Component)
    - FeatureForm (form handling)
    - FeatureList (data display)
    - FeatureItem (individual items)
```

### List of Tasks in Implementation Order

```yaml
Task 1 - Type Definitions:
CREATE src/lib/types/[feature].ts:
  - DEFINE interfaces for data structures
  - CREATE Zod schemas for validation
  - EXPORT types for components

Task 2 - Database Schema (if needed):
CREATE database/migrations/[timestamp]_create_[feature].sql:
  - DEFINE table structure
  - ADD indexes for performance
  - SET UP Row Level Security policies

Task 3 - Server Actions/API Routes:
CREATE src/app/api/[feature]/route.ts:
  - IMPLEMENT CRUD operations
  - USE server-side Supabase client
  - VALIDATE inputs with Zod schemas
  - HANDLE errors properly

Task 4 - UI Components:
CREATE src/components/ui/[feature-component].tsx:
  - FOLLOW existing component patterns
  - USE Tailwind for styling
  - IMPLEMENT proper TypeScript types
  - ADD loading and error states

Task 5 - Feature Components:
CREATE src/components/[feature]/[component].tsx:
  - COMPOSE UI components
  - HANDLE form submissions
  - MANAGE local state
  - IMPLEMENT error boundaries

Task 6 - Page Components:
CREATE src/app/[route]/page.tsx:
  - USE Server Components when possible
  - FETCH data server-side
  - HANDLE authentication
  - IMPLEMENT proper metadata

Task 7 - Integration:
MODIFY existing files:
  - UPDATE navigation menus
  - ADD route protection if needed
  - UPDATE type definitions
  - ADD to layout if needed
```

### Authentication & Security

```typescript
// Authentication patterns
// Server-side data fetching
const supabase = createClient()
const { data: user } = await supabase.auth.getUser()

// Client-side authentication state
const { user, loading } = useAuth()

// Route protection middleware
export default function middleware(request: NextRequest) {
  // Check authentication
}
```

### Error Handling Strategy

```typescript
// Error boundary for component errors
// Toast notifications for user feedback
// Form validation errors
// Network error handling
// Loading states for async operations
```

## Validation Loop

### Level 1: TypeScript & Linting

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Expected: No TypeScript errors, no linting errors
```

### Level 2: Component Testing

```typescript
// CREATE tests/[feature].test.tsx
import { render, screen } from '@testing-library/react'
import { FeatureComponent } from '@/components/[feature]'

describe('FeatureComponent', () => {
  it('renders correctly', () => {
    render(<FeatureComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    // Test form interactions
  })

  it('shows loading state', () => {
    // Test loading states
  })

  it('handles errors gracefully', () => {
    // Test error scenarios
  })
})
```

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Level 3: Integration Testing

```bash
# Start development server
npm run dev

# Test in browser
# 1. Navigate to feature page
# 2. Test user interactions
# 3. Test responsive design
# 4. Test error scenarios
# 5. Test authentication flows

# Manual testing checklist:
# - Mobile responsiveness
# - Form validation
# - Loading states
# - Error handling
# - Authentication required
```

### Level 4: Performance & Accessibility

```bash
# Lighthouse audit
npm run lighthouse

# Check accessibility
# - Screen reader compatibility
# - Keyboard navigation
# - Color contrast
# - Focus management

# Performance checks:
# - Bundle size impact
# - Core Web Vitals
# - Image optimization
# - Loading performance
```

## Final Validation Checklist

- [ ] TypeScript compilation passes: `npx tsc --noEmit`
- [ ] No linting errors: `npm run lint`
- [ ] All tests pass: `npm test`
- [ ] Manual testing successful in browser
- [ ] Responsive design works on mobile/desktop
- [ ] Authentication flows work correctly
- [ ] Error states provide clear feedback
- [ ] Loading states enhance user experience
- [ ] Accessibility requirements met
- [ ] Performance impact is acceptable

---

## Next.js Specific Anti-Patterns to Avoid

- ❌ Don't use Client Components when Server Components suffice
- ❌ Don't fetch data in Client Components without good reason
- ❌ Don't skip error boundaries for client-side errors
- ❌ Don't hardcode API URLs - use environment variables
- ❌ Don't ignore TypeScript errors - fix them
- ❌ Don't use `any` type - use proper TypeScript types
- ❌ Don't skip form validation - validate client and server-side
- ❌ Don't forget to handle loading states
- ❌ Don't ignore responsive design
- ❌ Don't skip authentication checks on protected routes
