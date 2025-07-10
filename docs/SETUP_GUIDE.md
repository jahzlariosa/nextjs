# Setup Guide - Next.js + Supabase + PRP

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git repository

### 1. Project Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 2. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Setup

In your Supabase SQL Editor, run these migration files in order:

```sql
-- 1. Create profiles table
-- Run: database/migrations/001_create_profiles_table.sql

-- 2. Create handle_new_user trigger
-- Run: database/migrations/010_recreate_handle_new_user_trigger.sql
```

**Note:** User profiles are automatically created by a database trigger after successful sign-up.

### 4. Start Development

```bash
npm run dev
```

### 5. Test the Application

1. Visit `http://localhost:3000/sign-up`
2. Register a new user
3. Verify automatic redirect to dashboard
4. Check profile was created in Supabase dashboard

## 🎯 Using PRP Methodology

This project uses the PRP (Product Requirement Prompt) methodology for development:

### Quick PRP Usage

```bash
# Create a new feature PRP
/create-base-prp implement user notifications system

# Execute an existing PRP
/execute-base-prp PRPs/user-notifications.md
```

### Available Commands
- `/create-base-prp` - Generate comprehensive PRPs
- `/execute-base-prp` - Execute PRPs against codebase
- `/review-general` - Code review
- `/prime-core` - Prime Claude with project context

For detailed PRP usage, see: `PRPs/INTEGRATION_GUIDE.md`

## 🧪 Validation Checklist

- [ ] Sign up works
- [ ] Profile auto-created in database
- [ ] Dashboard accessible after signup
- [ ] Sign in works
- [ ] Protected routes redirect properly
- [ ] Profile displays correctly
- [ ] TypeScript compilation passes: `npx tsc --noEmit`
- [ ] Linting passes: `npm run lint`

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run linting
npm run lint:fix    # Fix linting errors

# TypeScript
npx tsc --noEmit    # Type checking without output
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Protected dashboard routes
│   └── auth/              # Auth API routes
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── auth/              # Authentication components
│   ├── profile/           # Profile components
│   └── layout/            # Layout components
├── lib/
│   ├── supabase/          # Supabase configuration
│   └── types/             # TypeScript definitions
└── middleware.ts          # Route protection

PRPs/                      # PRP methodology files
├── templates/             # PRP templates
├── ai_docs/              # AI context documentation
└── INTEGRATION_GUIDE.md  # PRP usage guide

CLAUDE.md                 # Project guidelines for AI
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Signup fails with database error
- Check trigger exists and function is valid
- Verify RLS policies allow profile creation

#### 2. Dashboard shows "Profile Error"
- Check user has profile in database
- Verify RLS policies allow profile reading

#### 3. Redirect loops on dashboard
- Check session handling in middleware
- Verify auth tokens are valid

### Debug Queries

```sql
-- Check if profile exists for user
SELECT * FROM profiles WHERE id = 'user_id_here';

-- Check trigger status
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

### Reset to Clean State

```sql
-- Run these migration files in order:
-- 1. database/migrations/001_create_profiles_table.sql
-- 2. database/migrations/010_recreate_handle_new_user_trigger.sql
```

## 🎯 Next Steps

### For New Features
1. Use PRP methodology: `/create-base-prp [feature description]`
2. Follow the generated PRP step-by-step
3. Use validation loops to ensure quality
4. Reference `CLAUDE.md` for coding standards

### For Team Members
1. Review `CLAUDE.md` for project guidelines
2. Study `PRPs/INTEGRATION_GUIDE.md` for PRP workflow
3. Check existing PRPs for examples
4. Use `/prime-core` to help Claude understand the project

This setup provides a solid foundation for building modern Next.js applications with Supabase authentication and the PRP development methodology.
