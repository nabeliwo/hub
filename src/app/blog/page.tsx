import { Datetime } from '@/components/ui/Datetime'
import { Heading } from '@/components/ui/Heading'
import { Pagination } from '@/components/ui/Pagination'
import { TextLink } from '@/components/ui/TextLink'
import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap, getBlogs, tagMap } from '@/services/blog'
import { paginate } from '@/utils/pagination'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: blog.siteName,
  description: blog.description,
  openGraph: {
    title: blog.siteName,
    description: blog.description,
    siteName: blog.siteName,
    url: blog.url,
    images: '', // TODO
  },
}

export default async function Blog({ searchParams }: Props) {
  const blogs = await getBlogs()
  const { items, totalPages, currentPage } = paginate(blogs, searchParams)

  return (
    <>
      <Heading visuallyHidden>nabeliwo blog</Heading>

      <section className="space-y-12">
        {items.map((blog, i) => (
          <article key={i}>
            <p className="text-sm text-grey-text">
              <Datetime>{blog.date}</Datetime>
            </p>

            <h2 className="mt-1 text-2xl">
              <TextLink href={path.blogItem(blog.slug)}>{blog.title}</TextLink>
            </h2>

            <p className="mt-2">{blog.description}</p>

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
                      (prev, cur, j) => [
                        ...prev,
                        j > 0 && ' / ',
                        <TextLink key={`${i}-${j}`} href={path.blogTagItem(cur)}>
                          #{tagMap[cur]}
                        </TextLink>,
                      ],
                      [] as ReactNode[],
                    )}
                  </span>
                </p>
              )}
            </div>
          </article>
        ))}
      </section>

      <div className="mt-20 flex justify-center empty:mt-0 md:justify-start">
        <Pagination totalPages={totalPages} currentPage={currentPage} path={path.blog} />
      </div>
    </>
  )
}
