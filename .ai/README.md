# AI Agent Guidelines for Next.js Project

This directory contains AI prompting guidelines, workflows, and templates for consistent AI-assisted development on this Next.js project.

## 🎯 Core Principles

### 1. Research-First Approach
- **Always research thoroughly** before implementing any task
- **Create a detailed plan** and get approval before proceeding
- **Understand the full scope** of the request and its implications
- **Consider edge cases** and potential side effects

### 2. Security-First Implementation
- **Server-side rendering (SSR)** is preferred whenever possible
- **Validate all inputs** on both client and server side
- **Follow Row Level Security (RLS)** patterns for database access
- **Implement proper authentication** checks for protected routes
- **Use environment variables** for sensitive configuration

### 3. Next.js Template Consistency
- **Maintain existing patterns** and architectural decisions
- **Use established components** and utilities where possible
- **Follow the existing folder structure** and naming conventions
- **Respect the SSR/CSR** balance already established

### 4. Controlled Implementation
- **Ask for approval** before making significant changes
- **Implement incrementally** with clear checkpoints
- **Document decisions** and trade-offs made
- **Test thoroughly** before considering a task complete

### 5. Documentation and Logging
- **Create changelog entries** for every task completed
- **Document new features** and architectural decisions
- **Update relevant documentation** when making changes
- **Maintain clear commit messages** following conventions

## 📋 Workflow Process

### Phase 1: Research and Planning
1. **Analyze the Request**
   - Understand the full scope and requirements
   - Identify dependencies and potential conflicts
   - Review existing codebase for similar patterns

2. **Create Implementation Plan**
   - Break down the task into manageable steps
   - Identify files that need to be modified or created
   - Consider database schema changes if needed
   - Plan for testing and validation

3. **Security Review**
   - Assess security implications
   - Plan authentication and authorization checks
   - Consider data validation requirements
   - Review potential vulnerabilities

4. **Get Approval**
   - Present the plan to the user
   - Discuss any concerns or alternatives
   - Wait for explicit approval before proceeding

### Phase 2: Implementation
1. **Follow the Plan**
   - Implement changes step by step
   - Maintain consistency with existing patterns
   - Use server-side approaches when appropriate
   - Add proper error handling

2. **Test Each Step**
   - Verify functionality after each major change
   - Test edge cases and error scenarios
   - Ensure responsive design works correctly
   - Validate security measures

3. **Document Progress**
   - Update changelog with each significant change
   - Document any deviations from the original plan
   - Note any issues encountered and their solutions

### Phase 3: Completion and Review
1. **Final Testing**
   - Comprehensive testing of the complete feature
   - Cross-browser and device testing if applicable
   - Performance testing for any new queries or operations

2. **Documentation Updates**
   - Update README.md if necessary
   - Update component documentation
   - Update API documentation if applicable

3. **Changelog Entry**
   - Create detailed changelog entry
   - Include implementation details and decisions made
   - Document any breaking changes or migration notes

## 🗂️ Directory Structure

```
.ai/
├── README.md                   # This file - main guidelines
├── changelogs/                 # Task completion logs
│   ├── YYYY-MM-DD_task-name.md
│   └── ...
├── templates/                  # Code and documentation templates
│   ├── component-template.tsx
│   ├── page-template.tsx
│   ├── changelog-template.md
│   └── ...
└── workflows/                  # Specific workflow guides
    ├── adding-new-feature.md
    ├── database-changes.md
    ├── security-checklist.md
    └── ...
```

## 🔒 Security Checklist

Before implementing any feature, ensure:

- [ ] Authentication is properly implemented
- [ ] Authorization checks are in place
- [ ] Input validation is comprehensive
- [ ] SQL injection prevention is implemented
- [ ] XSS protection is in place
- [ ] CSRF protection is considered
- [ ] Environment variables are used for secrets
- [ ] Rate limiting is considered for API endpoints
- [ ] File upload security is implemented
- [ ] Database queries use RLS policies

## 🚀 Next.js Best Practices

### Server-Side Rendering
- Use `async` server components whenever possible
- Implement proper `loading.tsx` and `error.tsx` files
- Use `generateMetadata` for SEO optimization
- Implement proper caching strategies

### Database Operations
- Use Supabase server client for SSR
- Implement proper error handling for database operations
- Use TypeScript interfaces for type safety
- Follow RLS policies for data access

### Component Development
- Use existing UI components from `@/components/ui`
- Implement proper loading states
- Add error boundaries where appropriate
- Follow accessibility guidelines

## 📝 Changelog Template

Every task should result in a changelog entry following this format:

```markdown
# Task: [Task Name]
**Date:** YYYY-MM-DD
**Status:** Completed/In Progress/Blocked

## 📋 Overview
Brief description of what was requested and why.

## 🔍 Research Phase
- Key findings from research
- Architectural decisions made
- Security considerations identified

## 🛠️ Implementation
- Files created/modified
- Key changes made
- Challenges encountered and solutions

## ✅ Testing
- Test cases covered
- Performance implications
- Security validation performed

## 📚 Documentation
- Documentation updated
- Breaking changes noted
- Migration notes if applicable

## 🔗 Related
- Links to relevant issues or discussions
- Dependencies or follow-up tasks
```

## 🤝 Getting Started

1. **Read these guidelines** thoroughly
2. **Review existing codebase** to understand patterns
3. **Check recent changelogs** to understand recent changes
4. **Follow the workflow process** for every task
5. **Document everything** for future reference

## 📞 Support

If you encounter any issues or need clarification on these guidelines:
- Review the existing codebase for similar patterns
- Check the changelogs for previous similar implementations
- Consult the Next.js and Supabase documentation
- Ask for clarification before proceeding with uncertain implementations
