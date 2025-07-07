import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Database, Palette, Code, Users } from 'lucide-react'

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
              <CardTitle>Database</CardTitle>
            </div>
            <CardDescription>
              Supabase PostgreSQL with Row Level Security and automated migrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/database/schema">
                Explore Schema
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
              <Link href="/docs/ui/layout">
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
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>
              Profile management, avatar uploads, and user settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href="/docs/ui/profile">
                User Features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Features Overview</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Authentication & Security</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Server-side rendering with Supabase Auth</li>
              <li>• Automatic profile creation</li>
              <li>• Row Level Security (RLS)</li>
              <li>• Session management</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">UI & Components</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Responsive layout system</li>
              <li>• Modern header and footer</li>
              <li>• Form components with validation</li>
              <li>• Avatar upload system</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Development</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• TypeScript support</li>
              <li>• ESLint configuration</li>
              <li>• Tailwind CSS styling</li>
              <li>• Next.js 15 with App Router</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Database</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• PostgreSQL with Supabase</li>
              <li>• Database migrations</li>
              <li>• File storage integration</li>
              <li>• Real-time subscriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
