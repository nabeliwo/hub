'use client'

import { usePathname } from 'next/navigation'

import { getHeaderInfo } from '@/util/pageHelper'

export function Header() {
  const pathname = usePathname()
  const info = getHeaderInfo(pathname)

  return (
    <header className="border-b border-grey-border p-4 md:p-12">
      <div className="mx-auto max-w-4xl">
        <a href={info.url} className="inline-block bg-blue px-4 leading-8 text-white hover:bg-blue-light">
          {info.title}
        </a>

        <p className="mt-2 text-sm text-grey-text md:pl-4 md:text-base">{info.description}</p>
      </div>
    </header>
  )
}
