# 🖼️ Avatar Upload System

A comprehensive avatar upload and management system built with Supabase storage and Next.js.

## 📋 Overview

The avatar upload system allows users to:
- Upload profile pictures with client-side validation
- Preview avatars with fallback to user initials
- Delete and replace existing avatars
- Secure file storage with user-specific access controls

## 🏗️ Architecture

### Components

#### `AvatarUpload` Component
**Location**: `src/components/ui/avatar-upload.tsx`

**Features**:
- File upload with drag-and-drop support
- Image preview with fallback initials
- Loading states and error handling
- Size variants (sm, md, lg)
- Editable/read-only modes

**Props**:
```typescript
interface AvatarUploadProps {
  userId: string                    // User ID for file organization
  currentAvatarUrl?: string | null  // Current avatar URL
  userName?: string | null          // User name for initials fallback
  onAvatarChange?: (url: string | null) => void // Callback on avatar change
  size?: 'sm' | 'md' | 'lg'        // Avatar size variant
  editable?: boolean               // Enable/disable editing
}
```

#### `AvatarService` Utility
**Location**: `src/lib/avatar-service.ts`

**Methods**:
- `uploadAvatar(file: File, userId: string)` - Upload avatar to storage
- `deleteAvatar(path: string)` - Delete avatar from storage
- `getAvatarUrl(path: string)` - Get public URL for avatar
- `updateProfileAvatar(userId: string, avatarPath: string | null)` - Update profile record

## 🔧 Setup

### 1. Supabase Storage Configuration

The system uses a dedicated `avatars` bucket with the following configuration:

```sql
-- Create the avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);
```

### 2. Row Level Security (RLS) Policies

Security policies ensure users can only manage their own avatars:

```sql
-- Users can view all avatars (public read)
CREATE POLICY "Users can view all avatars" ON storage.objects 
FOR SELECT USING (bucket_id = 'avatars');

-- Users can upload their own avatars
CREATE POLICY "Users can upload their own avatars" ON storage.objects 
FOR INSERT WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own avatars
CREATE POLICY "Users can update their own avatars" ON storage.objects 
FOR UPDATE USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own avatars
CREATE POLICY "Users can delete their own avatars" ON storage.objects 
FOR DELETE USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 3. Database Schema

The profiles table includes an `avatar_url` column:

```sql
-- Avatar URL column in profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
```

## 🎯 Usage

### Basic Avatar Upload

```tsx
import { AvatarUpload } from '@/components/ui/avatar-upload'

function ProfilePage({ user, profile }) {
  return (
    <AvatarUpload
      userId={user.id}
      currentAvatarUrl={profile.avatar_url}
      userName={profile.full_name}
      onAvatarChange={() => {
        // Refresh profile data
      }}
      size="lg"
    />
  )
}
```

### Read-Only Avatar Display

```tsx
<AvatarUpload
  userId={user.id}
  currentAvatarUrl={profile.avatar_url}
  userName={profile.full_name}
  size="md"
  editable={false}
/>
```

### Direct Service Usage

```tsx
import { AvatarService } from '@/lib/avatar-service'

const avatarService = new AvatarService()

// Upload avatar
const { data, error } = await avatarService.uploadAvatar(file, userId)

// Delete avatar
await avatarService.deleteAvatar('user-id/avatar.jpg')

// Get public URL
const url = avatarService.getAvatarUrl('user-id/avatar.jpg')
```

## 📁 File Organization

Avatar files are organized by user ID:
```
avatars/
├── user-1/
│   ├── 1641234567890.jpg
│   └── 1641234567891.png
├── user-2/
│   └── 1641234567892.webp
└── user-3/
    └── 1641234567893.gif
