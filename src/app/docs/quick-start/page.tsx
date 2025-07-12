import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock } from 'lucide-react'

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Quick Start Guide</h1>
        <p className="text-xl text-muted-foreground">
          Get your Next.js + Supabase application up and running in under 10 minutes.
        </p>
      </div>

      <Alert>
        <Clock className="h-4 w-4" />
        <AlertDescription>
          <strong>Estimated time:</strong> 5-10 minutes
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <CardTitle>Clone the Repository</CardTitle>
                <CardDescription>Download the starter template</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                git clone https://github.com/jahzlariosa/nextjs.git my-app
                <br />
                cd my-app
                <br />
                npm install
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <CardTitle>Create Supabase Project</CardTitle>
                <CardDescription>Set up your database and authentication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to <a href="https://supabase.com" className="text-blue-600 hover:underline">supabase.com</a> and create a new project</li>
              <li>Wait for the database to be ready (usually 2-3 minutes)</li>
              <li>Go to Settings → API to get your project URL and anon key</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Configure your local environment</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create a <code>.env.local</code> file in your project root:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                NEXT_PUBLIC_SUPABASE_URL=your_project_url
                <br />
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <CardTitle>Database Setup (One-Click)</CardTitle>
                <CardDescription>🚀 Complete schema setup in one command</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">✨ New: Complete Schema Export</h4>
              <p className="text-sm text-blue-700">
                We&apos;ve created a complete database schema that sets up everything in one go!
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Step 1: Open Supabase SQL Editor</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Go to your Supabase project dashboard</li>
                <li>Navigate to <strong>SQL Editor</strong></li>
                <li>Create a new query</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Step 2: Run the Complete Schema</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                <li>Open <code>database/full_schema_export.sql</code> from your project</li>
                <li>Copy the entire file contents</li>
                <li>Paste into the SQL Editor and <strong>RUN</strong></li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">🎉 This sets up everything:</h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-green-700">
                <ul className="space-y-1">
                  <li>✅ User profiles table</li>
                  <li>✅ Roles & permissions</li>
                  <li>✅ Authentication triggers</li>
                  <li>✅ RLS security policies</li>
                </ul>
                <ul className="space-y-1">
                  <li>✅ Avatar storage bucket</li>
                  <li>✅ Admin functions</li>
                  <li>✅ Performance indexes</li>
                  <li>✅ Default roles data</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-medium text-gray-800 mb-2">📄 File Location:</h4>
              <code className="text-sm bg-white px-2 py-1 rounded border">database/full_schema_export.sql</code>
              <p className="text-sm text-gray-600 mt-1">
                This file contains 400+ lines of optimized SQL that replaces all individual migration files.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                5
              </div>
              <div>
                <CardTitle>Start Development</CardTitle>
                <CardDescription>Launch your application</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                npm run dev
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              Open <a href="http://localhost:3000" className="text-blue-600 hover:underline">http://localhost:3000</a> in your browser.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <CardTitle className="text-green-800">You&apos;re Ready to Build!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 text-sm mb-3">
            Your Next.js + Supabase application is now running with a complete, production-ready setup:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-800 mb-2">🔐 Authentication Ready</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Create accounts at <code>/sign-up</code></li>
                <li>• Sign in at <code>/sign-in</code></li>
                <li>• Password reset functionality</li>
                <li>• Automatic profile creation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">⚡ Features Available</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• User dashboard at <code>/dashboard</code></li>
                <li>• Profile management at <code>/profile</code></li>
                <li>• Avatar upload system</li>
                <li>• Role-based access control</li>
                <li>• Admin panel (if admin role)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Explore the Code</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <code>src/app/(auth)/</code> - Authentication pages</li>
              <li>• <code>src/components/</code> - UI components</li>
              <li>• <code>src/lib/supabase/</code> - Supabase clients</li>
              <li>• <code>middleware.ts</code> - Route protection</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Learn More</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <a href="/docs/auth/overview" className="text-blue-600 hover:underline">Authentication System</a></li>
              <li>• <a href="/docs/database/schema" className="text-blue-600 hover:underline">Database Schema</a></li>
              <li>• <a href="/docs/ui/layout" className="text-blue-600 hover:underline">UI Components</a></li>
              <li>• <a href="/docs/deployment/build" className="text-blue-600 hover:underline">Deployment Guide</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
