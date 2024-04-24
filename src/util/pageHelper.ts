import { bestBuy, blog, profile, weekly } from '@/constants/meta'
import { path } from '@/constants/path'

export function range(start: number, end: number) {
  return [...Array(end - start + 1)].map((_, i) => start + i)
}

export function matchNavItem(itemPath: string, currentPath: string) {
  if (itemPath === path.aboutMe) {
    return currentPath === itemPath
  }

  return currentPath.startsWith(itemPath)
}

export function getHeaderInfo(pathname: string) {
  if (pathname.startsWith(path.blog)) {
    return {
      title: blog.siteName,
      description: blog.description,
      url: path.blog,
    }
  }

  if (pathname.startsWith(path.weekly)) {
    return {
      title: weekly.siteName,
      description: weekly.description,
      url: path.weekly,
    }
  }

  if (pathname.startsWith(path.bestBuy)) {
    return {
      title: bestBuy.siteName,
      description: bestBuy.description,
      url: path.bestBuy,
    }
  }

  return {
    title: profile.siteName,
    description: profile.description,
    url: path.aboutMe,
  }
}

export function getFooterRSSLink(pathname: string) {
  if (pathname.startsWith(path.blog)) {
    return {
      label: 'Blog',
      path: '/rss/blog/feed.xml',
    }
  }

  if (pathname.startsWith(path.weekly)) {
    return {
      label: 'Weekly',
      path: '/rss/weekly/feed.xml',
    }
  }

  if (pathname.startsWith(path.bestBuy)) {
    return {
      label: 'Best Buy',
      path: '/rss/best-buy/feed.xml',
    }
  }

  return null
}

const PER = 20
const PAGE = '1'
export function paginate<T>(
  items: T[],
  page = PAGE,
): {
  items: T[]
  totalPages: number
  currentPage: number
  error: boolean
} {
  const totalPages = Math.ceil(items.length / PER)
  const pageNumber = Number(page)

  if (isNaN(pageNumber)) {
    return {
      items: [],
      totalPages: 0,
      currentPage: 0,
      error: true,
    }
  }

  const currentPage = pageNumber > totalPages ? totalPages : pageNumber

  const startIndex = (currentPage - 1) * PER
  const endIndex = startIndex + PER
  const pageItems = items.slice(startIndex, endIndex)

  return { items: pageItems, totalPages, currentPage, error: false }
}
