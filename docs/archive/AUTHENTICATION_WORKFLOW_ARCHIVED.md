# Authentication Workflow Documentation

## Overview

This document outlines the complete authentication workflow for the Next.js + Supabase SSR application. The authentication system uses server-side rendering with automatic profile creation and proper session management.

## Architecture Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │    Supabase     │
│                 │    │                 │    │                 │
│  Sign Up Form   │───▶│  Server Action  │───▶│  Auth + Profile │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Middleware    │    │  Session Check  │    │   RLS Policies  │
│                 │    │                 │    │                 │
│  Route Guard    │◀───│  Server Client  │◀───│  Row Security   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Database Schema

### 1. Auth Users Table (Managed by Supabase)
- Automatically created by Supabase Auth
- Contains email, password hash, metadata
- UUID primary key used for profile reference

### 2. Profiles Table (Custom)
```sql
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  username text UNIQUE,
  avatar_url text,
  bio text,
  website text,
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);
```

### 3. Database Triggers
Auto-populate profile on user creation:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Authentication Flow

### 1. Sign Up Process

#### Step 1: User Submits Form
```typescript
// app/(auth)/sign-up/page.tsx
const formData = {
  email: 'user@example.com',
  password: 'securepassword',
  full_name: 'John Doe'
}
```

#### Step 2: Server Action Processing
```typescript
// app/(auth)/sign-up/actions.ts
export async function signUp(formData: FormData) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        full_name: formData.get('full_name')
      }
    }
  })
  
  if (error) {
    return { error: error.message }
  }
  
  // Profile automatically created by database trigger
  redirect('/dashboard')
}
```

#### Step 3: Automatic Profile Creation
- Database trigger fires on user creation
- Profile record created with user ID and email
- Full name populated from metadata or email

### 2. Sign In Process

#### Step 1: User Submits Credentials
```typescript
// app/(auth)/sign-in/page.tsx
const credentials = {
  email: 'user@example.com',
  password: 'securepassword'
}
```

#### Step 2: Server Action Processing
```typescript
// app/(auth)/sign-in/actions.ts
export async function signIn(formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password')
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}
```

#### Step 3: Session Establishment
- Supabase creates session cookies
- Middleware validates session on subsequent requests
- Server components can access user data

### 3. Session Management

#### Middleware Session Check
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )
  
  const { data: { session } } = await supabase.auth.getSession()
  
  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }
  
  // Auth routes (redirect if already logged in)
  if (request.nextUrl.pathname.startsWith('/sign-in') || 
      request.nextUrl.pathname.startsWith('/sign-up')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return supabaseResponse
}
```

## Component Structure

### 1. Server Components (Default)

#### Authentication Pages
```typescript
// app/(auth)/sign-in/page.tsx - Server Component
export default function SignInPage() {
  return (
    <div className="container mx-auto max-w-md">
      <SignInForm />
    </div>
  )
}

// app/(auth)/sign-up/page.tsx - Server Component
export default function SignUpPage() {
  return (
    <div className="container mx-auto max-w-md">
      <SignUpForm />
    </div>
  )
}
```

#### Protected Dashboard
```typescript
// app/dashboard/page.tsx - Server Component
export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/sign-in')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  return (
    <div className="container mx-auto">
      <h1>Welcome, {profile?.full_name || session.user.email}!</h1>
      <ProfileCard profile={profile} />
    </div>
  )
}
```

### 2. Client Components (When Needed)

#### Interactive Forms
```typescript
// components/auth/SignInForm.tsx - Client Component
'use client'

import { useState } from 'react'
import { signIn } from '@/app/(auth)/sign-in/actions'

export function SignInForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  
  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError('')
    
    const result = await signIn(formData)
    
    if (result?.error) {
      setError(result.error)
    }
    
    setPending(false)
  }
  
  return (
    <form action={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

## Row Level Security (RLS)

### Profiles Table Policies
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile (handled by trigger)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Public profiles can be viewed by anyone (optional)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);
```

## Error Handling

### Authentication Errors
```typescript
// Common error scenarios
const errorMessages = {
  'Invalid login credentials': 'Invalid email or password',
  'Email not confirmed': 'Please check your email and click the confirmation link',
  'User already registered': 'An account with this email already exists',
  'Password should be at least 6 characters': 'Password must be at least 6 characters long'
}
```

### Error Display
```typescript
// components/auth/ErrorMessage.tsx
import { Alert, AlertDescription } from '@/components/ui/alert'

export function ErrorMessage({ error }: { error: string }) {
  if (!error) return null
  
  return (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
```

## Session State Management

### Client-Side Session Context
```typescript
// components/auth/AuthProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const AuthContext = createContext<{
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}>({
  user: null,
  loading: true,
  signOut: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])
  
  const signOut = async () => {
    await supabase.auth.signOut()
  }
  
  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Cache Strategy

### Authenticated Pages
```typescript
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Prevents caching of authenticated content
```

### Public Pages
```typescript
// app/page.tsx
export const revalidate = 3600 // Cache for 1 hour

// Public content can be cached
```

## Testing Strategy

### Unit Tests
```typescript
// __tests__/auth.test.ts
import { signUp, signIn } from '@/app/(auth)/actions'

describe('Authentication', () => {
  it('should create user and profile on sign up', async () => {
    // Test user creation
  })
  
  it('should authenticate user on sign in', async () => {
    // Test authentication
  })
})
```

### Integration Tests
```typescript
// __tests__/auth-flow.test.ts
describe('Authentication Flow', () => {
  it('should redirect to dashboard after successful sign in', async () => {
    // Test full authentication flow
  })
})
```

## Security Considerations

### 1. Server-Side Validation
- All auth actions happen on server
- Form validation on both client and server
- SQL injection prevention with parameterized queries

### 2. Session Security
- HTTPOnly cookies for session storage
- Secure cookie flags in production
- Automatic session refresh

### 3. Rate Limiting
- Implement rate limiting for auth endpoints
- Prevent brute force attacks
- Monitor failed login attempts

### 4. Password Security
- Minimum password requirements
- Password hashing handled by Supabase
- Optional password strength indicators

## Next Steps

1. **Database Setup**: Create tables, triggers, and RLS policies
2. **Supabase Clients**: Implement server and client Supabase clients
3. **Middleware**: Set up authentication middleware
4. **Components**: Create auth forms with proper error handling
5. **Testing**: Implement comprehensive test suite
6. **Security**: Add rate limiting and additional security measures

---

This workflow ensures a robust, secure, and user-friendly authentication system with proper server-side rendering and automatic profile management.
