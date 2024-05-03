'use client'

import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { navigationMap } from '@/constants/path'
import { matchNavItem } from '@/util/pageHelper'

import { TextLink } from '../ui/TextLink'
import { BarsIcon } from '../ui/icon/BarsIcon'

export function Nav() {
  const pathname = usePathname()
  const spSummaryRef = useRef<HTMLElement | null>(null)

  const handleClickLink = () => {
    if (spSummaryRef.current) {
      spSummaryRef.current.click()
    }
  }

  const items = navigationMap.map((menu) => (
    <section key={menu.category}>
      <h2 className="mb-2 text-xl md:mb-4">{menu.category}</h2>

      <ul className="leading-8">
        {menu.items.map((item) => (
          <li key={`${menu.category}-${item.label}`} className="relative pl-4">
            {matchNavItem(item.path, pathname) && <span className="absolute left-0 top-2 h-4 w-1 bg-blue" />}
            <TextLink href={item.path} onClick={() => handleClickLink()}>
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  ))

  return (
    <>
      <nav className="sticky top-0 -mt-4 hidden self-start pt-4 md:block">
        <details open className="">
          <summary className="w-20 cursor-pointer">Menu</summary>
          <div className="w-28 space-y-8 py-4">{items}</div>
        </details>
      </nav>

      <nav className="fixed right-4 top-4 z-50 md:hidden">
        <details>
          <summary className="list-none text-right" ref={spSummaryRef}>
            <div className="inline-flex size-8 items-center justify-center bg-blue text-white">
              <BarsIcon alt="Menu" />
            </div>
          </summary>

          <div className="space-y-4 bg-white px-8 py-6 shadow-2xl">{items}</div>
        </details>
      </nav>
    </>
  )
}
