'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BookOpen, 
  Zap, 
  Shield, 
  Palette, 
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
      { title: 'Authentication System', href: '/docs/features/authentication', icon: Shield },
      { title: 'Avatar Upload', href: '/docs/features/avatar-upload', icon: Image },
    ]
  },
  {
    title: 'Deployment',
    items: [
      { title: 'Production Setup', href: '/docs/deployment', icon: Rocket },
    ]
  },
  {
    title: 'Reference',
    items: [
      { title: 'Changelog', href: '/docs/changelog', icon: FileText },
      { title: 'Packages', href: '/docs/packages', icon: Code },
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
