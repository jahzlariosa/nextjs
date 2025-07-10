name: "Test PRP - User Greeting Component"
description: |

## Purpose

Test PRP to validate the PRP methodology is working correctly in the Next.js project. Creates a simple user greeting component to demonstrate the complete PRP workflow.

## Core Principles

1. **TypeScript First**: All code must be properly typed
2. **Component Composition**: Build reusable, composable components
3. **Server-Side Security**: Use Supabase server client for sensitive operations
4. **Mobile-First**: Design for mobile, enhance for desktop
5. **Performance**: Optimize for Core Web Vitals

---

## Goal

Create a simple user greeting component that displays a personalized message to authenticated users on the dashboard. This component should show the user's name with a time-based greeting (Good morning, Good afternoon, Good evening).

## Why

- **Test PRP workflow**: Validate that the PRP methodology works in this project
- **Component development**: Practice the component creation process
- **Authentication integration**: Test integration with existing auth system
- **TypeScript validation**: Ensure type safety works correctly

## What

A reusable greeting component that:
- Displays personalized greeting based on time of day
- Shows user's full name or falls back to username
- Works on both server and client components
- Has proper TypeScript types
- Includes loading and error states

### Success Criteria

- [ ] Component renders correctly on dashboard
- [ ] Shows appropriate greeting based on time
- [ ] Displays user name from profile
- [ ] TypeScript compilation passes
- [ ] Responsive design works on mobile and desktop
- [ ] Loading state handled properly
- [ ] Error states provide clear feedback

## All Needed Context

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- file: CLAUDE.md
  why: Project-specific coding standards and patterns

- file: src/components/ui/button.tsx
  why: Existing UI component patterns to follow

- file: src/lib/types/index.ts
  why: Current type definitions and patterns

- file: src/components/profile/ProfileDisplay.tsx
  why: How user data is currently handled

- file: src/app/(dashboard)/dashboard/page.tsx
  why: Where the component will be integrated

- url: https://nextjs.org/docs/app/building-your-application/rendering/server-components
  why: Server component patterns for user data

- docfile: PRPs/ai_docs/nextjs_patterns.md
  why: Next.js patterns specific to this project
```

### Current Project Structure

```bash
src/
├── app/
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes - WHERE TO INTEGRATE
│   └── auth/             # Auth API routes
├── components/
│   ├── ui/              # Base UI components - REFERENCE FOR PATTERNS
│   ├── auth/            # Auth-related components
│   ├── profile/         # Profile components - REFERENCE FOR USER DATA
│   └── layout/          # Layout components
├── lib/
│   ├── supabase/        # Supabase configuration
│   └── types/           # TypeScript definitions - ADD NEW TYPES HERE
└── middleware.ts        # Route protection
```

### Desired Structure Changes

```bash
# Files to be added
src/
├── components/
│   └── greeting/        # New greeting components
│       ├── UserGreeting.tsx      # Main component
│       ├── GreetingText.tsx      # Text display component
│       └── index.ts              # Barrel export
├── lib/
│   └── utils/
│       └── time-utils.ts         # Time-based greeting logic
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
interface GreetingProps {
  user: User | null
  className?: string
}

// CRITICAL: Tailwind patterns
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

// CRITICAL: Time handling
// Use proper date handling for time-based greetings
const hour = new Date().getHours()
```

## Implementation Blueprint

### Data Models & Types

Define TypeScript interfaces for the greeting component:

```typescript
// src/lib/types/greeting.ts
export interface GreetingData {
  greeting: string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  userName: string
}

export interface GreetingProps {
  user: User | null
  className?: string
  showTimeOfDay?: boolean
}

// Time period type
export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night'
```

### Component Architecture

```typescript
// Component hierarchy and responsibilities
- UserGreeting (Server Component)
  - GreetingText (Client Component for dynamic time)
    - Time-based greeting logic
    - User name display
    - Responsive styling
```

### List of Tasks in Implementation Order

```yaml
Task 1 - Type Definitions:
CREATE src/lib/types/greeting.ts:
  - DEFINE interfaces for greeting data
  - CREATE types for time periods
  - EXPORT types for components

