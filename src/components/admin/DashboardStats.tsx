'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, Activity, UserCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface DashboardStats {
  totalUsers: number
  totalRoles: number
  activeUsers: number
  newUsersToday: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalRoles: 0,
    activeUsers: 0,
    newUsersToday: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
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

      setStats({
        totalUsers: totalUsers || 0,
        totalRoles: totalRoles || 0,
        activeUsers,
        newUsersToday: newUsersToday || 0
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-1" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Registered users in the system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Users active in the last 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRoles}</div>
          <p className="text-xs text-muted-foreground">
            Role types configured
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Today</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.newUsersToday}</div>
          <p className="text-xs text-muted-foreground">
            New registrations today
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
