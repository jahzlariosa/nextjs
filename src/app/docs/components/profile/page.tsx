import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ProfileComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Profile Components</h1>
        <p className="text-lg text-muted-foreground mt-2">
          User profile management components including display, editing, and avatar upload.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ProfileDisplay Component
              <Badge variant="secondary">Client</Badge>
            </CardTitle>
            <CardDescription>
              Displays user profile information with edit and avatar upload capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Avatar display with upload functionality</li>
                <li>Profile information display</li>
                <li>Edit mode toggle</li>
                <li>Real-time profile updates</li>
                <li>Responsive card layout</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Props</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`interface ProfileDisplayProps {
  profile: Profile
  onUpdate: () => void
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { ProfileDisplay } from '@/components/profile'

<ProfileDisplay 
  profile={profile} 
  onUpdate={refreshProfile} 
/>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ProfileEditForm Component
              <Badge variant="secondary">Client</Badge>
            </CardTitle>
            <CardDescription>
              Form component for editing user profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Form validation with error handling</li>
                <li>Real-time updates to Supabase</li>
                <li>Loading states and success feedback</li>
                <li>Cancel and save functionality</li>
                <li>Responsive form layout</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Props</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`interface ProfileEditFormProps {
  profile: Profile
  onSave: (updatedProfile: Profile) => void
  onCancel: () => void
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { ProfileEditForm } from '@/components/profile'

<ProfileEditForm 
  profile={profile}
  onSave={handleSave}
  onCancel={handleCancel}
/>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              UserProfileClient Component
              <Badge variant="secondary">Client</Badge>
            </CardTitle>
            <CardDescription>
              Main profile management component that orchestrates profile display and editing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>State management for profile data</li>
                <li>Handles profile refresh from server</li>
                <li>Loading states with skeleton UI</li>
                <li>Error handling and recovery</li>
                <li>Optimistic updates</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Props</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`interface UserProfileClientProps {
  userId: string
  initialProfile: Profile
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { UserProfileClient } from '@/components/profile'

<UserProfileClient 
  userId={user.id} 
  initialProfile={profile} 
/>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Avatar Upload System
              <Badge variant="outline">Feature</Badge>
            </CardTitle>
            <CardDescription>
              Complete avatar upload and management system integrated with Supabase Storage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Drag and drop file upload</li>
                <li>Image preview before upload</li>
                <li>Automatic image optimization</li>
                <li>Supabase Storage integration</li>
                <li>RLS (Row Level Security) policies</li>
                <li>Error handling and validation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Storage Structure</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`avatars/
├── {user-id}/
│   ├── avatar.jpg
│   └── avatar.png
└── public/
    └── default-avatar.png`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Usage</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`import { AvatarUpload } from '@/components/ui/avatar-upload'

<AvatarUpload 
  userId={user.id}
  currentUrl={profile.avatar_url}
  onUpload={handleAvatarUpload}
/>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Profile Data Structure</h2>
        <div className="bg-muted rounded-lg p-6">
          <pre className="text-sm">
{`interface Profile {
  id: string
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  bio: string | null
  location: string | null
  website: string | null
  created_at: string
  updated_at: string
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
