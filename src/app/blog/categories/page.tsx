import { CategoryList } from '@/components/page/CategoryList'
import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { getBlogs, countItems } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.blogCategories}`

  return {
    title: `カテゴリ一覧 | ${blog.siteName}`,
    description: `${blog.siteName} のカテゴリ一覧です。`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Categories() {
  const blogs = await getBlogs()
  const categories = blogs.map((blog) => blog.category)
  const countMap = countItems(categories)

  return <CategoryList countMap={countMap} />
}
