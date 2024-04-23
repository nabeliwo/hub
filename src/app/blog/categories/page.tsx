import { Heading } from '@/components/ui/Heading'
import { TextLink } from '@/components/ui/TextLink'
import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap, getBlogs, countItems } from '@/services/blog'

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

  return (
    <>
      <Heading>{blog.siteName} のカテゴリ一覧</Heading>

      <ul className="mt-8 flex flex-wrap gap-4">
        {Object.entries(categoryMap).map(([key, value], i) => {
          return (
            <li key={i}>
              <TextLink href={path.blogCategoryItem(key)}>
                {value} ({countMap[key]})
              </TextLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}
