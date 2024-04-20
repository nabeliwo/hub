import { bestBuy, blog, profile, weekly } from '@/constants/meta'
import { path } from '@/constants/path'

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
