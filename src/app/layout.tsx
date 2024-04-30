import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Nav } from '@/components/layout/Nav'
import { profile } from '@/constants/meta'

import type { Metadata } from 'next'
import type { PropsWithChildren, ReactNode } from 'react'

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

type Props = {
  dialog: ReactNode
}

export default function RootLayout({ dialog, children }: PropsWithChildren<Props>) {
  return (
    <html lang="ja">
      <body className="font-body tracking-wide text-black">
        <Header />

        <div className="flex gap-16 px-4 pb-16 pt-8 md:p-12 md:pb-20">
          <Nav />
          <main className="flex-1">{children}</main>
        </div>

        <Footer />

        {dialog}
      </body>
    </html>
  )
}
