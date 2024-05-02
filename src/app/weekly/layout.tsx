import { profile, weekly } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: weekly.siteName,
  description: weekly.description,
  alternates: {
    types: {
      'application/rss+xml': `${profile.url}/rss/weekly/feed.xml`,
    },
    canonical: weekly.url,
  },
  openGraph: {
    siteName: weekly.siteName,
    type: 'article',
    url: weekly.url,
    images: '', // TODO
  },
}

export default function WeeklyLayout({ children }: PropsWithChildren) {
  return children
}
