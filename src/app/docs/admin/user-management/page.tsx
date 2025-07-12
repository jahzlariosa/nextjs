import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Users, Edit, Shield, Database } from 'lucide-react'

export default function UserManagementPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">User Management</h1>
          <Badge variant="secondary">Admin Feature</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Comprehensive user management system for editing user details and managing role assignments.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          User management features are only accessible to users with the &quot;admin&quot; role. 
          All actions are logged and changes are applied in real-time.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Accessing User Management
            </CardTitle>
            <CardDescription>
              Navigate to the admin user management interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>URL:</strong> <code>/admin/users</code>
              </p>
              <p className="text-sm mt-2">
                <strong>Requirements:</strong> Admin role and active session
              </p>
              <p className="text-sm mt-2">
                <strong>Features:</strong> Search, pagination, real-time updates
              </p>
            </div>
            <p>
              The user management interface displays all registered users in a table format, 
              showing their profile information, assigned roles, and registration date. The interface 
              includes powerful search functionality and pagination for managing large user bases efficiently.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Editing User Details
            </CardTitle>
            <CardDescription>
              Update user profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Available Actions:</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h5 className="font-medium">Search & Navigation</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Search by name, username, role, or user ID</li>
                  <li>• Real-time filtering as you type</li>
                  <li>• Pagination with 10 users per page</li>
                  <li>• Navigate between pages easily</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">User Operations</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• View detailed user profiles</li>
                  <li>• Edit user details and information</li>
                  <li>• Manage role assignments</li>
                  <li>• Suspend user accounts</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <h4 className="font-semibold">User Editing Workflow:</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h5 className="font-medium">Edit User Details</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Click the dropdown menu (⋯) for any user</li>
                    <li>• Select &quot;Edit user details&quot;</li>
                    <li>• Update username and full name</li>
                    <li>• Changes are saved immediately</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium">Manage Roles</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Click &quot;Manage roles&quot; from the dropdown</li>
                    <li>• Select/deselect roles using checkboxes</li>
                    <li>• Multiple roles can be assigned</li>
                    <li>• Role changes update instantly</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Editable Fields:</h5>
              <div className="grid gap-2 text-sm">
                <div><strong>Username:</strong> User&apos;s display name/handle</div>
                <div><strong>Full Name:</strong> User&apos;s complete name</div>
                <div><strong>Roles:</strong> System roles assigned to the user</div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Search Capabilities:</h5>
              <div className="grid gap-2 text-sm">
                <div><strong>Search Fields:</strong> Full name, username, roles, and user ID</div>
                <div><strong>Real-time:</strong> Results filter instantly as you type</div>
                <div><strong>Pagination:</strong> 10 users per page with navigation controls</div>
                <div><strong>Smart Reset:</strong> Returns to page 1 when search changes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Technical Implementation
            </CardTitle>
            <CardDescription>
              How user management works under the hood
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Database Operations:</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium">User Profile Updates</h5>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  {`UPDATE profiles SET 
  username = $1, 
  full_name = $2 
WHERE id = $3`}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium">Role Management</h5>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  {`-- Remove existing roles
DELETE FROM profile_roles WHERE profile_id = $1;

-- Add new roles
INSERT INTO profile_roles (profile_id, role_id) 
VALUES ($1, $2), ($1, $3), ...`}
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Security Features:</h5>
              <ul className="text-sm space-y-1">
                <li>• RLS policies ensure data protection</li>
                <li>• Admin role validation on every request</li>
                <li>• Input validation and sanitization</li>
                <li>• Real-time error handling and feedback</li>
                <li>• Client-side filtering for performance</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Interface Components</CardTitle>
            <CardDescription>
              Components used in the user management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h5 className="font-medium mb-2">Main Components:</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <code>UsersTable</code> - Main user listing table</li>
                  <li>• <code>AdminHeader</code> - Admin navigation</li>
                  <li>• <code>Dialog</code> - Modal editing interfaces</li>
                  <li>• <code>DropdownMenu</code> - Action menus</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">UI Features:</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Real-time search with instant filtering</li>
                  <li>• Pagination with navigation controls</li>
                  <li>• Loading states during operations</li>
                  <li>• Form validation and error display</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Empty states for no results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
