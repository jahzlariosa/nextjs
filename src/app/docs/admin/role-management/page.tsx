import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Plus, Users, Database, Lock } from 'lucide-react'

export default function RoleManagementPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Role Management</h1>
          <Badge variant="secondary">Admin Feature</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Create and manage system roles to control user permissions and access levels.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Role management affects user permissions across the entire application. 
          Changes to roles immediately impact user access to features and data.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Understanding Roles
            </CardTitle>
            <CardDescription>
              How the role-based access control system works
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold">Default Roles</h4>
                <div className="space-y-2">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">admin</div>
                    <div className="text-sm text-muted-foreground">
                      Full system access, user management, role assignment
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium">user</div>
                    <div className="text-sm text-muted-foreground">
                      Standard user access, profile management
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Role Properties</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>Name:</strong> Unique identifier for the role</li>
                  <li>• <strong>Users:</strong> Number of users with this role</li>
                  <li>• <strong>Created:</strong> When the role was created</li>
                  <li>• <strong>Permissions:</strong> Defined by application logic</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Creating New Roles
            </CardTitle>
            <CardDescription>
              How to add new roles to the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Creating a Role:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Navigate to <code>/admin/roles</code></li>
                <li>Click the &quot;Create Role&quot; button</li>
                <li>Enter a unique role name in the prompt</li>
                <li>The role is created immediately</li>
                <li>Assign the role to users as needed</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Role Naming Guidelines:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use lowercase names (e.g., &quot;moderator&quot;, &quot;editor&quot;)</li>
                <li>• Keep names descriptive and clear</li>
                <li>• Avoid spaces and special characters</li>
                <li>• Role names must be unique</li>
              </ul>
            </div>

            <div className="bg-muted p-3 rounded text-sm font-mono">
              Example role names: admin, user, moderator, editor, viewer
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Assigning Roles to Users
            </CardTitle>
            <CardDescription>
              How to manage user role assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Assignment Process:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Go to <code>/admin/users</code></li>
                  <li>Find the user in the table</li>
                  <li>Click the dropdown menu (⋯)</li>
                  <li>Select &quot;Manage roles&quot;</li>
                  <li>Check/uncheck roles as needed</li>
                  <li>Click &quot;Update Roles&quot;</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Multiple Roles:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Users can have multiple roles</li>
                  <li>• Permissions are cumulative</li>
                  <li>• Higher privileges take precedence</li>
                  <li>• Changes are applied immediately</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Schema
            </CardTitle>
            <CardDescription>
              Understanding the role system database structure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Tables Overview:</h4>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded">
                    <div className="font-medium">roles</div>
                    <div className="text-sm text-muted-foreground">
                      Stores all available roles (id, name, created_at)
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-medium">profiles</div>
                    <div className="text-sm text-muted-foreground">
                      User profile information linked to auth.users
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded">
                    <div className="font-medium">profile_roles</div>
                    <div className="text-sm text-muted-foreground">
                      Junction table connecting users to their roles
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Relationships:</h4>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  {`profiles (1) ←→ (many) profile_roles (many) ←→ (1) roles`}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Many-to-many relationship allows users to have multiple roles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Permission Implementation
            </CardTitle>
            <CardDescription>
              How roles translate to application permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Important Note:</h4>
              <p className="text-sm">
                Roles define user categories, but specific permissions are implemented 
                in the application code. Each feature checks user roles to determine access.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Permission Checking Examples:</h4>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  {`// Check for admin role
const isAdmin = user?.roles?.some(role => role.name === 'admin')

// Protect admin routes
if (!isAdmin) {
  redirect('/dashboard')
}`}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">RLS Policy Example:</h4>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  {`-- Allow admin users to see all profiles
CREATE POLICY "Admin can view all profiles" ON profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profile_roles pr
    JOIN roles r ON pr.role_id = r.id
    WHERE pr.profile_id = auth.uid()
    AND r.name = 'admin'
  )
)`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
