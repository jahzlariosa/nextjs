import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-semibold">
            Next.js + Supabase
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/docs" className="text-foreground/60 hover:text-foreground">
              Documentation
            </Link>
            <Link href="/docs/quick-start" className="text-foreground/60 hover:text-foreground">
              Quick Start
            </Link>
            <Link href="/docs/auth/overview" className="text-foreground/60 hover:text-foreground">
              Authentication
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://github.com/jahzlariosa/nextjs" target="_blank">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ExternalLink className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
