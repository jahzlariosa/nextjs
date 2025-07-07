# Quick Start Guide - Next Steps

## Immediate Setup Tasks

### 1. Configure Supabase MCP Connection
Your project already includes a Supabase MCP server 1. Create profile schema
2. Build profile management components (with skeletons)
3. Add profile editing capability (client components only when needed)

### Priority 5: Session Managementguration in `.vscode/mcp.json`. To use it:

1. Get your Supabase Personal Access Token from [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to your project settings → API section
3. Create or copy your Personal Access Token
4. When prompted in VS Code, enter your token

The MCP server provides:
- Direct database access and queries
- Migration management
- Real-time project logs
- Schema inspection
- Edge function deployment

### 2. Set up Shadcn UI
```bash
# Initialize Shadcn UI
npx shadcn@latest init

# Install essential components
npx shadcn@latest add button input label card form avatar dropdown-menu dialog toast
```

### 3. Set up Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key
3. Set up authentication providers in Supabase dashboard

### 4. Install Required Dependencies
Run these commands in your terminal:

```bash
# Core Supabase dependencies (SSR)
npm install @supabase/supabase-js @supabase/ssr

# Form handling and validation
npm install react-hook-form @hookform/resolvers zod

# Icons (used by Shadcn UI)
npm install lucide-react

# Additional dependencies for Shadcn UI
npm install class-variance-authority clsx tailwind-merge
```

### 5. Create Environment Variables
Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 6. Create Basic Supabase Client
This will be your first code file to create:

**File: `src/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**File: `src/lib/supabase/server.ts`**
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

### 7. Database Setup
In your Supabase SQL editor, run:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## Today's Development Focus

### Priority 1: Setup Foundation
1. Configure Supabase MCP connection
2. Initialize Shadcn UI (with skeleton component)
3. Set up Supabase client (server-first)
4. Configure environment variables
5. Install essential UI components

### Priority 2: Server-First Architecture
1. Create server components for pages
2. Implement proper cache busting
3. Add skeleton loading states
4. Group components with barrel exports
5. Set up code splitting patterns

### Priority 3: Authentication Foundation
1. Set up Supabase client
2. Create authentication context
3. Build sign-in/sign-up pages (server components)
4. Implement protected routes (server-side)

### Priority 4: Basic User Profile
1. Create profile schema
2. Build profile management component
3. Add profile editing capability

### Priority 4: Session Management
1. Implement session refresh
2. Add logout functionality
3. Create auth guards

## File Creation Order

1. `.vscode/mcp.json` - Supabase MCP configuration (already exists)
2. `components.json` - Shadcn UI configuration (auto-generated)
3. `src/lib/utils.ts` - Utility functions (auto-generated)
4. `src/components/ui/skeleton.tsx` - Skeleton component (via Shadcn CLI)
5. `src/lib/supabase/server.ts` - Server Supabase client (prioritize server)
6. `src/lib/supabase/client.ts` - Browser Supabase client (minimal usage)
7. `src/middleware.ts` - Auth middleware with cache busting
8. `src/components/skeletons/index.ts` - Skeleton components barrel export
9. `src/components/auth/index.ts` - Auth components barrel export
10. `src/app/loading.tsx` - Global loading skeleton
11. `src/app/(auth)/sign-in/page.tsx` - Sign-in page (server component)
12. `src/app/(auth)/sign-in/loading.tsx` - Sign-in loading skeleton
13. `src/components/profile/index.ts` - Profile components barrel export
14. `src/components/profile/ProfileSkeleton.tsx` - Profile skeleton component

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Bundle analysis (add to package.json)
npm run analyze

# Install skeleton component
npx shadcn@latest add skeleton

# Install essential components with skeleton
npx shadcn@latest add button input card avatar skeleton
```

## Architecture Guidelines

### Server-First Approach
- Default to server components for all pages
- Use 'use client' only when necessary
- Fetch data in server components using Supabase server client
- Implement cache busting for authenticated pages

### Code Splitting Rules
- Group related components together
- Use dynamic imports for components > 50KB
- Always provide skeleton loading states
- Use barrel exports for component organization

### Skeleton Loading Pattern
```typescript
// Always provide skeleton loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <ComponentSkeleton />
})

// Use Suspense boundaries
<Suspense fallback={<ComponentSkeleton />}>
  <AsyncComponent />
</Suspense>
```

### Component Organization
```typescript
// components/feature/index.ts
export { FeatureCard } from './FeatureCard'
export { FeatureForm } from './FeatureForm'
export { FeatureSkeleton } from './FeatureSkeleton'

// Usage
import { FeatureCard, FeatureSkeleton } from '@/components/feature'
```

## Useful VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter

---

Ready to start? Let me know which part you'd like to implement first!
