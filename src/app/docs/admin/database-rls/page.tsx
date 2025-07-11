import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Database, Shield, Lock, Key, Users } from 'lucide-react'

export default function DatabaseRLSPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Database & RLS Policies</h1>
          <Badge variant="secondary">Technical Guide</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Understanding the database structure and Row Level Security policies that protect your data.
        </p>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          Row Level Security (RLS) provides database-level protection, ensuring users can only access 
          data they're authorized to see, even if application code is compromised.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Schema Overview
            </CardTitle>
            <CardDescription>
              Complete database structure and relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Core Tables:</h4>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="font-medium mb-2">profiles</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    User profile information linked to Supabase auth.users
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`id (uuid, primary key, references auth.users.id)
username (text, unique)
full_name (text)
avatar_url (text)
created_at (timestamp)
updated_at (timestamp)`}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="font-medium mb-2">roles</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    System roles definition table
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`id (uuid, primary key)
name (text, unique, not null)
created_at (timestamp)`}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="font-medium mb-2">profile_roles</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Junction table for user-role assignments
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`id (uuid, primary key)
profile_id (uuid, references profiles.id)
role_id (uuid, references roles.id)
created_at (timestamp)

UNIQUE(profile_id, role_id)`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Row Level Security Policies
            </CardTitle>
            <CardDescription>
              Database-level security protecting user data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Profiles Table Policies:</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                    <div className="font-medium text-green-800 dark:text-green-200">
                      User Profile Access
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Users can view and update their own profile
                    </div>
                    <div className="bg-background/50 p-2 rounded text-xs font-mono mt-2">
                      {`CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);`}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <div className="font-medium text-blue-800 dark:text-blue-200">
                      Admin Profile Access
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Admin users can view and modify all profiles
                    </div>
                    <div className="bg-background/50 p-2 rounded text-xs font-mono mt-2">
                      {`CREATE POLICY "Admin can view all profiles" ON profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profile_roles pr
    JOIN roles r ON pr.role_id = r.id
    WHERE pr.profile_id = auth.uid()
    AND r.name = 'admin'
  )
);`}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Roles Table Policies:</h4>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded">
                  <div className="font-medium text-amber-800 dark:text-amber-200">
                    Role Management
                  </div>
                  <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    All authenticated users can view roles, only admins can modify
                  </div>
                  <div className="bg-background/50 p-2 rounded text-xs font-mono mt-2">
                    {`CREATE POLICY "Everyone can view roles" ON roles
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage roles" ON roles
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profile_roles pr
    JOIN roles r ON pr.role_id = r.id
    WHERE pr.profile_id = auth.uid()
    AND r.name = 'admin'
  )
);`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Database Triggers & Functions
            </CardTitle>
            <CardDescription>
              Automated database operations and profile creation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Automatic Profile Creation:</h4>
                <div className="bg-muted p-3 rounded">
                  <div className="text-sm mb-2">
                    When a user signs up, a profile is automatically created using a database trigger.
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ language plpgsql security definer;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();`}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Profile Update Trigger:</h4>
                <div className="bg-muted p-3 rounded">
                  <div className="text-sm mb-2">
                    Updates the updated_at timestamp whenever a profile is modified.
                  </div>
                  <div className="bg-background p-2 rounded text-xs font-mono">
                    {`CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Best Practices
            </CardTitle>
            <CardDescription>
              How to maintain and enhance database security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold">Current Security Measures:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• RLS enabled on all user-facing tables</li>
                  <li>• Role-based access control policies</li>
                  <li>• Automatic profile creation with secure triggers</li>
                  <li>• Admin role validation for sensitive operations</li>
                  <li>• Unique constraints on critical fields</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Additional Recommendations:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Regular policy audits and updates</li>
                  <li>• Monitor for policy violations</li>
                  <li>• Implement audit logging for admin actions</li>
                  <li>• Use service role carefully for admin operations</li>
                  <li>• Validate all inputs before database operations</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Security Warning:
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                Never disable RLS unless absolutely necessary. Always test new policies thoroughly 
                before deploying to production. Admin operations should use the service role sparingly 
                and with additional validation.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Migration Scripts
            </CardTitle>
            <CardDescription>
              Database setup and migration files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Available Migration Files:</h4>
              <div className="space-y-2">
                <div className="bg-muted p-3 rounded">
                  <div className="font-medium">001_create_profiles_table.sql</div>
                  <div className="text-sm text-muted-foreground">
                    Creates the main profile table with RLS policies and triggers
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="font-medium">010_recreate_handle_new_user_trigger.sql</div>
                  <div className="text-sm text-muted-foreground">
                    Updates the user creation trigger for better profile handling
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Running Migrations:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Open your Supabase project dashboard</li>
                <li>Navigate to the SQL Editor</li>
                <li>Copy and paste each migration file</li>
                <li>Execute them in order (001, then 010, etc.)</li>
                <li>Verify that all policies and triggers are created</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
