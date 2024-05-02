import { notFound } from 'next/navigation'

import { WeeklyList } from '@/components/page/WeeklyList'
import { weekly } from '@/constants/meta'
import { getWeeklies } from '@/services/weekly'
import { paginate, range } from '@/util/pageHelper'

import type { Metadata, ResolvingMetadata } from 'next'

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

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${weekly.url}/${params.page}`

  return {
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Weekly({ params }: Props) {
  const weeklies = await getWeeklies()
  const { items, totalPages, currentPage, error } = paginate(weeklies, params.page)

  if (error) {
    return notFound()
  }

  return <WeeklyList weeklies={items} totalPages={totalPages} currentPage={currentPage} />
}
