'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProfileDisplay } from '@/components/profile'
import { ProfileSkeleton } from '@/components/skeletons'

interface UserProfileClientProps {
  userId: string
  initialProfile: {
    id: string
    full_name: string | null
    username: string | null
    bio: string | null
    location: string | null
    website: string | null
    created_at: string
    updated_at: string
  }
}

export function UserProfileClient({ userId, initialProfile }: UserProfileClientProps) {
  const [profile, setProfile] = useState(initialProfile)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const refreshProfile = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error refreshing profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <ProfileDisplay 
      profile={profile}
      onUpdate={refreshProfile}
    />
  )
}
