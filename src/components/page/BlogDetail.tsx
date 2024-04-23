import { path } from '@/constants/path'
import type { Blog } from '@/services/blog/types'
import { categoryMap, tagMap } from '@/services/blog/types'

import { HtmlContent } from '../shared/HtmlContent'
import { Datetime } from '../ui/Datetime'
import { Heading } from '../ui/Heading'
import { TextLink } from '../ui/TextLink'

import type { ReactNode } from 'react'

type Props = {
  blog: Blog
}

export function BlogDetail({ blog }: Props) {
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
        <HtmlContent>{blog.content}</HtmlContent>
      </div>
    </>
  )
}
