import { createClient } from '@/lib/supabase/client'

export class AvatarService {
  private supabase = createClient()

  async uploadAvatar(file: File, userId: string): Promise<{ data?: { path: string }, error?: Error }> {
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}.${fileExt}`

      // Upload file to Supabase storage
      const { data, error } = await this.supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        throw error
      }

      return { data }
    } catch (error) {
      console.error('Error uploading avatar:', error)
      return { error: error as Error }
    }
  }

  async deleteAvatar(path: string): Promise<{ error?: Error }> {
    try {
      const { error } = await this.supabase.storage
        .from('avatars')
        .remove([path])

      if (error) {
        throw error
      }

      return {}
    } catch (error) {
      console.error('Error deleting avatar:', error)
      return { error: error as Error }
    }
  }

  getAvatarUrl(path: string): string {
    const { data } = this.supabase.storage
      .from('avatars')
      .getPublicUrl(path)
    
    return data.publicUrl
  }

  async updateProfileAvatar(userId: string, avatarPath: string | null): Promise<{ error?: Error }> {
    try {
      const { error } = await this.supabase
        .from('profiles')
        .update({ 
          avatar_url: avatarPath ? this.getAvatarUrl(avatarPath) : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        throw error
      }

      return {}
    } catch (error) {
      console.error('Error updating profile avatar:', error)
      return { error: error as Error }
    }
  }
}
