import { toast } from 'sonner'

// Authentication notifications
export const authNotifications = {
  signUpSuccess: () => toast.success('Account created successfully! Welcome aboard! 🎉'),
  signInSuccess: () => toast.success('Welcome back! 👋'),
  signOutSuccess: () => toast.success('Signed out successfully. See you soon! 👋'),
  passwordResetSent: () => toast.success('Password reset email sent! 📧'),
  passwordUpdated: () => toast.success('Password updated successfully! 🎉'),
  
  // Error notifications
  invalidCredentials: () => toast.error('Invalid email or password'),
  usernameTaken: () => toast.error('Username is already taken'),
  passwordMismatch: () => toast.error('Passwords do not match'),
  weakPassword: () => toast.error('Please ensure your password meets all requirements'),
  invalidUsername: () => toast.error('Please enter a valid username'),
  signOutError: () => toast.error('Error signing out. Please try again.'),
  
  // Database and system errors
  databaseError: () => toast.error('Database error occurred. Please try again or contact support if the issue persists.'),
  userAlreadyExists: () => toast.error('An account with this email already exists'),
  invalidEmail: () => toast.error('Please enter a valid email address'),
  signUpDisabled: () => toast.error('Sign up is currently disabled. Please contact support.'),
  
  // Generic auth errors
  authError: (message: string) => toast.error(message),
  unexpectedError: () => toast.error('An unexpected error occurred. Please try again.'),
}

// Profile notifications
export const profileNotifications = {
  updateSuccess: () => toast.success('Profile updated successfully! ✨'),
  updateError: (message?: string) => toast.error(message || 'Failed to update profile'),
}

// Form notifications
export const formNotifications = {
  validationError: (message: string) => toast.error(message),
  saveSuccess: (item: string) => toast.success(`${item} saved successfully!`),
  deleteSuccess: (item: string) => toast.success(`${item} deleted successfully!`),
}

// Loading notifications with promises
export const loadingNotifications = {
  // For promise-based operations
  promise: <T>(
    promise: Promise<T>, 
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: Error) => string)
    }
  ) => toast.promise(promise, messages),
  
  // Common promise patterns
  savingProfile: (promise: Promise<unknown>) => 
    toast.promise(promise, {
      loading: 'Saving profile...',
      success: 'Profile saved successfully! ✨',
      error: 'Failed to save profile',
    }),
    
  checkingUsername: (promise: Promise<boolean>) =>
    toast.promise(promise, {
      loading: 'Checking username availability...',
      success: (available) => available ? 'Username is available! ✅' : 'Username is taken ❌',
      error: 'Failed to check username availability',
    }),
}
