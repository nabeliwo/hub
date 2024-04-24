import { notFound } from 'next/navigation'

import { TagBlogList } from '@/components/page/TagBlogList'
import { tagMap, getBlogs } from '@/services/blog'
import { paginate } from '@/util/pageHelper'

export async function generateStaticParams() {
  return Object.keys(tagMap).map((tag) => ({
    tagName: tag,
  }))
}

type Props = {
  params: {
    tagName: keyof typeof tagMap
  }
}

export default async function TagBlogs({ params }: Props) {
  const blogs = await getBlogs()
  const tagBlogs = blogs.filter((item) => item.tags.includes(params.tagName))
  const count = tagBlogs.length

  if (count === 0) {
    return notFound()
  }

  const { items, totalPages, currentPage } = paginate(tagBlogs, '1')

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
