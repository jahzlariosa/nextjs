# Security Checklist for AI Agents

## 🔒 Mandatory Security Checks

### Before Implementation

#### 1. Authentication Requirements
- [ ] Identify which routes need authentication
- [ ] Determine authentication method (session, JWT, API key)
- [ ] Plan for unauthenticated user handling
- [ ] Consider multi-factor authentication needs

#### 2. Authorization Planning
- [ ] Define user roles and permissions
- [ ] Plan role-based access control (RBAC)
- [ ] Identify resource ownership rules
- [ ] Plan for permission inheritance

#### 3. Data Security Planning
- [ ] Identify sensitive data fields
- [ ] Plan encryption for sensitive data
- [ ] Determine data retention policies
- [ ] Plan for data anonymization needs

### During Implementation

#### 1. Input Validation
```typescript
// Always validate input with Zod
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().max(150),
});

// In API route
const validatedData = schema.parse(requestBody);
```

#### 2. SQL Injection Prevention
```typescript
// ❌ NEVER do this
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Always use parameterized queries
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);
```

#### 3. XSS Prevention
```typescript
// ❌ NEVER render raw HTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Use proper escaping
import DOMPurify from 'isomorphic-dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

#### 4. CSRF Protection
```typescript
// For state-changing operations, verify origin
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin !== process.env.NEXT_PUBLIC_APP_URL) {
    return new Response('Forbidden', { status: 403 });
  }
  // ... rest of handler
}
```

#### 5. Rate Limiting
```typescript
// Implement rate limiting for API routes
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
  // ... rest of handler
}
```

### Authentication Patterns

#### 1. Server-Side Auth Check
```typescript
// In server components
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  // ... rest of component
}
```

#### 2. Middleware Protection
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

### Authorization Patterns

#### 1. Row Level Security (RLS)
```sql
-- Enable RLS on table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy for users to see only their documents
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to create documents
CREATE POLICY "Users can create documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update own documents
CREATE POLICY "Users can update own documents" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for users to delete own documents
CREATE POLICY "Users can delete own documents" ON documents
  FOR DELETE USING (auth.uid() = user_id);
```

#### 2. API Authorization
```typescript
// Check user permissions in API routes
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Get session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Check ownership
  const { data: document } = await supabase
    .from('documents')
    .select('user_id')
    .eq('id', params.id)
    .single();
    
  if (!document || document.user_id !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Proceed with deletion
  // ...
}
```

### Environment Variables Security

#### 1. Never Expose Secrets
```typescript
// ❌ NEVER expose server-side secrets
const apiKey = process.env.SECRET_API_KEY; // This would be exposed in client components

// ✅ Use NEXT_PUBLIC_ prefix only for public values
const publicUrl = process.env.NEXT_PUBLIC_APP_URL;
```

#### 2. Validate Environment Variables
```typescript
// lib/env.ts
const requiredEnvVars = [
  'DATABASE_URL',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

### File Upload Security

#### 1. Validate File Types
```typescript
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxSize = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }
  
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 });
  }
  
  // Proceed with upload
}
```

#### 2. Sanitize File Names
```typescript
import path from 'path';
import crypto from 'crypto';

function sanitizeFileName(fileName: string): string {
  const ext = path.extname(fileName);
  const name = crypto.randomBytes(16).toString('hex');
  return `${name}${ext}`;
}
```

### API Security Best Practices

#### 1. Always Return Appropriate Status Codes
```typescript
// 200 - Success
// 201 - Created
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 429 - Too Many Requests
// 500 - Internal Server Error
```

#### 2. Don't Expose Internal Errors
```typescript
try {
  // ... some operation
} catch (error) {
  console.error('Internal error:', error);
  
  // ❌ Don't expose internal details
  return NextResponse.json({ error: error.message }, { status: 500 });
  
  // ✅ Return generic error
  return NextResponse.json(
    { error: 'An error occurred processing your request' },
    { status: 500 }
  );
}
```

#### 3. Log Security Events
```typescript
// Log authentication failures
console.error(`Authentication failed for user: ${email}`, {
  timestamp: new Date().toISOString(),
  ip: request.headers.get('x-forwarded-for'),
  userAgent: request.headers.get('user-agent'),
});

// Log authorization failures
console.warn(`Unauthorized access attempt to ${resource}`, {
  userId: session.user.id,
  resource,
  action,
});
```

## 🚨 Security Testing Checklist

### Before Deployment
- [ ] All inputs validated
- [ ] SQL injection impossible
- [ ] XSS vulnerabilities addressed
- [ ] CSRF protection implemented
- [ ] Rate limiting in place
- [ ] Authentication required where needed
- [ ] Authorization checks comprehensive
- [ ] Sensitive data encrypted
- [ ] Environment variables secure
- [ ] Error messages don't leak information
- [ ] File uploads validated
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Logging implemented for security events

### Common Vulnerabilities to Check
- [ ] No hardcoded secrets
- [ ] No exposed API keys
- [ ] No directory traversal possible
- [ ] No open redirects
- [ ] No sensitive data in URLs
- [ ] No sensitive data in localStorage
- [ ] No eval() or Function() with user input
- [ ] No outdated dependencies with vulnerabilities

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/authentication)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
