import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Terminal, Download, Settings, PlayCircle } from 'lucide-react'

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Installation Guide</h1>
        <p className="text-xl text-muted-foreground">
          Complete installation instructions for setting up your Next.js + Supabase starter.
        </p>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertDescription>
          <strong>Prerequisites:</strong> Node.js 18+, npm/yarn, and a Supabase account
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-blue-500" />
              <CardTitle>1. Download the Starter</CardTitle>
            </div>
            <CardDescription>Choose your preferred method to get the code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Option A: Git Clone (Recommended)</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    git clone https://github.com/jahzlariosa/nextjs.git my-project
                    <br />
                    cd my-project
                    <br />
                    rm -rf .git  # Remove git history
                    <br />
                    git init     # Initialize new git repo
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Option B: Download ZIP</h4>
                <p className="text-sm text-muted-foreground">
                  Download the repository as a ZIP file from GitHub and extract it to your desired location.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-green-500" />
              <CardTitle>2. Install Dependencies</CardTitle>
            </div>
            <CardDescription>Install all required packages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                npm install
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              This will install all dependencies including Next.js, React, Supabase, Tailwind CSS, and UI components.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Key Dependencies</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Next.js 15</strong> - React framework with App Router</li>
                <li>• <strong>Supabase</strong> - Backend-as-a-Service with auth and database</li>
                <li>• <strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
                <li>• <strong>Shadcn/ui</strong> - Beautiful UI components</li>
                <li>• <strong>Lucide React</strong> - Modern icon library</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-purple-500" />
              <CardTitle>3. Environment Configuration</CardTitle>
            </div>
            <CardDescription>Set up your environment variables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create .env.local file</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    # Supabase Configuration
                    <br />
                    NEXT_PUBLIC_SUPABASE_URL=your_project_url
                    <br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                    <br />
                    <br />
                    # Optional: For production
                    <br />
                    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
                  </code>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Notes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Never commit your <code>.env.local</code> file to version control</li>
                  <li>• The <code>NEXT_PUBLIC_</code> prefix makes variables available in the browser</li>
                  <li>• Service role key is only needed for admin operations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-indigo-500" />
              <CardTitle>4. Database Setup</CardTitle>
            </div>
            <CardDescription>Set up your Supabase database with the complete schema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Step 1: Create Supabase Project</h4>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>1. Go to <a href="https://supabase.com" className="text-blue-600 hover:underline" target="_blank">supabase.com</a> and create a new project</li>
                  <li>2. Wait for the project to be fully initialized</li>
                  <li>3. Copy your project URL and anon key to <code>.env.local</code></li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Step 2: Run Complete Schema Setup</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  We&apos;ve created a complete database schema export that sets up everything you need in one go:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>1. Open your Supabase project dashboard</li>
                  <li>2. Navigate to <strong>SQL Editor</strong></li>
                  <li>3. Copy the contents of <code>database/full_schema_export.sql</code></li>
                  <li>4. Paste and run the entire script</li>
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">🚀 What this sets up:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Tables:</strong> profiles, roles, profile_roles with proper relationships</li>
                  <li>• <strong>Functions:</strong> Auto profile creation, role management, admin checks</li>
                  <li>• <strong>Triggers:</strong> Automatic user profile creation on signup</li>
                  <li>• <strong>RLS Policies:</strong> Complete security setup for all tables</li>
                  <li>• <strong>Storage:</strong> Avatar upload bucket with proper permissions</li>
                  <li>• <strong>Initial Data:</strong> Default roles (user, admin, moderator)</li>
                  <li>• <strong>Performance:</strong> Optimized indexes and views</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">✅ Alternative: Step-by-step Setup</h4>
                <p className="text-sm text-green-700 mb-2">
                  If you prefer to understand each step, you can run the individual migration files:
                </p>
                <ol className="text-sm text-green-700 space-y-1 ml-4">
                  <li>1. Run <code>database/migrations/001_create_profiles_table.sql</code></li>
                  <li>2. Run <code>database/migrations/010_recreate_handle_new_user_trigger.sql</code></li>
                </ol>
                <p className="text-sm text-green-700 mt-2">
                  But we recommend using the complete schema export for fastest setup.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <PlayCircle className="w-6 h-6 text-orange-500" />
              <CardTitle>5. Start Development Server</CardTitle>
            </div>
            <CardDescription>Launch your application in development mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                npm run dev
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              The application will be available at <code>http://localhost:3000</code>
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">✅ Success Indicators</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• No compilation errors in the terminal</li>
                <li>• Homepage loads successfully</li>
                <li>• You can navigate to <code>/sign-up</code> and <code>/sign-in</code></li>
                <li>• User registration creates profiles automatically</li>
                <li>• Avatar upload works in profile settings</li>
                <li>• Admin features work if you have admin role</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Available Scripts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <code className="bg-background px-2 py-1 rounded text-sm">npm run dev</code>
              <p className="text-sm text-muted-foreground mt-1">Start development server</p>
            </div>
            <div>
              <code className="bg-background px-2 py-1 rounded text-sm">npm run build</code>
              <p className="text-sm text-muted-foreground mt-1">Create production build</p>
            </div>
            <div>
              <code className="bg-background px-2 py-1 rounded text-sm">npm run start</code>
              <p className="text-sm text-muted-foreground mt-1">Start production server</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <code className="bg-background px-2 py-1 rounded text-sm">npm run lint</code>
              <p className="text-sm text-muted-foreground mt-1">Run ESLint</p>
            </div>
            <div>
              <code className="bg-background px-2 py-1 rounded text-sm">npm run type-check</code>
              <p className="text-sm text-muted-foreground mt-1">Run TypeScript checks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Troubleshooting</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Common Issues</h3>
            <ul className="text-sm text-muted-foreground space-y-2 mt-2">
              <li>
                <strong>Port 3000 already in use:</strong> Use <code>npm run dev -- -p 3001</code> to run on a different port
              </li>
              <li>
                <strong>Module not found errors:</strong> Delete <code>node_modules</code> and <code>package-lock.json</code>, then run <code>npm install</code>
              </li>
              <li>
                <strong>TypeScript errors:</strong> Make sure all environment variables are set correctly
              </li>
              <li>
                <strong>Supabase connection issues:</strong> Verify your project URL and anon key in <code>.env.local</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
