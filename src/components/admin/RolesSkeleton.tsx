import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function RolesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Roles</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage system roles and permissions
          </p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          {/* Table header skeleton */}
          <div className="grid grid-cols-5 gap-4 pb-4 border-b">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          {/* Table rows skeleton */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 py-4 border-b last:border-b-0">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
