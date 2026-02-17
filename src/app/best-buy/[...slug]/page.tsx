import { notFound } from 'next/navigation'

import { BestBuyDetail } from '@/components/page/BestBuyDetail'
import { bestBuy, profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { getBestBuy, getBestBuys } from '@/services/bestBuy'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const bestBuys = await getBestBuys()

  return bestBuys.map((bestBuy) => ({
    slug: bestBuy.slug.slice(1).split('/'),
  }))
}

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return {}
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
      images: {
        url: `${profile.url}${path.api.ogImage({ siteName: bestBuy.siteName, title: bestBuyData.title, image: bestBuyData.image })}`,
        width: 1200,
        height: 630,
      },
    },
  }
}

export default async function BestBuyDetailPage(props: Props) {
  const params = await props.params
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return notFound()
  }

  return <BestBuyDetail bestBuy={bestBuyData} />
}
