import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap } from '@/services/blog'

import { Heading } from '../ui/Heading'
import { TextLink } from '../ui/TextLink'

type Props = {
  countMap: { [key: string]: number }
}

export function CategoryList({ countMap }: Props) {
  return (
    <>
      <Heading>{blog.siteName} のカテゴリ一覧</Heading>

      <ul className="mt-8 flex flex-wrap gap-4">
        {Object.entries(categoryMap).map(([key, value], i) => {
          return (
            <li key={i}>
              <TextLink href={path.blogCategoryItem(key)}>
                {value} ({countMap[key]})
              </TextLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}
