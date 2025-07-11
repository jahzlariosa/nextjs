# 🤖 AI Agent Automation Workflows

## 🎯 Keyword Trigger System

### Primary Keywords (Auto-trigger workflows)

**`#github-pull-request_copilot-coding-agent`** - Triggers full coding agent workflow
**`#commit-ready`** - Triggers pre-commit workflow  
**`#release-ready`** - Triggers release preparation workflow
**`#docs-update`** - Triggers documentation update workflow
**`#git-cleanup`** - Triggers git cleanup workflow
**`#merge-ready`** - Triggers PR merge preparation workflow

### Secondary Keywords (Reminder triggers)

**`#changelog`** - Reminds to update AI changelogs
**`#lint-check`** - Forces lint verification before proceeding
**`#test-required`** - Triggers testing workflow
**`#review-needed`** - Requests comprehensive code review
**`#git-status`** - Shows current git status and suggests actions

## 🔄 Automated Workflow Triggers

### 1. Pre-Commit Workflow (`#commit-ready`)
**Auto-executes when user says: "ready to commit", "let's commit", "commit and push"**

```markdown
AUTOMATED CHECKLIST:
1. ✅ Run `npm run lint` - Zero errors required
2. ✅ Check for TypeScript errors
3. ✅ Create/update AI changelog entry in `.ai/changelogs/`
4. ✅ Update `.ai/context.md` if significant changes
5. ✅ Stage all files (`git add .`)
6. ✅ Create descriptive commit message
7. ✅ Push to remote repository
8. ✅ Verify deployment if applicable
```

### 2. Documentation Update Workflow (`#docs-update`)
**Auto-executes for documentation changes**

```markdown
AUTOMATED CHECKLIST:
1. ✅ Update relevant documentation files
2. ✅ Check for broken links
3. ✅ Update API documentation if needed
4. ✅ Create changelog entry for docs changes
5. ✅ Update README if major features added
6. ✅ Verify all examples still work
```

### 3. Feature Complete Workflow (`#feature-complete`)
**Auto-executes when feature is finished**

```markdown
AUTOMATED CHECKLIST:
1. ✅ Run full lint and type check
2. ✅ Create comprehensive AI changelog
3. ✅ Update context.md with new patterns
4. ✅ Document any new workflows
5. ✅ Create/update troubleshooting guides
6. ✅ Test in multiple browsers if UI changes
7. ✅ Commit with detailed message
8. ✅ Push and verify deployment
```

### 4. Git Cleanup Workflow (`#git-cleanup`)
**Auto-executes for post-merge cleanup**

```markdown
AUTOMATED CHECKLIST:
1. ✅ Switch to main branch
2. ✅ Pull latest changes from origin
3. ✅ Delete merged feature branches locally
4. ✅ Prune remote tracking branches
5. ✅ Clean up stale references
6. ✅ Check for uncommitted changes
7. ✅ Verify repository status is clean
```

### 5. Merge Ready Workflow (`#merge-ready`)
**Auto-executes before merging PR**

```markdown
AUTOMATED CHECKLIST:
1. ✅ Ensure all CI checks pass
2. ✅ Verify no merge conflicts
3. ✅ Confirm branch is up to date with main
4. ✅ Run final lint and type checks
5. ✅ Update changelog if needed
6. ✅ Check for proper PR description
7. ✅ Verify all requirements met
8. ✅ Ready for merge approval
```

## 🚨 Never-Forget Reminders

### Context Check System
**Before ANY major action, AI agents MUST:**

1. **Check `.ai/context.md`** - Review current project state
2. **Check recent changelogs** - Understand recent patterns
3. **Check workflows** - Follow established procedures
4. **Verify lint status** - Always run `npm run lint`

### Changelog Enforcement
**EVERY significant change requires:**

```markdown
📝 Changelog Entry Template:
- Date: [Current Date]
- Type: [Feature/Fix/Enhancement/Documentation]
- Description: [What was changed]
- Files Modified: [List of key files]
- Impact: [User/Developer impact]
- Next Steps: [Any follow-up needed]
```

## 🎯 Smart Keyword Detection

