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

### Admin Management Pattern
- Role-based access control with Supabase RLS
- Dialog-based editing interfaces for user management
- Real-time data updates after CRUD operations
- Comprehensive error handling with toast notifications
- Git workflow integration with automated CI/CD

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

### Code Quality Standards
- ESLint configuration with TypeScript rules
- Automated pre-commit hooks with lint checks
- GitHub Actions for CI/CD pipeline
- Conventional commit message format
- Comprehensive documentation in `.ai/workflows/`

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
- ✅ **Admin User Management System** - Complete edit user and manage roles functionality
- ✅ **GitHub Actions CI/CD Pipeline** - Automated workflows for quality, deployment, and code checks
- ✅ **Git Workflow Documentation** - Comprehensive branching strategy and automation
- ✅ **Code Quality Standards** - ESLint compliance, TypeScript strict mode, cleanup completed
- ✅ **AI Workflow Enhancements** - Updated automation triggers for git operations
- ✅ **Database Admin Functions** - Real-time user/role management with proper error handling
- ✅ **Dialog-based Admin Interface** - Professional user editing and role assignment dialogs
- ✅ **Production-Ready Infrastructure** - Complete CI/CD pipeline with quality gates

## ⚠️ Known Issues

Currently no known critical issues. All major features are functional and tested:
- ✅ Authentication system fully operational
- ✅ Admin user management with edit/role assignment working
- ✅ Real-time data updates and error handling implemented
- ✅ Code quality standards enforced with automated workflows

## 🎯 Current Focus Areas

- ✅ **Admin user management functionality** - COMPLETED
- ✅ **Git workflow and CI/CD infrastructure** - COMPLETED  
- ✅ **Code quality standards and automation** - COMPLETED
- 🔄 **Enhanced user profile features** - Next priority
- 🔄 **Role-based UI component rendering** - Next priority
- 🔄 **Comprehensive test suite** - Future enhancement
- 🔄 **Performance monitoring and optimization** - Future enhancement

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

### 🤖 Automated Workflow Keywords
**ALWAYS scan user messages for these trigger keywords:**
- **`#commit-ready`** - Auto-execute pre-commit workflow (lint → changelog → commit → push)
- **`#feature-complete`** - Full feature completion workflow
- **`#docs-update`** - Documentation update workflow  
- **`#git-cleanup`** - Clean up merged branches and remote references
- **`#merge-ready`** - Prepare PR for merge (CI checks, conflicts, etc.)
- **`#github-pull-request_copilot-coding-agent`** - Hand off to coding agent

### 🔄 Auto-Trigger Phrases (No # needed)
- "ready to commit", "let's commit", "commit and push" → Pre-commit workflow
- "everything looks good", "time to commit" → Pre-commit workflow
- "feature complete", "ready to ship" → Feature completion workflow
- "clean up git", "cleanup branches" → Git cleanup workflow
- "ready to merge", "merge this PR" → Merge ready workflow

### 📋 Core Guidelines
1. **ALWAYS run `npm run lint` before completing any task** - Zero lint errors are required
2. **ALWAYS check this file first** for project context
3. **ALWAYS create AI changelog entries** for significant changes (`.ai/changelogs/YYYY-MM-DD-feature-name.md`)
4. **ALWAYS update this context file** when making significant changes
5. Review recent changelogs for implementation patterns
6. Use existing components before creating new ones
7. Follow the established security patterns
8. Refer to `.ai/workflows/` for detailed implementation guides
9. Use the established naming conventions consistently
10. Always implement proper RLS policies for new tables
11. Test authentication flows after making auth-related changes
12. Use TypeScript interfaces from `lib/types/` for consistency
13. **Update CHANGELOG.md** when adding significant features
14. **Prefer markdown files** for content that changes frequently (like changelogs)
15. **Parse markdown dynamically** rather than hardcoding content in React components
16. **Fix TypeScript errors immediately** - maintain type safety
17. **Remove unused imports and variables** to keep code clean
18. **Follow ESLint rules** for consistent code formatting

### 🚨 Never-Forget Checklist
Before ANY significant action:
- [ ] Scanned message for trigger keywords
- [ ] Checked `.ai/context.md` for current state
- [ ] Reviewed recent changelogs for patterns  
- [ ] Planned changelog entry if needed
- [ ] Verified lint status with `npm run lint`
