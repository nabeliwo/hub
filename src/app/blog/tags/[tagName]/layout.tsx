import { tagMap } from '@/services/blog'

import type { Metadata, ResolvingMetadata } from 'next'
import type { PropsWithChildren } from 'react'

type Props = {
  params: {
    tagName: keyof typeof tagMap
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = `タグが「${tagMap[params.tagName]}」の記事一覧 | ${parentMetadata.title?.absolute}`
  const description = `タグが「${tagMap[params.tagName]}」の記事一覧です。`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default function TagDetailLayout({ children }: PropsWithChildren) {
  return children
}
