import { notFound } from 'next/navigation'

import { BestBuyDetail } from '@/components/page/BestBuyDetail'
import { bestBuy } from '@/constants/meta'
import { getBestBuy, getBestBuys } from '@/services/bestBuy'

import type { Metadata } from 'next'

export async function generateStaticParams() {
  const bestBuys = await getBestBuys()

  return bestBuys.map((bestBuy) => ({
    slug: bestBuy.slug.slice(1).split('/'),
  }))
}

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return notFound()
  }

  const title = `${bestBuyData.title} | ${bestBuy.siteName}`

  return {
    title,
    description: bestBuyData.description,
    openGraph: {
      title,
      description: bestBuyData.description,
      siteName: bestBuy.siteName,
      type: 'article',
      url: `${bestBuy.url}/${pathname}`,
      images: '', // TODO
    },
  }
}

export default async function BestBuyDetailPage({ params }: Props) {
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return notFound()
  }

  return <BestBuyDetail bestBuy={bestBuyData} />
}
