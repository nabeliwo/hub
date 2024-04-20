import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Heading } from '@/components/ui/Heading'
import { getSingleMd } from '@/utils/markdown'

export default async function Biography() {
  const { content } = await getSingleMd('content/profile/biography.md')

  return (
    <>
      <Heading>Biography</Heading>

      <div className="mt-8">
        <PostWrapper>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </PostWrapper>
      </div>
    </>
  )
}
