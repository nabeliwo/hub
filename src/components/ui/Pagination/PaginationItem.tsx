type Props = {
  href: string
  children: number
  current?: boolean
}

export function PaginationItem({ href, current = false, children }: Props) {
  if (current) {
    return (
      <button
        className="cursor-not-allowed px-2 text-grey-disabled"
        aria-current="page"
        aria-label={`${children}ページ目`}
        disabled
      >
        {children}
      </button>
    )
  }

  return (
    <a className="px-2" href={href} aria-label={`${children}ページ目`}>
      {children}
    </a>
  )
}
