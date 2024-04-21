import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Heading } from '@/components/ui/Heading'
import { getPage } from '@/services/profile'

import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const parentMetadata = await parent
  const title = 'Mission | ' + parentMetadata.title?.absolute

  return {
    title,
    openGraph: {
      title,
    },
  }
}

export default async function Mission() {
  const { content } = await getPage('mission')

  return (
    <>
      <Heading>Mission</Heading>

      <div className="mt-8">
        <PostWrapper>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </PostWrapper>
      </div>
    </>
  )
}
