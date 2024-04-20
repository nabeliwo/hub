import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Heading } from '@/components/ui/Heading'
import { getSingleMd } from '@/utils/markdown'

export default async function Favorite() {
  const { content } = await getSingleMd('content/profile/favorite.md')

  return (
    <>
      <Heading>Favorite</Heading>

      <div className="mt-8">
        <PostWrapper>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </PostWrapper>
      </div>
    </>
  )
}
