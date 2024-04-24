import { bestBuy } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: bestBuy.siteName,
  description: bestBuy.description,
  openGraph: {
    title: bestBuy.siteName,
    description: bestBuy.description,
    siteName: bestBuy.siteName,
    url: bestBuy.url,
    images: '', // TODO
  },
}

export default function BestBuyLayout({ children }: PropsWithChildren) {
  return children
}
