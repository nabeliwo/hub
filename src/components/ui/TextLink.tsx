import type { PropsWithChildren } from 'react'

type Props = {
  href: string
}

export function TextLink({ href, children }: PropsWithChildren<Props>) {
  return (
    <a href={href} className="underline hover:no-underline">
      {children}
    </a>
  )
}
