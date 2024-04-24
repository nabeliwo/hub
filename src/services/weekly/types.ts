type WeeklyFrontMatter = {
  title: string
  description: string
}

export type Weekly = WeeklyFrontMatter & {
  date: string
  content: string
  slug: string
}

export function isWeeklyFrontMatter(metaData: unknown): metaData is WeeklyFrontMatter {
  if (typeof metaData !== 'object' || metaData === null) {
    return false
  }

  const value = metaData as Record<string, unknown>

  if (!('title' in value) || typeof value.title !== 'string') {
    return false
  }

  if (!('description' in value) || typeof value.description !== 'string') {
    return false
  }

  return true
}
