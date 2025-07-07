# Next.js + Supabase Development Guide

## Project Overview

This is a modern Next.js application template focused on Supabase integration, authentication, user profiles, and session management. The project uses TypeScript, Tailwind CSS, and follows Next.js 15 App Router conventions.

## Current Project Structure

```
nextjs/
├── .vscode/
│   └── mcp.json (Supabase MCP configuration)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── sign-up/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   └── reset-password/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── auth/
│   │   │   ├── signout/
│   │   │   │   └── route.ts
│   │   │   └── reset-password/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/ (Shadcn UI primitives)
│   │   ├── auth/
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── SignOutButton.tsx
│   │   │   ├── PasswordResetForm.tsx
│   │   │   ├── NewPasswordForm.tsx
│   │   │   └── index.ts
│   │   ├── profile/
│   │   │   ├── ProfileDisplay.tsx
│   │   │   ├── ProfileEditForm.tsx
│   │   │   ├── UserProfileClient.tsx
│   │   │   └── index.ts
│   │   └── skeletons/
│   │       ├── AuthSkeleton.tsx
│   │       ├── ProfileSkeleton.tsx
│   │       ├── CardSkeleton.tsx
│   │       ├── FormSkeleton.tsx
│   │       └── index.ts
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── server.ts
│   └── middleware.ts
├── public/
│   └── [static assets]
├── .env.local
├── package.json
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── components.json
├── DEVELOPMENT_GUIDE.md
├── QUICK_START.md
├── AUTHENTICATION_WORKFLOW.md
└── README.md
```

## Technology Stack

- **Framework**: Next.js 15 (App Router with SSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **UI Components**: Shadcn UI (Radix UI + Tailwind)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with SSR
- **Architecture**: Server-First with Code Splitting
- **Deployment**: Vercel (recommended)

## Development Roadmap

### Phase 1: Project Setup & Foundation ✅ COMPLETED
- [x] Initialize Next.js project with TypeScript
- [x] Configure Tailwind CSS  
- [x] Set up Supabase MCP connection
- [x] Set up Shadcn UI
- [x] Set up Supabase project
- [x] Install and configure Supabase client
- [x] Set up environment variables
- [x] Create basic project structure

### Phase 2: Authentication & User Management ✅ COMPLETED
- [x] Set up Supabase Auth with SSR
- [x] Create authentication middleware
- [x] Implement sign-in/sign-up forms
- [x] Create user profiles table with RLS
- [x] Auto-profile creation on sign-up
- [x] Implement session management
- [x] Create sign-out functionality
- [x] Add password reset functionality

### Phase 3: UI Components & Layouts ✅ COMPLETED
- [x] Install Shadcn UI components
- [x] Create skeleton loading components
- [x] Design authentication forms
- [x] Create profile management components
- [x] Build dashboard layout
- [x] Add responsive design
- [x] Implement proper code splitting

### Phase 4: Profile Management ✅ COMPLETED
- [x] Create profile display component
- [x] Build profile editing form
- [x] Add profile validation
- [x] Implement profile updates
- [x] Add form error handling
- [x] Create client-side profile refresh

### Phase 5: Advanced Features (Next Steps)
- [ ] Add social login providers (Google, GitHub, etc.)
- [ ] Implement avatar upload functionality
- [ ] Create user settings page
- [ ] Add admin dashboard
- [ ] Implement user roles and permissions
- [ ] Add email templates customization
- [ ] Create audit logging

### Phase 6: Performance & Production
- [ ] Implement caching strategies
- [ ] Add monitoring and analytics
- [ ] Set up error tracking
- [ ] Optimize database queries
- [ ] Add rate limiting
- [ ] Implement security headers
- [ ] Set up CI/CD pipeline

### Phase 7: Testing & Quality Assurance
- [ ] Add unit tests for components
- [ ] Create integration tests
- [ ] Implement E2E testing
- [ ] Add performance testing
- [ ] Set up automated testing pipeline
- [ ] Create responsive design system
- [ ] Implement dark/light mode
- [ ] Add loading states with skeleton components
- [ ] Create reusable components library
- [ ] Add animations and transitions
- [ ] Implement code splitting strategies
- [ ] Optimize bundle sizes

### Phase 6: Advanced Features
- [ ] Implement real-time features (if needed)
- [ ] Add file upload and management
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Implement search functionality

### Phase 7: Testing & Deployment
- [ ] Set up unit testing (Jest, React Testing Library)
- [ ] Add integration tests
- [ ] Configure CI/CD pipeline
- [ ] Deploy to Vercel
- [ ] Set up monitoring and analytics

## Dependencies to Install

### Core Dependencies (SSR)
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```

### UI & Form Libraries
```bash
# Shadcn UI (will be installed via CLI)
npx shadcn@latest init

# Additional UI components
npm install react-hook-form @hookform/resolvers
npm install zod # for schema validation
npm install lucide-react # icons used by Shadcn
```

## Architecture Principles

### Server-First Approach
Our architecture prioritizes server-side rendering and server components for optimal performance:

#### Server Components (Default)
- Use server components by default for all pages and layouts
- Fetch data directly in server components using Supabase server client
- Minimize client-side JavaScript bundle
- Better SEO and initial page load performance

#### Client Components (When Needed)
Only use client components for:
- Interactive features (form inputs, buttons with state)
- Browser-only APIs (localStorage, geolocation)
- Event handlers and user interactions
- Third-party libraries that require client-side rendering

```typescript
// ✅ Good: Server Component (default)
import { createClient } from '@/lib/supabase/server'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profiles').select('*').single()
  
  return <ProfileDisplay profile={profile} />
}

