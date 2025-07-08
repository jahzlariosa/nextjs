import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AuthenticationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Authentication System</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete authentication system with Supabase Auth, server-side rendering, and automatic profile management.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Server-Side Authentication
              <Badge variant="outline">SSR</Badge>
            </CardTitle>
            <CardDescription>
              Authentication built with Next.js 15 App Router and Supabase Auth for optimal performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Server-side session management</li>
                <li>Automatic profile creation on signup</li>
                <li>Protected routes with middleware</li>
                <li>Email verification support</li>
                <li>Password reset functionality</li>
                <li>Row Level Security (RLS) policies</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Authentication Flow</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`1. User signs up → Supabase Auth creates user
2. Database trigger creates profile and assigns default role
3. User signs in → Session established
4. Middleware validates session on each request
5. Protected routes check authentication
6. User data available in server components`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Schema</CardTitle>
            <CardDescription>
              Automatic profile creation with database triggers and RLS policies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Profiles Table</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`CREATE TABLE profiles (
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
);`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Roles Table</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`CREATE TABLE roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Profile Roles Table</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`CREATE TABLE profile_roles (
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (profile_id, role_id)
);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Auto-Profile Creation</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`CREATE OR REPLACE FUNCTION handle_new_user()
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server Actions</CardTitle>
            <CardDescription>
              Secure server-side authentication actions with proper error handling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Sign Up Action</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`export async function signUp(formData: FormData) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        full_name: formData.get('full_name')
      }
    }
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Sign In Action</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`export async function signIn(formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password')
  })
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Middleware Protection</CardTitle>
            <CardDescription>
              Route protection and session management with Next.js middleware.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Protected Routes</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`export async function middleware(request: NextRequest) {
  const supabase = createServerClient(...)
  const { data: { session } } = await supabase.auth.getSession()
  
  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }
  
  // Auth routes (redirect if already logged in)
  if (request.nextUrl.pathname.startsWith('/sign-in')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return response
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Row Level Security</CardTitle>
            <CardDescription>
              Database-level security policies for user data protection.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">RLS Policies</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Authenticated users can view roles
CREATE POLICY "Authenticated users can view roles" ON roles
  FOR SELECT TO authenticated USING (true);

-- Users can view their own roles
CREATE POLICY "Users can view their own roles" ON profile_roles
  FOR SELECT USING (auth.uid() = profile_id);`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authentication Components</CardTitle>
            <CardDescription>
              Ready-to-use authentication UI components.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Available Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>SignInForm - Sign in form with validation</li>
                <li>SignUpForm - Sign up form with validation</li>
                <li>ResetPasswordForm - Password reset form</li>
                <li>AuthProvider - Client-side auth context</li>
                <li>ProtectedRoute - Route protection wrapper</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { SignInForm } from '@/components/auth'

export default function SignInPage() {
  return (
    <div className="container mx-auto max-w-md">
      <SignInForm />
    </div>
  )
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Security Features</h2>
        <div className="bg-muted rounded-lg p-6">
          <ul className="space-y-2 text-sm">
            <li>• All authentication happens server-side for maximum security</li>
            <li>• Session cookies are HTTPOnly and secure</li>
            <li>• Database queries use parameterized statements</li>
            <li>• Row Level Security prevents unauthorized data access</li>
            <li>• Email verification prevents account takeovers</li>
            <li>• Password reset uses secure token system</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
