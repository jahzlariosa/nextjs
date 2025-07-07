import { Sidebar } from '@/components/docs/sidebar'
import { DocsHeader } from '@/components/docs/header'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DocsHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 min-w-0">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
