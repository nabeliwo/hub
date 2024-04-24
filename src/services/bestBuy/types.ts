type BestBuyFrontMatter = {
  title: string
  date: string
  image: string
  alt: string
}

export type BestBuy = BestBuyFrontMatter & {
  description: string
  content: string
  slug: string
}

export function isBestBuyFrontMatter(metaData: unknown): metaData is BestBuyFrontMatter {
  if (typeof metaData !== 'object' || metaData === null) {
    return false
  }

  const value = metaData as Record<string, unknown>

  if (!('title' in value) || typeof value.title !== 'string') {
    return false
  }

  if (
    !('date' in value) ||
    typeof value.date !== 'string' ||
    new Date(value.date).toString() === 'Invalid Date'
  ) {
    return false
  }

  if (!('image' in value) || typeof value.image !== 'string') {
    return false
  }

  return true
}
