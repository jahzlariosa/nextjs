# Next.js 15 + Supabase SSR Authentication

A modern, server-first Next.js application with Supabase SSR authentication, automatic user profile creation, Shadcn UI, and robust error handling.

## ✨ Features

- **🔐 Complete Authentication Flow**: Sign-up, sign-in, sign-out, password reset
- **👤 Automatic Profile Creation**: Database triggers create user profiles on sign-up
- **🎨 Modern UI**: Shadcn UI components with Tailwind CSS
- **🔄 Server-Side Rendering**: Full SSR support with Supabase
- **📱 Toast Notifications**: Sonner integration for user feedback
- **🛡️ Robust Error Handling**: Comprehensive error handling and user messaging
- **⚡ Real-time Validation**: Username availability, password strength
- **📊 Code Splitting**: Optimized component architecture

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Documentation

Comprehensive documentation is available in the [`/docs`](./docs/) directory:

- **[📖 Quick Start Guide](./docs/guides/QUICK_START.md)** - Get up and running
- **[🔧 Development Guide](./docs/development/DEVELOPMENT_GUIDE.md)** - Development setup
- **[🏗️ Authentication Workflow](./docs/architecture/AUTHENTICATION_WORKFLOW.md)** - Auth system overview
- **[🧪 Testing Guide](./docs/guides/TESTING_GUIDE.md)** - Testing instructions
- **[🔧 Troubleshooting](./docs/troubleshooting/)** - Common issues and fixes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth with SSR
- **Database**: Supabase PostgreSQL
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner
- **TypeScript**: Full type safety

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── auth/              # Auth callbacks & API
│   └── (dashboard)/       # Protected pages
├── components/            # Reusable components
│   ├── auth/              # Auth-specific components
│   ├── ui/                # Shadcn UI components
│   └── skeletons/         # Loading skeletons
├── lib/                   # Utilities & configurations
│   ├── supabase/          # Supabase clients
│   └── notifications.ts   # Centralized notifications
└── middleware.ts          # Auth middleware
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

## 📝 Contributing

1. Check the [Development Guide](./docs/development/DEVELOPMENT_GUIDE.md)
2. Review the [Project Status](./docs/development/PROJECT_STATUS.md) 
3. Follow the testing guidelines in [Testing Guide](./docs/guides/TESTING_GUIDE.md)

## 📄 License

This project is licensed under the MIT License.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
