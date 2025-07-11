# Project Context for AI Agents

## 🏗️ Project Overview

**Project Type:** Next.js 14+ Application with TypeScript
**Database:** Supabase (PostgreSQL)
**Authentication:** Supabase Auth
**Styling:** Tailwind CSS + shadcn/ui
**State Management:** React Context + Server State

## 📁 Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── [feature]/        # Feature-specific components
├── lib/                   # Utilities and helpers
│   ├── supabase/         # Supabase client configurations
│   └── utils/            # Helper functions
├── types/                 # TypeScript type definitions
└── .ai/                   # AI agent guidelines

## 🔑 Key Technologies

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Forms:** React Hook Form + Zod
- **State:** Server Components + Client State

## 🎨 Design Patterns

### Authentication Pattern
- Server-side auth checks in layout files
- Middleware for route protection
- Supabase session management

### Data Fetching Pattern
- Server Components for initial data
- Client Components for interactive features
- Proper loading and error states

### Component Pattern
- Composition over inheritance
- Props interfaces with TypeScript
- Consistent naming conventions

## 🔒 Security Patterns

### RLS (Row Level Security)
- All tables have RLS enabled
- Policies based on auth.uid()
- Service role only for admin operations

### API Security
- Rate limiting on API routes
- Input validation with Zod
- CORS properly configured

## 🧹 Code Quality Standards

### Linting & Type Safety
- **Zero ESLint errors/warnings** - Run `npm run lint` before commits
- **Zero TypeScript errors** - Maintain strict type safety
- **Clean imports** - Remove unused imports and variables
- **Consistent formatting** - Follow ESLint configuration

### Code Review Checklist
- [ ] All lint errors resolved (`npm run lint` passes)
- [ ] No TypeScript compilation errors
- [ ] Unused imports/variables removed
- [ ] Component props properly typed
- [ ] Error handling implemented
- [ ] Security patterns followed

### Performance Guidelines
- Use Server Components when possible
- Optimize bundle size by removing unused code
- Implement proper loading states
- Use proper caching strategies

## 📝 Naming Conventions

### Files
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase with `.types.ts` suffix
- API Routes: kebab-case

### Variables & Functions
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces/Types: PascalCase with 'I' or 'T' prefix
- Hooks: camelCase with 'use' prefix

## 🚀 Recent Changes

### Last Updated: July 12, 2025
- Complete authentication system implemented with Supabase Auth
- User registration, sign-in, and password reset flows functional
- Database schema with profiles, roles, and profile_roles tables
- Row Level Security (RLS) policies configured
- Middleware protection for dashboard routes
- Role-based access control system in place
- Avatar upload functionality implemented
- Admin user management system structure created

## ⚠️ Known Issues

Currently no known critical issues. All major authentication flows are functional and tested.

## 🎯 Current Focus Areas

- Completing admin user management functionality
- Implementing comprehensive user profile features
- Adding role-based UI component rendering
- Setting up deployment pipeline
- Creating comprehensive test suite

## 📊 Database Schema Overview

### Core Tables
- `profiles` - User profile information linked to auth.users
- `roles` - System roles (user, admin, moderator)
- `profile_roles` - Junction table for user role assignments

### Key Relationships
- `profiles.id` references `auth.users(id)` with CASCADE delete
- `profile_roles` creates many-to-many relationship between profiles and roles
- All tables have RLS enabled with auth.uid() based policies

### Security Features
- Row Level Security (RLS) on all user-facing tables
- Automatic profile creation via database triggers
- Role-based access control system
- Secure avatar storage in Supabase Storage

## 🔗 Important Links

- Staging Environment: [URL]
- Production Environment: [URL]
- Documentation: [URL]
- Design System: [URL]

## 📋 Template Sections (For Reference)

### 🚀 Recent Changes Template
```markdown
### Last Updated: [Date]
- [List recent significant changes]
- [New features added]
- [Architecture decisions made]
- [Bug fixes implemented]
- [Performance improvements]
```

### ⚠️ Known Issues Template
```markdown
- [List any known issues]
- [Temporary workarounds in place]
- [Areas needing refactoring]
- [Performance bottlenecks]
- [Technical debt items]
```

### 🎯 Current Focus Areas Template
```markdown
- [Active development areas]
- [Priorities for new features]
- [Technical debt to address]
- [Performance optimizations needed]
- [Security improvements planned]
```

### 📊 Database Schema Template
```markdown
### Core Tables
- `table_name` - Description of purpose
- `related_table` - Description and relationships
- [Other main tables]

### Key Relationships
- [Describe main relationships]
- [Foreign key patterns used]
- [Junction table purposes]

### Security Features
- [RLS policies implemented]
- [Access control patterns]
- [Data validation rules]
```

## 💡 Tips for AI Agents

1. **ALWAYS run `npm run lint` before completing any task** - Zero lint errors are required
2. Always check this file first for project context
3. Review recent changelogs for implementation patterns
4. Use existing components before creating new ones
5. Follow the established security patterns
6. Update this file when making significant changes
7. Refer to `.ai/workflows/` for detailed implementation guides
8. Use the established naming conventions consistently
9. Always implement proper RLS policies for new tables
10. Test authentication flows after making auth-related changes
11. Use TypeScript interfaces from `lib/types/` for consistency
12. **Update CHANGELOG.md** when adding significant features
13. **Prefer markdown files** for content that changes frequently (like changelogs)
14. **Parse markdown dynamically** rather than hardcoding content in React components
15. **Fix TypeScript errors immediately** - maintain type safety
16. **Remove unused imports and variables** to keep code clean
17. **Follow ESLint rules** for consistent code formatting
