import { Profile } from '@/components/page/Profile'
import { getPage } from '@/services/profile'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = 'Philosophy | ' + parentMetadata.title?.absolute

  return {
    title,
    openGraph: {
      title,
    },
  }
}

export default async function Philosophy() {
  const { content } = await getPage('philosophy')
  return <Profile title="Philosophy" content={content} />
}
