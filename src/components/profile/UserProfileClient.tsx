'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProfileDisplay } from '@/components/profile'
import { ProfileSkeleton } from '@/components/skeletons'
import { Profile } from '@/lib/types'

interface UserProfileClientProps {
  userId: string
  initialProfile: Profile
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
        .select('*, roles:profile_roles(roles(id, name))')
        .eq('id', userId)
        .single()
      
      if (data) {
        setProfile(data as unknown as Profile)
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
