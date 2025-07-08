# Quick Setup Guide - Clean State

## 🚀 From Zero to Working App

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account
- Git repository

### 2. Project Setup

```bash
# Clone and install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 3. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Database Setup

In your Supabase SQL Editor, run the following scripts in order:

```sql
-- 1. Create profiles table
-- Copy and paste the complete setup script from:
-- database/migrations/001_create_profiles_table.sql

-- 2. Create roles table
-- Copy and paste the complete setup script from:
-- database/migrations/002_create_roles_table.sql
```

**Note:** The user profile and default role are now created on the client-side after a successful sign-up. The database trigger has been removed.

### 5. Start Development

```bash
npm run dev
```

### 6. Test the Flow

1. Visit `http://localhost:3000/sign-up`
2. Register a new user
3. Verify automatic redirect to dashboard
4. Check profile was created in Supabase dashboard

## 🔄 Reset to Clean State

```bash
# Run the restoration scripts in Supabase SQL Editor in order
# From: database/migrations/
# 1. 001_create_profiles_table.sql
# 2. 002_create_roles_table.sql
```

## 📁 Key Files to Backup

Before making changes, backup these files:
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(auth)/sign-up/page.tsx` 
- `src/app/(auth)/sign-in/page.tsx`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `.env.local`

## 🧪 Quick Test Checklist

- [ ] Sign up works
- [ ] Profile auto-created in database  
- [ ] Dashboard accessible after signup
- [ ] Sign in works
- [ ] Protected routes redirect properly
- [ ] Profile displays correctly

## 📞 Troubleshooting

### Common Issues

1. **Signup fails with database error**
   - Check trigger exists and function is valid
   - Verify RLS policies allow profile creation

2. **Dashboard shows "Profile Error"**
   - Check user has profile in database
   - Verify RLS policies allow profile reading

3. **Redirect loops on dashboard**
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

## 🎯 Next Steps

This clean state provides foundation for:
- Adding role-based access control
- Building admin features
- Adding more profile fields
- Implementing additional features

Always test changes incrementally on top of this working base.