### Auto-Trigger Phrases
```javascript
// These phrases automatically trigger workflows
const autoTriggers = {
  commit: [
    "ready to commit", "let's commit", "commit and push",
    "everything looks good", "time to commit"
  ],
  
  release: [
    "ready for release", "let's release", "ship it",
    "feature complete", "ready to ship"
  ],
  
  docs: [
    "update documentation", "docs need updating",
    "document this feature", "create docs"
  ]
}
```

### Reminder Phrases
```javascript
// These phrases trigger reminders
const reminderTriggers = {
  changelog: [
    "forgot changelog", "update logs", "missing changelog"
  ],
  
  testing: [
    "need to test", "test this", "verify functionality"
  ]
}
```

## 📋 Workflow Templates

### Standard Commit Workflow
```markdown
1. LINT CHECK: `npm run lint` (must pass)
2. CHANGELOG: Create entry in `.ai/changelogs/YYYY-MM-DD-feature-name.md`
3. CONTEXT: Update `.ai/context.md` if needed
4. COMMIT: Descriptive message with emoji
5. PUSH: Verify deployment
```

### Documentation Workflow
```markdown
1. UPDATE: Relevant docs in `/docs` or `.ai/workflows/`
2. LINKS: Check all internal/external links
3. EXAMPLES: Verify code examples work
4. CHANGELOG: Document what docs were updated
5. REVIEW: Check for accuracy and completeness
```

### Feature Release Workflow
```markdown
1. FEATURE: Complete implementation
2. TESTING: Cross-browser if UI changes
3. DOCS: Update user-facing documentation
4. CHANGELOG: Comprehensive feature changelog
5. CONTEXT: Update project context
6. COMMIT: Detailed commit with all changes
7. VERIFY: Test deployment and functionality
```

## 🤖 AI Agent Instructions

### Primary Directive
**ALWAYS check for trigger keywords in user messages and auto-execute workflows**

### Pre-Action Checklist
Before ANY significant action:
```markdown
1. [ ] Scanned message for trigger keywords
2. [ ] Checked `.ai/context.md` for current state  
3. [ ] Reviewed recent changelogs for patterns
4. [ ] Verified no lint errors exist
5. [ ] Planned changelog entry if needed
```

### Response Template
When workflow is triggered:
```markdown
🤖 **Workflow Triggered: [WORKFLOW_NAME]**

Executing automated checklist:
- [ ] Step 1...
- [ ] Step 2...
- [ ] Step 3...

Following established patterns from recent changelogs...
```

## 🎮 Usage Examples

### User Says: "Everything looks good, let's commit this"
**AI Response:**
```markdown
🤖 **Workflow Triggered: PRE-COMMIT**

Executing automated checklist:
1. ✅ Running lint check...
2. ✅ Creating AI changelog entry...
3. ✅ Staging files...
4. ✅ Creating commit message...
5. ✅ Pushing to repository...
```

### User Says: "This feature is done #feature-complete"
**AI Response:**
```markdown
🤖 **Workflow Triggered: FEATURE-COMPLETE**

Executing comprehensive workflow:
1. ✅ Lint and type checking...
2. ✅ Creating feature changelog...
3. ✅ Updating context documentation...
4. ✅ Creating troubleshooting guide...
5. ✅ Cross-browser testing recommendations...
6. ✅ Committing with detailed message...
```

## 🔧 Implementation Strategy

### Phase 1: Keyword Detection
- Add keyword scanning to AI agent prompt
- Create auto-response templates
- Implement workflow checklists

### Phase 2: Context Awareness  
- Always check `.ai/context.md` first
- Review recent changelog patterns
- Follow established workflows

### Phase 3: Smart Automation
- Auto-generate changelog templates
- Smart commit message generation
- Deployment verification

## 📊 Success Metrics

### Automation Goals
- **100%** of commits include changelog entries
- **Zero** lint errors in commits
- **Consistent** workflow execution
- **Improved** documentation quality

### Quality Indicators
- All workflows documented
- Consistent changelog format
- Zero forgotten procedures
- Faster development cycles

---

**Usage:** Add these keywords to your prompts for automated workflow execution!
**Next:** Implement in AI agent system prompts and context checking.
