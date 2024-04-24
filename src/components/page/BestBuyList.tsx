import { bestBuy } from '@/constants/meta'
import { path } from '@/constants/path'

import { Heading } from '../ui/Heading'

export function BestBuyList() {
  const item = (
    <li className="w-1/2">
      <a
        href={path.bestBuyItem('hoge')}
        className="group relative flex h-96 items-center justify-center rounded-2xl bg-grey-bestbuy"
      >
        <img
          className="transition-transform group-hover:scale-105"
          src="/images/best-buy/2024/azura_y2k_series.png"
          width="80%"
          height="80%"
          alt=""
        />

        <p className="absolute bottom-4 left-4 leading-none">AZURA Y2K Series「Space Travel」</p>
      </a>
    </li>
  )
  return (
    <>
      <Heading visuallyHidden>{bestBuy.siteName}</Heading>

      <ul className="flex flex-wrap">
        {item}
        {item}
      </ul>
    </>
  )
}