// ✅ Good: Client Component (when needed)
'use client'
import { useState } from 'react'

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  // Interactive form logic
}
```

### Code Splitting Strategy

#### Automatic Code Splitting
- Next.js automatically splits code at the page level
- Each route gets its own JavaScript bundle
- Shared components are automatically optimized

#### Manual Code Splitting
For large components, use dynamic imports:

```typescript
// Dynamic import for heavy components
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const HeavyChart = dynamic(() => import('@/components/charts/HeavyChart'), {
  loading: () => <Skeleton className="w-full h-64" />,
  ssr: false // Only if component requires client-side rendering
})

// Group related components
const ProfileComponents = dynamic(() => import('@/components/profile/ProfileComponents'), {
  loading: () => <ProfileSkeleton />
})
```

#### Bundle Analysis
```bash
# Analyze bundle sizes
npm run build
npx @next/bundle-analyzer
```

### Component Organization

#### Component Grouping
Always group related components together:

```typescript
// ✅ Good: Group related components
// components/profile/index.ts
export { ProfileCard } from './ProfileCard'
export { ProfileForm } from './ProfileForm'
export { ProfileSkeleton } from './ProfileSkeleton'
export { ProfileAvatar } from './ProfileAvatar'

// Import as a group
import { ProfileCard, ProfileForm, ProfileSkeleton } from '@/components/profile'
```

#### Component Structure
```
components/
├── ui/ (Shadcn UI primitives)
├── auth/
│   ├── index.ts (barrel export)
│   ├── SignInForm.tsx
│   ├── SignUpForm.tsx
│   ├── AuthProvider.tsx
│   └── AuthSkeleton.tsx
├── profile/
│   ├── index.ts
│   ├── ProfileCard.tsx
│   ├── ProfileForm.tsx
│   ├── ProfileSkeleton.tsx
│   └── ProfileAvatar.tsx
└── layout/
    ├── index.ts
    ├── Header.tsx
    ├── Navigation.tsx
    ├── Footer.tsx
    └── LayoutSkeleton.tsx
```

### Cache Busting for Authentication

#### Server-Side Cache Control
```typescript
// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()
  
  // This will automatically bust cache when session changes
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/sign-in')
  }
  
  // Cache-busting headers for authenticated pages
  return (
    <div>
      {/* Dashboard content */}
    </div>
  )
}

// Force no-cache for authenticated pages
export const dynamic = 'force-dynamic'
export const revalidate = 0
```

#### Middleware Cache Control
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Prevent caching of authenticated pages
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/profile')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  return response
}
```

### Skeleton Loading Components

#### Always Use Skeletons
Replace all loading states with skeleton components:

```typescript
// ✅ Good: Skeleton for loading states
import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

// Usage in dynamic imports
const ProfileCard = dynamic(() => import('./ProfileCard'), {
  loading: () => <ProfileSkeleton />
})
```

#### Skeleton Patterns
```typescript
// Common skeleton patterns
export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-24" />
    </div>
  )
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number, cols?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
```

### Minimal Code Principles

#### Bundle Size Optimization
- Use tree-shaking compatible imports
- Prefer server components over client components
- Implement lazy loading for non-critical components
- Use dynamic imports for heavy libraries

