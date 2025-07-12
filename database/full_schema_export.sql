-- =============================================================================
-- Next.js Supabase Starter - Complete Database Schema Export
-- Generated: July 12, 2025
-- =============================================================================
-- This file contains the complete database schema including:
-- - Table definitions with constraints
-- - Functions and triggers
-- - Row Level Security (RLS) policies
-- - Storage buckets and policies
-- - Initial data seeds
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA graphql;
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA vault;

-- =============================================================================
-- TABLE DEFINITIONS
-- =============================================================================

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  username text,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  location text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create roles table
CREATE TABLE IF NOT EXISTS public.roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create profile_roles junction table
CREATE TABLE IF NOT EXISTS public.profile_roles (
  profile_id uuid NOT NULL,
  role_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- =============================================================================
-- PRIMARY KEYS
-- =============================================================================

ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE public.roles ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE public.profile_roles ADD CONSTRAINT profile_roles_pkey PRIMARY KEY (profile_id, role_id);

-- =============================================================================
-- UNIQUE CONSTRAINTS
-- =============================================================================

ALTER TABLE public.profiles ADD CONSTRAINT profiles_username_key UNIQUE (username);
ALTER TABLE public.roles ADD CONSTRAINT roles_name_key UNIQUE (name);

-- =============================================================================
-- FOREIGN KEY CONSTRAINTS
-- =============================================================================

ALTER TABLE public.profile_roles ADD CONSTRAINT profile_roles_profile_id_fkey 
  FOREIGN KEY (profile_id) REFERENCES public.profiles (id) ON DELETE CASCADE;

ALTER TABLE public.profile_roles ADD CONSTRAINT profile_roles_role_id_fkey 
  FOREIGN KEY (role_id) REFERENCES public.roles (id) ON DELETE CASCADE;

ALTER TABLE public.profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $function$
DECLARE
  user_role_id uuid;
BEGIN
  -- Create the user profile
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );

  -- Get the 'user' role ID
  SELECT id INTO user_role_id FROM public.roles WHERE name = 'user' LIMIT 1;

  -- Assign the 'user' role to the new profile
  IF user_role_id IS NOT NULL THEN
    INSERT INTO public.profile_roles (profile_id, role_id)
    VALUES (NEW.id, user_role_id);
  END IF;

  RETURN NEW;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION public.handle_profile_update() 
RETURNS trigger AS $function$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column() 
RETURNS trigger AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$ LANGUAGE plpgsql;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin_authenticated() 
RETURNS boolean AS $function$
BEGIN
  RETURN (
    SELECT 'admin' IN (
      SELECT r.name
      FROM roles r
      JOIN profile_roles pr ON r.id = pr.role_id
      WHERE pr.profile_id = auth.uid()
    )
  );
END;
$function$ LANGUAGE plpgsql;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid) 
RETURNS text AS $function$
BEGIN
  RETURN (
    SELECT r.name 
    FROM public.roles r
    JOIN public.profile_roles pr ON r.id = pr.role_id
    WHERE pr.profile_id = user_id
    LIMIT 1
  );
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user emails (admin only)
CREATE OR REPLACE FUNCTION public.get_user_emails(IN user_ids uuid[]) 
RETURNS TABLE(id uuid, email text) AS $function$
BEGIN
  -- Check if current user is admin
  IF NOT (
    SELECT 'admin' IN (
      SELECT r.name
      FROM roles r
      JOIN profile_roles pr ON r.id = pr.role_id
      WHERE pr.profile_id = auth.uid()
    )
  ) THEN
    RAISE EXCEPTION 'Only admins can access user emails';
  END IF;
  
  RETURN QUERY
  SELECT au.id, au.email
  FROM auth.users au
  WHERE au.id = ANY(user_ids);
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created 
  AFTER INSERT ON auth.users 
  FOR EACH ROW 
  EXECUTE FUNCTION handle_new_user();

-- Trigger for profile updates
CREATE TRIGGER on_profile_updated 
  BEFORE UPDATE ON public.profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION handle_profile_update();

-- Trigger for roles updated_at
CREATE TRIGGER on_roles_updated 
  BEFORE UPDATE ON public.roles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_roles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Anyone can view profiles" ON public.profiles 
  FOR SELECT TO public USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles 
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can edit own profile" ON public.profiles 
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Roles policies
CREATE POLICY "Authenticated users can view all roles" ON public.roles 
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can create roles" ON public.roles 
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profile_roles pr
      JOIN roles r ON pr.role_id = r.id
      WHERE pr.profile_id = auth.uid() AND r.name = 'admin'
    )
  );

CREATE POLICY "Admins can update roles" ON public.roles 
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM profile_roles pr
      JOIN roles r ON pr.role_id = r.id
      WHERE pr.profile_id = auth.uid() AND r.name = 'admin'
    )
  );

CREATE POLICY "Admins can delete roles" ON public.roles 
  FOR DELETE TO authenticated USING (
    name <> ALL (ARRAY['admin'::text, 'user'::text]) AND
    EXISTS (
      SELECT 1
      FROM profile_roles pr
      JOIN roles r ON pr.role_id = r.id
      WHERE pr.profile_id = auth.uid() AND r.name = 'admin'
    )
  );

