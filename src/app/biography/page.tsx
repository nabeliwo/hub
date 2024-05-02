import { Profile } from '@/components/page/Profile'
import { profile } from '@/constants/meta'
import { path } from '@/constants/path'
import { getPage } from '@/services/profile'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const url = `${profile.url}${path.biography}`

  return {
    title: `Biography | ${profile.siteName}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      url,
    },
  }
}

export default async function Biography() {
  const { content } = await getPage('biography')
  return <Profile title="Biography" content={content} />
}
