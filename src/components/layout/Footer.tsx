'use client'

import { usePathname } from 'next/navigation'

import { getFooterRSSLink } from '@/util/pageHelper'

import { TextLink } from '../ui/TextLink'

export function Footer() {
  const pathname = usePathname()
  const rssLink = getFooterRSSLink(pathname)

  return (
    <footer className="border-t border-grey-border p-4 md:p-12">
      <div className="mx-auto flex max-w-4xl justify-between">
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
      </div>
    </footer>
  )
}
