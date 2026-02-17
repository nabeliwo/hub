import { notFound } from 'next/navigation'

import { WeeklyList } from '@/components/page/WeeklyList'
import { profile, weekly } from '@/constants/meta'
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
  params: Promise<{ page: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const parentMetadata = await parent
  const url = `${weekly.url}/${params.page}`

  return {
    alternates: {
      types: {
        'application/rss+xml': `${profile.url}/rss/weekly/feed.xml`,
      },
      canonical: weekly.url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Weekly(props: Props) {
  const params = await props.params
  const weeklies = await getWeeklies()
  const { items, totalPages, currentPage, error } = paginate(weeklies, params.page)

  if (error) {
    return notFound()
  }

  return <WeeklyList weeklies={items} totalPages={totalPages} currentPage={currentPage} />
}
