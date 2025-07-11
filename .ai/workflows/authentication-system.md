# Authentication System Documentation

## 📋 Overview

This document provides a comprehensive guide to the authentication system implemented in the Next.js application. The system uses Supabase for backend authentication, server-side rendering for security, and includes automatic profile management with role-based access control.

## 🏗️ Architecture

### Core Technologies
- **Next.js 15** with App Router for server-side rendering
- **Supabase Auth** for authentication backend
- **PostgreSQL** with Row Level Security (RLS)
- **TypeScript** for type safety
- **Zod** for form validation
- **React Hook Form** for form management

### Authentication Flow Overview
```
1. User Registration → 2. Database Trigger → 3. Profile Creation → 4. Role Assignment → 5. Session Management
```

## 🔐 Security Features

### Server-Side First
- All authentication operations happen server-side
- Session validation via middleware
- HTTPOnly cookies for session storage
- Automatic token refresh
- Protected route handling

### Database Security
- Row Level Security (RLS) policies
- Parameterized queries prevent SQL injection
- Automatic profile creation via triggers
- Role-based access control
- Secure password hashing via Supabase

## 🗂️ File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx          # Sign-in page
│   │   ├── sign-up/page.tsx          # Sign-up page
│   │   └── reset-password/page.tsx   # Password reset page
│   ├── auth/
│   │   ├── callback/page.tsx         # Auth callback handler
│   │   └── signout/route.ts          # Sign-out API route
│   └── (dashboard)/                  # Protected routes
├── components/auth/
│   ├── AuthProvider.tsx              # Client-side auth context
│   ├── SignInForm.tsx                # Sign-in form component
│   ├── SignUpForm.tsx                # Sign-up form component
│   ├── PasswordResetForm.tsx         # Password reset form
│   └── NewPasswordForm.tsx           # New password form
├── lib/supabase/
│   ├── client.ts                     # Browser client
│   └── server.ts                     # Server client
└── middleware.ts                     # Route protection
```

## 🔄 Authentication Workflows

### 1. User Registration Flow

**Components:** `SignUpForm.tsx`, Database Trigger

**Steps:**
1. User fills out registration form with email, password, username, and full name
2. Client-side validation checks password strength and username availability
3. Form submission calls `supabase.auth.signUp()` with user data
4. Supabase creates user in `auth.users` table
5. Database trigger `handle_new_user()` executes automatically
6. Profile created in `profiles` table with user information
7. Default 'user' role assigned via `profile_roles` table
8. User redirected to dashboard with active session

**Key Features:**
- Real-time username availability checking
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Email verification support
- Automatic profile creation
- Role assignment

**Code Example:**
```typescript
const { error, data } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName,
      username: username,
    }
  }
})
```

### 2. User Sign-In Flow

**Components:** `SignInForm.tsx`, Middleware

**Steps:**
1. User enters email and password
2. Form submission calls `supabase.auth.signInWithPassword()`
3. Supabase validates credentials
4. Session cookies set automatically
5. User redirected to dashboard
6. Middleware validates session on subsequent requests

**Key Features:**
- Password visibility toggle
- Error handling for invalid credentials
- Automatic session management
- Remember me functionality via cookies

**Code Example:**
```typescript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

### 3. Password Reset Flow

**Components:** `PasswordResetForm.tsx`, `NewPasswordForm.tsx`

**Steps:**
1. User enters email in password reset form
2. `supabase.auth.resetPasswordForEmail()` called
3. Email sent with reset link to `/auth/callback`
4. User clicks link and is redirected to callback page
5. `NewPasswordForm` allows user to set new password
6. Password updated in Supabase
7. User can sign in with new password

**Key Features:**
- Email validation
- Secure token-based reset
- Success/error state handling
- Automatic redirect handling

### 4. Session Management

**Components:** `middleware.ts`, `AuthProvider.tsx`

**Server-Side (Middleware):**
- Runs on every request
- Validates session cookies
- Protects routes based on authentication status
- Handles automatic redirects

**Client-Side (AuthProvider):**
- Provides authentication context
- Handles auth state changes
- Manages sign-out functionality
- Syncs with server state

