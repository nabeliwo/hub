import { notFound } from 'next/navigation'

import { WeeklyDetail } from '@/components/page/WeeklyDetail'
import { profile, weekly } from '@/constants/meta'
import { getWeeklies, getWeekly } from '@/services/weekly'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const weeklies = await getWeeklies()

  return weeklies.map((weekly) => ({
    slug: weekly.slug.slice(1).split('/'),
  }))
}

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const pathname = params.slug.join('/')
  const weeklyData = await getWeekly(pathname)

  if (!weeklyData) {
    return {}
  }

  const parentMetadata = await parent
  const url = `${weekly.url}/${pathname}`

  return {
    title: `${weeklyData.title} | ${weekly.siteName}`,
    description: weeklyData.description,
    alternates: {
      types: {
        'application/rss+xml': `${profile.url}/rss/weekly/feed.xml`,
      },
      canonical: weekly.url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
      images: '', // TODO
    },
  }
}

export default async function WeeklyDetailPage({ params }: Props) {
  const pathname = params.slug.join('/')
  const weeklyData = await getWeekly(pathname)

  if (!weeklyData) {
    return notFound()
  }

  return <WeeklyDetail weekly={weeklyData} />
}
