import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Heading } from '@/components/ui/Heading'
import { getSingleMd } from '@/utils/markdown'

export default async function Philosophy() {
  const { content } = await getSingleMd('content/profile/philosophy.md')

  return (
    <>
      <Heading>Philosophy</Heading>

      <div className="mt-8">
        <PostWrapper>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </PostWrapper>
      </div>
    </>
  )
}
