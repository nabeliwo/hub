import { notFound } from 'next/navigation'

import { CategoryBlogList } from '@/components/page/CategoryBlogList'
import { categoryMap, getBlogs } from '@/services/blog'
import { paginate } from '@/util/pageHelper'

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((category) => ({
    categoryName: category,
  }))
}

type Props = {
  params: Promise<{
    categoryName: keyof typeof categoryMap
  }>
}

export default async function CategoryBlogs(props: Props) {
  const params = await props.params
  const blogs = await getBlogs()
  const categoryBlogs = blogs.filter((item) => item.category === params.categoryName)
  const count = categoryBlogs.length

  if (count === 0) {
    return notFound()
  }

  const { items, totalPages, currentPage } = paginate(categoryBlogs, '1')

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
