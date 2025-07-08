'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff, Check, X, CheckCircle, AlertCircle } from 'lucide-react'
import { authNotifications } from '@/lib/notifications'
import Link from 'next/link'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [usernameChecking, setUsernameChecking] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Password validation
  const passwordValidation = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passwordStrength = {
    score: Object.values(passwordValidation).filter(Boolean).length,
    label: (() => {
      const score = Object.values(passwordValidation).filter(Boolean).length
      if (score <= 2) return 'Weak'
      if (score <= 3) return 'Fair'
      if (score <= 4) return 'Good'
      return 'Strong'
    })(),
    color: (() => {
      const score = Object.values(passwordValidation).filter(Boolean).length
      if (score <= 2) return 'bg-red-500'
      if (score <= 3) return 'bg-yellow-500'
      if (score <= 4) return 'bg-blue-500'
      return 'bg-green-500'
    })(),
  }

  const isPasswordValid = passwordValidation.minLength && passwordValidation.hasUppercase && passwordValidation.hasLowercase && passwordValidation.hasNumber
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  // Username validation
  const usernameValidation = {
    minLength: username.length >= 3,
    maxLength: username.length <= 30,
    validChars: /^[a-zA-Z0-9_]+$/.test(username),
  }

  const isUsernameValid = Object.values(usernameValidation).every(Boolean)

  // Check username availability
  useEffect(() => {
    const checkUsername = async () => {
      if (!username || !isUsernameValid) {
        setUsernameAvailable(null)
        return
      }

      setUsernameChecking(true)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .limit(1)

        if (error) {
          console.error('Error checking username:', error)
          setUsernameAvailable(null)
        } else {
          setUsernameAvailable(data.length === 0)
        }
      } catch (err) {
        console.error('Error checking username:', err)
        setUsernameAvailable(null)
      } finally {
        setUsernameChecking(false)
      }
    }

    const timeoutId = setTimeout(checkUsername, 500)
    return () => clearTimeout(timeoutId)
  }, [username, isUsernameValid, supabase])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isPasswordValid) {
      authNotifications.weakPassword()
      return
    }

    if (!passwordsMatch) {
      authNotifications.passwordMismatch()
      return
    }

    if (!isUsernameValid) {
      authNotifications.invalidUsername()
      return
    }

    if (usernameAvailable === false) {
      authNotifications.usernameTaken()
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
          }
        }
      })

      if (error) {
        console.error('Sign up error:', error)
        
        // Handle specific database errors
        if (error.message.includes('unexpected_failure') || error.message.includes('Database error')) {
          authNotifications.databaseError()
        } else if (error.message.includes('User already registered')) {
          authNotifications.userAlreadyExists()
        } else if (error.message.includes('Invalid email')) {
          authNotifications.invalidEmail()
        } else if (error.message.includes('Password')) {
          authNotifications.weakPassword()
        } else if (error.message.includes('signup_disabled')) {
          authNotifications.signUpDisabled()
        } else {
          authNotifications.authError(`Sign up failed: ${error.message}`)
        }
        setError(error.message)
      } else {
        console.log('Sign up successful:', data)
        authNotifications.signUpSuccess()
        
        // Give the database trigger a moment to create the profile
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Profile will be automatically created via database trigger
        router.push('/dashboard')
        router.refresh()
      }
    } catch (catchError) {
      console.error('Unexpected error during sign up:', catchError)
      const errorMessage = 'An unexpected error occurred. Please try again.'
      authNotifications.unexpectedError()
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                required
                disabled={loading}
              />
              {username && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {usernameChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  ) : usernameAvailable === true ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : usernameAvailable === false ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
            {username && (
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  {usernameValidation.minLength ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-red-500" />
                  )}
                  <span className={usernameValidation.minLength ? 'text-green-600' : 'text-red-600'}>
                    At least 3 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {usernameValidation.maxLength ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-red-500" />
                  )}
                  <span className={usernameValidation.maxLength ? 'text-green-600' : 'text-red-600'}>
                    Less than 30 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {usernameValidation.validChars ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-red-500" />
                  )}
                  <span className={usernameValidation.validChars ? 'text-green-600' : 'text-red-600'}>
                    Only letters, numbers, and underscores
                  </span>
                </div>
                {username && isUsernameValid && (
                  <div className="flex items-center gap-2">
                    {usernameAvailable === true ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-600">Username available</span>
                      </>
                    ) : usernameAvailable === false ? (
                      <>
                        <X className="h-3 w-3 text-red-500" />
                        <span className="text-red-600">Username already taken</span>
                      </>
                    ) : usernameChecking ? (
                      <span className="text-gray-600">Checking availability...</span>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Password strength:</span>
                  <span className={`text-sm font-medium ${
                    passwordStrength.score <= 2 ? 'text-red-600' :
                    passwordStrength.score <= 3 ? 'text-yellow-600' :
                    passwordStrength.score <= 4 ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    {passwordValidation.minLength ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                    <span className={passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasUppercase ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                    <span className={passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasLowercase ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                    <span className={passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasNumber ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                    <span className={passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}>
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordValidation.hasSpecial ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                    <span className={passwordValidation.hasSpecial ? 'text-green-600' : 'text-red-600'}>
                      One special character (optional)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {confirmPassword && (
              <div className="flex items-center gap-2 text-sm">
                {passwordsMatch ? (
                  <>
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="text-green-600">Passwords match</span>
                  </>
                ) : (
                  <>
                    <X className="h-3 w-3 text-red-500" />
                    <span className="text-red-600">Passwords don&apos;t match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !isPasswordValid || !passwordsMatch || !isUsernameValid || usernameAvailable === false}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
