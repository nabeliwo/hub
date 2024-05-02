import { notFound } from 'next/navigation'

import { BlogDetail } from '@/components/page/BlogDetail'
import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
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
    return {}
  }

  const parentMetadata = await parent
  const url = `${blog.url}/${pathname}`

  return {
    title: `${blogData.title} | ${blog.siteName}`,
    description: blogData.description,
    alternates: {
      types: {
        ...parentMetadata.alternates?.types,
      },
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
      images: blogData.image
        ? `${profile.url}${blogData.image}`
        : {
            url: `${profile.url}${path.api.ogImage({ siteName: blog.siteName, title: blogData.title })}`,
            width: 1200,
            height: 630,
          },
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
