import { path } from '@/constants/path'
import { categoryMap } from '@/services/blog'
import type { Blog } from '@/services/blog/types'

import { BlogItem } from '../model/blog/BlogItem'
import { Heading } from '../ui/Heading'
import { Pagination } from '../ui/Pagination'
import { TextLink } from '../ui/TextLink'

type Props = {
  categoryName: keyof typeof categoryMap
  blogs: Blog[]
  count: number
  totalPages: number
  currentPage: number
}

export function CategoryBlogList({ categoryName, blogs, count, totalPages, currentPage }: Props) {
  return (
    <>
      <TextLink href={path.blogCategories}>すべてのカテゴリ一覧を見る</TextLink>

      <Heading className="mt-2">
        カテゴリが「{categoryMap[categoryName]}」の記事一覧 ({count}件)
      </Heading>

      <section className="mt-12 space-y-12">
        {blogs.map((blog, i) => (
          <BlogItem key={i} blog={blog} />
        ))}
      </section>

      <div className="mt-20 flex justify-center empty:mt-0 md:justify-start">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          path={path.blogCategoryItem(categoryName)}
        />
      </div>
    </>
  )
}
