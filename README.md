# Next.js Supabase Starter

A modern, production-ready Next.js starter template with Supabase backend integration. Perfect for building any type of web application - from simple websites to complex SaaS platforms. Comes with authentication, user management, and a complete admin system out of the box.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jahzlariosa/nextjs/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

## � What is this?

This is a **comprehensive starter template** for Next.js applications with Supabase backend. Whether you're building a blog, portfolio, e-commerce site, SaaS application, or any web project, this starter provides you with:

- ✅ **Complete authentication system** ready to use
- ✅ **User management and profiles** out of the box  
- ✅ **Admin dashboard** for managing your application
- ✅ **Modern UI components** with Tailwind CSS
- ✅ **Database setup** with migrations and security
- ✅ **TypeScript** for type safety
- ✅ **Production-ready** architecture

> **🚀 NEW in v1.0.1:** Complete database schema export for instant setup! No more manual migrations - get your entire database ready with one SQL file.

## 🚀 Perfect for Building

- **🌐 Business Websites** - Company sites with user accounts
- **📝 Content Platforms** - Blogs, portfolios, documentation sites
- **🛒 E-commerce** - Online stores with user management
- **💼 SaaS Applications** - Software-as-a-Service platforms
- **📱 Web Apps** - Any application requiring user authentication
- **🏢 Internal Tools** - Company dashboards and admin panels
- **🎓 Learning Projects** - Educational and portfolio projects

## 🎉 Version 1.0.0 Features

### 🔐 Authentication & Security
- **Complete Auth System** - Sign up, sign in, password reset, email verification
- **Server-Side Rendering (SSR)** - Secure authentication with Next.js App Router
- **Automatic Profile Creation** - Users get profiles created on first signup
- **Row Level Security (RLS)** - Database-level security policies
- **Session Management** - Secure session handling with middleware
- **Protected Routes** - Automatic redirection for unauthorized access

### � User Management System
- **User Profiles** - Customizable profile system with avatar uploads
- **Profile Editing** - Users can update their information
- **Settings Management** - User preferences and account settings
- **Real-time Updates** - Instant profile synchronization

### 🛡️ Built-in Admin System *(Optional - Remove if not needed)*
- **Admin Dashboard** - Ready-to-use administrative interface
- **User Management** - Search, edit, and manage all users
- **Role System** - Assign roles and permissions to users
- **Advanced Search** - Find users by name, username, role, or ID
- **Pagination** - Efficiently browse through large user lists
- **Real-time Operations** - Instant updates when managing users

### 🎨 Modern UI & Components
- **Beautiful Design** - Clean, professional interface that works everywhere
- **Responsive Layout** - Mobile-first design that adapts to any screen size
- **Component Library** - Pre-built components using shadcn/ui and Radix UI
- **Dark Mode Ready** - Theme system ready for light/dark mode toggle
- **Form Handling** - Validated forms with React Hook Form and Zod
- **Loading States** - Smooth loading indicators and skeleton screens
- **Notifications** - Toast notifications for user feedback
- **Accessibility** - WCAG compliant with proper keyboard navigation

### 🛠️ Developer Experience
- **TypeScript First** - Complete type safety out of the box
- **Next.js 15** - Latest features with App Router and Server Components
- **Modern Tooling** - ESLint, Turbopack, and optimized development setup
- **Clean Architecture** - Well-organized code structure
- **Comprehensive Docs** - Detailed documentation and setup guides
- **Fast Development** - Hot reloading and efficient build process

### 🗄️ Database & Backend
- **Supabase Integration** - Complete backend-as-a-service setup
- **PostgreSQL Database** - Robust relational database
- **Migration System** - Version-controlled database changes
- **File Storage** - Built-in file upload and storage
- **Real-time Features** - Live data synchronization capabilities
- **Security First** - Row Level Security and proper data protection
## 🚀 Quick Start

Get your Next.js Supabase application up and running in minutes:

### 1. Clone and Install
```bash
git clone https://github.com/jahzlariosa/nextjs.git your-project-name
cd your-project-name
npm install
```

### 2. Set Up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env.local` from the example:
```bash
cp .env.example .env.local
```
4. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Set Up Database (One-Click Setup)
**🚀 FASTEST METHOD:** Use our complete schema export for instant setup:

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** 
3. Copy the entire contents of `database/full_schema_export.sql`
4. Paste and **RUN** the script

