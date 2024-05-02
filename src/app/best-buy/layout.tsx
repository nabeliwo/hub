import { bestBuy, profile } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: bestBuy.siteName,
  description: bestBuy.description,
  alternates: {
    types: {
      'application/rss+xml': `${profile.url}/rss/best-buy/feed.xml`,
    },
    canonical: bestBuy.url,
  },
  openGraph: {
    siteName: bestBuy.siteName,
    type: 'article',
    url: bestBuy.url,
    images: '', // TODO
  },
}

export default function BestBuyLayout({ children }: PropsWithChildren) {
  return children
}
