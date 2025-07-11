import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'

export function UsersSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and their roles
          </p>
        </div>
        <Button disabled>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          {/* Table header skeleton */}
          <div className="grid grid-cols-5 gap-4 pb-4 border-b">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          {/* Table rows skeleton */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 py-4 border-b last:border-b-0">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-32" />
              <div className="flex space-x-1">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
