import Link from 'next/link'

import type { PropsWithChildren } from 'react'

type Props = {
  href: string
  target?: string
  rel?: string
}

export function TextLink({ href, target, rel, children }: PropsWithChildren<Props>) {
  return (
    <Link href={href} className="underline hover:no-underline" target={target} rel={rel}>
      {children}
    </Link>
  )
}
