import { Profile } from '@/components/page/Profile'
import { getPage } from '@/services/profile'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = 'Biography | ' + parentMetadata.title?.absolute

  return {
    title,
    openGraph: {
      title,
    },
  }
}

export default async function Biography() {
  const { content } = await getPage('biography')
  return <Profile title="Biography" content={content} />
}
