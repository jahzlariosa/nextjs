'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AvatarUpload } from '@/components/ui/avatar-upload'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

const profileSchema = z.object({
  full_name: z.string().max(100, 'Full name must be less than 100 characters').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be less than 30 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileEditFormProps {
  profile: {
    id: string
    full_name: string | null
    username: string | null
    avatar_url: string | null
    bio: string | null
    location: string | null
    website: string | null
  }
  onUpdate: () => void
}

export function ProfileEditForm({ profile, onUpdate }: ProfileEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name || '',
      username: profile.username || '',
      bio: profile.bio || '',
      location: profile.location || '',
      website: profile.website || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name || null,
          username: data.username || null,
          bio: data.bio || null,
          location: data.location || null,
          website: data.website || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id)

      if (error) throw error

      toast.success('Profile updated successfully! ✨')
      setSuccess(true)
      onUpdate()
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      toast.error(errorMessage)
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4">
            <AlertDescription>Profile updated successfully!</AlertDescription>
          </Alert>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="text-center">
              <Label className="text-sm font-medium">Profile Picture</Label>
              <p className="text-xs text-gray-500 mt-1">Upload a photo to personalize your profile</p>
            </div>
            <AvatarUpload
              userId={profile.id}
              currentAvatarUrl={profile.avatar_url}
              userName={profile.full_name || profile.username}
              onAvatarChange={onUpdate}
              size="lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                {...form.register('full_name')}
                placeholder="Enter your full name"
              />
              {form.formState.errors.full_name && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.full_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...form.register('username')}
                placeholder="Enter your username"
              />
              {form.formState.errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              {...form.register('bio')}
              placeholder="Tell us about yourself"
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.bio.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...form.register('location')}
                placeholder="Enter your location"
              />
              {form.formState.errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                {...form.register('website')}
                placeholder="https://your-website.com"
              />
              {form.formState.errors.website && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.website.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
