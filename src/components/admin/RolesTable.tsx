'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, MoreHorizontal } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface Role {
  id: string
  name: string
  created_at: string
  user_count?: number
}

export function RolesTable() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [newRoleName, setNewRoleName] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Get roles with user counts
      const { data: rolesData, error } = await supabase
        .from('roles')
        .select(`
          id,
          name,
          created_at,
          profile_roles (count)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching roles:', error)
        return
      }

      // Transform the data to include user counts
      const transformedRoles = rolesData.map(role => ({
        id: role.id,
        name: role.name,
        created_at: role.created_at,
        user_count: Array.isArray(role.profile_roles) ? role.profile_roles.length : 0
      }))

      setRoles(transformedRoles)
    } catch (error) {
      console.error('Error fetching roles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRole = async () => {
    if (!newRoleName.trim()) {
      toast.error('Please enter a role name')
      return
    }

    try {
      setCreating(true)
      const supabase = createClient()
      
      const { error } = await supabase
        .from('roles')
        .insert([{ name: newRoleName.trim().toLowerCase() }])

      if (error) {
        if (error.code === '23505') {
          toast.error('Role name already exists')
        } else {
          toast.error('Failed to create role')
        }
        return
      }

      toast.success('Role created successfully')
      setNewRoleName('')
      fetchRoles() // Refresh the list
    } catch (error) {
      console.error('Error creating role:', error)
      toast.error('Failed to create role')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Roles</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage system roles and permissions
          </p>
        </div>
        <Button 
          onClick={() => {
            const roleName = prompt('Enter role name:')
            if (roleName) {
              setNewRoleName(roleName)
              handleCreateRole()
            }
          }}
          disabled={creating}
        >
          <Plus className="mr-2 h-4 w-4" />
          {creating ? 'Creating...' : 'Create Role'}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {role.name}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {role.user_count} users
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(role.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit role</DropdownMenuItem>
                      <DropdownMenuItem>View permissions</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete role
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
