'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Search, ChevronLeft, ChevronRight } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface UserWithRoles {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  roles: Array<{
    id: string
    name: string
  }>
}

interface Role {
  id: string
  name: string
}

export function UsersTable() {
  const [users, setUsers] = useState<UserWithRoles[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<UserWithRoles | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    username: '',
    full_name: ''
  })
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([])
  const [updatingUser, setUpdatingUser] = useState(false)
  
  // Search and pagination state
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  // Filter and paginate users
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users
    
    const query = searchQuery.toLowerCase()
    return users.filter(user => 
      user.full_name?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query) ||
      user.roles.some(role => role.name.toLowerCase().includes(query)) ||
      user.id.toLowerCase().includes(query)
    )
  }, [users, searchQuery])

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage
    return filteredUsers.slice(startIndex, startIndex + usersPerPage)
  }, [filteredUsers, currentPage, usersPerPage])

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const supabase = createClient()
      const { data: rolesData, error } = await supabase
        .from('roles')
        .select('id, name')
        .order('name')

      if (error) {
        console.error('Error fetching roles:', error)
        return
      }

      setRoles(rolesData || [])
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Get users with their roles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          full_name,
          avatar_url,
          created_at,
          profile_roles (
            roles (
              id,
              name
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        return
      }

      // Transform the data to match our interface
      const transformedUsers = profiles.map(profile => ({
        id: profile.id,
        username: profile.username,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        created_at: profile.created_at,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        roles: profile.profile_roles.map((pr: any) => pr.roles).filter(Boolean)
      }))

      setUsers(transformedUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = (user: UserWithRoles) => {
    setEditingUser(user)
    setEditForm({
      username: user.username || '',
      full_name: user.full_name || ''
    })
    setEditDialogOpen(true)
  }

  const handleManageRoles = (user: UserWithRoles) => {
    setEditingUser(user)
    setSelectedUserRoles(user.roles.map(role => role.id))
    setRoleDialogOpen(true)
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return

    try {
      setUpdatingUser(true)
      const supabase = createClient()
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: editForm.username.trim() || null,
          full_name: editForm.full_name.trim() || null
        })
        .eq('id', editingUser.id)

      if (error) {
        toast.error('Failed to update user')
        return
      }

      toast.success('User updated successfully')
      setEditDialogOpen(false)
      fetchUsers() // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Failed to update user')
    } finally {
      setUpdatingUser(false)
    }
  }

  const handleUpdateRoles = async () => {
    if (!editingUser) return

    try {
      setUpdatingUser(true)
      const supabase = createClient()
      
      // First, remove all existing roles for the user
      await supabase
        .from('profile_roles')
        .delete()
        .eq('profile_id', editingUser.id)

      // Then add the selected roles
      if (selectedUserRoles.length > 0) {
        const roleInserts = selectedUserRoles.map(roleId => ({
          profile_id: editingUser.id,
          role_id: roleId
        }))

        const { error } = await supabase
          .from('profile_roles')
          .insert(roleInserts)

        if (error) {
          toast.error('Failed to update user roles')
          return
        }
      }

      toast.success('User roles updated successfully')
      setRoleDialogOpen(false)
      fetchUsers() // Refresh the list
    } catch (error) {
      console.error('Error updating user roles:', error)
      toast.error('Failed to update user roles')
    } finally {
      setUpdatingUser(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and their roles. Users register via sign-up.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users by name, username, role, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredUsers.length} of {users.length} users
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchQuery ? 'No users found matching your search.' : 'No users found.'}
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback>
                      {user.full_name?.split(' ').map(n => n[0]).join('') || 
                       user.username?.[0]?.toUpperCase() || 
                       'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.full_name || user.username || 'Unknown User'}</p>
                    <p className="text-sm text-muted-foreground">ID: {user.id.slice(0, 8)}...</p>
                  </div>
                </TableCell>
                <TableCell>@{user.username || 'no-username'}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <Badge 
                        key={role.id} 
                        variant="secondary"
                      >
                        {role.name}
                      </Badge>
                    ))}
                    {user.roles.length === 0 && (
                      <Badge variant="outline">No roles</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
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
                      <DropdownMenuItem>
                        View profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        Edit user details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleManageRoles(user)}>
                        Manage roles
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Suspend user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={editForm.username}
                onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={editForm.full_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} disabled={updatingUser}>
              {updatingUser ? 'Updating...' : 'Update User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Roles Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage User Roles</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select roles for {editingUser?.username || editingUser?.full_name || 'this user'}:
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {roles.map((role: Role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`role-${role.id}`}
                    checked={selectedUserRoles.includes(role.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUserRoles(prev => [...prev, role.id])
                      } else {
                        setSelectedUserRoles(prev => prev.filter(id => id !== role.id))
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={`role-${role.id}`} className="flex-1">
                    {role.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRoles} disabled={updatingUser}>
              {updatingUser ? 'Updating...' : 'Update Roles'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
