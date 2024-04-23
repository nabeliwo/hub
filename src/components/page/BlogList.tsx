import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import type { Blog } from '@/services/blog/types'

import { BlogItem } from '../model/blog/BlogItem'
import { Heading } from '../ui/Heading'
import { Pagination } from '../ui/Pagination'

type Props = {
  blogs: Blog[]
  totalPages: number
  currentPage: number
}

export function BlogList({ blogs, totalPages, currentPage }: Props) {
  return (
    <>
      <Heading visuallyHidden>{blog.siteName}</Heading>

      <section className="space-y-12">
        {blogs.map((blog, i) => (
          <BlogItem key={i} blog={blog} />
        ))}
      </section>

      <div className="mt-20 flex justify-center empty:mt-0 md:justify-start">
        <Pagination totalPages={totalPages} currentPage={currentPage} path={path.blog} />
      </div>
    </>
  )
}
