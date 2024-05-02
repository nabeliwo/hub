import { notFound } from 'next/navigation'

import { TagBlogList } from '@/components/page/TagBlogList'
import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { tagMap, getBlogs } from '@/services/blog'
import { paginate, range } from '@/util/pageHelper'

import type { Metadata, ResolvingMetadata } from 'next'

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

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.blogTagItem(params.tagName)}`

  return {
    title: `タグが「${tagMap[params.tagName]}」の記事一覧 (${params.page}ページ目) | ${blog.siteName}`,
    description: `タグが「${tagMap[params.tagName]}」の記事一覧の${params.page}ページ目です。`,
    alternates: {
      types: {
        ...parentMetadata.alternates?.types,
      },
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
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
