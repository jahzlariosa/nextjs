import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SignUpForm } from '@/components/auth'
import { Suspense } from 'react'
import { AuthSkeleton } from '@/components/skeletons'

// Force dynamic rendering and prevent caching for auth pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignUpPage() {
  const supabase = await createClient()
  
  // Check if user is already authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Suspense fallback={<AuthSkeleton />}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  )
}
