import { notFound } from 'next/navigation'

import { BestBuyDetailDialog } from '@/components/page/BestBuyDetailDialog'
import { getBestBuy } from '@/services/bestBuy'

type Props = {
  params: {
    slug: string[]
  }
}

export default async function BestBuyDetailDialogPage({ params }: Props) {
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return notFound()
  }

  return <BestBuyDetailDialog bestBuy={bestBuyData} />
}
