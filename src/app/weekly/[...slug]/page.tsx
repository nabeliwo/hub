import { notFound } from 'next/navigation'

import { WeeklyDetail } from '@/components/page/WeeklyDetail'
import { profile, weekly } from '@/constants/meta'
import { path } from '@/constants/path'
import { getWeeklies, getWeekly } from '@/services/weekly'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {
  const weeklies = await getWeeklies()

  return weeklies.map((weekly) => ({
    slug: weekly.slug.slice(1).split('/'),
  }))
}

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
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
      images: {
        url: `${profile.url}${path.api.ogImage({ siteName: weekly.siteName, title: weeklyData.title })}`,
        width: 1200,
        height: 630,
      },
    },
  }
}

export default async function WeeklyDetailPage(props: Props) {
  const params = await props.params
  const pathname = params.slug.join('/')
  const weeklyData = await getWeekly(pathname)

  if (!weeklyData) {
    return notFound()
  }

  return <WeeklyDetail weekly={weeklyData} />
}
