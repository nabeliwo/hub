import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Heading } from '@/components/ui/Heading'
import { NabeliwoIcon } from '@/components/ui/icon/NabeliwoIcon'
import { getSingleMd } from '@/utils/markdown'

export default async function AboutMe() {
  const { content } = await getSingleMd('content/profile/aboutMe.md')

  return (
    <>
      <Heading>About Me</Heading>

      <p className="mt-4 flex gap-2 text-xl md:mt-8">
        Hi, I&apos;m nabeliwo
        <NabeliwoIcon />
      </p>

      <div className="mt-8">
        <PostWrapper>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </PostWrapper>
      </div>
    </>
  )
}
