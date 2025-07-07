import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AvatarUploadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Avatar Upload System</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete avatar upload and management system with Supabase Storage, image optimization, and security.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Storage Architecture
              <Badge variant="outline">Supabase</Badge>
            </CardTitle>
            <CardDescription>
              Organized file structure with user-based folders and public access control.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Storage Structure</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`avatars/
├── {user-id}/
│   ├── avatar.jpg
│   ├── avatar.png
│   └── avatar.webp
├── {user-id-2}/
│   └── avatar.jpg
└── public/
    └── default-avatar.png`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Storage Policies</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`-- Allow users to upload to their own folder
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view any avatar (public read)
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Component</CardTitle>
            <CardDescription>
              Drag-and-drop avatar upload with preview and validation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Drag and drop file upload</li>
                <li>Click to select files</li>
                <li>Image preview before upload</li>
                <li>File type validation (jpg, png, webp)</li>
                <li>File size limits (2MB max)</li>
                <li>Upload progress indication</li>
                <li>Error handling and user feedback</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Component Props</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`interface AvatarUploadProps {
  userId: string
  currentUrl?: string | null
  onUpload: (url: string) => void
  className?: string
}`}
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
  onUpload={(url) => {
    // Handle avatar upload
    updateProfile({ avatar_url: url })
  }}
/>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Process</CardTitle>
            <CardDescription>
              Step-by-step breakdown of the avatar upload workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Upload Flow</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`1. User selects/drops image file
2. Client validates file type and size
3. Generate unique filename with timestamp
4. Upload to Supabase Storage (user folder)
5. Get public URL from storage
6. Update user profile with new avatar URL
7. Update UI with new avatar image
8. Clean up old avatar file (optional)`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Upload Function</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`const uploadAvatar = async (file: File) => {
  // Generate filename
  const fileExt = file.name.split('.').pop()
  const fileName = \`avatar.\${fileExt}\`
  const filePath = \`\${userId}/\${fileName}\`
  
  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })
  
  if (error) throw error
  
  // Get public URL
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)
  
  return data.publicUrl
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image Optimization</CardTitle>
            <CardDescription>
              Automatic image optimization and format conversion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Supabase Transformations</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`// Transform image on display
const optimizedUrl = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath, {
    transform: {
      width: 150,
      height: 150,
      resize: 'cover',
      quality: 80
    }
  })
  
// Different sizes for different use cases
const thumbnailUrl = getPublicUrl(filePath, {
  transform: { width: 50, height: 50 }
})

const largeUrl = getPublicUrl(filePath, {
  transform: { width: 300, height: 300 }
})`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Format Support</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>JPEG - Good compression, universal support</li>
                <li>PNG - Transparency support, lossless</li>
                <li>WebP - Modern format, best compression</li>
                <li>Automatic format detection</li>
                <li>Fallback to original format</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Handling</CardTitle>
            <CardDescription>
              Comprehensive error handling for upload failures and edge cases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Error Types</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>File too large ({'>'}2MB)</li>
                <li>Invalid file type</li>
                <li>Network upload failure</li>
                <li>Storage quota exceeded</li>
                <li>Authentication errors</li>
                <li>Database update failures</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Error Messages</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`const errorMessages = {
  'File size too large': 'Please select an image smaller than 2MB',
  'Invalid file type': 'Please select a JPG, PNG, or WebP image',
  'Upload failed': 'Failed to upload image. Please try again.',
  'Network error': 'Check your internet connection and try again',
  'Storage quota exceeded': 'Storage limit reached. Please contact support'
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Examples</CardTitle>
            <CardDescription>
              Real-world integration examples with profile forms and user settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Profile Form Integration</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`// In ProfileEditForm component
const handleAvatarUpload = async (url: string) => {
  setProfile(prev => ({ ...prev, avatar_url: url }))
  
  // Update database
  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url: url })
    .eq('id', user.id)
  
  if (error) {
    console.error('Error updating avatar:', error)
    // Revert optimistic update
    setProfile(prev => ({ ...prev, avatar_url: oldUrl }))
  }
}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Header Avatar Display</h4>
              <div className="bg-muted rounded-lg p-4">
                <pre className="text-sm">
{`// In Header component
<Avatar className="h-8 w-8">
  <AvatarImage 
    src={profile?.avatar_url} 
    alt={profile?.full_name || 'User'} 
  />
  <AvatarFallback>
    {profile?.full_name?.charAt(0) || 'U'}
  </AvatarFallback>
</Avatar>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Security Considerations</h2>
        <div className="bg-muted rounded-lg p-6">
          <ul className="space-y-2 text-sm">
            <li>• Users can only upload to their own folder (enforced by RLS)</li>
            <li>• File type validation prevents malicious uploads</li>
            <li>• File size limits prevent storage abuse</li>
            <li>• Public read access allows avatar display across the app</li>
            <li>• Old avatars are automatically replaced (upsert: true)</li>
            <li>• All uploads are authenticated through Supabase Auth</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
