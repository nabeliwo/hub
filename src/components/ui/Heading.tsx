import type { PropsWithChildren } from 'react'

export function Heading({ children }: PropsWithChildren) {
  return <h1 className="text-3xl leading-[3rem]">{children}</h1>
}
