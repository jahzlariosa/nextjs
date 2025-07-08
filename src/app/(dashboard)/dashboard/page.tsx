import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { ProfileSkeleton } from '@/components/skeletons'
import { UserProfileClient } from '@/components/profile'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Profile } from '@/lib/types'

// Force dynamic rendering and prevent caching for authenticated pages
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
    .select('*, roles:profile_roles(roles(id, name)))')
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
      initialProfile={profile as unknown as Profile}
    />
  )
}
