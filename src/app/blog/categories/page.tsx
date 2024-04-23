import { CategoryList } from '@/components/page/CategoryList'
import { getBlogs, countItems } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = 'カテゴリ一覧 | ' + parentMetadata.title?.absolute
  const description = `${parentMetadata.title?.absolute} のカテゴリ一覧です。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default async function Categories() {
  const blogs = await getBlogs()
  const categories = blogs.map((blog) => blog.category)
  const countMap = countItems(categories)

  return <CategoryList countMap={countMap} />
}
