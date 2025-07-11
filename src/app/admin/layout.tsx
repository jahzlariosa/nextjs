import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    redirect('/sign-in')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  // Check if user has admin role
  const { data: userRoles } = await supabase
    .from('profile_roles')
    .select('role:roles(name)')
    .eq('profile_id', session.user.id)
    
  const hasAdminRole = userRoles?.some(
    (userRole: { role: { name: string }[] }) => {
      if (Array.isArray(userRole.role)) {
        return userRole.role.some((r: { name: string }) => r.name === 'admin')
      }
      return (userRole.role as unknown as { name: string })?.name === 'admin'
    }
  )

  if (!hasAdminRole) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={session.user} profile={profile} />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}
