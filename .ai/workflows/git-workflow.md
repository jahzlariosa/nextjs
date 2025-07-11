# Git Workflow for Next.js Project

## 🚀 Branch Strategy

### Main Branch Protection
- `main` branch is protected and represents production-ready code
- All changes must go through pull requests
- Direct pushes to main are disabled

### Branch Naming Convention
```
feature/[feature-name]    # New features
bugfix/[bug-description]  # Bug fixes
hotfix/[critical-fix]     # Critical production fixes
docs/[documentation]      # Documentation updates
refactor/[component]      # Code refactoring
```

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Start from main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/admin-user-management

# Make changes and commit
git add .
git commit -m "feat: add edit user and manage roles functionality"

# Push to remote
git push origin feature/admin-user-management

# Create pull request via GitHub
```

### 2. Commit Message Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding tests
chore: updating build tasks, package.json, etc.
```

### 3. Code Review Process
- All PRs require at least 1 review
- CI/CD checks must pass
- No merge conflicts
- Branch must be up to date with main

## 🤖 Automated Workflows

### Pre-commit Hooks
```bash
# Install husky for git hooks
npm install --save-dev husky lint-staged

# Setup pre-commit hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run type-check"
```

### GitHub Actions Workflows

#### 1. CI/CD Pipeline (.github/workflows/ci.yml)
```yaml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

#### 2. Auto-deployment (.github/workflows/deploy.yml)
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📝 Daily Git Operations

### Starting Work
```bash
# Always start from latest main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### Making Changes
```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add user management functionality"

# Push to remote
git push origin feature/your-feature-name
```

### Before Merging
```bash
# Update from main
git checkout main
git pull origin main
git checkout feature/your-feature-name
git rebase main

# Force push after rebase
git push --force-with-lease origin feature/your-feature-name
```

### Cleaning Up
```bash
# After PR is merged, cleanup
git checkout main
git pull origin main
git branch -d feature/your-feature-name
git remote prune origin
```

## 🔧 Git Configuration

### Global Setup
```bash
# Set user info
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch
git config --global init.defaultBranch main

# Set pull strategy
git config --global pull.rebase false

# Set push strategy
git config --global push.default simple
```

### Project-specific Setup
```bash
# Set upstream for feature branches
git config branch.autosetupmerge always
git config branch.autosetuprebase always

# Set commit template
git config commit.template .gitmessage
```

## 🚨 Emergency Procedures

### Hotfix Process
```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# Make minimal changes
git add .
git commit -m "fix: resolve critical security vulnerability"

# Push and create emergency PR
git push origin hotfix/critical-security-fix
```

### Rollback Process
```bash
# Revert last commit on main
git revert HEAD

# Or rollback to specific commit
git reset --hard <commit-hash>
git push --force-with-lease origin main
```

## 📊 Git Best Practices

### Do's
- ✅ Keep commits small and focused
- ✅ Write descriptive commit messages
- ✅ Test before committing
- ✅ Use feature branches
- ✅ Rebase before merging
- ✅ Delete merged branches

### Don'ts
- ❌ Commit directly to main
- ❌ Force push to shared branches
- ❌ Commit secrets or sensitive data
- ❌ Mix different changes in one commit
- ❌ Leave uncommitted changes when switching branches

## 🔍 Useful Git Commands

### Investigation
```bash
# View commit history
git log --oneline --graph

# See what changed in a commit
git show <commit-hash>

# Find when a bug was introduced
git bisect start

# See file history
git log --follow <filename>
```

### Cleanup
```bash
# Interactive rebase to squash commits
git rebase -i HEAD~3

# Remove untracked files
git clean -fd

# Reset staged changes
git reset HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## 🎯 Integration with AI Workflow

### Trigger Keywords
- `#commit-ready` - Automatically runs pre-commit workflow
- `#git-cleanup` - Cleans up merged branches
- `#release-ready` - Prepares release branch

### Automated Actions
1. Lint and type-check before commit
2. Generate changelog from commits
3. Update version numbers
4. Create release tags
5. Deploy to staging/production

This Git workflow ensures code quality, maintains project history, and integrates seamlessly with our AI-powered development process.
