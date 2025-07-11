import fs from 'fs'
import path from 'path'

export interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
  sections: {
    title: string
    items: string[]
    icon: 'added' | 'security' | 'technical' | 'upcoming'
  }[]
}

export async function getChangelogData(): Promise<{
  entries: ChangelogEntry[]
  upcomingFeatures: string[]
}> {
  const changelogPath = path.join(process.cwd(), 'src/app/docs/changelog/CHANGELOG.md')
  const content = fs.readFileSync(changelogPath, 'utf8')
  
  // Parse the markdown content
  const lines = content.split('\n')
  const entries: ChangelogEntry[] = []
  const upcomingFeatures: string[] = []
  
  let currentEntry: Partial<ChangelogEntry> | null = null
  let currentSection: { title: string; items: string[]; icon: 'added' | 'security' | 'technical' | 'upcoming' } | null = null
  let isUpcomingSection = false
  
  for (const line of lines) {
    // Version header (## v1.0.0 - Initial Release)
    if (line.startsWith('## v') && !line.includes('Upcoming')) {
      if (currentEntry) {
        entries.push(currentEntry as ChangelogEntry)
      }
      
      const match = line.match(/## (v[\d.]+) - (.+)/)
      if (match) {
        currentEntry = {
          version: match[1],
          title: match[2],
          date: '',
          description: '',
          sections: []
        }
      }
      isUpcomingSection = false
    }
    
    // Date line (*July 12, 2025*)
    else if (line.startsWith('*') && line.endsWith('*') && currentEntry) {
      currentEntry.date = line.slice(1, -1)
    }
    
    // Description (line after date, not starting with #)
    else if (currentEntry && currentEntry.date && !currentEntry.description && line.trim() && !line.startsWith('#') && !line.startsWith('*') && !line.startsWith('-')) {
      currentEntry.description = line.trim()
    }
    
    // Section headers (### ✅ Added Features)
    else if (line.startsWith('### ')) {
      if (currentSection && currentEntry && currentEntry.sections) {
        currentEntry.sections.push(currentSection)
      }
      
      const sectionTitle = line.replace('### ', '').replace(/^[✅🔒⚡]+\s*/, '')
      let icon: 'added' | 'security' | 'technical' | 'upcoming' = 'added'
      
      if (line.includes('🔒') || line.toLowerCase().includes('security')) {
        icon = 'security'
      } else if (line.includes('⚡') || line.toLowerCase().includes('technical')) {
        icon = 'technical'
      }
      
      currentSection = {
        title: sectionTitle,
        items: [],
        icon
      }
    }
    
    // Upcoming Features section
    else if (line.includes('Upcoming Features')) {
      isUpcomingSection = true
      if (currentSection && currentEntry && currentEntry.sections) {
        currentEntry.sections.push(currentSection)
        currentSection = null
      }
      if (currentEntry) {
        entries.push(currentEntry as ChangelogEntry)
        currentEntry = null
      }
    }
    
    // List items (- Item text)
    else if (line.startsWith('- ')) {
      const item = line.replace('- ', '').trim()
      if (isUpcomingSection) {
        upcomingFeatures.push(item)
      } else if (currentSection) {
        currentSection.items.push(item)
      }
    }
  }
  
  // Add final section and entry
  if (currentSection && currentEntry && currentEntry.sections) {
    currentEntry.sections.push(currentSection)
  }
  if (currentEntry) {
    entries.push(currentEntry as ChangelogEntry)
  }
  
  return { entries, upcomingFeatures }
}
