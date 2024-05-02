import { notFound } from 'next/navigation'

import { BlogDetail } from '@/components/page/BlogDetail'
import { blog } from '@/constants/meta'
import { getBlog, getBlogs } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const blogs = await getBlogs()

  return blogs.map((blog) => ({
    slug: blog.slug.slice(1).split('/'),
  }))
}

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const pathname = params.slug.join('/')
  const blogData = await getBlog(pathname)

  if (!blogData) {
    return notFound()
  }

  const parentMetadata = await parent
  const url = `${blog.url}/${pathname}`

  return {
    title: `${blogData.title} | ${blog.siteName}`,
    description: blogData.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
      images: '', // TODO
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const pathname = params.slug.join('/')
  const blogData = await getBlog(pathname)

  if (!blogData) {
    return notFound()
  }

  return <BlogDetail blog={blogData} />
}
