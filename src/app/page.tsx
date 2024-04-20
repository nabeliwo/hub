import { Heading } from '@/components/ui/Heading'
import { NabeliwoIcon } from '@/components/ui/icon/NabeliwoIcon'

export default function AboutMe() {
  return (
    <>
      <Heading>About Me</Heading>

      <div className="my-8">
        <p className="flex gap-2 text-xl">
          Hi, I&apos;m nabeliwo
          <NabeliwoIcon />
        </p>

        <p>Software engineer, YouTuber, and a bit more.</p>
      </div>

      <div>hoge</div>
    </>
  )
}
