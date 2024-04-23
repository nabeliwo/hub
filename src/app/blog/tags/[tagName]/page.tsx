import { BlogItem } from '@/components/model/blog/BlogItem'
import { Heading } from '@/components/ui/Heading'
import { Pagination } from '@/components/ui/Pagination'
import { path } from '@/constants/path'
import { tagMap, getBlogs } from '@/services/blog'
import { paginate } from '@/util/pagination'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: {
    tagName: keyof typeof tagMap
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = `タグが「${tagMap[params.tagName]}」の記事一覧 | ${parentMetadata.title?.absolute}`
  const description = `タグが「${tagMap[params.tagName]}」の記事一覧です。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default async function TagBlogs({ params, searchParams }: Props) {
  const blogs = await getBlogs()
  const tagBlogs = blogs.filter((item) => item.tags.includes(params.tagName))
  const count = tagBlogs.length
  const { items, totalPages, currentPage } = paginate(tagBlogs, searchParams)

  return (
    <>
      <Heading>
        タグが「{tagMap[params.tagName]}」の記事一覧 ({count}件)
      </Heading>

      <section className="mt-8 space-y-12">
        {items.map((blog, i) => (
          <BlogItem key={i} blog={blog} />
        ))}
      </section>

      <div className="mt-20 flex justify-center empty:mt-0 md:justify-start">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          path={path.blogTagItem(params.tagName)}
        />
      </div>
    </>
  )
}
