import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LayoutComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Layout Components</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Comprehensive guide to the layout components including Header, Footer, and LayoutWrapper.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Header Component
              <Badge variant="secondary">Client</Badge>
            </CardTitle>
            <CardDescription>
              Full-width responsive header with navigation, user dropdown, and mobile menu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Responsive navigation with mobile hamburger menu</li>
                <li>User dropdown with avatar, profile links, and sign out</li>
                <li>Notification bell with badge</li>
                <li>Full-width background with centered content</li>
                <li>Sticky positioning for better UX</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Props</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`interface HeaderProps {
  user?: User | null
  profile?: Profile | null
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Header } from '@/components/layout'

<Header user={user} profile={profile} />`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Footer Component
              <Badge variant="secondary">Server</Badge>
            </CardTitle>
            <CardDescription>
              Full-width responsive footer with brand info, links, and newsletter signup.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Organized link sections (Product, Company, Support, Legal)</li>
                <li>Social media links with icons</li>
                <li>Newsletter signup form</li>
                <li>Responsive grid layout</li>
                <li>Brand information and copyright</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Footer } from '@/components/layout'

<Footer />`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              LayoutWrapper Component
              <Badge variant="secondary">Client</Badge>
            </CardTitle>
            <CardDescription>
              Main layout wrapper that manages authentication state and provides consistent layout.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Authentication state management</li>
                <li>Automatic user and profile fetching</li>
                <li>Loading states with skeletons</li>
                <li>Consistent header and footer across all pages</li>
                <li>Responsive main content area</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Props</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`interface LayoutWrapperProps {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { LayoutWrapper } from '@/components/layout'

<LayoutWrapper>
  <YourPageContent />
</LayoutWrapper>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Implementation Notes</h2>
        <div className="bg-muted rounded-lg p-6">
          <ul className="space-y-2 text-sm">
            <li>• All layout components use <code>container mx-auto</code> for proper content centering</li>
            <li>• Header and footer have full-width backgrounds for modern design</li>
            <li>• Mobile responsiveness is built-in with Tailwind breakpoints</li>
            <li>• Authentication state is managed centrally in LayoutWrapper</li>
            <li>• Components are optimized for both server and client rendering</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