```typescript
// ✅ Good: Tree-shakable imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// ❌ Bad: Imports entire library
import * as UI from '@/components/ui'

// ✅ Good: Dynamic import for heavy components
const Charts = dynamic(() => import('@/components/charts'), {
  loading: () => <Skeleton className="w-full h-64" />
})
```

#### Component Optimization
```typescript
// ✅ Good: Minimal, focused components
interface ProfileCardProps {
  profile: Profile
  isOwner?: boolean
}

export function ProfileCard({ profile, isOwner = false }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <ProfileAvatar src={profile.avatar_url} />
        <ProfileInfo profile={profile} />
      </CardHeader>
      {isOwner && (
        <CardContent>
          <ProfileActions profileId={profile.id} />
        </CardContent>
      )}
    </Card>
  )
}
```

### Performance Monitoring

#### Bundle Analysis
```bash
# Add to package.json scripts
"analyze": "cross-env ANALYZE=true next build",
"analyze:server": "cross-env BUNDLE_ANALYZE=server next build",
"analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build"
```

#### Performance Metrics
- Monitor Core Web Vitals
- Track bundle sizes
- Measure Time to Interactive (TTI)
- Monitor First Contentful Paint (FCP)

### Development Dependencies
```bash
npm install -D @types/node @types/react @types/react-dom
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D cypress # for e2e testing
```

## Shadcn UI Setup

### Initial Setup
```bash
# Initialize Shadcn UI
npx shadcn@latest init

# When prompted, choose:
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate (or your preference)
# - CSS variables: Yes
# - CSS file: src/app/globals.css
# - CSS variable prefix: (leave empty)
# - Tailwind config: tailwind.config.js
# - Components: src/components
# - Utils: src/lib/utils
# - React Server Components: Yes
# - Components prefix: (leave empty)
```

### Essential Components to Install
```bash
# Core UI components for authentication and profile management
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add tabs
npx shadcn@latest add separator
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add skeleton
npx shadcn@latest add navigation-menu
```

### Shadcn UI Configuration Files
After initialization, you'll have these files:

#### `src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils"
  }
}
```

## Shadcn UI Authentication Examples

### Sign-in Form with Shadcn UI
```typescript
// components/auth/SignInForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your email and password to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### Profile Card with Shadcn UI
```typescript
// components/profile/ProfileCard.tsx
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { User, Mail, MapPin, Globe } from 'lucide-react'

interface ProfileCardProps {
  profile: {
    full_name?: string
    username?: string
    bio?: string
    avatar_url?: string
    website?: string
    location?: string
  }
  email: string
  onEdit?: () => void
}

export function ProfileCard({ profile, email, onEdit }: ProfileCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
          <AvatarFallback>
            <User className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-2xl">
            {profile.full_name || 'Anonymous User'}
          </CardTitle>
          <CardDescription>
            @{profile.username || 'username'}
          </CardDescription>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit} className="mt-2">
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.bio && (
          <p className="text-sm text-muted-foreground">{profile.bio}</p>
        )}
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </div>
          
          {profile.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          )}
          
          {profile.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profile.website}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

## SSR Configuration

### Supabase MCP Connection

This project includes a Supabase MCP (Model Context Protocol) server configuration for enhanced development experience. The MCP server provides direct access to your Supabase project for database operations, migrations, and management.

#### MCP Configuration (`.vscode/mcp.json`)
```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "supabase-access-token",
      "description": "Supabase personal access token",
      "password": true
    }
  ],
  "servers": {
    "supabase": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@supabase/mcp-server-supabase@latest", "--read-only", "--project-ref=rtxmeemrqxstdbzceyzr"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${input:supabase-access-token}"
      }
    }
  }
}
```

#### Getting Your Supabase Access Token
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project settings
3. Go to **API** section
4. Copy your **Personal Access Token** (create one if needed)
5. When prompted in VS Code, paste your token

#### MCP Server Capabilities
The Supabase MCP server provides:
- **Database Operations**: Execute SQL queries and view results
- **Migration Management**: Create, apply, and manage database migrations
- **Schema Inspection**: View tables, columns, and relationships
- **RLS Policies**: Manage Row Level Security policies
- **Edge Functions**: Deploy and manage Supabase Edge Functions
- **Real-time Logs**: View project logs for debugging

#### Usage Examples
With the MCP server, you can:
```sql
-- View all tables
SELECT * FROM information_schema.tables WHERE table_schema = 'public';

-- Check user profiles
SELECT * FROM profiles LIMIT 5;

