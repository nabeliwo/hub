import { notFound } from 'next/navigation'

import { BlogList } from '@/components/page/BlogList'
import { blog } from '@/constants/meta'
import { getBlogs } from '@/services/blog'
import { paginate, range } from '@/util/pageHelper'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const blogs = await getBlogs()
  const { totalPages } = paginate(blogs)

  return range(2, totalPages).map((num) => {
    return {
      page: `${num}`,
    }
  })
}

type Props = {
  params: Promise<{ page: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const parentMetadata = await parent
  const url = `${blog.url}/${params.page}`

  return {
    title: `記事一覧 (${params.page}ページ目) | ${blog.siteName}`,
    description: `${blog.siteName} の記事一覧の${params.page}ページ目です。`,
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

export default async function Blog(props: Props) {
  const params = await props.params
  const blogs = await getBlogs()
  const { items, totalPages, currentPage, error } = paginate(blogs, params.page)

  if (error) {
    return notFound()
  }

  return <BlogList blogs={items} totalPages={totalPages} currentPage={currentPage} />
}
