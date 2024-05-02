import { Profile } from '@/components/page/Profile'
import { profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { getPage } from '@/services/profile'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.philosophy}`

  return {
    title: `Philosophy | ${profile.siteName}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Philosophy() {
  const { content } = await getPage('philosophy')
  return <Profile title="Philosophy" content={content} />
}
