import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RolesTable } from '@/components/admin/RolesTable'
import { RolesSkeleton } from '@/components/admin/RolesSkeleton'

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Role Management</h2>
        <p className="text-muted-foreground">
          Create and manage user roles and permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            View and manage all roles in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<RolesSkeleton />}>
            <RolesTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
