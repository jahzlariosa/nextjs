import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function UIComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">UI Components</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Comprehensive library of UI components built with Shadcn/UI and Tailwind CSS.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Button Component</CardTitle>
            <CardDescription>
              Flexible button component with multiple variants and sizes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">default</Badge>
                <Badge variant="outline">destructive</Badge>
                <Badge variant="outline">outline</Badge>
                <Badge variant="outline">secondary</Badge>
                <Badge variant="outline">ghost</Badge>
                <Badge variant="outline">link</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Button } from '@/components/ui/button'

<Button variant="default" size="md">
  Click me
</Button>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>
              Flexible card component for organizing content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Sub-components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Card - Main container</li>
                <li>CardHeader - Header section</li>
                <li>CardTitle - Title text</li>
                <li>CardDescription - Description text</li>
                <li>CardContent - Main content area</li>
                <li>CardFooter - Footer section</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Complete form system with validation and error handling.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Form - Form context provider</li>
                <li>FormField - Field wrapper with validation</li>
                <li>FormItem - Individual form item</li>
                <li>FormLabel - Field label</li>
                <li>FormControl - Input control wrapper</li>
                <li>FormMessage - Error/helper messages</li>
                <li>Input - Text input component</li>
                <li>Label - Standalone label component</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

<Form>
  <FormField
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="Enter email" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avatar Components</CardTitle>
            <CardDescription>
              Avatar display and upload components with fallback support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Avatar - Main avatar container</li>
                <li>AvatarImage - Image component</li>
                <li>AvatarFallback - Fallback text/icon</li>
                <li>AvatarUpload - Upload functionality</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src={user.avatar_url} alt={user.name} />
  <AvatarFallback>
    {user.name?.charAt(0)}
  </AvatarFallback>
</Avatar>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navigation Components</CardTitle>
            <CardDescription>
              Navigation and dropdown components for complex UI interactions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>NavigationMenu - Main navigation wrapper</li>
                <li>NavigationMenuList - Navigation items list</li>
                <li>NavigationMenuItem - Individual menu item</li>
                <li>NavigationMenuTrigger - Menu trigger button</li>
                <li>NavigationMenuContent - Dropdown content</li>
                <li>DropdownMenu - Dropdown menu system</li>
                <li>DropdownMenuTrigger - Dropdown trigger</li>
                <li>DropdownMenuContent - Dropdown content</li>
                <li>DropdownMenuItem - Individual dropdown item</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loading Components</CardTitle>
            <CardDescription>
              Skeleton loading components for better user experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Skeleton - Basic skeleton component</li>
                <li>ProfileSkeleton - Profile page skeleton</li>
                <li>FormSkeleton - Form loading skeleton</li>
                <li>CardSkeleton - Card loading skeleton</li>
                <li>AuthSkeleton - Authentication skeleton</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Skeleton } from '@/components/ui/skeleton'
import { ProfileSkeleton } from '@/components/skeletons'

// Basic skeleton
<Skeleton className="h-4 w-32" />

// Profile skeleton
<ProfileSkeleton />`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utility Components</CardTitle>
            <CardDescription>
              Additional utility components for enhanced functionality.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Components</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Alert - Alert/notification component</li>
                <li>AlertDescription - Alert content</li>
                <li>Badge - Status and label badges</li>
                <li>Separator - Visual separator lines</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

<Alert>
  <AlertDescription>
    This is an alert message
  </AlertDescription>
</Alert>

<Badge variant="default">New</Badge>
<Separator className="my-4" />`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Theming & Customization</h2>
        <div className="bg-muted rounded-lg p-6">
          <p className="text-sm mb-4">
            All components are built with Tailwind CSS and support theming through CSS variables.
          </p>
          <ul className="space-y-2 text-sm">
            <li>• Components use semantic color tokens (primary, secondary, destructive, etc.)</li>
            <li>• Dark mode support is built-in</li>
            <li>• Components are fully customizable through className props</li>
            <li>• Variants can be extended through the component library</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
