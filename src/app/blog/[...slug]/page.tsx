import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Datetime } from '@/components/ui/Datetime'
import { Heading } from '@/components/ui/Heading'
import { TextLink } from '@/components/ui/TextLink'
import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap, getBlog, tagMap } from '@/services/blog'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pathname = params.slug.join('/')
  const blogData = await getBlog(pathname)
  const title = `${blogData.title} | ${blog.siteName}`

  return {
    title,
    description: blogData.description,
    openGraph: {
      title,
      description: blogData.description,
      siteName: blog.siteName,
      type: 'article',
      url: `${blog.url}/${pathname}`,
      images: '', // TODO
    },
  }
}

export default async function BlogDetail({ params }: Props) {
  const pathname = params.slug.join('/')
  const blog = await getBlog(pathname)

  return (
    <>
      <p className="text-sm text-grey-text">
        <Datetime>{blog.date}</Datetime>
      </p>

      <Heading>{blog.title}</Heading>

      <div className="mt-2 text-sm md:flex md:gap-4">
        <p className="flex gap-1">
          <span className="text-grey-text">CATEGORY:</span>
          <TextLink href={path.blogCategoryItem(blog.category)}>{categoryMap[blog.category]}</TextLink>
        </p>

        {blog.tags.length > 0 && (
          <p className="flex gap-1">
            <span className="text-grey-text">TAGS:</span>

            <span>
              {blog.tags.reduce(
                (prev, cur, i) => [
                  ...prev,
                  i > 0 && ' / ',
                  <TextLink key={i} href={path.blogTagItem(cur)}>
                    #{tagMap[cur]}
                  </TextLink>,
                ],
                [] as ReactNode[],
              )}
            </span>
          </p>
        )}
      </div>

      {blog.image && (
        <div className="-mx-4 mt-8 md:mx-0">
          <img src={blog.image} alt="" />
        </div>
      )}

      <div className="mt-12">
        <PostWrapper>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </PostWrapper>
      </div>
    </>
  )
}