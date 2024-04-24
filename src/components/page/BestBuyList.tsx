import { bestBuy } from '@/constants/meta'
import { path } from '@/constants/path'
import type { BestBuy } from '@/services/bestBuy'

import { Heading } from '../ui/Heading'

type Props = {
  bestBuys: BestBuy[]
}

export function BestBuyList({ bestBuys }: Props) {
  return (
    <>
      <Heading visuallyHidden>{bestBuy.siteName}</Heading>

      <div className="flex flex-wrap gap-4">
        {bestBuys.map((bestBuy, i) => (
          <article
            key={i}
            className="w-full max-w-[590px] sm:w-best-buy-half lg:w-best-buy-one-third xl:w-best-buy-one-fourth"
          >
            <a
              href={path.bestBuyItem(bestBuy.slug)}
              className="group relative block w-full rounded-2xl bg-grey-bestbuy pt-[100%]"
            >
              <img
                className="absolute inset-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-105"
                src={bestBuy.image}
                width="80%"
                height="80%"
                alt=""
              />

              <p className="absolute bottom-4 left-0 z-20 bg-white/70 px-4 py-2 text-sm">{bestBuy.title}</p>
            </a>
          </article>
        ))}
      </div>
    </>
  )
}