**Protected Routes:**
- `/dashboard` - Main dashboard
- `/profile` - User profile management
- `/settings` - Account settings

**Code Example:**
```typescript
// Middleware protection
if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}
```

## 🗄️ Database Schema

### Tables Structure

**profiles table:**
```sql
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  location text,
  date_of_birth date,
  phone text,
  is_public boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);
```

**roles table:**
```sql
CREATE TABLE roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**profile_roles table (junction):**
```sql
CREATE TABLE profile_roles (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (profile_id, role_id)
);
```

### Database Triggers

**Automatic Profile Creation:**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Row Level Security (RLS) Policies

**Profile Access Control:**
```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can view public profiles
CREATE POLICY "Users can view public profiles" ON profiles
  FOR SELECT USING (is_public = true);
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Client Configuration

**Browser Client (`client.ts`):**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server Client (`server.ts`):**
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

## 🎨 UI Components

### Form Components
- **SignInForm**: Email/password sign-in with validation
- **SignUpForm**: Registration with username checking and password strength
- **PasswordResetForm**: Email-based password reset
- **NewPasswordForm**: New password setting after reset

### Features
- Form validation with Zod schemas
- Loading states and error handling
- Toast notifications for feedback
- Responsive design
- Accessibility compliance

## 🛡️ Security Considerations

### Authentication Security
- Server-side session validation
- HTTPOnly cookies prevent XSS
- Automatic token refresh
- Session timeout handling
- CSRF protection via same-site cookies

### Data Security
- RLS policies enforce access control
- Parameterized queries prevent SQL injection
- Email verification prevents account takeovers
- Secure password hashing
- Role-based permissions

### Route Protection
- Middleware validates all requests
- Protected routes redirect unauthenticated users
- Auth routes redirect authenticated users
- Proper caching headers for security

## 🔍 Error Handling

### Authentication Errors
- Invalid credentials
- User already exists
- Weak passwords
- Email verification required
- Network errors

### Database Errors
- Profile creation failures
- Role assignment errors
- Connection issues
- Constraint violations

### UI Error States
- Form validation errors
- Loading states
- Toast notifications
- Error boundaries

## 📊 Performance Considerations

### Server-Side Rendering
- Fast initial page loads
- SEO-friendly authentication pages
- Reduced client-side JavaScript
- Better security through SSR

### Database Optimization
- Indexed columns for performance
- Efficient RLS policies
- Minimal query complexity
- Connection pooling

### Caching Strategy
- Session data caching
- Static page caching
- CDN for assets
- Browser caching for components

## 🧪 Testing Strategy

### Authentication Testing
- Valid/invalid credential scenarios
- Session management testing
- Route protection verification
- Form validation testing

### Database Testing
- Profile creation verification
- Role assignment testing
- RLS policy validation
- Trigger functionality

### UI Testing
- Form submission flows
- Error state handling
- Loading state verification
- Responsive design testing

## 📝 Usage Examples

### Implementing New Protected Route
```typescript
// 1. Add route to middleware.ts
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/new-route']

// 2. Create page component
export default async function NewProtectedPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/sign-in')
  }
  
  return <div>Protected content</div>
}
```

### Accessing User Data in Server Components
```typescript
export default async function UserPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  return <div>Welcome {profile.full_name}</div>
}
```

### Using Auth Context in Client Components
```typescript
'use client'
import { useAuth } from '@/components/auth/AuthProvider'

export function UserProfile() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not authenticated</div>
  
  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## 🔄 Maintenance and Updates

### Regular Tasks
- Monitor authentication metrics
- Update security dependencies
- Review and update RLS policies
- Test authentication flows
- Monitor error logs

### Security Updates
- Keep Supabase client updated
- Monitor security advisories
- Update authentication dependencies
- Review and rotate secrets
- Audit access patterns

## 📚 Additional Resources

### Documentation Links
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

### Internal Documentation
- `/docs/auth/overview` - Authentication system overview
- `/docs/quick-start` - Setup instructions
- `/docs/features/authentication` - Feature documentation

This documentation serves as the definitive guide for understanding and working with the authentication system in this Next.js application. It should be referenced whenever implementing authentication-related features or debugging authentication issues.
