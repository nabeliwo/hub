import { Header } from '@/components/layout/Header'
import { Nav } from '@/components/layout/Nav'
import { profile } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: profile.siteName,
  description: profile.description,
  openGraph: {
    title: profile.siteName,
    description: profile.description,
    siteName: profile.siteName,
    type: 'website',
    url: profile.url,
    images: '', // TODO
  },
  twitter: {
    card: 'summary_large_image', // 1200px × 630px
    creator: 'nabeliwo',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body className="p-4 pb-12 font-body leading-8 tracking-wide text-black md:p-12">
        <Header />

        <div className="mt-6 flex gap-12 md:mt-12">
          <Nav />
          <main className="max-w-2xl">{children}</main>
        </div>
      </body>
    </html>
  )
}
