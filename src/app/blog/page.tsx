import { TextLink } from '@/components/ui/TextLink'
import { getBlogs } from '@/services/blog'
import { paginate } from '@/utils/pagination'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Blog({ searchParams }: Props) {
  const blogs = await getBlogs()
  const { items } = paginate(blogs, searchParams)

  return (
    <section className="space-y-4">
      {items.map((blog, i) => (
        <article key={i}>
          <h2>
            <TextLink href={`/blog${blog.slug}`}>{blog.title}</TextLink>
          </h2>

          <p>
            <span>{blog.date}</span>
            <span>{blog.category}</span>
            <span>{blog.tags.join(', ')}</span>
          </p>
        </article>
      ))}
    </section>
  )
}
