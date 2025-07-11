import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Plus, Shield, Zap } from 'lucide-react'
import { getChangelogData } from '@/lib/changelog-parser'

export default async function ChangelogPage() {
  const { entries, upcomingFeatures } = await getChangelogData()

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'added':
        return <Plus className="w-4 h-4 text-green-500" />
      case 'security':
        return <Shield className="w-4 h-4 text-blue-500" />
      case 'technical':
        return <Zap className="w-4 h-4 text-yellow-500" />
      default:
        return <Plus className="w-4 h-4 text-green-500" />
    }
  }

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case 'added':
        return 'text-green-500'
      case 'security':
        return 'text-blue-500'
      case 'technical':
        return 'text-yellow-500'
      default:
        return 'text-green-500'
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Changelog</h1>
        <p className="text-xl text-muted-foreground">
          Track all changes, updates, and improvements to the application.
        </p>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
          <Card key={entry.version}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">{entry.version}</Badge>
                  {entry.title}
                </CardTitle>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </div>
              <CardDescription>
                {entry.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {entry.sections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    {getIcon(section.icon)}
                    {section.title}
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <CheckCircle className={`w-3 h-3 ${getIconColor(section.icon)}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {upcomingFeatures.length > 0 && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Upcoming Features</CardTitle>
              <CardDescription>
                Features planned for future releases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {upcomingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-muted-foreground rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
