# Next.js Project Guidelines for Claude

## Project Overview
This is a Next.js 15.3.5 application with TypeScript, Tailwind CSS, and Supabase authentication. The project follows a component-based architecture with proper TypeScript patterns.

## Core Development Principles

### 1. KISS (Keep It Simple, Stupid)
- Write simple, readable code
- Avoid over-engineering
- Prefer explicit over implicit

### 2. YAGNI (You Aren't Gonna Need It)
- Don't build features until they're needed
- Avoid premature optimization
- Focus on current requirements

### 3. DRY (Don't Repeat Yourself)
- Extract common patterns into reusable components
- Use custom hooks for shared logic
- Centralize configuration and constants

## Code Structure & Architecture

### File Organization
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   ├── auth/              # Auth API routes
│   └── docs/              # Documentation routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── auth/             # Authentication components
│   ├── profile/          # Profile-related components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and services
│   ├── supabase/         # Supabase client configuration
│   └── types/            # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

### File Size Limits
- **Components**: Maximum 200 lines
- **Pages**: Maximum 150 lines
- **Utilities**: Maximum 100 lines
- **Types**: Maximum 50 lines per file

### Function Length
- Maximum 30 lines per function
- Extract complex logic into separate functions
- Use early returns to reduce nesting

## TypeScript Standards

### Type Safety
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use enums for constants with multiple values
- Always type function parameters and return values

### Naming Conventions
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserProfile`)
- **Variables**: camelCase (`userProfile`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProfile`)

### Import Organization
```typescript
// 1. React imports
import React from 'react'

// 2. Next.js imports
import { NextRequest, NextResponse } from 'next/server'

// 3. Third-party libraries
import { createClient } from '@supabase/supabase-js'

// 4. Internal imports (absolute paths)
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/lib/types'

// 5. Relative imports
import './styles.css'
```

## Component Architecture

### Component Structure
```typescript
// 1. Imports
import React from 'react'
import { ComponentProps } from '@/lib/types'

// 2. Types (if not in separate file)
interface Props {
  // ...
}

// 3. Component
export function ComponentName({ prop1, prop2 }: Props) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Functions
  const handleClick = () => {
    // ...
  }
  
  // 6. Early returns
  if (loading) return <div>Loading...</div>
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### React Patterns
- Use functional components with hooks
- Prefer composition over inheritance
- Use React.memo() for expensive re-renders
- Extract custom hooks for complex state logic

## State Management

### Local State
- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Prefer state colocation (keep state close to where it's used)

### Global State
- Use React Context for theme, auth, etc.
- Consider Zustand for complex global state
- Avoid prop drilling

## Styling with Tailwind CSS

### Class Organization
```typescript
// Group related classes
const buttonClasses = cn(
  // Base styles
  "inline-flex items-center justify-center",
  // Spacing
  "px-4 py-2",
  // Typography
  "text-sm font-medium",
  // Colors
  "bg-blue-600 text-white",
  // States
  "hover:bg-blue-700 focus:outline-none focus:ring-2",
  // Responsive
  "md:px-6 md:py-3"
)
```

### Responsive Design
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on multiple screen sizes

## Authentication & Security

### Supabase Integration
- Use server-side authentication for secure routes
- Implement proper error handling
- Use Row Level Security (RLS) policies
- Validate user permissions on both client and server

### Data Validation
- Use Zod for form validation
- Validate all user inputs
- Sanitize data before database operations

## Testing Strategy

### Unit Testing
- Test individual components in isolation
- Mock external dependencies
- Focus on user interactions and edge cases

### Integration Testing
- Test component interactions
- Test API routes
- Test authentication flows

### Testing Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Performance Guidelines

### Code Splitting
- Use dynamic imports for heavy components
- Implement route-level code splitting
- Use Next.js built-in optimizations

### Image Optimization
- Use Next.js Image component
- Provide proper alt text
- Use appropriate sizes and formats

### Loading States
- Show loading indicators for async operations
- Use skeleton screens for better UX
- Implement progressive loading

## Error Handling

### Client-Side Errors
- Use Error Boundaries for component errors
- Implement proper error states in components
- Show user-friendly error messages

### Server-Side Errors
- Use proper HTTP status codes
- Log errors for debugging
- Return consistent error responses

## Development Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting errors
npm run lint:fix
```

### Database
```bash
# Run database migrations
npm run db:migrate

# Reset database
npm run db:reset

# Generate types from database
npm run db:generate-types
```

## Git Workflow

### Branch Naming
- `feature/feature-name`
- `bugfix/bug-description`
- `hotfix/critical-fix`

### Commit Messages
- Use conventional commits
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code refactoring

### Code Review
- All code must be reviewed before merging
- Test locally before creating PR
- Include screenshots for UI changes

## Common Gotchas

### Next.js Specific
- Use `next/image` for images
- Implement proper SEO with metadata
- Use Server Components when possible
- Client Components need 'use client' directive

### Supabase Specific
- Always handle authentication state changes
- Use server-side client for secure operations
- Implement proper error handling for database operations

### TypeScript Specific
- Avoid `any` type - use `unknown` instead
- Use type guards for runtime type checking
- Prefer union types over optional properties when appropriate

## Documentation

### Code Documentation
- Document complex functions with JSDoc
- Include examples for utility functions
- Document API endpoints with OpenAPI/Swagger

### README Updates
- Keep README.md current with setup instructions
- Document environment variables
- Include troubleshooting section

## Deployment

### Environment Variables
- Use `.env.local` for local development
- Never commit sensitive environment variables
- Validate environment variables at startup

### Build Process
- Run type checking before deployment
- Run tests in CI/CD pipeline
- Use proper caching strategies

---

Remember: The goal is to write maintainable, performant, and secure code that provides excellent user experience. When in doubt, prefer simplicity and clarity over complexity.
