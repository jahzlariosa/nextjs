import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Download, Zap, CheckCircle } from 'lucide-react'

export default function DatabaseSchemaPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Database Schema</h1>
        <p className="text-xl text-muted-foreground">
          Complete database setup with our production-ready schema export.
        </p>
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>New in v1.0.1:</strong> Complete database schema export for instant setup - no more manual migrations!
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-green-600" />
              <CardTitle className="text-green-800">🚀 Quick Setup (Recommended)</CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Get your entire database set up in less than 2 minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Step 1: Copy the Schema File</h4>
              <p className="text-sm text-green-700 mb-2">
                Location: <code className="bg-green-100 px-2 py-1 rounded">database/full_schema_export.sql</code>
              </p>
              <p className="text-sm text-green-700">
                This file contains 400+ lines of production-ready SQL that sets up your entire database.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Step 2: Run in Supabase</h4>
              <ol className="text-sm text-green-700 space-y-1 ml-4">
                <li>1. Open your Supabase project dashboard</li>
                <li>2. Navigate to <strong>SQL Editor</strong></li>
                <li>3. Copy the entire contents of <code>full_schema_export.sql</code></li>
                <li>4. Paste and click <strong>RUN</strong></li>
              </ol>
            </div>

            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h4 className="font-medium text-green-800 mb-2">✅ That&apos;s it! Your database is ready.</h4>
              <p className="text-sm text-green-700">
                No need to run multiple migration files or worry about missing steps.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-500" />
              <CardTitle>What Gets Created</CardTitle>
            </div>
            <CardDescription>
              Complete overview of your database structure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">📊 Core Tables</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>profiles</code> - User profile information</li>
                    <li>• <code>roles</code> - System roles (admin, user, moderator)</li>
                    <li>• <code>profile_roles</code> - User-role relationships</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-purple-800 mb-2">⚙️ Functions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>handle_new_user()</code> - Auto profile creation</li>
                    <li>• <code>is_admin_authenticated()</code> - Admin checks</li>
                    <li>• <code>get_user_role()</code> - Role retrieval</li>
                    <li>• <code>get_user_emails()</code> - Admin-only email access</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-orange-800 mb-2">🔄 Triggers</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Auto profile creation on signup</li>
                    <li>• Timestamp updates on changes</li>
                    <li>• Role assignment automation</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">🛡️ Security (RLS)</h4>
                  <ul className="text-sm space-y-1">
                    <li>• User can only edit own profile</li>
                    <li>• Admin-only role management</li>
                    <li>• Public profile viewing</li>
                    <li>• Secure role assignments</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">📁 Storage</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <code>avatars</code> bucket configured</li>
                    <li>• 5MB file size limit</li>
                    <li>• Image MIME type restrictions</li>
                    <li>• User-specific upload permissions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-red-800 mb-2">📈 Performance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Optimized indexes on key fields</li>
                    <li>• Efficient RLS policies</li>
                    <li>• Helper views for common queries</li>
                    <li>• Proper foreign key constraints</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <CardTitle>Schema Benefits</CardTitle>
            </div>
            <CardDescription>
              Why use our complete schema export
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">🚀 Speed & Convenience</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Single file setup vs multiple migrations</li>
                  <li>• No risk of missing steps or dependencies</li>
                  <li>• Tested and production-ready</li>
                  <li>• Version controlled schema state</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">🔧 Features Included</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete authentication system</li>
                  <li>• Role-based access control</li>
                  <li>• File upload capabilities</li>
                  <li>• Admin management tools</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Manual Migration (Alternative)</CardTitle>
            <CardDescription className="text-blue-700">
              If you prefer step-by-step setup or need to understand each component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-blue-700">
              For those who prefer to see each step or need to customize the schema, you can still use the individual migration files:
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Run <code>database/migrations/001_create_profiles_table.sql</code></li>
                <li>2. Run <code>database/migrations/010_recreate_handle_new_user_trigger.sql</code></li>
                <li>3. Manually set up storage buckets and additional RLS policies</li>
                <li>4. Create performance indexes</li>
              </ol>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> The complete schema export includes additional optimizations and features not present in the individual migration files.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customization</CardTitle>
            <CardDescription>
              Adapting the schema for your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Adding Profile Fields</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    ALTER TABLE public.profiles ADD COLUMN phone text;
                    <br />
                    ALTER TABLE public.profiles ADD COLUMN company text;
                    <br />
                    ALTER TABLE public.profiles ADD COLUMN date_of_birth date;
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Creating Additional Roles</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    INSERT INTO public.roles (name) VALUES (&apos;editor&apos;);
                    <br />
                    INSERT INTO public.roles (name) VALUES (&apos;viewer&apos;);
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Adding New Storage Buckets</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    INSERT INTO storage.buckets (id, name, public) 
                    <br />
                    VALUES (&apos;documents&apos;, &apos;documents&apos;, false);
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Need Help?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Documentation</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <a href="/docs/installation" className="text-blue-600 hover:underline">Installation Guide</a></li>
              <li>• <a href="/docs/auth/overview" className="text-blue-600 hover:underline">Authentication System</a></li>
              <li>• <a href="/docs/admin/setup" className="text-blue-600 hover:underline">Admin Features</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">External Resources</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <a href="https://supabase.com/docs" className="text-blue-600 hover:underline" target="_blank">Supabase Documentation</a></li>
              <li>• <a href="https://supabase.com/docs/guides/auth" className="text-blue-600 hover:underline" target="_blank">Supabase Auth Guide</a></li>
              <li>• <a href="https://supabase.com/docs/guides/storage" className="text-blue-600 hover:underline" target="_blank">Supabase Storage Guide</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
