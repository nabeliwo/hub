import { BestBuyList } from '@/components/page/BestBuyList'
import { getBestBuys } from '@/services/bestBuy'

export default async function BestBuy() {
  const bestBuys = await getBestBuys()
  return <BestBuyList bestBuys={bestBuys} />
}
