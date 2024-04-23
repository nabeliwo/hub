import { BlogItem } from '@/components/model/blog/BlogItem'
import { Heading } from '@/components/ui/Heading'
import { Pagination } from '@/components/ui/Pagination'
import { path } from '@/constants/path'
import { getBlogs } from '@/services/blog'
import { paginate } from '@/util/pagination'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Blog({ searchParams }: Props) {
  const blogs = await getBlogs()
  const { items, totalPages, currentPage } = paginate(blogs, searchParams)

  return (
    <>
      <Heading visuallyHidden>nabeliwo blog</Heading>

      <section className="space-y-12">
        {items.map((blog, i) => (
          <BlogItem key={i} blog={blog} />
        ))}
      </section>

      <div className="mt-20 flex justify-center empty:mt-0 md:justify-start">
        <Pagination totalPages={totalPages} currentPage={currentPage} path={path.blog} />
      </div>
    </>
  )
}
