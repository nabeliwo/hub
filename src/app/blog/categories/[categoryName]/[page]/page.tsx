import { notFound } from 'next/navigation'

import { CategoryBlogList } from '@/components/page/CategoryBlogList'
import { categoryMap, getBlogs } from '@/services/blog'
import { paginate, range } from '@/util/pageHelper'

export async function generateStaticParams() {
  const blogs = await getBlogs()

  return Object.keys(categoryMap).flatMap((category) => {
    const categoryBlogs = blogs.filter((item) => item.category === category)
    const { totalPages } = paginate(categoryBlogs)

    return range(2, totalPages).map((num) => {
      return {
        categoryName: category,
        page: `${num}`,
      }
    })
  })
}

type Props = {
  params: {
    categoryName: keyof typeof categoryMap
    page: string
  }
}

export default async function CategoryBlogs({ params }: Props) {
  const blogs = await getBlogs()
  const categoryBlogs = blogs.filter((item) => item.category === params.categoryName)
  const count = categoryBlogs.length

  if (count === 0) {
    return notFound()
  }

  const { items, totalPages, currentPage, error } = paginate(categoryBlogs, params.page)

  if (error) {
    return notFound()
  }

  return (
    <CategoryBlogList
      categoryName={params.categoryName}
      blogs={items}
      count={count}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  )
}