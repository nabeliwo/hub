'use client'

import { usePathname } from 'next/navigation'

import { navigationMap } from '@/constants/path'
import { matchNavItem } from '@/utils/helper'

import { TextLink } from '../ui/TextLink'
import { BarsIcon } from '../ui/icon/Bars'

export function Nav() {
  const pathname = usePathname()
  const items = navigationMap.map((menu) => (
    <section key={menu.category}>
      <h2 className="mb-2 text-xl md:mb-4">{menu.category}</h2>

      <ul>
        {menu.items.map((item) => (
          <li key={`${menu.category}-${item.label}`} className="relative pl-4">
            {matchNavItem(item.path, pathname) && <span className="absolute left-0 top-2 h-4 w-1 bg-blue" />}

            <TextLink href={item.path}>{item.label}</TextLink>
          </li>
        ))}
      </ul>
    </section>
  ))

  return (
    <>
      <nav className="hidden md:block">
        <details open>
          <summary className="w-20 cursor-pointer">Menu</summary>
          <div className="w-28 space-y-8 py-4">{items}</div>
        </details>
      </nav>

      <nav className="fixed right-4 top-4 z-10 md:hidden">
        <details>
          <summary className="list-none text-right">
            <div className="inline-flex size-8 items-center justify-center bg-blue">
              <BarsIcon />
            </div>
          </summary>

          <div className="space-y-4 bg-white px-6 py-4 shadow-2xl">{items}</div>
        </details>
      </nav>
    </>
  )
}
