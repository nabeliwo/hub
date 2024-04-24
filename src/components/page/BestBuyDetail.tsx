import type { BestBuy } from '@/services/bestBuy'

import { HtmlContent } from '../shared/HtmlContent'
import { Datetime } from '../ui/Datetime'
import { Heading } from '../ui/Heading'

type Props = {
  bestBuy: BestBuy
}

export function BestBuyDetail({ bestBuy }: Props) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm text-grey-text">
        <Datetime>{bestBuy.date}</Datetime>
      </p>

      <Heading>{bestBuy.title}</Heading>

      {bestBuy.image && (
        <div className="relative mt-8 w-full rounded-2xl bg-grey-bestbuy pt-[100%]">
          <img className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" src={bestBuy.image} alt="" />
        </div>
      )}

      <div className="mt-12">
        <HtmlContent>{bestBuy.content}</HtmlContent>
      </div>
    </div>
  )
}
