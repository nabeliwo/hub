import { TagList } from '@/components/page/TagList'
import { getBlogs, countItems } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = 'タグ一覧 | ' + parentMetadata.title?.absolute
  const description = `${parentMetadata.title?.absolute} のタグ一覧です。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default async function Tags() {
  const blogs = await getBlogs()
  const tags = blogs.flatMap((blog) => blog.tags)
  const countMap = countItems(tags)

  return <TagList countMap={countMap} />
}
