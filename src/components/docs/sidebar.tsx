'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BookOpen, 
  Zap, 
  Shield, 
  Database, 
  Palette, 
  Settings, 
  Users,
  Code,
  Rocket,
  FileText,
  Layout,
  Image
} from 'lucide-react'

const docsNavigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs', icon: BookOpen },
      { title: 'Quick Start', href: '/docs/quick-start', icon: Zap },
      { title: 'Installation', href: '/docs/installation', icon: Code },
    ]
  },
  {
    title: 'Authentication',
    items: [
      { title: 'Overview', href: '/docs/auth/overview', icon: Shield },
      { title: 'Sign Up & Sign In', href: '/docs/auth/signup-signin', icon: Users },
      { title: 'Session Management', href: '/docs/auth/sessions', icon: Settings },
    ]
  },
  {
    title: 'Components',
    items: [
      { title: 'Layout Components', href: '/docs/components/layout', icon: Layout },
      { title: 'UI Components', href: '/docs/components/ui', icon: Palette },
      { title: 'Profile Components', href: '/docs/components/profile', icon: Users },
    ]
  },
  {
    title: 'Features',
    items: [
      { title: 'Authentication', href: '/docs/features/authentication', icon: Shield },
      { title: 'Avatar Upload', href: '/docs/features/avatar-upload', icon: Image },
    ]
  },
  {
    title: 'Database',
    items: [
      { title: 'Schema', href: '/docs/database/schema', icon: Database },
      { title: 'Row Level Security', href: '/docs/database/rls', icon: Shield },
      { title: 'Migrations', href: '/docs/database/migrations', icon: FileText },
    ]
  },
  {
    title: 'Deployment',
    items: [
      { title: 'Production Deployment', href: '/docs/deployment', icon: Rocket },
      { title: 'Environment Setup', href: '/docs/deployment/env', icon: Settings },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="sticky top-20 h-fit">
      <div className="space-y-6">
        {docsNavigation.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
