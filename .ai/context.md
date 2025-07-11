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

### Last Updated: [Date]
- [List recent significant changes]
- [New features added]
- [Architecture decisions made]

## ⚠️ Known Issues

- [List any known issues]
- [Temporary workarounds in place]
- [Areas needing refactoring]

## 🎯 Current Focus Areas

- [Active development areas]
- [Priorities for new features]
- [Technical debt to address]

## 📊 Database Schema Overview

### Core Tables
- `profiles` - User profile information
- `organizations` - Multi-tenant support
- [Other main tables]

### Key Relationships
- [Describe main relationships]
- [Foreign key patterns used]

## 🔗 Important Links

- Staging Environment: [URL]
- Production Environment: [URL]
- Documentation: [URL]
- Design System: [URL]

## 💡 Tips for AI Agents

1. Always check this file first for project context
2. Review recent changelogs for implementation patterns
3. Use existing components before creating new ones
4. Follow the established security patterns
5. Update this file when making significant changes
