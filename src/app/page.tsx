import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutWrapper } from '@/components/layout'
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Code,
  Palette,
  Database,
  Star,
  Github
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Built-in authentication with Supabase, including social logins and secure session management.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Powered by Next.js 15 with App Router for optimal performance and developer experience.'
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete user profile system with avatar uploads and customizable profiles.'
    },
    {
      icon: Code,
      title: 'Modern Stack',
      description: 'TypeScript, Tailwind CSS, and Shadcn UI for a robust and scalable foundation.'
    },
    {
      icon: Palette,
      title: 'Beautiful UI',
      description: 'Responsive design with dark mode support and accessible components.'
    },
    {
      icon: Database,
      title: 'Real-time Data',
      description: 'PostgreSQL database with real-time subscriptions and Row Level Security.'
    }
  ]

  return (
    <LayoutWrapper>
      {/* Hero Section */}
      <section className="flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build Amazing Apps with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Next.js
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, full-stack Next.js application with authentication, 
              user management, and beautiful UI components. Ready to scale.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/sign-up">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
                View Source
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with the latest technologies and best practices for modern web development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-0 shadow-sm">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers building amazing applications.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sign-up">Create Your Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
            <span>Trusted by developers worldwide</span>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  )
}
