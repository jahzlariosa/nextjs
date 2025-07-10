# PRP Testing Guide - Validate Your Methodology

## 🎯 Purpose

This guide provides multiple ways to test and validate that the PRP (Product Requirement Prompt) methodology is working correctly in your Next.js project.

## 📋 Testing Levels

### Level 1: Setup Validation ✅
**Verify PRP infrastructure is correctly installed**

#### Test Claude Commands
```bash
# In Claude Code, type "/" and verify these commands appear:
/create-base-prp
/execute-base-prp
/planning-create
/review-general
/prime-core
```

#### Test File Structure
```bash
# Verify directory structure exists
dir .claude\commands\PRPs\      # Should show 9+ command files
dir PRPs\templates\             # Should show PRP templates
dir PRPs\ai_docs\              # Should show AI documentation
```

#### Test Templates Access
```bash
# Verify templates are accessible
type PRPs\templates\prp_nextjs.md | findstr "Next.js PRP Template"
```

### Level 2: Basic PRP Creation 🧪
**Test creating a simple PRP manually**

#### Manual PRP Creation
```bash
# Copy the test PRP we created
copy PRPs\test-user-greeting.md PRPs\my-test-greeting.md

# Verify the file contains proper structure
type PRPs\my-test-greeting.md | findstr "## Goal"
```

#### Template Usage Test
```bash
# Create a new PRP from template
copy PRPs\templates\prp_nextjs.md PRPs\test-from-template.md
```

### Level 3: AI Command Testing 🤖
**Test the actual Claude commands**

#### Test `/create-base-prp` Command
In Claude Code, try:
```
/create-base-prp simple user profile badge component
```

**Expected Result:**
- AI should analyze your codebase
- Research external resources
- Create a comprehensive PRP file
- Include all necessary context

#### Test `/prime-core` Command
```
/prime-core
```

**Expected Result:**
- AI should read your CLAUDE.md file
- Understand project structure
- Load project-specific patterns
- Be ready for context-aware development

### Level 4: Full PRP Execution 🚀
**Test the complete PRP workflow**

#### Execute Test PRP
We've created a test PRP (`test-user-greeting.md`). Let's execute it:

```
/execute-base-prp PRPs/test-user-greeting.md
```

**Expected Result:**
- AI should read the PRP
- Understand all context
- Create the required files
- Follow the implementation blueprint
- Run validation checks

### Level 5: Manual Implementation Test 🛠️
**Manually implement the test PRP to validate structure**

Let's manually implement part of the test PRP to ensure everything works:

## 🧪 Manual Test Implementation

### Step 1: Create Type Definitions

```typescript
// Create: src/lib/types/greeting.ts
export interface GreetingData {
  greeting: string
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  userName: string
}

export interface GreetingProps {
  user: any | null  // Use your existing User type
  className?: string
  showTimeOfDay?: boolean
}

export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night'
```

### Step 2: Create Utility Functions

```typescript
// Create: src/lib/utils/time-utils.ts
export function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) {
    return { greeting: 'Good morning', timeOfDay: 'morning' as const }
  } else if (hour >= 12 && hour < 17) {
    return { greeting: 'Good afternoon', timeOfDay: 'afternoon' as const }
  } else if (hour >= 17 && hour < 21) {
    return { greeting: 'Good evening', timeOfDay: 'evening' as const }
  } else {
    return { greeting: 'Good night', timeOfDay: 'night' as const }
  }
}

export function formatUserName(user: any | null): string {
  if (!user) return 'Guest'
  return user.user_metadata?.full_name || 
         user.full_name || 
         user.email?.split('@')[0] || 
         'User'
}
```

### Step 3: Validation Tests

```bash
# Test TypeScript compilation
npx tsc --noEmit

# Test linting
npm run lint

# Expected: No errors
```

## 📊 Testing Matrix