-- Create a new migration
-- This will be handled through the MCP interface
```

### Supabase SSR Setup
With Supabase SSR, you'll need to create different client instances for different environments:

#### Client Components (`src/lib/supabase/client.ts`)
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server Components (`src/lib/supabase/server.ts`)
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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )
}
```

#### Middleware (`src/middleware.ts`)
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

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

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes logic
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  const authRoutes = ['/sign-in', '/sign-up']
  
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = '/sign-in'
      return NextResponse.redirect(url)
    }
  }

  if (authRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (session) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## SSR Authentication Patterns

### Server Component Authentication
```typescript
// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div>
      <h1>Welcome, {profile?.full_name || session.user.email}</h1>
    </div>
  )
}
```

### Client Component Authentication
```typescript
// components/auth/AuthProvider.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        router.refresh()
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Social Auth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Planned Directory Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   ├── page.tsx (Server Component)
│   │   │   └── loading.tsx (Skeleton)
│   │   ├── sign-up/
│   │   │   ├── page.tsx (Server Component)
│   │   │   └── loading.tsx (Skeleton)
│   │   └── reset-password/
│   │       ├── page.tsx (Server Component)
│   │       └── loading.tsx (Skeleton)
│   ├── (dashboard)/
│   │   ├── profile/
│   │   │   ├── page.tsx (Server Component)
│   │   │   └── loading.tsx (Skeleton)
│   │   ├── settings/
│   │   │   ├── page.tsx (Server Component)
│   │   │   └── loading.tsx (Skeleton)
│   │   └── layout.tsx (Server Component)
│   ├── api/
│   │   ├── auth/
│   │   └── users/
│   ├── globals.css
│   ├── layout.tsx (Server Component)
│   ├── loading.tsx (Global Skeleton)
│   └── page.tsx (Server Component)
├── components/
│   ├── ui/ (Shadcn UI primitives)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   ├── auth/
│   │   ├── index.ts (barrel export)
│   │   ├── AuthProvider.tsx (Client Component)
│   │   ├── SignInForm.tsx (Client Component)
│   │   ├── SignUpForm.tsx (Client Component)
│   │   ├── AuthSkeleton.tsx (Server Component)
│   │   └── ProtectedRoute.tsx (Server Component)
│   ├── profile/
│   │   ├── index.ts (barrel export)
│   │   ├── ProfileCard.tsx (Server Component)
│   │   ├── ProfileForm.tsx (Client Component)
│   │   ├── ProfileSkeleton.tsx (Server Component)
│   │   └── AvatarUpload.tsx (Client Component)
│   ├── layout/
│   │   ├── index.ts (barrel export)
│   │   ├── Header.tsx (Server Component)
│   │   ├── Navigation.tsx (Server/Client Hybrid)
│   │   ├── Footer.tsx (Server Component)
│   │   └── LayoutSkeleton.tsx (Server Component)
│   └── skeletons/
│       ├── index.ts (barrel export)
│       ├── CardSkeleton.tsx
│       ├── ListSkeleton.tsx
│       ├── TableSkeleton.tsx
│       └── FormSkeleton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts (Browser client)
│   │   ├── server.ts (Server client)
│   │   └── middleware.ts
│   ├── auth/
│   │   ├── config.ts
│   │   └── utils.ts
│   ├── utils.ts (includes cn function)
│   └── validations.ts
├── hooks/
│   ├── useAuth.ts (Client-side hooks)
│   ├── useProfile.ts
│   └── useSupabase.ts
├── types/
│   ├── auth.ts
│   ├── profile.ts
│   └── database.ts
└── styles/
    └── globals.css
```

### Server-First Examples

#### Server Component Dashboard
```typescript
// app/dashboard/page.tsx (Server Component)
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileCard, ProfileSkeleton } from '@/components/profile'
import { Suspense } from 'react'

// Cache busting for authenticated pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/sign-in')

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <Suspense fallback={<ProfileSkeleton />}>
        <UserProfile userId={session.user.id} />
      </Suspense>
    </div>
  )
}

// Separate async component for data fetching
async function UserProfile({ userId }: { userId: string }) {
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return <ProfileCard profile={profile} />
}
```

#### Barrel Export Pattern
```typescript
// components/profile/index.ts
export { ProfileCard } from './ProfileCard'
export { ProfileForm } from './ProfileForm'
export { ProfileSkeleton } from './ProfileSkeleton'
export { AvatarUpload } from './AvatarUpload'

// Usage
import { ProfileCard, ProfileForm, ProfileSkeleton } from '@/components/profile'
```

#### Component with Skeleton Loading
```typescript
// components/profile/ProfileCard.tsx
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileCardProps {
  profile: Profile | null
  isLoading?: boolean
}

export function ProfileCard({ profile, isLoading = false }: ProfileCardProps) {
  if (isLoading || !profile) {
    return <ProfileSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.avatar_url} />
          <AvatarFallback>
            <Skeleton className="h-full w-full rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-2xl font-bold">{profile.full_name}</h3>
          <p className="text-muted-foreground">@{profile.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      </CardContent>
    </Card>
  )
}

// Dedicated skeleton component
export function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardContent>
    </Card>
  )
}
```

#### Dynamic Import with Code Splitting
```typescript
// pages/dashboard/analytics.tsx
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

// Code split heavy analytics components
const AnalyticsChart = dynamic(() => import('@/components/analytics/AnalyticsChart'), {
  loading: () => <Skeleton className="w-full h-64" />,
  ssr: false // Only if component requires client-side rendering
})

const AnalyticsTable = dynamic(() => import('@/components/analytics/AnalyticsTable'), {
  loading: () => <Skeleton className="w-full h-96" />
})

// Group related components
const AnalyticsComponents = dynamic(() => import('@/components/analytics'), {
  loading: () => (
    <div className="space-y-4">
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-96" />
    </div>
  )
})

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsChart />
      <AnalyticsTable />
    </div>
  )
}
```

## Database Schema Design

### Users Table (managed by Supabase Auth)
```sql
-- This table is automatically created by Supabase Auth
-- We'll extend it with additional profile information
```

### Profiles Table
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

### Row Level Security Policies
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## Key Features to Implement

### 1. Authentication
- Email/password authentication
- Social login (Google, GitHub)
- Email verification
- Password reset functionality
- Session management
- Protected routes

### 2. User Profiles
- Profile creation and editing
- Avatar upload
- User preferences
- Account settings
- Profile visibility controls

### 3. Session Management
- Automatic session refresh
- Secure token handling
- Session persistence
- Logout functionality

### 4. Security
- Row Level Security (RLS)
- Input validation
- CSRF protection
- Rate limiting
- Secure headers

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful component and variable names
- Implement proper error handling
- Write comprehensive comments
- Prioritize server components over client components

### Component Structure
- Keep components small and focused
- Use custom hooks for complex logic
- Always implement skeleton loading states
- Make components reusable and composable
- Use TypeScript interfaces for props
- Group related components together with barrel exports

### Server-First Development
- Default to server components for all new components
- Only use 'use client' when absolutely necessary
- Fetch data in server components using Supabase server client
- Minimize client-side JavaScript bundle
- Use dynamic imports for heavy client components

### Code Splitting Best Practices
- Implement automatic code splitting at page level
- Use dynamic imports for components > 50KB
- Group related components in single imports
- Always provide skeleton loading states for dynamic imports
- Analyze bundle sizes regularly with webpack-bundle-analyzer

### Performance Optimization
- Use React.memo() for expensive client components
- Implement proper caching strategies
- Bust cache for authenticated pages
- Use Next.js Image component for optimized images
- Implement proper loading states with skeletons

### Database Best Practices
- Use RLS for security
- Implement proper indexing
- Use database functions for complex operations
- Validate data on both client and server
- Handle database errors gracefully
- Use MCP server for database management and debugging

### MCP Development Workflow
- Use MCP server for real-time database inspection
- Test SQL queries directly through MCP interface
- Monitor application logs via MCP server
- Deploy Edge Functions using MCP tools
- Manage migrations with MCP assistance

## Testing Strategy

### Unit Tests
- Test individual components
- Test custom hooks
- Test utility functions
- Test authentication flows

### Integration Tests
- Test API routes
- Test database operations
- Test user workflows
- Test authentication integration

### E2E Tests
- Test complete user journeys
- Test authentication flows
- Test profile management
- Test responsive design

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Supabase project setup
- [ ] Database migrations applied
- [ ] RLS policies implemented
- [ ] Domain configured
- [ ] SSL certificates
- [ ] Analytics setup
- [ ] Error monitoring
- [ ] Performance monitoring

## Resources and Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase MCP Server](https://github.com/supabase/mcp-server-supabase)
- [Model Context Protocol](https://spec.modelcontextprotocol.io/)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Next Steps

1. Set up Shadcn UI
2. Set up Supabase project
3. Install required dependencies
4. Configure environment variables
5. Create authentication system
6. Implement user profiles
7. Add session management
8. Test and deploy

---

*This documentation will be updated as the project evolves.*
