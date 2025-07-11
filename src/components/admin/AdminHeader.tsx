'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Shield,
  Users,
  BarChart3,
  Home,
  ArrowLeft
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Profile } from '@/lib/types'

interface AdminHeaderProps {
  user?: SupabaseUser
  profile?: Profile
  loading?: boolean
}

export function AdminHeader({ user, profile, loading = false }: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Signed out successfully! 👋')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Error signing out. Please try again.')
    }
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const adminNavigation = [
    { name: 'Overview', href: '/admin', icon: BarChart3 },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Roles', href: '/admin/roles', icon: Shield },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Back Link */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <div className="hidden sm:block h-6 w-px bg-border"></div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-1">
          {adminNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Right Side - User Dropdown */}
        <div className="hidden md:flex items-center space-x-2">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={profile?.avatar_url || user.user_metadata?.avatar_url || undefined} 
                      alt={profile?.full_name || user.user_metadata?.full_name || 'User avatar'} 
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(profile?.full_name || user.user_metadata?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.full_name || user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-red-600 font-medium">
                      Admin Access
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-2 space-y-1">
            {adminNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive(item.href)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
