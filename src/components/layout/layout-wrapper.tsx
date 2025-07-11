'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Header } from './header'
import { Footer } from './footer'
import { isBraveBrowser, authStorage } from '@/lib/browser-utils'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/lib/types'

interface LayoutWrapperProps {
  children: React.ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

export function LayoutWrapper({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: LayoutWrapperProps) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBrave, setIsBrave] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Detect Brave browser
    setIsBrave(isBraveBrowser())
  }, [])

  useEffect(() => {
    // Get initial session with Brave-specific handling
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          
          // Store user in compatible storage for Brave
          if (isBrave) {
            authStorage.setItem('user_id', session.user.id)
          }
          
          // Fetch user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profileData) {
            setProfile(profileData)
          }
        } else if (isBrave) {
          // For Brave, check if we have a stored user session
          const storedUserId = authStorage.getItem('user_id')
          if (storedUserId) {
            // Try to refresh the session
            await supabase.auth.refreshSession()
          }
        }
      } catch (error) {
        console.error('Error fetching session:', error)
        if (isBrave) {
          // Clear potentially corrupted auth data in Brave
          authStorage.removeItem('user_id')
        }
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Listen for auth changes with enhanced Brave handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, 'Brave:', isBrave)
        
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          
          if (isBrave) {
            authStorage.setItem('user_id', session.user.id)
          }
          
          // Fetch user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          if (profileData) {
            setProfile(profileData)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
          
          if (isBrave) {
            authStorage.removeItem('user_id')
          }
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Handle token refresh for Brave
          setUser(session.user)
          if (isBrave) {
            authStorage.setItem('user_id', session.user.id)
          }
        }
        
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, isBrave])

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <Header 
          user={user || undefined} 
          profile={profile || undefined}
          loading={isLoading}
          isBrave={isBrave}
        />
      )}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
