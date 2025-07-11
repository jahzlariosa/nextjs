# Code Quality Workflow for AI Agents

## 🎯 Overview

This workflow ensures that all code changes maintain high quality standards, pass linting, and follow project conventions.

## 📋 Pre-Commit Checklist

### 1. Linting Requirements
```bash
# ALWAYS run this before committing
npm run lint
```

**Expected Result:** ✅ `No ESLint warnings or errors`

### 2. TypeScript Compilation
```bash
# Check for TypeScript errors
npm run build
```

**Expected Result:** ✅ No TypeScript compilation errors

### 3. Code Cleanup
- [ ] Remove all unused imports
- [ ] Remove all unused variables
- [ ] Remove any commented-out code
- [ ] Ensure proper component prop typing

### 4. Security Review
- [ ] No hardcoded secrets or sensitive data
- [ ] Proper input validation with Zod
- [ ] RLS policies for new database operations
- [ ] Server-side authentication checks

## 🔧 Common Lint Fixes

### Unused Imports
```typescript
// ❌ Bad - unused import
import { Button, Card, UnusedComponent } from '@/components/ui'

// ✅ Good - only used imports
import { Button, Card } from '@/components/ui'
```

### Unused Variables
```typescript
// ❌ Bad - unused variable
function MyComponent() {
  const unusedVar = 'hello'
  const user = useAuth()
  return <div>{user.name}</div>
}

// ✅ Good - all variables used
function MyComponent() {
  const user = useAuth()
  return <div>{user.name}</div>
}
```

### Missing Dependencies
```typescript
// ❌ Bad - missing useEffect dependencies
useEffect(() => {
  fetchData(userId)
}, [])

// ✅ Good - all dependencies included
useEffect(() => {
  fetchData(userId)
}, [userId])
```

### TypeScript Errors
```typescript
// ❌ Bad - improper typing
interface Props {
  user: any
}

// ✅ Good - proper typing
interface Props {
  user: {
    id: string
    name: string
    email: string
  }
}
```

## 🚨 Zero Tolerance Items

### Never Commit With:
1. **ESLint errors** - Must be zero
2. **TypeScript errors** - Must be zero
3. **Unused imports** - Clean them up
4. **Console.log statements** - Remove debug logs
5. **Hardcoded secrets** - Use environment variables

## 🔄 Automated Checks

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Git Hooks (Optional)
```bash
# Pre-commit hook to run linting
#!/bin/sh
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint errors found. Please fix before committing."
  exit 1
fi
```

## 📝 Documentation Standards

### Component Documentation
```typescript
/**
 * UserProfile component for displaying user information
 * @param user - User object with id, name, and email
 * @param onEdit - Callback function when edit button is clicked
 */
interface UserProfileProps {
  user: User
  onEdit: () => void
}
```

### Function Documentation
```typescript
/**
 * Fetches user profile data from Supabase
 * @param userId - The ID of the user to fetch
 * @returns Promise resolving to user profile or null
 */
async function fetchUserProfile(userId: string): Promise<Profile | null> {
  // Implementation
}
```

## 🏆 Best Practices

### File Organization
- Keep files under 200 lines when possible
- Use barrel exports in index files
- Group related functions together
- Separate concerns (UI, logic, types)

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase with prefix (`TUser`, `IUserProps`)

### Import Organization
```typescript
// 1. External libraries
import React from 'react'
import { NextPage } from 'next'

// 2. Internal components
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/components/user'

// 3. Types and utilities
import { User } from '@/lib/types'
import { cn } from '@/lib/utils'
```

## 🔍 Code Review Focus Areas

### Security
- Authentication checks in place
- Proper data validation
- No XSS vulnerabilities
- RLS policies implemented

### Performance
- Efficient database queries
- Proper caching strategies
- Optimized bundle size
- Minimal re-renders

### Maintainability
- Clear, descriptive names
- Proper error handling
- Consistent patterns
- Good documentation

## 📊 Quality Metrics

### Target Goals
- **ESLint Score**: 10/10 (no errors, no warnings)
- **TypeScript Coverage**: 100% (no `any` types)
- **Test Coverage**: 80%+ (when tests are implemented)
- **Bundle Size**: Optimized (no unused dependencies)

## 🛠️ Tools Integration

### Package Scripts
```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "quality": "npm run lint && npm run type-check"
  }
}
```

### IDE Configuration
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "eslint.validate": ["typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

Remember: **Quality code is not optional - it's a requirement for maintainable, secure applications.**
