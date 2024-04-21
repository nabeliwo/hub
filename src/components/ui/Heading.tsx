import classNames from 'classnames'

import type { PropsWithChildren } from 'react'

type Props = {
  visuallyHidden?: boolean
}

export function Heading({ visuallyHidden = false, children }: PropsWithChildren<Props>) {
  return (
    <h1
      className={classNames('text-3xl leading-[3rem]', {
        'fixed top-0 left-0 w-[4px] h-[4px] opacity-0 overflow-hidden border-none m-0 p-0 block visible':
          visuallyHidden,
      })}
    >
      {children}
    </h1>
  )
}