```

## ✅ File Validation

### Client-Side Validation
- **File Types**: JPEG, JPG, PNG, WebP, GIF
- **File Size**: Maximum 5MB
- **Real-time Feedback**: Instant validation with user notifications

### Server-Side Validation
- **Bucket Configuration**: MIME type restrictions
- **Size Limits**: Enforced at storage level
- **Access Control**: RLS policies prevent unauthorized access

## 🔒 Security Features

### Row Level Security
- Users can only upload to their own directory
- Public read access for all avatars
- Automatic cleanup of old files when uploading new ones

### File Path Security
- User ID-based folder organization
- Timestamp-based file naming prevents conflicts
- No direct file path exposure to clients

## 🎨 UI/UX Features

### Visual Feedback
- **Loading States**: Spinner animations during upload/delete
- **Progress Indication**: Clear upload/delete progress
- **Error States**: Descriptive error messages
- **Success Notifications**: Confirmation of successful operations

### Responsive Design
- **Size Variants**: Multiple avatar sizes for different contexts
- **Mobile Optimized**: Touch-friendly upload interface
- **Accessible**: Screen reader friendly with proper ARIA labels

### Fallback Handling
- **User Initials**: Automatic generation from user name
- **Placeholder Avatar**: Generic user icon when no name available
- **Graceful Degradation**: Continues working if storage fails

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload valid image file (JPEG, PNG, WebP, GIF)
- [ ] Test file size limit (try uploading >5MB file)
- [ ] Test invalid file types (try uploading PDF, etc.)
- [ ] Upload new avatar (should replace existing)
- [ ] Delete avatar (should show initials fallback)
- [ ] Test different avatar sizes (sm, md, lg)
- [ ] Test read-only mode
- [ ] Verify proper error messages
- [ ] Test on mobile devices
- [ ] Test with slow network connection

### Automated Testing

```bash
# Run component tests
npm test -- --testPathPattern=avatar

# Run integration tests
npm run test:integration
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Customization Options

#### File Size Limit
Modify in both places:
1. Supabase bucket configuration
2. Client-side validation in `AvatarUpload` component

#### Allowed File Types
Update in:
1. Supabase bucket `allowed_mime_types`
2. Client-side validation array
3. File input `accept` attribute

#### Avatar Sizes
Customize size variants in `AvatarUpload` component:
```tsx
const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
  xl: 'h-32 w-32'  // Add custom sizes
}
```

## 🚨 Troubleshooting

### Common Issues

#### Upload Fails
- Check file size (must be <5MB)
- Verify file type is supported
- Ensure user is authenticated
- Check Supabase storage bucket permissions

#### Avatar Not Displaying
- Verify `avatar_url` is correctly stored in database
- Check public read permissions on storage bucket
- Ensure correct file path format

#### Permission Errors
- Verify RLS policies are properly configured
- Check user authentication status
- Ensure `auth.uid()` matches the user attempting upload

### Debug Tools

```tsx
// Enable debug logging in AvatarService
const avatarService = new AvatarService()
console.log('Upload result:', await avatarService.uploadAvatar(file, userId))
```

## 📈 Performance Optimization

### Image Optimization
- **Automatic Compression**: Supabase handles image optimization
- **CDN Delivery**: Files served via Supabase CDN
- **Lazy Loading**: Avatar images load only when needed

### Caching Strategy
- **Browser Caching**: Proper cache headers for avatar images
- **URL Versioning**: Timestamps prevent stale cache issues
- **Optimistic Updates**: UI updates before server confirmation

## 🔄 Migration Guide

### From Local File Storage
1. Export existing avatar files
2. Create Supabase storage bucket
3. Migrate files using batch upload script
4. Update database URLs to point to Supabase

### Database Updates
```sql
-- Add avatar_url column if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update existing records with new URLs
UPDATE profiles 
SET avatar_url = 'https://your-project.supabase.co/storage/v1/object/public/avatars/' || id || '/avatar.jpg'
WHERE avatar_url IS NULL AND has_avatar = true;
```

## 📚 Related Documentation

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js File Upload Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Shadcn UI Avatar Component](https://ui.shadcn.com/docs/components/avatar)

---

*Last updated: July 8, 2025*
