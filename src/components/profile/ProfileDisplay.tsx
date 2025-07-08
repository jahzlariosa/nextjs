'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignOutButton } from '@/components/auth'
import { ProfileEditForm } from './ProfileEditForm'
import { AvatarUpload } from '@/components/ui/avatar-upload'
import { Edit, User, MapPin, Globe, Calendar } from 'lucide-react'
import { Profile } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface ProfileDisplayProps {
  profile: Profile
  onUpdate: () => void
}

export function ProfileDisplay({ profile, onUpdate }: ProfileDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <div className="space-y-4">
        <ProfileEditForm
          profile={profile}
          onUpdate={() => {
            onUpdate()
            setIsEditing(false)
          }}
        />
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(false)}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Profile
            </CardTitle>
            <CardDescription>
              Your profile information and settings
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Avatar Display Section */}
        <div className="flex justify-center mb-6">
          <AvatarUpload
            userId={profile.id}
            currentAvatarUrl={profile.avatar_url}
            userName={profile.full_name || profile.username}
            size="lg"
            editable={false}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </h4>
            <p className="text-muted-foreground">{profile?.full_name || 'Not set'}</p>
          </div>
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Username
            </h4>
            <p className="text-muted-foreground">{profile?.username || 'Not set'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Bio
            </h4>
            <p className="text-muted-foreground">{profile?.bio || 'Not set'}</p>
          </div>
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Roles
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.roles && profile.roles.length > 0 ? (
                profile.roles.map((profileRole) => (
                  <Badge key={profileRole.roles.id}>{profileRole.roles.name}</Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No roles assigned</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h4>
            <p className="text-muted-foreground">{profile?.location || 'Not set'}</p>
          </div>
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </h4>
            {profile?.website ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {profile.website}
              </a>
            ) : (
              <p className="text-muted-foreground">Not set</p>
            )}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Profile created: {new Date(profile?.created_at).toLocaleDateString()}
          </p>
          {profile?.updated_at && profile.updated_at !== profile.created_at && (
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              Last updated: {new Date(profile.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  )
}