Task 2 - Utility Functions:
CREATE src/lib/utils/time-utils.ts:
  - IMPLEMENT time-based greeting logic
  - CREATE function to determine time of day
  - ADD user name formatting utilities
  - EXPORT pure functions for testing

Task 3 - Base Component:
CREATE src/components/greeting/GreetingText.tsx:
  - IMPLEMENT greeting text display
  - USE Client Component for dynamic updates
  - HANDLE loading and error states
  - FOLLOW Tailwind styling patterns

Task 4 - Main Component:
CREATE src/components/greeting/UserGreeting.tsx:
  - IMPLEMENT main greeting component
  - USE Server Component when possible
  - INTEGRATE with user authentication
  - COMPOSE GreetingText component

Task 5 - Barrel Exports:
CREATE src/components/greeting/index.ts:
  - EXPORT all greeting components
  - FOLLOW existing barrel export patterns
  - MAINTAIN clean import structure

Task 6 - Integration:
MODIFY src/app/(dashboard)/dashboard/page.tsx:
  - IMPORT UserGreeting component
  - ADD to dashboard layout
  - PASS user data from server
  - MAINTAIN existing page structure

Task 7 - Styling Integration:
UPDATE component styles:
  - USE existing Tailwind patterns
  - ENSURE mobile responsiveness
  - MATCH existing design system
  - ADD hover and focus states
```

### Implementation Details

```typescript
// Time utility function
export function getGreeting(hour: number): { greeting: string; timeOfDay: TimePeriod } {
  if (hour >= 5 && hour < 12) {
    return { greeting: 'Good morning', timeOfDay: 'morning' }
  } else if (hour >= 12 && hour < 17) {
    return { greeting: 'Good afternoon', timeOfDay: 'afternoon' }
  } else if (hour >= 17 && hour < 21) {
    return { greeting: 'Good evening', timeOfDay: 'evening' }
  } else {
    return { greeting: 'Good night', timeOfDay: 'night' }
  }
}

// User name formatting
export function formatUserName(user: User | null): string {
  if (!user) return 'Guest'
  return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
}
```

## Validation Loop

### Level 1: TypeScript & Linting

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Expected: No TypeScript errors, no linting errors
```

### Level 2: Component Testing

```typescript
// Manual testing checklist
// 1. Visit http://localhost:3000/dashboard
// 2. Verify greeting appears with correct time-based message
// 3. Check user name displays correctly
// 4. Test responsive design on mobile
// 5. Verify loading states work

// Future: Unit tests for utility functions
describe('time-utils', () => {
  it('returns correct greeting for morning', () => {
    const result = getGreeting(9)
    expect(result.greeting).toBe('Good morning')
    expect(result.timeOfDay).toBe('morning')
  })
})
```

### Level 3: Integration Testing

```bash
# Start development server
npm run dev

# Manual testing checklist:
# 1. Navigate to /dashboard
# 2. Verify greeting component renders
# 3. Check time-based greeting is correct
# 4. Verify user name appears
# 5. Test responsive behavior
# 6. Check component integrates well with existing UI
```

### Level 4: Performance & Accessibility

```bash
# Performance checks:
# - Component renders quickly
# - No unnecessary re-renders
# - Proper server/client component usage

# Accessibility checks:
# - Greeting text is readable
# - Proper heading hierarchy
# - Color contrast is sufficient
```

## Final Validation Checklist

- [ ] TypeScript compilation passes: `npx tsc --noEmit`
- [ ] No linting errors: `npm run lint`
- [ ] Component renders on dashboard
- [ ] Correct greeting based on time of day
- [ ] User name displays properly
- [ ] Responsive design works
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Component follows project patterns
- [ ] Code is properly typed

---

## Test Success Criteria

This test PRP is successful if:
1. **Component Creation**: Successfully creates all required files
2. **Integration**: Component displays on dashboard without errors
3. **Functionality**: Shows correct greeting and user name
4. **Quality**: Passes all validation checks
5. **Patterns**: Follows established project patterns

**This validates that the PRP methodology is working correctly in your Next.js project.**
