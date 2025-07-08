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
                <CardTitle>Database Setup</CardTitle>
                <CardDescription>Create the required tables and policies</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Run this SQL in your Supabase SQL editor:
            </p>
            <div className="bg-muted p-4 rounded-lg text-sm">
              <code>
                {`-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  location text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create roles table
CREATE TABLE roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create profile_roles join table
CREATE TABLE profile_roles (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (profile_id, role_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can view roles" ON roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can view their own roles" ON profile_roles
  FOR SELECT USING (auth.uid() = profile_id);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage policy
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function for new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_role_id uuid;
BEGIN
  -- Create the user profile
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );

  -- Get the 'user' role ID
  SELECT id INTO user_role_id FROM public.roles WHERE name = 'user' LIMIT 1;

  -- Assign the 'user' role to the new profile
  IF user_role_id IS NOT NULL THEN
    INSERT INTO public.profile_roles (profile_id, role_id)
    VALUES (NEW.id, user_role_id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`}
              </code>
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
            <CardTitle className="text-green-800">You&apos;re Ready!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 text-sm">
            Your Next.js + Supabase application is now running. You can:
          </p>
          <ul className="text-green-700 text-sm mt-2 space-y-1">
            <li>• Create an account at <code>/sign-up</code></li>
            <li>• Sign in at <code>/sign-in</code></li>
            <li>• Access your dashboard at <code>/dashboard</code></li>
            <li>• Update your profile at <code>/profile</code></li>
          </ul>
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
