import Link from 'next/link'

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
          <article key={i} className="w-full sm:w-best-buy-half">
            <Link
              href={path.bestBuyItem(bestBuy.slug)}
              className="group relative block w-full rounded-2xl bg-grey-bestbuy pt-[100%]"
              scroll={false}
            >
              <img
                className="absolute inset-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-105"
                src={bestBuy.image}
                alt={bestBuy.alt}
                width="90%"
                height="auto"
              />

              <p className="absolute bottom-4 left-0 z-20 bg-white/70 px-4 py-2 text-sm">{bestBuy.title}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}
