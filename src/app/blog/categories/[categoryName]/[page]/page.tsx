import { notFound } from 'next/navigation'

import { CategoryBlogList } from '@/components/page/CategoryBlogList'
import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap, getBlogs } from '@/services/blog'
import { paginate, range } from '@/util/pageHelper'

import type { Metadata, ResolvingMetadata } from 'next'

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
  params: Promise<{
    categoryName: keyof typeof categoryMap
    page: string
  }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const parentMetadata = await parent
  const url = `${profile.url}${path.blogCategoryItem(params.categoryName)}/${params.page}`

  return {
    title: `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧 (${params.page}ページ目) | ${blog.siteName}`,
    description: `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧の${params.page}ページ目です。`,
    alternates: {
      types: {
        ...parentMetadata.alternates?.types,
      },
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function CategoryBlogs(props: Props) {
  const params = await props.params
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
