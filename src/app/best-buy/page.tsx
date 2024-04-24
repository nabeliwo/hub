import { BestBuyList } from '@/components/page/BestBuyList'
import { generateBestBuyRssFeed, getBestBuys } from '@/services/bestBuy'

export default async function BestBuy() {
  const bestBuys = await getBestBuys()

  await generateBestBuyRssFeed(bestBuys)

  return <BestBuyList bestBuys={bestBuys} />
}
