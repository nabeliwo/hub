import { Datetime } from '@/components/ui/Datetime'
import { TextLink } from '@/components/ui/TextLink'
import { path } from '@/constants/path'
import { categoryMap, tagMap, type Blog } from '@/services/blog/types'

import type { ReactNode } from 'react'

type Props = {
  blog: Blog
}

export function BlogItem({ blog }: Props) {
  return (
    <article>
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
    </article>
  )
}
