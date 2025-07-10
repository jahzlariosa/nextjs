# Next.js 15 App Router Patterns & Best Practices

## Server vs Client Components

### Server Components (Default)
- Use for data fetching, static content, and server-side operations
- Can access server-side resources directly
- Render on the server, reducing client-side JavaScript

```typescript
// Server Component (default)
import { createClient } from '@/lib/supabase/server'

export default async function UserProfile() {
  const supabase = createClient()
  const { data: user } = await supabase.auth.getUser()
  
  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
    </div>
  )
}
```

### Client Components
- Use 'use client' directive
- Required for hooks, event handlers, browser APIs
- Interactive components that need state

```typescript
'use client'

import { useState } from 'react'

export default function InteractiveForm() {
  const [value, setValue] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}
```

## Authentication Patterns

### Server-Side Authentication
```typescript
// page.tsx (Server Component)
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/sign-in')
  }
  
  return <div>Protected content</div>
}
```

### Client-Side Authentication
```typescript
'use client'

import { useAuth } from '@/components/auth/AuthProvider'

export default function ClientProtectedComponent() {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return <div>User content</div>
}
```

## Data Fetching Patterns

### Server-Side Data Fetching
```typescript
// Preferred for initial page data
export default async function PostsPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  return (
    <div>
      {posts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

### Client-Side Data Fetching
```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DynamicPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient()
      const { data } = await supabase.from('posts').select('*')
      setPosts(data || [])
      setLoading(false)
    }
    
    fetchPosts()
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

## Form Handling Patterns

### Server Actions
```typescript
// app/actions/user.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = createClient()
  
  const updates = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  }
  
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
  
  if (error) {
    throw new Error(error.message)
  }
  
  redirect('/profile')
}
```

### Client-Side Forms with react-hook-form
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

type FormData = z.infer<typeof schema>

export default function ProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = async (data: FormData) => {
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Loading States & Error Handling

### Loading UI
```typescript
// loading.tsx (automatically used by Next.js)
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}
```

### Error Boundaries
```typescript
// error.tsx (automatically used by Next.js)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Metadata and SEO

### Static Metadata
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile | Your App',
  description: 'Manage your profile settings',
}

export default function ProfilePage() {
  return <div>Profile content</div>
}
```

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

## TypeScript Patterns

### Component Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children,
  onClick 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium',
        {
          'bg-blue-600 text-white': variant === 'primary',
          'bg-gray-200 text-gray-900': variant === 'secondary',
        },
        {
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Custom Hooks
```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const supabase = createClient()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])
  
  return { user, loading }
}
```

## Styling with Tailwind CSS

### Component Styling
```typescript
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}>
      {children}
    </div>
  )
}
```

### Conditional Styling
```typescript
function StatusBadge({ status }: { status: 'active' | 'inactive' | 'pending' }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
      {
        'bg-green-100 text-green-800': status === 'active',
        'bg-red-100 text-red-800': status === 'inactive',
        'bg-yellow-100 text-yellow-800': status === 'pending',
      }
    )}>
      {status}
    </span>
  )
}
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

export function Avatar({ src, alt, size = 40 }: { src: string, alt: string, size?: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full"
      priority={false}
    />
  )
}
```

### Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <div>Loading...</div> }
)

export default function Page() {
  return (
    <div>
      <HeavyComponent />
    </div>
  )
}
```

## Common Patterns Summary

1. **Server Components** for initial data fetching and static content
2. **Client Components** for interactivity and state management
3. **Server Actions** for form submissions and data mutations
4. **TypeScript interfaces** for component props and data structures
5. **Zod schemas** for form validation
6. **Tailwind CSS** with `cn()` utility for conditional styling
7. **Next.js Image** component for optimized images
8. **Error boundaries** and loading states for better UX
9. **Custom hooks** for reusable logic
10. **Proper metadata** for SEO optimization
