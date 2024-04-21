'use client'

import { useSearchParams } from 'next/navigation'

import { PaginationControllerItem } from './PaginationControllerItem'
import { PaginationItem } from './PaginationItem'

type Props = {
  totalPages: number
  currentPage: number
  path: string
}

export function Pagination({ totalPages, currentPage, path }: Props) {
  const searchParams = useSearchParams()

  if (totalPages <= 1) {
    return null
  }

  const per = searchParams.get('per')
  const perParam = per ? `&per=${per}` : ''

  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <PaginationControllerItem
            href={`${path}?page=1${perParam}`}
            direction="prev"
            disabled={currentPage === 1}
            double
          />
        </li>
        <li>
          <PaginationControllerItem
            href={`${path}?page=${currentPage - 1}${perParam}`}
            direction="prev"
            disabled={currentPage === 1}
          />
        </li>

        {[currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
          .filter((page) => page >= 1 && page <= totalPages)
          .map((page) => (
            <li key={page}>
              <PaginationItem href={`${path}?page=${page}${perParam}`} current={currentPage === page}>
                {page}
              </PaginationItem>
            </li>
          ))}

        <li>
          <PaginationControllerItem
            href={`${path}?page=${currentPage + 1}${perParam}`}
            direction="next"
            disabled={currentPage === totalPages}
          />
        </li>
        <li>
          <PaginationControllerItem
            href={`${path}?page=${totalPages}${perParam}`}
            direction="next"
            disabled={currentPage === totalPages}
            double
          />
        </li>
      </ul>
    </nav>
  )
}
