import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Users, Shield, Settings, Database, Activity } from 'lucide-react'

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Badge variant="secondary">Admin Only</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Complete administrative interface for managing users, roles, and system settings.
          Requires admin role access.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-500" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>
              Manage user accounts, edit profiles, and assign roles to users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/admin/user-management">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-500" />
              <CardTitle>Role Management</CardTitle>
            </div>
            <CardDescription>
              Create and manage system roles and permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/admin/role-management">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-500" />
              <CardTitle>Database & RLS</CardTitle>
            </div>
            <CardDescription>
              Understanding Row Level Security policies and database structure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/admin/database-rls">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-orange-500" />
              <CardTitle>Admin Setup</CardTitle>
            </div>
            <CardDescription>
              How to set up admin access and configure permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/admin/setup">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Admin Features</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Edit User Details:</strong> Update usernames and full names</li>
              <li>• <strong>Role Assignment:</strong> Assign and remove user roles</li>
              <li>• <strong>User Overview:</strong> View all users with their roles</li>
              <li>• <strong>Real-time Updates:</strong> Changes reflect immediately</li>
              <li>• <strong>Professional Interface:</strong> Dialog-based editing system</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Access
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Role-based Access:</strong> Admin role required for access</li>
              <li>• <strong>RLS Policies:</strong> Secure database-level protection</li>
              <li>• <strong>Session Validation:</strong> Proper authentication checks</li>
              <li>• <strong>Error Handling:</strong> Comprehensive validation and feedback</li>
              <li>• <strong>Audit Trail:</strong> All changes are logged and tracked</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Activity className="w-6 h-6 text-blue-500 mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Getting Started with Admin
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              To access admin features, you need an account with the &quot;admin&quot; role. 
              The admin dashboard provides a comprehensive interface for managing users and roles.
            </p>
            <div className="pt-2">
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/docs/admin/setup">
                  Admin Setup Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
