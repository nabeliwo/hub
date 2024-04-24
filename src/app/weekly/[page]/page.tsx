import { notFound } from 'next/navigation'

import { WeeklyList } from '@/components/page/WeeklyList'
import { getWeeklies } from '@/services/weekly'
import { paginate, range } from '@/util/pageHelper'

export async function generateStaticParams() {
  const weeklies = await getWeeklies()
  const { totalPages } = paginate(weeklies)

  return range(2, totalPages).map((num) => {
    return {
      page: `${num}`,
    }
  })
}

type Props = {
  params: { page: string }
}

export default async function Weekly({ params }: Props) {
  const weeklies = await getWeeklies()
  const { items, totalPages, currentPage, error } = paginate(weeklies, params.page)

  if (error) {
    return notFound()
  }

  return <WeeklyList weeklies={items} totalPages={totalPages} currentPage={currentPage} />
}
