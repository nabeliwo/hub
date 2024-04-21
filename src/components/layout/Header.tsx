'use client'

import { usePathname } from 'next/navigation'

import { getHeaderInfo } from '@/utils/helper'

export function Header() {
  const pathname = usePathname()
  const info = getHeaderInfo(pathname)

  return (
    <header>
      <a href={info.url} className="mb-4 inline-block bg-blue px-4 text-white hover:bg-blue-light md:mb-2">
        {info.title}
      </a>

      <p className="hidden pl-4 md:block">{info.description}</p>

      <details className="bg-grey px-4 text-sm md:hidden">
        <summary>The {info.title} is...</summary>
        <p>{info.description}</p>
      </details>
    </header>
  )
}
