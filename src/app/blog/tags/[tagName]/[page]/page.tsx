import { notFound } from 'next/navigation'

import { TagBlogList } from '@/components/page/TagBlogList'
import { tagMap, getBlogs } from '@/services/blog'
import { paginate, range } from '@/util/pageHelper'

export async function generateStaticParams() {
  const blogs = await getBlogs()

  return Object.keys(tagMap).flatMap((tag) => {
    const tagBlogs = blogs.filter((item) => item.tags.includes(tag as keyof typeof tagMap))
    const { totalPages } = paginate(tagBlogs)

    return range(2, totalPages).map((num) => {
      return {
        tagName: tag,
        page: `${num}`,
      }
    })
  })
}

type Props = {
  params: {
    tagName: keyof typeof tagMap
    page: string
  }
}

export default async function TagBlogs({ params }: Props) {
  const blogs = await getBlogs()
  const tagBlogs = blogs.filter((item) => item.tags.includes(params.tagName))
  const count = tagBlogs.length

  if (count === 0) {
    return notFound()
  }

  const { items, totalPages, currentPage, error } = paginate(tagBlogs, params.page)

  if (error) {
    return notFound()
  }

  return (
    <TagBlogList
      tagName={params.tagName}
      blogs={items}
      count={count}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}
