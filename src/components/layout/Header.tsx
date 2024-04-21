'use client'

import { usePathname } from 'next/navigation'

import { getHeaderInfo } from '@/utils/helper'

export function Header() {
  const pathname = usePathname()
  const info = getHeaderInfo(pathname)

  return (
    <header className="border-b border-grey-border p-4 md:p-12">
      <a
        href={info.url}
        className="mb-4 inline-block bg-blue px-4 leading-8 text-white hover:bg-blue-light md:mb-2"
      >
        {info.title}
      </a>

      <p className="hidden pl-4 text-grey-text md:block">{info.description}</p>

      <details className="bg-grey-bg px-4 py-2 text-sm md:hidden">
        <summary>The {info.title} is...</summary>
        <p className="mt-2 pb-2 leading-5">{info.description}</p>
      </details>
    </header>
  )
}
