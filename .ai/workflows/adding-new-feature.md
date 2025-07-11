# Workflow: Adding a New Feature

## 📋 Pre-Implementation Checklist

Before starting any new feature:

- [ ] Read the feature requirements completely
- [ ] Review `.ai/context.md` for project state
- [ ] Check if similar features exist
- [ ] Identify all affected areas
- [ ] Consider security implications
- [ ] Plan the implementation approach

## 🔍 Research Phase

### 1. Analyze Requirements
```markdown
## Feature: [Feature Name]

### User Story
As a [user type], I want to [action] so that [benefit].

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Technical Requirements
- [ ] Requirement 1
- [ ] Requirement 2
```

### 2. Review Existing Code
- Check for similar features or patterns
- Identify reusable components
- Review relevant database tables
- Check for existing API endpoints

### 3. Security Analysis
- Authentication requirements
- Authorization levels needed
- Data validation requirements
- RLS policies to implement

## 📐 Planning Phase

### 1. Architecture Design
```markdown
## Architecture Plan

### Components Needed
- [ ] Component 1 - Purpose
- [ ] Component 2 - Purpose

### API Endpoints
- [ ] GET /api/feature - Description
- [ ] POST /api/feature - Description

### Database Changes
- [ ] New tables needed
- [ ] Modifications to existing tables
- [ ] RLS policies required

### State Management
- [ ] Server state requirements
- [ ] Client state requirements
```

### 2. File Structure Plan
```
feature-name/
├── components/
│   ├── FeatureList.tsx
│   ├── FeatureItem.tsx
│   └── FeatureForm.tsx
├── app/
│   └── (dashboard)/
│       └── feature-name/
│           ├── page.tsx
│           └── loading.tsx
├── app/api/
│   └── feature-name/
│       └── route.ts
└── types/
    └── feature-name.types.ts
```

### 3. Implementation Steps
1. Create type definitions
2. Set up database tables and RLS
3. Create server components
4. Implement API routes
5. Add client interactivity
6. Implement error handling
7. Add loading states
8. Write tests
9. Update documentation

## 🛠️ Implementation Phase

### 1. Type Definitions First
```typescript
// types/feature-name.types.ts
export interface IFeature {
  id: string;
  name: string;
  // ... other properties
}
```

### 2. Database Setup
```sql
-- Create table
CREATE TABLE features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own features" ON features
  FOR SELECT USING (auth.uid() = user_id);
```

### 3. Server Component Pattern
```typescript
// app/(dashboard)/features/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function FeaturesPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: features, error } = await supabase
    .from('features')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // Handle error
  }

  return (
    <div>
      {/* Render features */}
    </div>
  );
}
```

### 4. API Route Pattern
```typescript
// app/api/features/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Check authentication
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Validate input
  const body = await request.json();
  // Add validation logic

  // Create feature
  const { data, error } = await supabase
    .from('features')
    .insert({ ...body, user_id: session.user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
```

## ✅ Testing Phase

### 1. Manual Testing Checklist
- [ ] Feature works as expected
- [ ] Error states handled properly
- [ ] Loading states display correctly
- [ ] Responsive on all devices
- [ ] Accessibility requirements met

### 2. Security Testing
- [ ] Authentication required where needed
- [ ] Authorization checks work
- [ ] Input validation prevents bad data
- [ ] RLS policies enforce access control
- [ ] No sensitive data exposed

### 3. Performance Testing
- [ ] Page loads quickly
- [ ] API responses are fast
- [ ] No unnecessary re-renders
- [ ] Proper caching implemented

## 📚 Documentation Phase

### 1. Update README
- Add feature description
- Include setup instructions
- Document environment variables

### 2. Component Documentation
```typescript
/**
 * FeatureList Component
 * 
 * Displays a list of features for the current user
 * 
 * @example
 * <FeatureList />
 */
```

### 3. API Documentation
```markdown
## API: /api/features

### POST /api/features
Create a new feature

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "created_at": "timestamp"
}
```
```

## 🚀 Deployment Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog entry created
- [ ] Environment variables documented
- [ ] Database migrations ready
- [ ] Feature flags configured (if applicable)

## 📝 Post-Implementation

1. Create detailed changelog entry
2. Update `.ai/context.md` with new feature
3. Document any lessons learned
4. Note any technical debt created
5. Plan follow-up improvements
