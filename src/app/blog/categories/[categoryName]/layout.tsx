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

export default function CategoryDetailLayout({ children }: PropsWithChildren) {
  return children
}
