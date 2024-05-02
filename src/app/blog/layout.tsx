import { blog, profile } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: blog.siteName,
  description: blog.description,
  alternates: {
    types: {
      'application/rss+xml': `${profile.url}/rss/blog/feed.xml`,
    },
    canonical: blog.url,
  },
  openGraph: {
    siteName: blog.siteName,
    type: 'article',
    url: blog.url,
    images: `${profile.url}/images/og-image/blog.png`,
  },
}

export default function BlogLayout({ children }: PropsWithChildren) {
  return children
}
