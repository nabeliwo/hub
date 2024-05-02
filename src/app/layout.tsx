import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense, type PropsWithChildren, type ReactNode } from 'react'

import GoogleAnalytics from '@/components/functional/GoogleAnalytics'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Nav } from '@/components/layout/Nav'
import { profile } from '@/constants/meta'
import { hasGaTagId } from '@/lib/gtag'

import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: profile.siteName,
  description: profile.description,
  alternates: {
    canonical: profile.url,
  },
  openGraph: {
    siteName: profile.siteName,
    type: 'website',
    url: profile.url,
    images: `${profile.url}/images/og-image/hub.png`,
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
      {hasGaTagId && (
        <head>
          <Suspense>
            <GoogleAnalytics />
          </Suspense>
        </head>
      )}

      <body className="font-body tracking-wide text-black">
        <Header />

        <div className="px-4 pb-16 pt-8 md:p-12 md:pb-20">
          <div className="mx-auto flex max-w-4xl gap-16">
            <Nav />
            <main className="flex-1">{children}</main>
          </div>
        </div>

        <Footer />

        {dialog}

        <SpeedInsights />
      </body>
    </html>
  )
}
