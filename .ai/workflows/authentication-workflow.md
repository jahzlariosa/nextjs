# Authentication Workflow Documentation

This document outlines the process of managing authentication in the Next.js application using Supabase. The workflow is designed to be secure, efficient, and easy to implement within the context of this app.

## 📋 Overview
The authentication system leverages Supabase for user management and authentication, with customized handling for user sessions and database interactions using RLS (Row Level Security).

### Requirements
- User registration with email verification
- Secure password authentication
- Automatic profile creation upon user signup
- Password reset functionality
- Middleware for route protection

## 🔍 Research Phase

### Components Involved
- **SignUpForm**: Handles user registration.
- **SignInForm**: Manages user sign-in.
- **AuthProvider**: Provides authentication context.
- **PasswordResetForm**: Facilitates password reset requests.
- **NewPasswordForm**: Allows users to set a new password following a reset.

### Database Integration
- Profiles, roles, and profile_roles tables manage user roles and information.
- Automatic profile and role assignment using Supabase triggers.
- RLS policies ensure secure data access.

## 🛠️ Implementation

### User Registration
- Users fill out the SignUpForm, providing their email, password, and optional full name.
- `server.ts` handles sign-up requests, creating authentication records in Supabase.
- A database trigger creates a corresponding profile with default roles.
- The user is redirected to the dashboard upon successful registration.

### Sign-In Process
- Users enter credentials through the SignInForm.
- `server.ts` verifies credentials with Supabase.
- Upon successful validation, session cookies are set, and the user is redirected to their dashboard.

### Password Reset
- Users can initiate a password reset via the PasswordResetForm.
- An email containing a reset link is dispatched through Supabase.
- Users follow the link to submit a new password using the NewPasswordForm.

### Middleware Protection
- Middleware checks for valid sessions on protected routes (`/dashboard`, `/profile`, `/settings`).
- Redirects users without valid sessions to the sign-in page.

## ✅ Testing
- Route accessibility is verified for authenticated and non-authenticated users.
- User registration flows test successful and failed attempts.
- Password reset functionality checks email dispatch and reset capabilities.

## 📚 Documentation Updates
- Comprehensive documentation is provided at `/docs/auth/overview`.

