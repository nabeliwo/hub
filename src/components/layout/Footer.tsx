'use client'

import { usePathname } from 'next/navigation'

import { getFooterRSSLink } from '@/util/pageHelper'

import { TextLink } from '../ui/TextLink'

export function Footer() {
  const pathname = usePathname()
  const rssLink = getFooterRSSLink(pathname)

  return (
    <footer className="flex justify-between border-t border-grey-border p-4 md:p-12">
      <p>© nabeliwo</p>

      <p>
        {rssLink && (
          <>
            <TextLink href={rssLink.path}>{rssLink.label} RSS</TextLink> /{' '}
          </>
        )}

        <TextLink href="https://github.com/nabeliwo/hub" target="_blank" rel="noopener noreferrer">
          GitHub
        </TextLink>
      </p>
    </footer>
  )
}
