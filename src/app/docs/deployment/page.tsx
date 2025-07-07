import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DeploymentPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Deployment Guide</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete guide for deploying your Next.js + Supabase application to production.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Vercel Deployment
              <Badge variant="outline">Recommended</Badge>
            </CardTitle>
            <CardDescription>
              Deploy your Next.js application to Vercel with automatic deployments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Prerequisites</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>GitHub repository with your code</li>
                <li>Vercel account</li>
                <li>Supabase project configured</li>
                <li>Environment variables ready</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Deployment Steps</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Configure environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy with default settings
5. Verify deployment and test functionality`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Vercel CLI Deployment</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Deploy to production
vercel --prod`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Configure environment variables for production deployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Required Variables</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Custom domain
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Security Notes</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Never commit .env files to version control</li>
                <li>Use platform-specific environment variable settings</li>
                <li>Anon key is safe to expose (has limited permissions)</li>
                <li>Service role key should never be exposed to client</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Configuration</CardTitle>
            <CardDescription>
              Configure Supabase for production deployment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Auth Configuration</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`1. Go to Authentication > Settings in Supabase dashboard
2. Add your production URL to "Site URL"
3. Add your production URL to "Redirect URLs"
4. Configure email templates if needed
5. Set up custom SMTP (optional)`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Storage Configuration</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`1. Create 'avatars' bucket in Storage
2. Set bucket to public
3. Configure RLS policies:
   - Allow authenticated users to upload to their folder
   - Allow public read access to all avatars
4. Set file size limits (recommended: 2MB)`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Setup</CardTitle>
            <CardDescription>
              Set up database tables, triggers, and policies for production.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Run SQL Migrations</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  username text UNIQUE,
  avatar_url text,
  bio text,
  website text,
  location text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create auto-profile trigger
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Optimization</CardTitle>
            <CardDescription>
              Optimize your application for production performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Next.js Optimizations</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`// next.config.ts
const nextConfig = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

export default nextConfig`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Database Optimizations</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Add indexes for frequently queried columns</li>
                <li>Use select() to limit returned columns</li>
                <li>Enable database connection pooling</li>
                <li>Monitor query performance</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monitoring & Analytics</CardTitle>
            <CardDescription>
              Set up monitoring and analytics for your production application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Vercel Analytics</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`# Install Vercel Analytics
npm install @vercel/analytics

# Add to your app
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Supabase Monitoring</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Monitor database performance in dashboard</li>
                <li>Set up alerts for high resource usage</li>
                <li>Track authentication metrics</li>
                <li>Monitor storage usage</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Pre-Deployment Checklist</h2>
        <div className="bg-muted rounded-lg p-6">
          <ul className="space-y-2 text-sm">
            <li>✓ All environment variables configured</li>
            <li>✓ Database tables and policies created</li>
            <li>✓ Storage bucket and policies configured</li>
            <li>✓ Auth settings updated with production URLs</li>
            <li>✓ Build passes without errors</li>
            <li>✓ All tests passing</li>
            <li>✓ Performance optimizations applied</li>
            <li>✓ Security headers configured</li>
            <li>✓ Monitoring and analytics set up</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
