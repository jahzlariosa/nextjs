# 📡 Avatar API Reference

Complete API reference for the avatar upload system components and utilities.

## 📦 Components

### `AvatarUpload`

**Import**: `import { AvatarUpload } from '@/components/ui/avatar-upload'`

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userId` | `string` | - | **Required.** User ID for file organization |
| `currentAvatarUrl` | `string \| null` | `undefined` | Current avatar URL |
| `userName` | `string \| null` | `undefined` | User name for initials fallback |
| `onAvatarChange` | `(url: string \| null) => void` | `undefined` | Callback when avatar changes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Avatar size variant |
| `editable` | `boolean` | `true` | Enable/disable editing capabilities |

#### Example Usage

```tsx
// Basic editable avatar
<AvatarUpload
  userId="user-123"
  currentAvatarUrl="https://example.com/avatar.jpg"
  userName="John Doe"
  onAvatarChange={(url) => console.log('Avatar changed:', url)}
  size="lg"
/>

// Read-only avatar display
<AvatarUpload
  userId="user-123"
  currentAvatarUrl="https://example.com/avatar.jpg"
  userName="John Doe"
  size="md"
  editable={false}
/>
```

### `Avatar` (Shadcn UI)

**Import**: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'`

#### Sub-components

- **`Avatar`**: Main container component
- **`AvatarImage`**: Image display component
- **`AvatarFallback`**: Fallback content when image fails to load

#### Example Usage

```tsx
<Avatar className="h-12 w-12">
  <AvatarImage src={avatarUrl} alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## 🔧 Utilities

### `AvatarService`

**Import**: `import { AvatarService } from '@/lib/avatar-service'`

#### Constructor

```typescript
const avatarService = new AvatarService()
```

#### Methods

##### `uploadAvatar(file: File, userId: string)`

Upload an avatar file to Supabase storage.

**Parameters**:
- `file`: The image file to upload
- `userId`: User ID for file organization

**Returns**: `Promise<{ data?: { path: string }, error?: Error }>`

**Example**:
```typescript
const { data, error } = await avatarService.uploadAvatar(file, 'user-123')
if (error) {
  console.error('Upload failed:', error)
} else {
  console.log('Uploaded to:', data.path)
}
```

##### `deleteAvatar(path: string)`

Delete an avatar file from Supabase storage.

**Parameters**:
- `path`: Storage path of the file to delete

**Returns**: `Promise<{ error?: Error }>`

**Example**:
```typescript
const { error } = await avatarService.deleteAvatar('user-123/1641234567890.jpg')
if (error) {
  console.error('Delete failed:', error)
}
```

##### `getAvatarUrl(path: string)`

Get the public URL for an avatar file.

**Parameters**:
- `path`: Storage path of the file

**Returns**: `string`

**Example**:
```typescript
const url = avatarService.getAvatarUrl('user-123/1641234567890.jpg')
console.log('Public URL:', url)
```

##### `updateProfileAvatar(userId: string, avatarPath: string | null)`

Update the user's profile with the new avatar URL.

**Parameters**:
- `userId`: User ID
- `avatarPath`: Storage path of the avatar (null to remove)

**Returns**: `Promise<{ error?: Error }>`

**Example**:
```typescript
// Set new avatar
const { error } = await avatarService.updateProfileAvatar('user-123', 'user-123/avatar.jpg')

// Remove avatar
const { error } = await avatarService.updateProfileAvatar('user-123', null)
```

## 🔔 Notifications

### `authNotifications`

**Import**: `import { authNotifications } from '@/lib/notifications'`

#### Methods

- `authError(message: string)`: Display authentication error
- `unexpectedError()`: Display generic error message

### `profileNotifications`

**Import**: `import { profileNotifications } from '@/lib/notifications'`

#### Methods

- `updateSuccess()`: Display profile update success message
- `updateError(message?: string)`: Display profile update error

### `formNotifications`

**Import**: `import { formNotifications } from '@/lib/notifications'`

#### Methods

- `validationError(message: string)`: Display validation error
- `deleteSuccess(item: string)`: Display deletion success message

## 📊 Type Definitions

### `AvatarUploadProps`

```typescript
interface AvatarUploadProps {
  userId: string
  currentAvatarUrl?: string | null
  userName?: string | null
  onAvatarChange?: (avatarUrl: string | null) => void
  size?: 'sm' | 'md' | 'lg'
  editable?: boolean
}
```

### `AvatarServiceResponse`

```typescript
// Upload response
interface UploadResponse {
  data?: { path: string }
  error?: Error
}

// Delete response
interface DeleteResponse {
  error?: Error
}

// Profile update response
interface ProfileUpdateResponse {
  error?: Error
}
```

## 🎯 Size Variants

### CSS Classes

```typescript
const sizeClasses = {
  sm: 'h-8 w-8',      // 32px × 32px
  md: 'h-16 w-16',    // 64px × 64px
  lg: 'h-24 w-24'     // 96px × 96px
}
```

### Usage Context

- **`sm`**: Navigation bars, compact lists
- **`md`**: Profile cards, comments
- **`lg`**: Profile pages, settings

## 🔒 File Validation

### Client-Side Validation

```typescript
// Allowed file types
const allowedTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
]

// File size limit
const maxSize = 5 * 1024 * 1024 // 5MB
```

### Server-Side Validation

Configured in Supabase storage bucket:

```sql
-- File size limit: 5MB
file_size_limit = 5242880

-- Allowed MIME types
allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/gif'
]
```

## 📁 File Organization

### Storage Structure

```
avatars/
├── {userId}/
│   ├── {timestamp}.{ext}
│   └── {timestamp}.{ext}
└── {userId}/
    └── {timestamp}.{ext}
```

### File Naming Convention

```typescript
// File naming pattern
const fileName = `${userId}/${Date.now()}.${fileExtension}`

// Example: user-123/1641234567890.jpg
```

## 🚨 Error Handling

### Common Error Types

```typescript
// File validation errors
'Please select a valid image file (JPEG, PNG, WebP, or GIF)'
'Image size must be less than 5MB'

// Upload errors
'Failed to upload avatar'
'Database error occurred'

// Delete errors
'Failed to delete avatar'
'Avatar not found'
```

### Error Response Format

```typescript
interface ErrorResponse {
  error: Error
  message: string
  code?: string
}
```

## 🔄 State Management

### Component State

```typescript
// AvatarUpload component state
const [uploading, setUploading] = useState(false)
const [deleting, setDeleting] = useState(false)
const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl)
```

### Loading States

- **`uploading`**: File upload in progress
- **`deleting`**: File deletion in progress
- **`!uploading && !deleting`**: Ready for user interaction

---

*Last updated: July 8, 2025*
