# PRP Methodology Integration Guide - Next.js Project

## 🎯 Successfully Integrated!

Your Next.js project now has the complete PRP (Product Requirement Prompt) methodology integrated. This guide shows you how to use it effectively.

## 📁 What Was Added

### 1. Claude Commands (`.claude/commands/`)
- **12 pre-configured commands** available as slash commands in Claude Code
- `/create-base-prp` - Generate comprehensive PRPs with research
- `/execute-base-prp` - Execute PRPs against your codebase
- `/planning-create` - Create planning documents
- `/review-general` - General code review
- `/review-staged-unstaged` - Review git changes
- And more...

### 2. PRP Templates (`PRPs/templates/`)
- `prp_base.md` - General comprehensive PRP template
- `prp_nextjs.md` - **Next.js-specific PRP template**
- `prp_planning.md` - Planning template with diagrams
- `prp_spec.md` - Specification template
- `prp_task.md` - Task-focused template

### 3. AI Documentation (`PRPs/ai_docs/`)
- `nextjs_patterns.md` - Next.js 15 App Router patterns
- `cc_*.md` - Claude Code documentation
- Various other AI context files

### 4. Project Configuration
- `CLAUDE.md` - **Next.js-specific coding standards**
- `PRPs/scripts/` - PRP runner scripts
- `PRPs/README.md` - PRP methodology documentation

## 🚀 How to Use

### Step 1: Create a PRP for Your Feature

#### Option A: Use Claude Command (Recommended)
```
/create-base-prp implement user notifications system with real-time updates
```

#### Option B: Manual Creation
```bash
# Copy the Next.js template
cp PRPs/templates/prp_nextjs.md PRPs/user-notifications.md

# Edit the file with your requirements
```

### Step 2: Execute the PRP

#### Option A: Use Claude Command
```
/execute-base-prp PRPs/user-notifications.md
```

#### Option B: Manual Implementation
Follow the PRP step-by-step, using the validation loops to ensure quality.

### Step 3: Validate Your Implementation

Each PRP includes validation loops:
```bash
# Level 1: TypeScript & Linting
npx tsc --noEmit
npm run lint

# Level 2: Testing
npm test

# Level 3: Manual Testing
npm run dev
# Test in browser

# Level 4: Performance & Accessibility
# Check Core Web Vitals, accessibility
```

## 🎨 Next.js-Specific Features

### 1. Server vs Client Components
The PRP templates guide you on when to use Server Components vs Client Components:
- **Server Components**: Data fetching, static content
- **Client Components**: Interactive elements, state management

### 2. TypeScript-First Approach
- All PRPs emphasize proper TypeScript typing
- Includes Zod schemas for validation
- Interface definitions for components

### 3. Supabase Integration
- Authentication patterns for server and client
- Database operations with proper error handling
- Row Level Security considerations

### 4. Performance Optimization
- Image optimization with Next.js Image
- Code splitting strategies
- Loading states and error boundaries

## 📋 Example PRP Workflow

Let's say you want to add a "User Favorites" feature:

### 1. Create the PRP
```
/create-base-prp user favorites system where users can favorite posts and view their favorites list
```

### 2. The AI Will Research and Create
- Analyze your existing codebase patterns
- Research best practices online
- Create a comprehensive PRP with all context needed

### 3. Execute the PRP
```
/execute-base-prp PRPs/user-favorites.md
```

### 4. The AI Will Implement
- Create TypeScript interfaces
- Build React components
- Add database operations
- Implement proper error handling
- Add tests and validation

## 🔧 Available Claude Commands

| Command | Purpose |
|---------|---------|
| `/create-base-prp` | Generate comprehensive PRP with research |
| `/execute-base-prp` | Execute PRP against codebase |
| `/planning-create` | Create planning documents with diagrams |
| `/spec-create-adv` | Advanced specification creation |
| `/spec-execute` | Execute specifications |
| `/review-general` | General code review |
| `/review-staged-unstaged` | Review git changes |
| `/refactor-simple` | Simple refactoring tasks |
| `/create-pr` | Create pull requests |
| `/prime-core` | Prime Claude with project context |
| `/onboarding` | Onboarding for new team members |
| `/debug` | Debugging workflow |

## 🎯 Best Practices for Your Project

### 1. Follow the CLAUDE.md Guidelines
- Maximum 200 lines per component
- Use TypeScript interfaces for props
- Follow the established file structure
- Use Tailwind CSS with `cn()` utility

### 2. Use the Next.js PRP Template
- Specifically designed for your tech stack
- Includes TypeScript, Tailwind, and Supabase patterns
- Has proper validation loops for Next.js

### 3. Leverage the AI Documentation
- `PRPs/ai_docs/nextjs_patterns.md` has all the patterns you need
- Reference existing components in your PRPs
- Include specific URLs and file paths in context

### 4. Test at Each Level
- Level 1: TypeScript compilation and linting
- Level 2: Unit and component tests
- Level 3: Integration testing in browser
- Level 4: Performance and accessibility

## 📝 Example Usage

Here's how a typical PRP session might look:

```
You: /create-base-prp implement a comment system for posts with nested replies and real-time updates

Claude: [Researches your codebase, creates comprehensive PRP with all context]

You: /execute-base-prp PRPs/comment-system.md

Claude: [Implements the complete feature with proper TypeScript, components, database operations, and tests]
```

## 🎓 Learning Resources

1. **Watch the Video**: https://www.youtube.com/watch?v=KVOZ9s1S9Gk
2. **Read the PRP Documentation**: `PRPs/README.md`
3. **Study the Templates**: `PRPs/templates/`
4. **Check the AI Docs**: `PRPs/ai_docs/`

## 🤝 Getting Help

If you encounter issues:

1. Check the `CLAUDE.md` file for project-specific guidelines
2. Review the `PRPs/ai_docs/nextjs_patterns.md` for common patterns
3. Use `/prime-core` to help Claude understand your project context
4. Create focused PRPs for specific features rather than trying to build everything at once

## 🎉 You're Ready!

Your Next.js project now has the complete PRP methodology integrated. This will help you:

- ✅ Build features with higher success rates
- ✅ Maintain consistent code quality
- ✅ Follow TypeScript and Next.js best practices
- ✅ Implement proper testing and validation
- ✅ Create maintainable, scalable code

**Start with a simple feature to get familiar with the workflow, then tackle more complex features as you get comfortable with the methodology.**

Happy coding! 🚀
