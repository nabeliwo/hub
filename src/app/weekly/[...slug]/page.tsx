import { WeeklyDetail } from '@/components/page/WeeklyDetail'
import { weekly } from '@/constants/meta'
import { getWeeklies, getWeekly } from '@/services/weekly'

import type { Metadata } from 'next'

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pathname = params.slug.join('/')
  const weeklyData = await getWeekly(pathname)
  const title = `${weeklyData.title} | ${weekly.siteName}`

  return {
    title,
    description: weeklyData.description,
    openGraph: {
      title,
      description: weeklyData.description,
      siteName: weekly.siteName,
      type: 'article',
      url: `${weekly.url}/${pathname}`,
      images: '', // TODO
    },
  }
}

export default async function WeeklyDetailPage({ params }: Props) {
  const pathname = params.slug.join('/')
  const weekly = await getWeekly(pathname)

  return <WeeklyDetail weekly={weekly} />
}
