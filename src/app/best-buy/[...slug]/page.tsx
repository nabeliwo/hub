import { notFound } from 'next/navigation'

import { BestBuyDetail } from '@/components/page/BestBuyDetail'
import { bestBuy } from '@/constants/meta'
import { getBestBuy, getBestBuys } from '@/services/bestBuy'

import type { Metadata, ResolvingMetadata } from 'next'

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

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return notFound()
  }

  const parentMetadata = await parent
  const url = `${bestBuy.url}/${pathname}`

  return {
    title: `${bestBuyData.title} | ${bestBuy.siteName}`,
    description: bestBuyData.description,
    alternates: {
      types: {
        ...parentMetadata.alternates?.types,
      },
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
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
