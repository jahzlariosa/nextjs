# Next.js Full-Stack Application

A modern, production-ready Next.js application with Supabase authentication, user management, and comprehensive documentation. Built with TypeScript, Tailwind CSS, and Shadcn/ui components.

## 🚀 Features

### Authentication & Security
- **Server-Side Rendering (SSR)** with Supabase Auth
- **Automatic Profile Creation** on user signup
- **Row Level Security (RLS)** for data protection
- **Session Management** with middleware protection
- **Password Reset** functionality
- **Protected Routes** with automatic redirection

### User Management
- **Complete Profile System** with customizable fields
- **Avatar Upload** with drag-and-drop support
- **Profile Editing** with form validation
- **User Settings** management
- **Real-time Profile Updates**

### UI & Components
- **Responsive Design** with mobile-first approach
- **Modern Layout System** with header and footer
- **Dark Mode Support** (ready for implementation)
- **Accessible Components** built with Radix UI
- **Form Validation** with React Hook Form and Zod
- **Loading States** and skeletons
- **Toast Notifications** with Sonner

### Development
- **TypeScript** for type safety
- **Next.js 15** with App Router
- **Tailwind CSS** for styling
- **ESLint** configuration
- **Turbopack** for fast development
- **Component Library** with Shadcn/ui

### Database
- **PostgreSQL** with Supabase
- **Database Migrations** included
- **File Storage** for avatars
- **Real-time Subscriptions** ready
- **Comprehensive Schema** with profiles and roles

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── reset-password/
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── dashboard/
│   │   ├── profile/
│   │   └── settings/
│   ├── auth/                   # Auth callbacks and API routes
│   ├── docs/                   # Documentation pages
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/                   # Authentication components
│   ├── docs/                   # Documentation components
│   ├── layout/                 # Layout components
│   ├── profile/                # Profile management components
│   ├── skeletons/              # Loading states
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── supabase/               # Supabase client configuration
│   ├── types/                  # TypeScript type definitions
│   ├── avatar-service.ts       # Avatar upload service
│   ├── notifications.ts        # Toast notification helpers
│   └── utils.ts                # Utility functions
└── middleware.ts               # Route protection middleware
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the repository
```bash
git clone <repository-url>
cd nextjs
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the migration files in your Supabase SQL editor:
   - `database/migrations/001_create_profiles_table.sql`
   - `database/migrations/010_recreate_handle_new_user_trigger.sql`

### 5. Storage Setup
1. Create a storage bucket named `avatars` in your Supabase project
2. Set the bucket to public for avatar access

### 6. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🎯 Usage

### Authentication Flow
1. **Sign Up**: New users can create accounts at `/sign-up`
2. **Sign In**: Existing users can sign in at `/sign-in`
3. **Password Reset**: Users can reset passwords at `/reset-password`
4. **Auto-redirect**: Authenticated users are redirected to dashboard

### Profile Management
- **View Profile**: Access your profile at `/dashboard` or `/profile`
- **Edit Profile**: Update personal information and bio
- **Avatar Upload**: Upload and manage profile pictures
- **Settings**: Manage account settings at `/settings`

### Protected Routes
The following routes require authentication:
- `/dashboard` - Main dashboard
- `/profile` - Profile management
- `/settings` - User settings

## 🔧 Configuration

### Supabase Configuration
The application uses Supabase for:
- **Authentication**: User signup, signin, and session management
- **Database**: PostgreSQL with RLS policies
- **Storage**: File uploads for avatars
- **Real-time**: Ready for real-time features

### Tailwind CSS
The project uses Tailwind CSS v4 with:
- **Custom Configuration**: Optimized for the project
- **Responsive Design**: Mobile-first approach
- **Component Classes**: Consistent styling

### Component Library
Built with Shadcn/ui components:
- **Customizable**: Easy to modify and extend
- **Accessible**: Built with Radix UI primitives
- **Consistent**: Unified design system

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 📚 Documentation

The application includes comprehensive documentation accessible at `/docs`:

- **Quick Start**: Get started quickly
- **Authentication**: Complete auth system guide
- **Components**: UI component documentation
- **Installation**: Detailed setup instructions
- **Features**: Feature explanations
- **Deployment**: Production deployment guide

## 🔒 Security

### Row Level Security (RLS)
- **Profile Access**: Users can only access their own profiles
- **Public Profiles**: Optional public profile visibility
- **Data Protection**: Secure data access patterns

### Session Management
- **Middleware Protection**: Routes protected at the middleware level
- **Auto-refresh**: Sessions automatically refreshed
- **Secure Cookies**: Secure session cookie handling

## 🎨 Customization

### Styling
- **Tailwind Config**: Customize colors, spacing, and more
- **Component Styles**: Modify component appearances
- **Global Styles**: Update global CSS variables

### Features
- **Add New Routes**: Extend the application with new pages
- **Custom Components**: Build on top of existing components
- **Database Schema**: Extend the profile schema as needed

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Check the documentation at `/docs`
- Review the codebase structure
- Refer to Supabase documentation
- Check Next.js documentation

## 🔄 Version

Current version: 1.0.0

Built with:
- Next.js 15.3.5
- React 19.0.0
- TypeScript 5+
- Tailwind CSS 4
- Supabase 2.50.3
- Shadcn/ui components
