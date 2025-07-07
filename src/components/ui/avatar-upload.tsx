'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Loader2, Upload, Trash2 } from 'lucide-react'
import { AvatarService } from '@/lib/avatar-service'
import { authNotifications, profileNotifications, formNotifications } from '@/lib/notifications'

interface AvatarUploadProps {
  userId: string
  currentAvatarUrl?: string | null
  userName?: string | null
  onAvatarChange?: (avatarUrl: string | null) => void
  size?: 'sm' | 'md' | 'lg'
  editable?: boolean
}

export function AvatarUpload({ 
  userId, 
  currentAvatarUrl, 
  userName, 
  onAvatarChange,
  size = 'md',
  editable = true
}: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarService = new AvatarService()

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      authNotifications.authError('Please select a valid image file (JPEG, PNG, WebP, or GIF)')
      return
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      authNotifications.authError('Image size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      // Delete existing avatar if present
      if (avatarUrl && avatarUrl.includes('supabase')) {
        const pathParts = avatarUrl.split('/avatars/')
        if (pathParts.length > 1) {
          await avatarService.deleteAvatar(pathParts[1])
        }
      }

      // Upload new avatar
      const { data, error } = await avatarService.uploadAvatar(file, userId)
      
      if (error) {
        throw error
      }

      if (data?.path) {
        const publicUrl = avatarService.getAvatarUrl(data.path)
        
        // Update profile in database
        const { error: updateError } = await avatarService.updateProfileAvatar(userId, data.path)
        
        if (updateError) {
          throw updateError
        }

        setAvatarUrl(publicUrl)
        onAvatarChange?.(publicUrl)
        profileNotifications.updateSuccess()
      }
    } catch (error) {
      console.error('Avatar upload error:', error)
      profileNotifications.updateError('Failed to upload avatar')
    } finally {
      setUploading(false)
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDeleteAvatar = async () => {
    if (!avatarUrl) return

    setDeleting(true)

    try {
      // Delete from storage if it's a Supabase URL
      if (avatarUrl.includes('supabase')) {
        const pathParts = avatarUrl.split('/avatars/')
        if (pathParts.length > 1) {
          const { error } = await avatarService.deleteAvatar(pathParts[1])
          if (error) {
            throw error
          }
        }
      }

      // Update profile to remove avatar URL
      const { error: updateError } = await avatarService.updateProfileAvatar(userId, null)
      
      if (updateError) {
        throw updateError
      }

      setAvatarUrl(null)
      onAvatarChange?.(null)
      formNotifications.deleteSuccess('Avatar')
    } catch (error) {
      console.error('Avatar deletion error:', error)
      authNotifications.authError('Failed to delete avatar')
    } finally {
      setDeleting(false)
    }
  }

  if (!editable) {
    return (
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={avatarUrl || undefined} alt={userName || 'User avatar'} />
        <AvatarFallback>
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={avatarUrl || undefined} alt={userName || 'User avatar'} />
          <AvatarFallback>
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              getInitials(userName)
            )}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading || deleting}
            className="hidden"
            id="avatar-upload"
          />
          <Label htmlFor="avatar-upload">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading || deleting}
              className="cursor-pointer"
              asChild
            >
              <span>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </span>
            </Button>
          </Label>
        </div>

        {avatarUrl && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeleteAvatar}
            disabled={uploading || deleting}
          >
            {deleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </>
            )}
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        JPG, PNG, WebP or GIF (max 5MB)
      </p>
    </div>
  )
}
