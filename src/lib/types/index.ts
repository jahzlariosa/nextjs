export interface Role {
  id: string;
  name: string;
}

export interface ProfileRole {
  role_id: string;
  roles: Role;
}

export interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
  roles: ProfileRole[];
}
