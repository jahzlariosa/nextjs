# Next.js + Supabase Clean State Reference

**Date Created:** July 8, 2025  
**Status:** ✅ Working Clean Configuration  
**Purpose:** Reference point for basic Next.js + Supabase setup with automatic profile creation

## 📋 Overview

This documentation captures the clean, working state of the Next.js + Supabase application with:
- Basic user authentication (sign-up/sign-in)
- Automatic profile creation on user registration
- Simple dashboard with user profile display
- No role-based access control (clean slate)

## 🗄️ Database Schema

### Tables

#### `auth.users` (Supabase managed)
- Standard Supabase auth table
- Contains: `id`, `email`, `created_at`, etc.

#### `profiles` (Custom table)
```sql
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);
```

### Triggers

#### Profile Auto-Creation Trigger
```sql
-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Row Level Security (RLS)

#### Profiles Table Policies
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can view public profiles  
CREATE POLICY "Users can view public profiles" ON profiles
  FOR SELECT USING (is_public = true);

-- Users can update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### Indexes
```sql
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);
```

## 🎯 Key Features

### ✅ Working Features
1. **User Registration** - Sign up with email/password
2. **User Authentication** - Sign in/out functionality  
3. **Automatic Profile Creation** - Profile created on signup via trigger
4. **Dashboard Access** - Protected dashboard for authenticated users
5. **Profile Display** - User can view their profile information
6. **Profile Management** - User can edit their profile

### 🚫 Removed/Not Included
- Role-based access control
- Admin dashboard
- User management features
- Separate roles/user_roles tables

## 📁 File Structure

### Core Authentication Files
```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       └── page.tsx
│   └── profile/
│       └── page.tsx
├── components/
│   ├── auth/
│   ├── profile/
│   └── ui/
└── lib/
    └── supabase/
        ├── client.ts
        └── server.ts
```

## 🔧 Key Code Files

### Dashboard Page (`src/app/(dashboard)/dashboard/page.tsx`)
```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { ProfileSkeleton } from '@/components/skeletons'
import { UserProfileClient } from '@/components/profile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your dashboard, {session.user.email}!
        </p>
      </div>

      <div className="grid gap-6">
        <Suspense fallback={<ProfileSkeleton />}>
          <UserProfile userId={session.user.id} />
        </Suspense>
      </div>
    </div>
  )
}

async function UserProfile({ userId }: { userId: string }) {
  const supabase = await createClient()
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Unable to load profile data.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <UserProfileClient 
      userId={userId} 
      initialProfile={profile}
    />
  )
}
```

## 🔄 User Flow

### Registration Flow
1. User visits `/sign-up`
2. User enters email and password
3. Supabase creates `auth.users` entry
4. Trigger automatically creates `profiles` entry
5. User is redirected to dashboard
6. Dashboard displays user profile

### Authentication Flow
1. User visits `/sign-in`
2. User enters credentials
3. Supabase authenticates user
4. User is redirected to dashboard
5. Dashboard fetches and displays profile

## 🧪 Testing Checklist

### ✅ Registration Testing
- [ ] User can visit sign-up page
- [ ] User can register with valid email/password
- [ ] Profile is automatically created in database
- [ ] User is redirected to dashboard after signup
- [ ] Dashboard displays user information correctly

### ✅ Authentication Testing  
- [ ] User can sign in with valid credentials
- [ ] User is redirected to dashboard after signin
- [ ] Protected routes redirect to sign-in when not authenticated
- [ ] User can sign out successfully

### ✅ Profile Testing
- [ ] User profile displays correctly on dashboard
- [ ] User can access profile page
- [ ] User can edit profile information
- [ ] Profile updates are saved to database

## 📊 Database State

### Current Tables Count
- `auth.users`: 0 users
- `profiles`: 0 profiles
- No role-related tables

### Triggers Active
- ✅ `on_auth_user_created` trigger active
- ✅ `handle_new_user()` function exists

## 🚀 Deployment Notes

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Supabase Configuration
- RLS enabled on profiles table
- Auth policies configured
- Triggers active for auto profile creation

## 🔄 Restoration Instructions

To restore to this clean state:

1. **Delete all users and profiles:**
   ```sql
   DELETE FROM profiles;
   DELETE FROM auth.users;
   ```

2. **Ensure trigger exists:**
   ```sql
   -- Check trigger exists
   SELECT * FROM information_schema.triggers 
   WHERE trigger_name = 'on_auth_user_created';
   ```

3. **Verify database schema matches the above**

4. **Reset codebase to this commit/state**

5. **Test signup flow to confirm automatic profile creation**

## 📝 Notes

- This is a clean, minimal setup without admin features
- All role-based access control has been removed
- Focus is on basic authentication and profile management
- Database is clean with no existing users
- All triggers and functions are working properly

---

**Last Updated:** July 8, 2025  
**Next Steps:** Add features incrementally on top of this clean foundation
