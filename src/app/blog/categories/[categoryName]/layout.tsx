import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { categoryMap } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'
import type { PropsWithChildren } from 'react'

type Props = {
  params: {
    categoryName: keyof typeof categoryMap
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.blogCategoryItem(params.categoryName)}`

  return {
    title: `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧 | ${blog.siteName}`,
    description: `カテゴリが「${categoryMap[params.categoryName]}」の記事一覧です。`,
    alternates: {
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
