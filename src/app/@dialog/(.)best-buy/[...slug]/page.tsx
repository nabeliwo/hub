import { notFound } from 'next/navigation'

import { BestBuyDetailDialog } from '@/components/page/BestBuyDetailDialog'
import { getBestBuy } from '@/services/bestBuy'

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function BestBuyDetailDialogPage(props: Props) {
  const params = await props.params
  const pathname = params.slug.join('/')
  const bestBuyData = await getBestBuy(pathname)

  if (!bestBuyData) {
    return notFound()
  }

  return <BestBuyDetailDialog bestBuy={bestBuyData} />
}
