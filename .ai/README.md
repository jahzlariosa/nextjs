# AI Agent Guidelines for Next.js Project

This directory contains AI prompting guidelines, workflows, and templates for consistent AI-assisted development on this Next.js project.

## 🎯 Core Principles

### 1. Research-First Approach
- **Always research thoroughly** before implementing any task
- **Create a detailed plan** and get approval before proceeding
- **Understand the full scope** of the request and its implications
- **Consider edge cases** and potential side effects
- **Review the `.ai/context.md` file** for project-specific information

### 2. Security-First Implementation
- **Server-side rendering (SSR)** is preferred whenever possible
- **Validate all inputs** on both client and server side
- **Follow Row Level Security (RLS)** patterns for database access
- **Implement proper authentication** checks for protected routes
- **Use environment variables** for sensitive configuration
- **Never expose API keys or secrets** in client-side code

### 3. Next.js Template Consistency
- **Maintain existing patterns** and architectural decisions
- **Use established components** and utilities where possible
- **Follow the existing folder structure** and naming conventions
- **Respect the SSR/CSR** balance already established
- **Use TypeScript** for all new files

### 4. Controlled Implementation
- **Ask for approval** before making significant changes
- **Implement incrementally** with clear checkpoints
- **Document decisions** and trade-offs made
- **Test thoroughly** before considering a task complete
- **Never delete existing functionality** without explicit approval

### 5. Documentation and Logging
- **Create changelog entries** for every task completed
- **Document new features** and architectural decisions
- **Update relevant documentation** when making changes
- **Maintain clear commit messages** following conventions
- **Update `.ai/context.md`** with significant project changes

## 🚨 MANDATORY RULES FOR AI AGENTS

### Before ANY Implementation:
1. **READ** the entire `.ai` directory contents
2. **CHECK** recent changelogs for similar implementations
3. **REVIEW** the project structure and existing patterns
4. **CREATE** a detailed plan and wait for approval
5. **NEVER** proceed without explicit user confirmation

### During Implementation:
1. **FOLLOW** the established patterns exactly
2. **USE** existing components and utilities
3. **MAINTAIN** TypeScript types and interfaces
4. **IMPLEMENT** proper error handling
5. **ADD** loading states for async operations

### After Implementation:
1. **CREATE** a detailed changelog entry
2. **UPDATE** relevant documentation
3. **TEST** all edge cases
4. **VERIFY** security measures
5. **DOCUMENT** any deviations from the plan

## 📋 Workflow Process

### Phase 1: Research and Planning
1. **Analyze the Request**
   - Understand the full scope and requirements
   - Identify dependencies and potential conflicts
   - Review existing codebase for similar patterns
   - Check `.ai/workflows/` for specific guides

2. **Create Implementation Plan**
   ```markdown
   ## Implementation Plan
   
   ### Objective
   [Clear description of what needs to be achieved]
   
   ### Files to Modify
   - [ ] file1.tsx - [reason for modification]
   - [ ] file2.ts - [reason for modification]
   
   ### New Files to Create
   - [ ] newfile.tsx - [purpose of the file]
   
   ### Database Changes
   - [ ] Table modifications
   - [ ] RLS policies to add/update
   
   ### Security Considerations
   - [ ] Authentication requirements
   - [ ] Authorization checks needed
   - [ ] Input validation rules
   
   ### Testing Plan
   - [ ] Unit tests needed
   - [ ] Integration tests needed
   - [ ] Manual testing scenarios
   ```

3. **Security Review**
   - Assess security implications
   - Plan authentication and authorization checks
   - Consider data validation requirements
   - Review potential vulnerabilities
   - Check against `.ai/workflows/security-checklist.md`

4. **Get Approval**
   - Present the plan to the user
   - Discuss any concerns or alternatives
   - Wait for explicit approval before proceeding
   - **DO NOT PROCEED WITHOUT APPROVAL**

### Phase 2: Implementation
1. **Follow the Plan**
   - Implement changes step by step
   - Maintain consistency with existing patterns
   - Use server-side approaches when appropriate
   - Add proper error handling
   - Reference `.ai/templates/` for code templates

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
   - Update `.ai/context.md` with project changes

3. **Changelog Entry**
   - Create detailed changelog entry using template
   - Include implementation details and decisions made
   - Document any breaking changes or migration notes

## 🗂️ Directory Structure

