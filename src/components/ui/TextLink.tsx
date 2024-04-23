import Link from 'next/link'

import type { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
  href: string
  target?: string
  rel?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function TextLink({ href, target, rel, onClick, children }: PropsWithChildren<Props>) {
  return (
    <Link href={href} className="underline hover:no-underline" target={target} rel={rel} onClick={onClick}>
      {children}
    </Link>
  )
}
