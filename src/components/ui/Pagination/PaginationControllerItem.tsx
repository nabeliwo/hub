import { ChevronDoubleLeftIcon } from '../icon/ChevronDoubleLeftIcon'
import { ChevronDoubleRightIcon } from '../icon/ChevronDoubleRightIcon'
import { ChevronLeftIcon } from '../icon/ChevronLeftIcon'
import { ChevronRightIcon } from '../icon/ChevronRightIcon'

type GetIconPropsArg = {
  direction: 'prev' | 'next'
  double?: boolean
}

type Props = GetIconPropsArg & {
  href: string
  disabled?: boolean
}

function getIconProps({ direction, double = false }: GetIconPropsArg) {
  if (direction === 'prev') {
    if (double) {
      return {
        Icon: ChevronDoubleLeftIcon,
        alt: '最初へ',
      }
    }

    return {
      Icon: ChevronLeftIcon,
      alt: '前へ',
    }
  }

  if (double) {
    return {
      Icon: ChevronDoubleRightIcon,
      alt: '最後へ',
    }
  }

  return {
    Icon: ChevronRightIcon,
    alt: '次へ',
  }
}

export function PaginationControllerItem({ href, disabled = false, direction, double = false }: Props) {
  const { Icon, alt } = getIconProps({ direction, double })

  if (disabled) {
    return (
      <button className="cursor-not-allowed text-grey-disabled" disabled>
        <Icon alt={alt} />
      </button>
    )
  }

  return (
    <a href={href}>
      <Icon alt={alt} />
    </a>
  )
}
