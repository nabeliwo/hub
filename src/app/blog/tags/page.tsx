import { TagList } from '@/components/page/TagList'
import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { getBlogs, countItems } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.blogTags}`

  return {
    title: `タグ一覧 | ${blog.siteName}`,
    description: `${blog.siteName} のタグ一覧です。`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Tags() {
  const blogs = await getBlogs()
  const tags = blogs.flatMap((blog) => blog.tags)
  const countMap = countItems(tags)

  return <TagList countMap={countMap} />
}
