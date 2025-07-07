import { PasswordResetForm } from '@/components/auth/PasswordResetForm'

export default function PasswordResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <PasswordResetForm />
      </div>
    </div>
  )
}
