# Project Reference - Next.js + Supabase + PRP

## 📊 Project Overview

**Technology Stack:**
- Next.js 15.3.5 (App Router with SSR)
- TypeScript
- Tailwind CSS v4 + Shadcn UI
- Supabase (PostgreSQL + Auth)
- PRP Development Methodology

**Current Status:** ✅ Production Ready with PRP Integration

## ✅ Implemented Features

### Authentication System
- ✅ **Server-Side Rendering (SSR)** with Supabase Auth
- ✅ **Authentication Pages** - Sign-in, sign-up, password reset
- ✅ **Session Management** - Middleware for route protection
- ✅ **Auto Profile Creation** - Database triggers create profiles on signup
- ✅ **Password Reset Flow** - Complete email verification workflow

### User Profile Management
- ✅ **Profile Display** - View profile with icons and formatting
- ✅ **Profile Editing** - Full CRUD operations with validation
- ✅ **Real-time Updates** - Client-side refresh without page reload
- ✅ **Avatar Upload System** - Supabase storage with RLS policies
- ✅ **Form Validation** - React Hook Form with Zod schemas

### UI/UX Components
- ✅ **Shadcn UI Integration** - Modern component library
- ✅ **Skeleton Loading States** - Loading indicators for all components
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Error Handling** - Comprehensive error states and messaging
- ✅ **Avatar Components** - Multiple sizes with fallbacks

### Security & Database
- ✅ **Row Level Security (RLS)** - Proper data protection policies
- ✅ **Database Triggers** - Auto-population of profiles
- ✅ **File Security** - Secure avatar upload with validation
- ✅ **Type Safety** - Full TypeScript implementation

### Development Methodology
- ✅ **PRP Integration** - Complete Product Requirement Prompt system
- ✅ **Claude Commands** - 12 pre-configured development commands
- ✅ **AI Documentation** - Context files for AI-assisted development
- ✅ **Code Standards** - CLAUDE.md with project-specific guidelines

## 🗂️ Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  location TEXT,
  website TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Avatar Storage
- **Bucket:** `avatars` in Supabase Storage
- **Size Limit:** 5MB per file
- **Formats:** JPEG, PNG, WebP, GIF
- **Organization:** User-specific folders with RLS

## 🏗️ Architecture Patterns

### Server-First Design
- **Server Components** for data fetching and static content
- **Client Components** for interactivity and state management
- **Middleware** for authentication and route protection
- **Server Actions** for form submissions and data mutations

### Component Organization
```
components/
├── ui/                 # Shadcn UI primitives
├── auth/              # Authentication components
├── profile/           # Profile management
├── layout/            # Layout components
└── skeletons/         # Loading states
```

### File Size Guidelines
- **Components:** Maximum 200 lines
- **Pages:** Maximum 150 lines
- **Utilities:** Maximum 100 lines
- **Types:** Maximum 50 lines per file

## 🎯 Development Workflow

### PRP-First Development
1. **Create PRP:** `/create-base-prp [feature description]`
2. **Research Phase:** AI analyzes codebase and external resources
3. **Execute PRP:** `/execute-base-prp PRPs/feature-name.md`
4. **Validation:** 4-level validation from syntax to performance
5. **Iteration:** Use validation loops to refine implementation

### Validation Levels
1. **Level 1:** TypeScript compilation and linting
2. **Level 2:** Unit and component tests
3. **Level 3:** Integration testing in browser
4. **Level 4:** Performance and accessibility validation

## 📱 Available Routes

### Public Routes
- `/` - Landing page
- `/sign-in` - Authentication
- `/sign-up` - User registration
- `/reset-password` - Password reset request
- `/docs/*` - Documentation pages

### Protected Routes
- `/dashboard` - User dashboard
- `/profile` - Profile management
- `/settings` - User settings

## 🔧 Key Files & Configuration

### Core Configuration
- `CLAUDE.md` - Project guidelines for AI development
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS setup
- `components.json` - Shadcn UI configuration

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Migration Files
- `001_create_profiles_table.sql` - Profile table setup
- `010_recreate_handle_new_user_trigger.sql` - Auto profile creation

## 📊 Feature Implementation Status

### ✅ Completed (Production Ready)
- Authentication system with SSR
- User profile management
- Avatar upload functionality
- UI component library
- Security policies and RLS
- PRP development methodology
- Comprehensive documentation

### 🔜 Potential Enhancements
- **Social Authentication** - Google, GitHub providers
- **User Roles & Permissions** - RBAC system
- **Admin Dashboard** - User management interface
- **Real-time Features** - WebSocket integration
- **Advanced Testing** - E2E test suite
- **Performance Monitoring** - Analytics integration

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] User registration flow
- [ ] Profile creation and editing
- [ ] Avatar upload and deletion
- [ ] Authentication state management
- [ ] Route protection
- [ ] Mobile responsiveness
- [ ] Error handling scenarios

### Automated Testing
```bash
npm run lint          # ESLint validation
npx tsc --noEmit     # TypeScript checking
npm test             # Unit tests (when implemented)
```

## 🚀 Deployment Ready

### Production Checklist
- [x] Environment variables configured
- [x] Database migrations applied
- [x] RLS policies implemented
- [x] Error handling comprehensive
- [x] TypeScript compilation clean
- [x] Security headers configured
- [x] Performance optimized

### Deployment Commands
```bash
npm run build        # Production build
npm start           # Production server
```

## 📚 Documentation Structure

### Primary Documentation (PRP-Focused)
- `PRPs/INTEGRATION_GUIDE.md` - How to use PRP methodology
- `PRPs/templates/` - PRP templates for different use cases
- `PRPs/ai_docs/` - AI context and patterns
- `CLAUDE.md` - Project-specific development guidelines

### Reference Documentation
- `docs/SETUP_GUIDE.md` - Setup and getting started
- `docs/architecture/AUTHENTICATION_WORKFLOW.md` - Auth flow details
- `docs/api/AVATAR_API.md` - API reference
- `docs/guides/TESTING_GUIDE.md` - Testing procedures

## 🎉 Success Metrics

This project successfully demonstrates:
- ✅ **One-pass implementation** using PRP methodology
- ✅ **Type-safe development** with comprehensive TypeScript
- ✅ **Modern architecture** with Next.js 15 App Router
- ✅ **Security-first** approach with Supabase RLS
- ✅ **Maintainable codebase** with clear structure and standards
- ✅ **AI-assisted development** with integrated tooling

The project serves as a template for modern Next.js applications with authentication, profile management, and AI-assisted development workflows.
