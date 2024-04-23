import { BlogList } from '@/components/page/BlogList'
import { getBlogs } from '@/services/blog'
import { paginate } from '@/util/pageHelper'

export default async function Blog() {
  const blogs = await getBlogs()
  const { items, totalPages, currentPage } = paginate(blogs, '1')

  return <BlogList blogs={items} totalPages={totalPages} currentPage={currentPage} />
}