| Test Type | What It Validates | Success Criteria |
|-----------|------------------|------------------|
| **Setup Validation** | Infrastructure is installed | Commands appear, files exist |
| **Template Access** | Templates are usable | Can copy and modify templates |
| **AI Commands** | Claude integration works | Commands execute and produce results |
| **PRP Execution** | Full workflow functions | Complete feature implementation |
| **Manual Implementation** | Project patterns work | Code compiles and follows standards |

## ✅ Success Checklist

### Infrastructure Tests
- [ ] Claude commands appear in `/` menu
- [ ] `.claude/commands/PRPs/` directory contains 9+ files
- [ ] `PRPs/templates/` contains template files
- [ ] `PRPs/ai_docs/` contains documentation
- [ ] `CLAUDE.md` exists with project guidelines

### Functionality Tests
- [ ] Can create PRP from template
- [ ] `/prime-core` command loads project context
- [ ] `/create-base-prp` generates comprehensive PRP
- [ ] `/execute-base-prp` implements features correctly
- [ ] Generated code follows project patterns

### Quality Tests
- [ ] TypeScript compilation passes
- [ ] ESLint validation passes
- [ ] Generated components are properly typed
- [ ] Code follows CLAUDE.md guidelines
- [ ] Components integrate with existing codebase

### Workflow Tests
- [ ] PRP creation → execution → validation cycle works
- [ ] AI understands project-specific patterns
- [ ] Generated code requires minimal manual fixes
- [ ] Validation loops catch and fix issues
- [ ] Documentation is self-updating

## 🚨 Troubleshooting

### Commands Don't Appear
**Problem:** `/create-base-prp` doesn't show in Claude Code
**Solution:** 
1. Verify `.claude/commands/PRPs/` directory exists
2. Check file permissions
3. Restart Claude Code

### PRP Generation Issues
**Problem:** PRP creation fails or produces poor results
**Solution:**
1. Run `/prime-core` first
2. Ensure `CLAUDE.md` is comprehensive
3. Check `PRPs/ai_docs/` contains project patterns

### Code Quality Issues
**Problem:** Generated code doesn't follow project standards
**Solution:**
1. Update `CLAUDE.md` with specific requirements
2. Add more examples to `PRPs/ai_docs/nextjs_patterns.md`
3. Use validation loops to catch issues

### TypeScript Errors
**Problem:** Generated code has TypeScript errors
**Solution:**
1. Ensure types are defined in PRP context
2. Reference existing type patterns
3. Use Level 1 validation (tsc --noEmit) in PRPs

## 🎯 Quick Test Script

Here's a rapid test you can run:

```bash
# 1. Verify structure
echo "Testing PRP structure..."
if (Test-Path .claude\commands\PRPs\) { Write-Host "✅ Commands exist" } else { Write-Host "❌ Commands missing" }
if (Test-Path PRPs\templates\) { Write-Host "✅ Templates exist" } else { Write-Host "❌ Templates missing" }
if (Test-Path CLAUDE.md) { Write-Host "✅ Guidelines exist" } else { Write-Host "❌ Guidelines missing" }

# 2. Test TypeScript
echo "Testing TypeScript..."
npx tsc --noEmit
if ($LASTEXITCODE -eq 0) { Write-Host "✅ TypeScript OK" } else { Write-Host "❌ TypeScript errors" }

# 3. Test linting
echo "Testing linting..."
npm run lint
if ($LASTEXITCODE -eq 0) { Write-Host "✅ Linting OK" } else { Write-Host "❌ Linting errors" }

echo "PRP infrastructure test complete!"
```

## 🏆 Success Indicators

**Your PRP methodology is working correctly when:**

1. **Infrastructure**: All commands and files are accessible
2. **AI Integration**: Claude understands your project context
3. **Code Quality**: Generated code follows your standards
4. **Workflow**: Complete features can be built with PRPs
5. **Validation**: Quality checks catch and fix issues
6. **Efficiency**: Features are implemented correctly on first pass

**Ready to use PRPs for real development when all tests pass!** 🚀
