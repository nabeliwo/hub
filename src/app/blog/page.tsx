import { getBlogs } from '@/services/blog'

export default async function Blog() {
  const blogs = await getBlogs()

  console.log(blogs)

  return <p>Blog</p>
}
