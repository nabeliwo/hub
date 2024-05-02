import { blog } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: blog.siteName,
  description: blog.description,
  alternates: {
    canonical: blog.url,
  },
  openGraph: {
    siteName: blog.siteName,
    type: 'article',
    url: blog.url,
    images: '', // TODO
  },
}

export default function BlogLayout({ children }: PropsWithChildren) {
  return children
}
