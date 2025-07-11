import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Shield, Palette, Code2, Database, Zap } from 'lucide-react'

export default function PackagesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Core Packages</h1>
        <p className="text-xl text-muted-foreground">
          Essential dependencies and libraries that power this application.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Code2 className="w-6 h-6 text-blue-500" />
              <CardTitle>Framework & Core</CardTitle>
            </div>
            <CardDescription>
              Next.js and React ecosystem packages for the application foundation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">next</span>
                  </div>
                  <Badge variant="secondary">15.3.5</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  React framework with App Router, Server Components, and built-in optimizations.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">react</span>
                  </div>
                  <Badge variant="secondary">19.0.0</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Latest React with improved Server Components and concurrent features.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">typescript</span>
                  </div>
                  <Badge variant="secondary">5+</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Type safety, better developer experience, and compile-time error checking.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">tailwindcss</span>
                  </div>
                  <Badge variant="secondary">4</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Utility-first CSS framework with modern features and optimizations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-green-500" />
              <CardTitle>Backend & Database</CardTitle>
            </div>
            <CardDescription>
              Supabase ecosystem for authentication, database, and real-time features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">@supabase/supabase-js</span>
                  </div>
                  <Badge variant="secondary">2.50.3</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Main Supabase client for database operations, authentication, and storage.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">@supabase/ssr</span>
                  </div>
                  <Badge variant="secondary">0.6.1</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Server-side rendering utilities for Supabase with Next.js App Router.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-purple-500" />
              <CardTitle>UI Components</CardTitle>
            </div>
            <CardDescription>
              Radix UI primitives and shadcn/ui components for accessible, modern interfaces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">@radix-ui/react-*</span>
                  </div>
                  <Badge variant="secondary">Latest</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Accessible, unstyled UI primitives for avatars, dropdowns, navigation, and more.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">lucide-react</span>
                  </div>
                  <Badge variant="secondary">0.525.0</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Beautiful, customizable SVG icons with consistent design and TypeScript support.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">class-variance-authority</span>
                  </div>
                  <Badge variant="secondary">0.7.1</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Type-safe variant-driven component styling with excellent TypeScript support.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">tailwind-merge</span>
                  </div>
                  <Badge variant="secondary">3.3.1</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Utility for merging Tailwind CSS classes without style conflicts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-orange-500" />
              <CardTitle>Forms & Validation</CardTitle>
            </div>
            <CardDescription>
              Form handling, validation, and data transformation libraries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">react-hook-form</span>
                  </div>
                  <Badge variant="secondary">7.60.0</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Performant, flexible forms with easy validation and minimal re-renders.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">@hookform/resolvers</span>
                  </div>
                  <Badge variant="secondary">5.1.1</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Validation resolvers for React Hook Form with Zod integration.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">zod</span>
                  </div>
                  <Badge variant="secondary">3.25.75</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  TypeScript-first schema declaration and validation library.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">sonner</span>
                  </div>
                  <Badge variant="secondary">2.0.6</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Opinionated toast component for React with beautiful animations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              <CardTitle>Development Tools</CardTitle>
            </div>
            <CardDescription>
              Development dependencies for code quality, linting, and build optimization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">eslint</span>
                  </div>
                  <Badge variant="secondary">9</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Linting utility for code quality and consistency across the project.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">eslint-config-next</span>
                  </div>
                  <Badge variant="secondary">15.3.5</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Next.js-specific ESLint configuration with optimized rules.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">@tailwindcss/postcss</span>
                  </div>
                  <Badge variant="secondary">4</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  PostCSS plugin for Tailwind CSS with improved performance.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">tw-animate-css</span>
                  </div>
                  <Badge variant="secondary">1.3.5</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  CSS animations integration for Tailwind with ready-to-use classes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Package Management</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Installation</h3>
              <div className="bg-background rounded p-3">
                <code className="text-sm">npm install</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Install all dependencies with npm
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Development</h3>
              <div className="bg-background rounded p-3">
                <code className="text-sm">npm run dev</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Start development server with Turbopack
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Build</h3>
              <div className="bg-background rounded p-3">
                <code className="text-sm">npm run build</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Build optimized production bundle
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Linting</h3>
              <div className="bg-background rounded p-3">
                <code className="text-sm">npm run lint</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Run ESLint for code quality checks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
