import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Settings, User, Bell, Shield, Palette } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const settingsCategories = [
    {
      title: 'Account',
      description: 'Manage your account information and preferences',
      icon: User,
      items: [
        { name: 'Profile Information', description: 'Update your personal details', href: '/profile' },
        { name: 'Email Settings', description: 'Configure email preferences', href: '/settings/email' },
        { name: 'Password', description: 'Change your password', href: '/settings/password' },
      ]
    },
    {
      title: 'Notifications',
      description: 'Configure how you receive notifications',
      icon: Bell,
      items: [
        { name: 'Email Notifications', description: 'Control email alerts', href: '/settings/notifications/email' },
        { name: 'Push Notifications', description: 'Manage push alerts', href: '/settings/notifications/push' },
        { name: 'SMS Notifications', description: 'Configure SMS alerts', href: '/settings/notifications/sms' },
      ]
    },
    {
      title: 'Security',
      description: 'Manage your security and privacy settings',
      icon: Shield,
      items: [
        { name: 'Two-Factor Authentication', description: 'Enable 2FA for extra security', href: '/settings/security/2fa' },
        { name: 'Login History', description: 'View your login activity', href: '/settings/security/history' },
        { name: 'Connected Apps', description: 'Manage connected applications', href: '/settings/security/apps' },
      ]
    },
    {
      title: 'Appearance',
      description: 'Customize the look and feel of your account',
      icon: Palette,
      items: [
        { name: 'Theme', description: 'Switch between light and dark mode', href: '/settings/appearance/theme' },
        { name: 'Language', description: 'Change your preferred language', href: '/settings/appearance/language' },
        { name: 'Accessibility', description: 'Configure accessibility options', href: '/settings/appearance/accessibility' },
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {settingsCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.items.map((item, index) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <Badge variant="secondary">Coming Soon</Badge>
                      </div>
                      {index < category.items.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">User ID</h4>
                <p className="text-sm text-muted-foreground font-mono">{user.id}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Created</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Last Sign In</h4>
                <p className="text-sm text-muted-foreground">
                  {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
