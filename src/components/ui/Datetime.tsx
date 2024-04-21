import { format, parseISO } from 'date-fns'

type Props = {
  children: string
  formatString?: string
}

export function Datetime({ children, formatString = 'yyyy-MM-dd' }: Props) {
  const date = parseISO(children)
  return <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, formatString)}</time>
}
