import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersTable } from '@/components/admin/UsersTable'
import { UsersSkeleton } from '@/components/admin/UsersSkeleton'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage user accounts, profiles, and role assignments
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            View and manage all registered users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<UsersSkeleton />}>
            <UsersTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
