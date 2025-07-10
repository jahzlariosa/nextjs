# Next.js 15 + Supabase SSR Authentication + PRP Methodology

A modern, server-first Next.js application with Supabase SSR authentication, automatic user profile creation, Shadcn UI, and **integrated Product Requirement Prompt (PRP) methodology** for AI-driven development.

## ✨ Features

### Core Application Features
- **🔐 Complete Authentication Flow**: Sign-up, sign-in, sign-out, password reset
- **👤 Automatic Profile Creation**: Database triggers create user profiles on sign-up
- **🖼️ Avatar Upload System**: Full-featured avatar management with Supabase storage
- **🎨 Modern UI**: Shadcn UI components with Tailwind CSS
- **🔄 Server-Side Rendering**: Full SSR support with Supabase
- **📱 Toast Notifications**: Sonner integration for user feedback
- **🛡️ Robust Error Handling**: Comprehensive error handling and user messaging
- **⚡ Real-time Validation**: Username availability, password strength
- **📊 Code Splitting**: Optimized component architecture
- **🔒 Secure File Storage**: RLS policies for avatar management

### PRP Development Features
- **🤖 AI-Powered Development**: 32+ Claude commands for automated development
- **📋 Product Requirement Prompts**: Structured templates for building features
- **🎯 Context-Aware AI**: Project-specific patterns and documentation
- **🔄 Validation Loops**: Multi-level quality assurance (TypeScript, linting, testing)
- **⚡ Rapid Prototyping**: From concept to implementation in minutes
- **📚 Comprehensive Documentation**: AI-ready patterns and examples

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

## 🤖 PRP Methodology Integration

This project features a fully integrated **Product Requirement Prompt (PRP)** methodology that revolutionizes AI-driven development. PRPs solve the "80% problem" where AI coding attempts stall by providing structured, context-rich prompts that enable first-pass production-ready code.

### What is a PRP?

A PRP is a structured prompt that supplies an AI coding agent with everything it needs to deliver a vertical slice of working software—no more, no less. It combines:

- **Context**: Precise file paths, library versions, code examples
- **Implementation Strategy**: Explicit build instructions, API endpoints, patterns
- **Validation Gates**: Deterministic quality checks (TypeScript, linting, testing)

### Quick PRP Usage

```bash
# Create a feature using Claude commands
/create-base-prp implement user notification system with real-time updates

# Execute the generated PRP
/execute-base-prp PRPs/user-notifications.md

# The AI will build the complete feature with proper TypeScript, tests, and validation
```

### Available Claude Commands

- **`/create-base-prp`** - Generate comprehensive PRPs with research
- **`/execute-base-prp`** - Execute PRPs against your codebase
- **`/prime-core`** - Load project context for AI
- **`/planning-create`** - Create planning documents
- **`/review-general`** - General code review
- **And 27+ more specialized commands**

## 📚 Documentation

### Core Application Documentation
Comprehensive documentation is available in the [`/docs`](./docs/) directory:

- **[📖 Quick Start Guide](./docs/guides/QUICK_START.md)** - Get up and running
- **[🔧 Development Guide](./docs/development/DEVELOPMENT_GUIDE.md)** - Development setup
- **[🖼️ Avatar Upload System](./docs/features/AVATAR_UPLOAD.md)** - Complete avatar management guide
- **[📡 Avatar API Reference](./docs/api/AVATAR_API.md)** - API documentation for avatar components
- **[🏗️ Authentication Workflow](./docs/architecture/AUTHENTICATION_WORKFLOW.md)** - Auth system overview
- **[🧪 Testing Guide](./docs/guides/TESTING_GUIDE.md)** - Testing instructions
- **[🔧 Troubleshooting](./docs/troubleshooting/)** - Common issues and fixes
- **[📋 Changelog](./CHANGELOG.md)** - Version history and changes

### PRP Methodology Documentation
- **[🤖 PRP Methodology Overview](./PRPs/README.md)** - Understanding the PRP concept
- **[📋 PRP Integration Guide](./PRPs/INTEGRATION_GUIDE.md)** - How to use PRPs in this project
- **[🧪 PRP Testing Guide](./PRPs/PRP_TESTING_GUIDE.md)** - Validate your PRP setup
- **[📝 PRP Templates](./PRPs/templates/)** - Ready-to-use PRP templates
- **[🔧 Claude Commands](./PRPs/ai_docs/)** - AI context documentation
- **[📖 Project Guidelines](./CLAUDE.md)** - Next.js-specific patterns for AI

## 🛠️ Tech Stack

