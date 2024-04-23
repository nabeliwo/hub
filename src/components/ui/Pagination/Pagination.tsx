import { PaginationControllerItem } from './PaginationControllerItem'
import { PaginationItem } from './PaginationItem'

type Props = {
  totalPages: number
  currentPage: number
  path: string
}

export function Pagination({ totalPages, currentPage, path }: Props) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <PaginationControllerItem href={path} direction="prev" disabled={currentPage === 1} double />
        </li>
        <li>
          <PaginationControllerItem
            href={currentPage - 1 === 1 ? path : `${path}/${currentPage - 1}`}
            direction="prev"
            disabled={currentPage === 1}
          />
        </li>

        {[currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
          .filter((page) => page >= 1 && page <= totalPages)
          .map((page) => (
            <li key={page}>
              <PaginationItem href={page === 1 ? path : `${path}/${page}`} current={currentPage === page}>
                {page}
              </PaginationItem>
            </li>
          ))}

        <li>
          <PaginationControllerItem
            href={`${path}/${currentPage + 1}`}
            direction="next"
            disabled={currentPage === totalPages}
          />
        </li>
        <li>
          <PaginationControllerItem
            href={`${path}/${totalPages}`}
            direction="next"
            disabled={currentPage === totalPages}
            double
          />
        </li>
      </ul>
    </nav>
  )
}
