import { BlogItem } from '@/components/model/blog/BlogItem'
import { Heading } from '@/components/ui/Heading'
import { Pagination } from '@/components/ui/Pagination'
import { path } from '@/constants/path'
import { categoryMap, getBlogs } from '@/services/blog'
import { paginate } from '@/util/pagination'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: {
    categoryName: keyof typeof categoryMap
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧 | ${parentMetadata.title?.absolute}`
  const description = `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧です。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default async function CategoryBlogs({ params, searchParams }: Props) {
  const blogs = await getBlogs()
  const categoryBlogs = blogs.filter((item) => item.category === params.categoryName)
  const count = categoryBlogs.length
  const { items, totalPages, currentPage } = paginate(categoryBlogs, searchParams)

  return (
    <>
      <Heading>
        カテゴリが「{categoryMap[params.categoryName]}」の記事一覧 ({count}件)
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
          path={path.blogCategoryItem(params.categoryName)}
        />
      </div>
    </>
  )
}
