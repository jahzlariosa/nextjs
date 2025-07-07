import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Users, Lock, Database, Key, CheckCircle } from 'lucide-react'

export default function AuthOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Authentication Overview</h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive authentication system built with Supabase Auth and Next.js Server-Side Rendering.
        </p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Security First:</strong> All authentication operations use server-side rendering with automatic session management and CSRF protection.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-500" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>Complete user lifecycle management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">User registration with email verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Secure password authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Automatic profile creation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Password reset functionality</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-500" />
              <CardTitle>Session Security</CardTitle>
            </div>
            <CardDescription>Enterprise-grade session management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">HTTPOnly cookies for session storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Automatic token refresh</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Server-side session validation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">Route protection middleware</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Authentication Flow</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>1. User Registration</CardTitle>
            <CardDescription>New users create an account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                {`POST /auth/sign-up
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe"
}`}
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Process:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>1. User submits registration form</li>
                <li>2. Server action validates input</li>
                <li>3. Supabase creates auth user</li>
                <li>4. Database trigger creates profile</li>
                <li>5. User is redirected to dashboard</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. User Sign In</CardTitle>
            <CardDescription>Existing users authenticate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                {`POST /auth/sign-in
{
  "email": "user@example.com",
  "password": "securepassword"
}`}
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Process:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>1. User submits credentials</li>
                <li>2. Server action validates input</li>
                <li>3. Supabase verifies credentials</li>
                <li>4. Session cookies are set</li>
                <li>5. User is redirected to dashboard</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Route Protection</CardTitle>
            <CardDescription>Middleware guards protected routes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                {`// middleware.ts
export async function middleware(request: NextRequest) {
  const { session } = await supabase.auth.getSession()
  
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect('/sign-in')
    }
  }
  
  return response
}`}
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Protected Routes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• <code>/dashboard</code> - Main dashboard</li>
                <li>• <code>/profile</code> - User profile</li>
                <li>• <code>/settings</code> - Account settings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Database Integration</h2>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-500" />
              <CardTitle>Profile Management</CardTitle>
            </div>
            <CardDescription>Automatic profile creation and management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                {`-- Database trigger for auto profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
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
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`}
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Profile Schema:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• <code>id</code> - References auth.users(id)</li>
                <li>• <code>email</code> - User email address</li>
                <li>• <code>full_name</code> - Display name</li>
                <li>• <code>username</code> - Unique username</li>
                <li>• <code>avatar_url</code> - Profile picture URL</li>
                <li>• <code>bio</code> - User biography</li>
                <li>• <code>website</code> - Personal website</li>
                <li>• <code>location</code> - User location</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6 text-red-500" />
              <CardTitle>Row Level Security</CardTitle>
            </div>
            <CardDescription>Database-level security policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">
                {`-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);`}
              </code>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Security Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Database-level access control</li>
                <li>• Automatic policy enforcement</li>
                <li>• No additional server-side checks needed</li>
                <li>• Protection against SQL injection</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Security Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Authentication</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Email verification required</li>
              <li>• Password complexity requirements</li>
              <li>• Rate limiting on auth endpoints</li>
              <li>• CSRF protection</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Session Management</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• HTTPOnly cookies</li>
              <li>• Secure flags in production</li>
              <li>• Automatic token refresh</li>
              <li>• Session timeout</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Data Protection</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Row Level Security (RLS)</li>
              <li>• Encrypted data at rest</li>
              <li>• SSL/TLS encryption</li>
              <li>• Data validation</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Server Security</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Server-side validation</li>
              <li>• Environment variable protection</li>
              <li>• API key management</li>
              <li>• Request sanitization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