```
.ai/
├── README.md                   # This file - main guidelines
├── context.md                  # Project-specific context and state
├── changelogs/                 # Task completion logs
│   ├── YYYY-MM-DD_task-name.md
│   └── ...
├── templates/                  # Code and documentation templates
│   ├── component-template.tsx
│   ├── page-template.tsx
│   ├── api-route-template.ts
│   ├── changelog-template.md
│   └── ...
└── workflows/                  # Specific workflow guides
    ├── adding-new-feature.md
    ├── database-changes.md
    ├── security-checklist.md
    ├── api-development.md
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
- [ ] No sensitive data in client-side code
- [ ] API keys are properly secured

## 🚀 Next.js Best Practices

### Server-Side Rendering
- Use `async` server components whenever possible
- Implement proper `loading.tsx` and `error.tsx` files
- Use `generateMetadata` for SEO optimization
- Implement proper caching strategies
- Minimize client-side JavaScript

### Database Operations
- Use Supabase server client for SSR
- Implement proper error handling for database operations
- Use TypeScript interfaces for type safety
- Follow RLS policies for data access
- Use transactions for multi-step operations

### Component Development
- Use existing UI components from `@/components/ui`
- Implement proper loading states
- Add error boundaries where appropriate
- Follow accessibility guidelines
- Use proper TypeScript types

### Code Quality Standards
- Follow ESLint rules
- Use Prettier for formatting
- Write self-documenting code
- Add JSDoc comments for complex functions
- Keep functions small and focused

## 📝 Changelog Template

Every task should result in a changelog entry following this format:

```markdown
# Task: [Task Name]
**Date:** YYYY-MM-DD
**Status:** Completed/In Progress/Blocked
**AI Agent:** [Agent Name/Version]

## 📋 Overview
Brief description of what was requested and why.

## 🔍 Research Phase
- Key findings from research
- Architectural decisions made
- Security considerations identified
- Existing patterns reviewed

## 🛠️ Implementation
### Files Modified
- `path/to/file1.tsx` - [changes made]
- `path/to/file2.ts` - [changes made]

### Files Created
- `path/to/newfile.tsx` - [purpose]

### Key Changes
- [Change 1 with rationale]
- [Change 2 with rationale]

### Challenges & Solutions
- Challenge: [description]
  Solution: [how it was resolved]

## ✅ Testing
- Test cases covered
- Performance implications
- Security validation performed
- Edge cases tested

## 📚 Documentation
- Documentation updated
- Breaking changes noted
- Migration notes if applicable

## 🔗 Related
- Links to relevant issues or discussions
- Dependencies or follow-up tasks
- Previous similar implementations

## 🎯 Lessons Learned
- What worked well
- What could be improved
- Recommendations for similar tasks
```

## 🤖 AI Agent Self-Check

Before submitting any work, AI agents must verify:

1. **Guidelines Compliance**
   - [ ] Read and understood all guidelines
   - [ ] Followed the workflow process
   - [ ] Got approval before implementation
   - [ ] Created proper documentation

2. **Code Quality**
   - [ ] Followed existing patterns
   - [ ] Used TypeScript properly
   - [ ] Added error handling
   - [ ] Implemented loading states

3. **Security**
   - [ ] No exposed secrets
   - [ ] Proper authentication
   - [ ] Input validation
   - [ ] RLS policies respected

4. **Documentation**
   - [ ] Changelog created
   - [ ] Code comments added
   - [ ] README updated if needed
   - [ ] Context file updated

## 🤝 Getting Started

1. **Read these guidelines** thoroughly
2. **Review `.ai/context.md`** for project state
3. **Check recent changelogs** to understand recent changes
4. **Review workflow guides** for specific tasks
5. **Follow the workflow process** for every task
6. **Document everything** for future reference

## 📞 Support

If you encounter any issues or need clarification on these guidelines:
- Review the existing codebase for similar patterns
- Check the changelogs for previous similar implementations
- Consult the Next.js and Supabase documentation
- Review the workflow guides in `.ai/workflows/`
- Ask for clarification before proceeding with uncertain implementations

## ⚠️ Final Warning for AI Agents

**NEVER:**
- Skip the research and planning phase
- Implement without user approval
- Delete or modify existing functionality without permission
- Expose sensitive information
- Ignore security considerations
- Forget to document your work

**ALWAYS:**
- Read the entire `.ai` directory first
- Create a detailed plan
- Wait for explicit approval
- Follow existing patterns
- Document everything
- Test thoroughly
