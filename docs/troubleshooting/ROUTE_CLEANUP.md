# Route Structure Cleanup

## Issue
There was a duplicate routing structure for password reset functionality that caused confusion:
- `(auth)/reset-password/` - For requesting password reset
- `auth/reset-password/` - For callback after clicking reset link

## Solution
Cleaned up the routing structure to be more intuitive:

### Current Structure
```
src/app/
├── (auth)/                    # User-facing auth pages (grouped route)
│   ├── sign-in/
│   ├── sign-up/
│   └── reset-password/        # Password reset request form
└── auth/                      # Auth callbacks and API routes
    ├── callback/              # Password reset callback (renamed from reset-password)
    └── signout/               # Sign out API route (moved from (auth) group)
```

### Changes Made
1. **Moved signout route**: `(auth)/signout/route.ts` → `auth/signout/route.ts`
2. **Renamed callback route**: `auth/reset-password/` → `auth/callback/`
3. **Updated redirect URL**: Password reset emails now redirect to `/auth/callback`

### Route Purposes
- **`(auth)/reset-password`** - User navigates here to request password reset
- **`auth/callback`** - User lands here after clicking email link to set new password
- **`auth/signout`** - API route for signing out users

### Updated Components
- **PasswordResetForm**: Now redirects to `/auth/callback` instead of `/auth/reset-password`
- **AuthCallbackPage**: Renamed from `ResetPasswordCallbackPage` for clarity

This structure follows Next.js App Router conventions where:
- `(auth)` is a route group for user-facing auth pages
- `auth/` contains API routes and callbacks that users don't directly navigate to
