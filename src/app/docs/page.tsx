import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Database, Palette, Code, Users, FileText, Package, Settings } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <Badge variant="secondary">v1.0.0</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          A modern, production-ready Next.js starter with Supabase authentication, 
          responsive UI components, and comprehensive documentation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-500" />
              <CardTitle>Quick Start</CardTitle>
            </div>
            <CardDescription>
              Get up and running in minutes with our step-by-step guide.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/quick-start">
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-500" />
              <CardTitle>Authentication</CardTitle>
            </div>
            <CardDescription>
              Complete authentication system with SSR and automatic profile creation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/auth/overview">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-500" />
              <CardTitle>Features</CardTitle>
            </div>
            <CardDescription>
              Authentication system, avatar uploads, and more built-in features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/features/authentication">
                View Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-purple-500" />
              <CardTitle>UI Components</CardTitle>
            </div>
            <CardDescription>
              Beautiful, responsive components built with Tailwind CSS and Shadcn/ui.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/components/ui">
                View Components
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-red-500" />
              <CardTitle>Installation</CardTitle>
            </div>
            <CardDescription>
              Step-by-step installation guide and environment setup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/installation">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-500" />
              <CardTitle>Profile Management</CardTitle>
            </div>
            <CardDescription>
              Profile management, avatar uploads, and user settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/components/profile">
                User Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-amber-500" />
              <CardTitle>Admin Dashboard</CardTitle>
            </div>
            <CardDescription>
              Complete admin interface for user management and role assignment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/admin/overview">
                Admin Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <CardTitle>Changelog</CardTitle>
            </div>
            <CardDescription>
              Track all updates, improvements, and changes to the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/changelog">
                View Changes
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-emerald-500" />
              <CardTitle>Core Packages</CardTitle>
            </div>
            <CardDescription>
              Essential dependencies and libraries powering the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/packages">
                View Packages
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Features Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-medium">Authentication & Security</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Server-side rendering with Supabase Auth</li>
              <li>• Automatic profile creation</li>
              <li>• Row Level Security (RLS)</li>
              <li>• Role-based access control</li>
              <li>• Session management</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Admin Management</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• User management dashboard</li>
              <li>• Edit user profiles and details</li>
              <li>• Role assignment and removal</li>
              <li>• Real-time admin interface</li>
              <li>• Professional admin navigation</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">UI & Components</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Responsive layout system</li>
              <li>• Modern header and footer</li>
              <li>• Form components with validation</li>
              <li>• Avatar upload system</li>
              <li>• Dialog-based editing</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Development</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• TypeScript support</li>
              <li>• ESLint configuration</li>
              <li>• Tailwind CSS styling</li>
              <li>• Next.js 15 with App Router</li>
              <li>• Git workflow automation</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Database</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• PostgreSQL with Supabase</li>
              <li>• Database migrations</li>
              <li>• File storage integration</li>
              <li>• Real-time subscriptions</li>
              <li>• Advanced RLS policies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
