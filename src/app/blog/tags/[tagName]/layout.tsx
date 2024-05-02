import { blog, profile } from '@/constants/meta'
import { path } from '@/constants/path'
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
  const url = `${profile.url}${path.blogTagItem(params.tagName)}`

  return {
    title: `タグが「${tagMap[params.tagName]}」の記事一覧 | ${blog.siteName}`,
    description: `タグが「${tagMap[params.tagName]}」の記事一覧です。`,
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

export default function TagDetailLayout({ children }: PropsWithChildren) {
  return children
}
