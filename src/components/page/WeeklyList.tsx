import { weekly } from '@/constants/meta'
import { path } from '@/constants/path'
import type { Weekly } from '@/services/weekly'

import { Datetime } from '../ui/Datetime'
import { Heading } from '../ui/Heading'
import { Pagination } from '../ui/Pagination'
import { TextLink } from '../ui/TextLink'

type Props = {
  weeklies: Weekly[]
  totalPages: number
  currentPage: number
}

export function WeeklyList({ weeklies, totalPages, currentPage }: Props) {
  return (
    <>
      <Heading visuallyHidden>{weekly.siteName}</Heading>

      <section className="space-y-12">
        {weeklies.map((weekly, i) => (
          <article key={i}>
            <p className="text-sm text-grey-text">
              <Datetime>{weekly.date}</Datetime>
            </p>

            <h2 className="mt-1 text-2xl">
              <TextLink href={path.weeklyItem(weekly.slug)}>{weekly.title}</TextLink>
            </h2>

            <p className="mt-2">{weekly.description}</p>
          </article>
        ))}
      </section>

      <div className="mt-20 flex justify-center empty:mt-0 md:justify-start">
        <Pagination totalPages={totalPages} currentPage={currentPage} path={path.weekly} />
      </div>
    </>
  )
}