### Core Application Stack
- **Framework**: Next.js 15 (App Router)
- **Authentication**: Supabase Auth with SSR
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage (Avatar uploads)
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner
- **TypeScript**: Full type safety

### PRP Development Stack
- **AI Development**: Claude Code integration
- **Prompt Engineering**: Product Requirement Prompt methodology
- **Code Generation**: 32+ specialized Claude commands
- **Quality Assurance**: Multi-level validation loops
- **Documentation**: AI-ready patterns and templates
- **Automation**: Context-aware development workflows

## 📎 Project Structure

```
├── .claude/                   # Claude Code integration
│   └── commands/              # 32+ AI development commands
│       ├── PRPs/              # PRP-specific commands
│       ├── code-quality/      # Code review & refactoring
│       ├── development/       # Development workflow
│       └── typescript/        # TypeScript-specific tools
├── PRPs/                      # Product Requirement Prompts
│   ├── ai_docs/              # AI context documentation
│   ├── templates/            # PRP templates
│   └── scripts/              # PRP automation scripts
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Authentication pages
│   │   ├── auth/             # Auth callbacks & API
│   │   └── (dashboard)/      # Protected pages
│   ├── components/           # Reusable components
│   │   ├── auth/             # Auth-specific components
│   │   ├── profile/          # Profile components
│   │   ├── ui/               # Shadcn UI components
│   │   └── skeletons/        # Loading skeletons
│   ├── lib/                  # Utilities & configurations
│   │   ├── supabase/         # Supabase clients
│   │   ├── avatar-service.ts # Avatar upload service
│   │   └── notifications.ts  # Centralized notifications
│   └── middleware.ts         # Auth middleware
└── CLAUDE.md                  # AI development guidelines
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

## 🎆 Why PRP Methodology?

Traditional AI coding attempts fail at 80% completion because they:
- **Over-specify** what to build
- **Under-specify** the context and how to build it
- **Lack** proper validation loops
- **Miss** project-specific patterns

PRP methodology fixes this by providing:
- **🎯 Context-Rich Prompts**: Everything AI needs in one place
- **🔄 Validation Loops**: Multi-level quality assurance
- **📚 Project Intelligence**: AI understands your codebase
- **⚡ First-Pass Success**: Production-ready code on the first try

## 📝 Contributing

### Traditional Development
1. Check the [Development Guide](./docs/development/DEVELOPMENT_GUIDE.md)
2. Review the [Project Status](./docs/development/PROJECT_STATUS.md) 
3. Follow the testing guidelines in [Testing Guide](./docs/guides/TESTING_GUIDE.md)

### PRP-Powered Development 🚀
1. **Prime the AI**: Run `/prime-core` to load project context
2. **Create PRPs**: Use `/create-base-prp [feature description]` for new features
3. **Execute PRPs**: Use `/execute-base-prp [prp-file]` to implement features
4. **Validate**: Follow the multi-level validation loops in each PRP
5. **Review**: Use `/review-general` for AI-assisted code review

### Quick Start with PRPs
```bash
# Example: Adding a new feature
/create-base-prp implement dark mode toggle with system preference detection
/execute-base-prp PRPs/dark-mode-toggle.md

# The AI will:
# 1. Research your codebase patterns
# 2. Create comprehensive implementation plan
# 3. Build the feature with proper TypeScript
# 4. Add tests and validation
# 5. Follow your project's coding standards
```

## 🎓 Learning Resources

- **[🎥 PRP Video Tutorial](https://www.youtube.com/watch?v=KVOZ9s1S9Gk)** - Watch the methodology in action
- **[📝 PRP Methodology](./PRPs/README.md)** - Deep dive into the concept
- **[🔧 Integration Guide](./PRPs/INTEGRATION_GUIDE.md)** - How to use PRPs in this project
- **[🧪 Testing Guide](./PRPs/PRP_TESTING_GUIDE.md)** - Validate your setup

## 📝 License

This project is licensed under the MIT License.

---

## 🎆 Ready to Experience PRP-Powered Development?

This Next.js project showcases the future of AI-assisted development. With fully integrated Product Requirement Prompts, you can:

- **Build features in minutes, not hours**
- **Achieve first-pass production-ready code**
- **Maintain consistent code quality automatically**
- **Leverage AI that truly understands your project**

### Get Started Now

1. **Clone and setup**: Follow the Quick Start guide above
2. **Test the methodology**: Run the [PRP Testing Guide](./PRPs/PRP_TESTING_GUIDE.md)
3. **Build your first feature**: Use `/create-base-prp` to generate a PRP
4. **Experience the magic**: Watch AI build production-ready code

**Welcome to the future of development!** 🚀

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
