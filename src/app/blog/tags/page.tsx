import { Heading } from '@/components/ui/Heading'
import { TextLink } from '@/components/ui/TextLink'
import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import { tagMap, getBlogs, countItems } from '@/services/blog'

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

  return (
    <>
      <Heading>{blog.siteName} のタグ一覧</Heading>

      <ul className="mt-8 flex flex-wrap gap-4">
        {Object.entries(tagMap).map(([key, value], i) => {
          return (
            <li key={i}>
              <TextLink href={path.blogTagItem(key)}>
                {value} ({countMap[key]})
              </TextLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}