**That's it!** This single file sets up:
- ✅ All tables with proper relationships
- ✅ Authentication triggers and functions  
- ✅ Row Level Security (RLS) policies
- ✅ Storage buckets for avatars
- ✅ Default roles (user, admin, moderator)
- ✅ Performance indexes and views

<details>
<summary>📋 Alternative: Manual Migration Setup</summary>

If you prefer step-by-step setup:
1. Run `database/migrations/001_create_profiles_table.sql`
2. Run `database/migrations/010_recreate_handle_new_user_trigger.sql`

But the complete schema export is much faster and includes additional optimizations.
</details>

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` and start building your application!

### 5. Customize for Your Needs
- **Remove admin features** if you don't need user management
- **Customize the UI** by modifying components in `src/components/`
- **Add your content** to replace the default pages
- **Configure authentication** settings in Supabase dashboard
- **Style to match your brand** using Tailwind CSS classes

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Authentication pages (sign-in, sign-up, etc.)
│   ├── (dashboard)/            # Protected user area (dashboard, profile, settings)
│   ├── admin/                  # Admin panel (optional - remove if not needed)
│   ├── auth/                   # Auth callbacks and API routes
│   ├── docs/                   # Documentation (optional - replace with your content)
│   ├── layout.tsx              # Root layout with navigation
│   └── page.tsx                # Home page (customize for your needs)
├── components/
│   ├── auth/                   # Login/signup components
│   ├── layout/                 # Header, footer, navigation
│   ├── profile/                # User profile components
│   ├── ui/                     # Reusable UI components (buttons, forms, etc.)
│   └── admin/                  # Admin components (optional)
├── lib/
│   ├── supabase/               # Database client setup
│   ├── types/                  # TypeScript definitions
│   └── utils.ts                # Helper functions
└── middleware.ts               # Route protection
```

## 🎨 Customization Guide

This starter is designed to be easily customized for your specific needs:

### For Simple Websites
- Remove the `/admin` directory if you don't need user management
- Replace `/docs` content with your own pages
- Customize the home page in `src/app/page.tsx`
- Update navigation in `src/components/layout/header.tsx`

### For SaaS Applications
- Build on the existing user management system
- Add your application logic to `src/app/(dashboard)/`
- Extend the user profile with custom fields
- Use the admin system to manage customers

### For E-commerce
- Add product management to the admin panel
- Extend user profiles for customer data
- Use the authentication system for customer accounts
- Build checkout flows in the dashboard area

### For Content Platforms
- Replace admin user management with content management
- Use the auth system for author/editor access
- Customize profiles for author information
- Build content creation tools

## 🛠️ Technical Details

### Database Schema
The starter includes these main tables:
- **`profiles`** - User profile information
- **`roles`** - System roles (admin, user, etc.)
- **`profile_roles`** - User role assignments

### Authentication Flow
1. Users sign up/sign in through Supabase Auth
2. Profiles are automatically created via database triggers
3. Sessions are managed server-side with middleware
4. Protected routes redirect unauthenticated users

### Component Architecture
- **Layout Components** - Header, footer, navigation
- **Auth Components** - Login, signup, password reset forms
- **Profile Components** - Profile display and editing
- **UI Components** - Reusable buttons, forms, modals
- **Admin Components** - User and role management (optional)

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📚 Documentation

After starting your development server, visit these pages:
- `/docs` - Complete documentation and guides
- `/docs/database/schema` - **NEW: Complete database schema setup guide**
- `/docs/quick-start` - Get running in 5 minutes with fast setup
- `/docs/installation` - Detailed installation guide
- `/docs/admin/setup` - Admin system setup (if using admin features)
- `/docs/components` - UI component documentation

## 🤝 Contributing

This is a starter template meant to be customized for your needs. Feel free to:
- Fork the repository
- Customize it for your project
- Share improvements back to the community
- Create issues for bugs or feature requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Built With

- **[Next.js](https://nextjs.org/)** - React framework
- **[Supabase](https://supabase.com/)** - Backend as a service
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

---

**Ready to build something amazing?** 🚀

Start with this template and create your next web application with modern tools and best practices built in.
