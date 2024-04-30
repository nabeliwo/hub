import { blog } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: blog.siteName,
  description: blog.description,
  openGraph: {
    title: blog.siteName,
    description: blog.description,
    siteName: blog.siteName,
    url: blog.url,
    images: '', // TODO
  },
}

export default function BlogLayout({ children }: PropsWithChildren) {
  return children
}