-- Profile roles policies
CREATE POLICY "Enable read access for all users" ON public.profile_roles 
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can insert profile roles" ON public.profile_roles 
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profile_roles pr
      JOIN roles r ON pr.role_id = r.id
      WHERE pr.profile_id = auth.uid() AND r.name = 'admin'
    )
  );

CREATE POLICY "Admins can update profile roles" ON public.profile_roles 
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM profile_roles pr
      JOIN roles r ON pr.role_id = r.id
      WHERE pr.profile_id = auth.uid() AND r.name = 'admin'
    )
  );

CREATE POLICY "Admins can delete profile roles" ON public.profile_roles 
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1
      FROM profile_roles pr
      JOIN roles r ON pr.role_id = r.id
      WHERE pr.profile_id = auth.uid() AND r.name = 'admin'
    )
  );

-- =============================================================================
-- STORAGE SETUP
-- =============================================================================

-- Create avatars bucket
INSERT INTO storage.buckets (id, name, owner, public, avif_autodetection, file_size_limit, allowed_mime_types, created_at, updated_at) 
VALUES (
  'avatars', 
  'avatars', 
  NULL, 
  true, 
  false, 
  5242880, 
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif'], 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Users can view all avatars" ON storage.objects 
  FOR SELECT TO public USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatars" ON storage.objects 
  FOR INSERT TO public WITH CHECK (
    bucket_id = 'avatars' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatars" ON storage.objects 
  FOR UPDATE TO public USING (
    bucket_id = 'avatars' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatars" ON storage.objects 
  FOR DELETE TO public USING (
    bucket_id = 'avatars' AND 
    (auth.uid())::text = (storage.foldername(name))[1]
  );

-- =============================================================================
-- INITIAL DATA SEEDS
-- =============================================================================

-- Insert default roles
INSERT INTO public.roles (id, name, created_at, updated_at) VALUES 
  ('e4b1fc43-3617-4aad-b6ed-9d5403f17d6f', 'user', NOW(), NOW()),
  ('3edee927-dba4-409d-91b7-79b43b95cd0b', 'admin', NOW(), NOW()),
  ('08aa3d9e-7444-4f4f-b540-60b9a7115c35', 'moderator', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- =============================================================================
-- VIEWS (Optional - for easier data access)
-- =============================================================================

-- View to get user profiles with their roles
CREATE OR REPLACE VIEW public.user_profiles_with_roles AS
SELECT 
  p.id,
  p.username,
  p.full_name,
  p.avatar_url,
  p.bio,
  p.website,
  p.location,
  p.created_at,
  p.updated_at,
  COALESCE(
    array_agg(r.name) FILTER (WHERE r.name IS NOT NULL),
    ARRAY[]::text[]
  ) as roles
FROM public.profiles p
LEFT JOIN public.profile_roles pr ON p.id = pr.profile_id
LEFT JOIN public.roles r ON pr.role_id = r.id
GROUP BY p.id, p.username, p.full_name, p.avatar_url, p.bio, p.website, p.location, p.created_at, p.updated_at;

-- =============================================================================
-- INDEXES (Optional - for better performance)
-- =============================================================================

-- Index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- Index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_profile_roles_profile_id ON public.profile_roles(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_roles_role_id ON public.profile_roles(role_id);

-- Index for faster role name lookups
CREATE INDEX IF NOT EXISTS idx_roles_name ON public.roles(name);

-- =============================================================================
-- COMMENTS (Documentation)
-- =============================================================================

COMMENT ON TABLE public.profiles IS 'User profile information';
COMMENT ON TABLE public.roles IS 'System roles (admin, user, moderator, etc.)';
COMMENT ON TABLE public.profile_roles IS 'Junction table linking users to their roles';

COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates user profile and assigns default role when new user signs up';
COMMENT ON FUNCTION public.handle_profile_update() IS 'Updates the updated_at timestamp when profile is modified';
COMMENT ON FUNCTION public.is_admin_authenticated() IS 'Checks if the current authenticated user has admin role';
COMMENT ON FUNCTION public.get_user_role(uuid) IS 'Returns the primary role name for a given user ID';
COMMENT ON FUNCTION public.get_user_emails(uuid[]) IS 'Returns email addresses for given user IDs (admin only)';

-- =============================================================================
-- USAGE NOTES
-- =============================================================================

/*
This schema provides:

1. USER MANAGEMENT:
   - Automatic profile creation on signup
   - Role-based access control
   - Avatar upload functionality

2. SECURITY:
   - Row Level Security on all tables
   - Proper foreign key constraints
   - Admin-only functions for sensitive operations

3. EXTENSIBILITY:
   - Flexible role system
   - Profile fields for various use cases
   - Junction table for multiple roles per user

4. PERFORMANCE:
   - Appropriate indexes for common queries
   - Efficient RLS policies
   - Optimized function definitions

TO USE THIS SCHEMA:
1. Run this script in your Supabase SQL editor
2. Configure your application to use the provided functions
3. Set up authentication flows in your frontend
4. Customize the profile fields as needed for your application

CUSTOMIZATION:
- Add more fields to the profiles table
- Create additional roles as needed
- Extend the RLS policies for your specific requirements
- Add more storage buckets for different file types
*/
