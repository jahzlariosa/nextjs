import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Settings, UserPlus, Shield, Database, CheckCircle, AlertTriangle } from 'lucide-react'

export default function AdminSetupPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Admin Setup Guide</h1>
          <Badge variant="secondary">Configuration</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Complete setup guide for configuring admin access and managing your application.
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Admin setup requires careful configuration. Follow these steps in order and verify each step 
          before proceeding to maintain security and functionality.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              1. Database Setup
            </CardTitle>
            <CardDescription>
              Configure your Supabase database with required tables and policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Step 1: Run Migration Scripts</h4>
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <div className="text-sm">
                    Navigate to your Supabase project dashboard → SQL Editor and run these files in order:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li><code className="bg-background px-1 rounded">001_create_profiles_table.sql</code></li>
                    <li><code className="bg-background px-1 rounded">010_recreate_handle_new_user_trigger.sql</code></li>
                  </ol>
                  <div className="text-xs text-muted-foreground">
                    These scripts create the profiles, roles, and profile_roles tables with proper RLS policies.
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Step 2: Create Initial Roles</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm mb-2">
                    Run this SQL to create the basic roles:
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`INSERT INTO roles (id, name) VALUES 
  (gen_random_uuid(), 'admin'),
  (gen_random_uuid(), 'user'),
  (gen_random_uuid(), 'moderator');`}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Step 3: Verify Database Setup</h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-sm text-green-800 dark:text-green-200">
                    Check that all tables were created properly:
                  </div>
                  <div className="bg-background/50 p-2 rounded text-xs font-mono mt-2">
                    {`-- Verify tables exist
\\dt public.profiles
\\dt public.roles  
\\dt public.profile_roles

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              2. Create First Admin User
            </CardTitle>
            <CardDescription>
              Set up your initial admin account to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Method 1: Manual Database Assignment</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-3">
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    If you already have a user account created:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>Sign up through your application&apos;s normal signup process</li>
                    <li>Note your user ID from the auth.users table or profile</li>
                    <li>Run this SQL to assign admin role:</li>
                  </ol>
                  <div className="bg-background/50 p-2 rounded text-xs font-mono">
                    {`-- Replace 'your-user-id' with actual user ID
INSERT INTO profile_roles (id, profile_id, role_id)
SELECT 
  gen_random_uuid(),
  'your-user-id',
  r.id
FROM roles r 
WHERE r.name = 'admin';`}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Method 2: Supabase Dashboard</h4>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg space-y-3">
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    Using Supabase&apos;s user management:
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700 dark:text-amber-300">
                    <li>Go to Authentication → Users in Supabase dashboard</li>
                    <li>Create a new user or invite via email</li>
                    <li>Copy the user&apos;s UUID from the users table</li>
                    <li>Use the SQL from Method 1 to assign admin role</li>
                  </ol>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Verify Admin Access</h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-sm text-green-800 dark:text-green-200 mb-2">
                    Test your admin setup:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>Log in with your admin account</li>
                    <li>Navigate to <code className="bg-background/50 px-1 rounded">/admin</code></li>
                    <li>Verify you can see the admin dashboard</li>
                    <li>Test user and role management functions</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              3. Environment Configuration
            </CardTitle>
            <CardDescription>
              Configure your application environment for admin functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Required Environment Variables</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm mb-2">
                    Ensure these are set in your <code className="bg-background px-1 rounded">.env.local</code>:
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Admin-specific settings
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourapp.com
ADMIN_SECRET_KEY=your-admin-secret`}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Supabase Configuration</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg space-y-2">
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    In your Supabase project settings:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>Enable Row Level Security on all tables</li>
                    <li>Configure email templates for user invitations</li>
                    <li>Set up proper CORS origins for your domain</li>
                    <li>Configure auth providers if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              4. Security Configuration
            </CardTitle>
            <CardDescription>
              Essential security settings for admin functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Admin Route Protection</h4>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="text-sm text-red-800 dark:text-red-200 mb-2">
                    The admin routes are protected by middleware. Verify this is working:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li>Try accessing <code className="bg-background/50 px-1 rounded">/admin</code> while logged out</li>
                    <li>Try accessing with a non-admin user</li>
                    <li>Verify redirects work properly</li>
                    <li>Check that admin-only UI elements are hidden for regular users</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Database Security Checklist</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">RLS enabled on all tables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Admin policies properly configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Service role key secured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">User input validation in place</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              5. Testing & Verification
            </CardTitle>
            <CardDescription>
              Verify your admin setup is working correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Admin Dashboard Tests</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-xs bg-background px-1 rounded mt-0.5">✓</span>
                      <span>Access admin dashboard at <code className="bg-background px-1 rounded">/admin</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-xs bg-background px-1 rounded mt-0.5">✓</span>
                      <span>View user list and edit user profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-xs bg-background px-1 rounded mt-0.5">✓</span>
                      <span>Assign and remove roles from users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-xs bg-background px-1 rounded mt-0.5">✓</span>
                      <span>Create and manage system roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono text-xs bg-background px-1 rounded mt-0.5">✓</span>
                      <span>Non-admin users cannot access admin features</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Troubleshooting Common Issues</h4>
                <div className="space-y-3">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded">
                    <div className="font-medium text-amber-800 dark:text-amber-200 text-sm">
                      &quot;Access Denied&quot; on Admin Dashboard
                    </div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      Check: User has admin role assignment, RLS policies are correct, middleware is working
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                    <div className="font-medium text-red-800 dark:text-red-200 text-sm">
                      &quot;Cannot Edit Users&quot; Error
                    </div>
                    <div className="text-xs text-red-700 dark:text-red-300 mt-1">
                      Check: Service role key is set, admin policies allow modifications, database connection is working
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <div className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                      &quot;Profile Not Found&quot; Issues
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Check: Profile creation trigger is working, user signup process creates profiles properly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">
            🎉 Setup Complete!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300 mb-3">
            Your admin dashboard is now ready. You can start managing users and roles through the admin interface.
          </p>
          <div className="text-xs text-green-600 dark:text-green-400">
            Next steps: Explore the admin features, invite team members, and customize roles according to your needs.
          </div>
        </div>
      </div>
    </div>
  )
}
