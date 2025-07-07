import { NewPasswordForm } from '@/components/auth/NewPasswordForm'

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <NewPasswordForm />
      </div>
    </div>
  )
}
