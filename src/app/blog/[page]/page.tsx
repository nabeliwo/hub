import { BlogList } from '@/components/page/BlogList'
import { getBlogs } from '@/services/blog'
import { paginate, range } from '@/util/pageHelper'

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
  params: { page: string }
}

export default async function Blog({ params }: Props) {
  const blogs = await getBlogs()
  const { items, totalPages, currentPage } = paginate(blogs, params.page)

  return <BlogList blogs={items} totalPages={totalPages} currentPage={currentPage} />
}
