import { LayoutWrapper } from '@/components/layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutWrapper showHeader={true} showFooter={true}>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </LayoutWrapper>
  )
}
