import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { UserProfileClient } from '@/components/profile'
import { Profile } from '@/lib/types'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, roles:profile_roles(roles(id, name)))')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and profile information.
        </p>
      </div>
      <UserProfileClient userId={user.id} initialProfile={profile as unknown as Profile} />
    </div>
  )
}
