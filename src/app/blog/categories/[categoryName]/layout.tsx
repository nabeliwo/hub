import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'
import type { PropsWithChildren } from 'react'

type Props = {
  params: Promise<{
    categoryName: keyof typeof categoryMap
  }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const parentMetadata = await parent
  const url = `${profile.url}${path.blogCategoryItem(params.categoryName)}`

  return {
    title: `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧 | ${blog.siteName}`,
    description: `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧です。`,
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

export default function CategoryDetailLayout({ children }: PropsWithChildren) {
  return children
}
