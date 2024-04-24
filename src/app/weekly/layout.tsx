import { weekly } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: weekly.siteName,
  description: weekly.description,
  openGraph: {
    title: weekly.siteName,
    description: weekly.description,
    siteName: weekly.siteName,
    url: weekly.url,
    images: '', // TODO
  },
}

export default function WeeklyLayout({ children }: PropsWithChildren) {
  return children
}
