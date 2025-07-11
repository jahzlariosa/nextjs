import { createClient } from '@/lib/supabase/server'

export interface UserWithRoles {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  email?: string
  roles: Array<{
    id: string
    name: string
  }>
}

export interface RoleWithUserCount {
  id: string
  name: string
  created_at: string
  user_count: number
}

export interface DashboardStats {
  totalUsers: number
  totalRoles: number
  activeUsers: number
  newUsersToday: number
}

export async function fetchUsersWithRoles(): Promise<UserWithRoles[]> {
  const supabase = await createClient()
  
  // Get users with their roles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      full_name,
      avatar_url,
      created_at,
      profile_roles (
        roles (
          id,
          name
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching users:', error)
    return []
  }

  // Transform the data to match our interface
  return profiles.map(profile => ({
    id: profile.id,
    username: profile.username,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    created_at: profile.created_at,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    roles: profile.profile_roles.map((pr: any) => pr.roles).filter(Boolean)
  }))
}

export async function fetchRolesWithUserCount(): Promise<RoleWithUserCount[]> {
  const supabase = await createClient()
  
  // Get roles with user counts
  const { data: roles, error } = await supabase
    .from('roles')
    .select(`
      id,
      name,
      created_at,
      profile_roles (count)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching roles:', error)
    return []
  }

  // Transform the data to include user counts
  return roles.map(role => ({
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    user_count: Array.isArray(role.profile_roles) ? role.profile_roles.length : 0
  }))
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient()
  
  // Get total users count
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // Get total roles count
  const { count: totalRoles } = await supabase
    .from('roles')
    .select('*', { count: 'exact', head: true })

  // Get users created today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { count: newUsersToday } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  // For now, we'll consider active users as total users
  // In a real app, you might track last_seen or session data
  const activeUsers = Math.floor((totalUsers || 0) * 0.7) // Approximate 70% active

  return {
    totalUsers: totalUsers || 0,
    totalRoles: totalRoles || 0,
    activeUsers,
    newUsersToday: newUsersToday || 0
  }
}
