import { PostWrapper } from '@/components/model/post/PostWrapper'
import { Heading } from '@/components/ui/Heading'
import { NabeliwoIcon } from '@/components/ui/icon/NabeliwoIcon'
import { getPage } from '@/services/profile'

export default async function AboutMe() {
  const { content } = await getPage('aboutMe')

  return (
    <>
      <Heading>About Me</Heading>

      <p className="mt-4 flex gap-2 text-xl leading-8 md:mt-8">
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
