import { Profile } from '@/components/page/Profile'
import { profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { getPage } from '@/services/profile'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.mission}`

  return {
    title: `Mission | ${profile.siteName}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Mission() {
  const { content } = await getPage('mission')
  return <Profile title="Mission" content={content} />
}
