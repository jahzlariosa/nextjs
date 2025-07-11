/**
 * Browser detection and compatibility utilities
 * Specifically handles Brave browser quirks with authentication
 */

export function isBraveBrowser(): boolean {
  if (typeof window === 'undefined') return false
  
  // Multiple ways to detect Brave browser
  return !!(
    // @ts-expect-error - Brave-specific navigator property
    (navigator.brave && navigator.brave.isBrave) ||
    // Check user agent
    navigator.userAgent.includes('Brave') ||
    // Check for Brave-specific features
    ('brave' in navigator)
  )
}

export function isPrivateBrowsing(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }

    // Test localStorage availability (blocked in some private modes)
    try {
      const testKey = '__private_browsing_test__'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      resolve(false)
    } catch {
      resolve(true)
    }
  })
}

export function getBrowserInfo() {
  if (typeof window === 'undefined') {
    return {
      isBrave: false,
      isPrivate: false,
      userAgent: '',
    }
  }

  return {
    isBrave: isBraveBrowser(),
    userAgent: navigator.userAgent,
  }
}

/**
 * Enhanced session storage for Brave compatibility
 */
export class BraveCompatibleStorage {
  private storageKey: string

  constructor(key: string = 'app_auth_state') {
    this.storageKey = key
  }

  setItem(key: string, value: string): void {
    try {
      // Try localStorage first
      localStorage.setItem(`${this.storageKey}_${key}`, value)
    } catch {
      try {
        // Fallback to sessionStorage
        sessionStorage.setItem(`${this.storageKey}_${key}`, value)
      } catch {
        // Fallback to memory storage (in-memory only)
        this.memoryStorage.set(key, value)
      }
    }
  }

  getItem(key: string): string | null {
    try {
      return localStorage.getItem(`${this.storageKey}_${key}`)
    } catch {
      try {
        return sessionStorage.getItem(`${this.storageKey}_${key}`)
      } catch {
        return this.memoryStorage.get(key) || null
      }
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(`${this.storageKey}_${key}`)
    } catch {
      // Silent fail
    }
    
    try {
      sessionStorage.removeItem(`${this.storageKey}_${key}`)
    } catch {
      // Silent fail
    }
    
    this.memoryStorage.delete(key)
  }

  private memoryStorage = new Map<string, string>()
}

export const authStorage = new BraveCompatibleStorage('supabase_auth')
