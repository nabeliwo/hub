import { blog } from '@/constants/meta'
import { path } from '@/constants/path'
import { tagMap } from '@/services/blog'

import { Heading } from '../ui/Heading'
import { TextLink } from '../ui/TextLink'

type Props = {
  countMap: { [key: string]: number }
}

export function TagList({ countMap }: Props) {
  return (
    <>
      <Heading>{blog.siteName} のタグ一覧</Heading>

      <ul className="mt-8 flex flex-wrap gap-4">
        {Object.entries(tagMap).map(([key, value], i) => {
          return (
            <li key={i}>
              <TextLink href={path.blogTagItem(key)}>
                {value} ({countMap[key]})
              </TextLink>
            </li>
          )
        })}
      </ul>
    </>
  )
}
