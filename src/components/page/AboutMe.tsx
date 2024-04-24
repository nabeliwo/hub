import { HtmlContent } from '../shared/HtmlContent'
import { Heading } from '../ui/Heading'
import { NabeliwoIcon } from '../ui/icon/NabeliwoIcon'

type Props = {
  content: string
}

export function AboutMe({ content }: Props) {
  return (
    <div className="max-w-2xl">
      <Heading>About Me</Heading>

      <p className="mt-4 flex gap-2 text-xl leading-8 md:mt-8">
        Hi, I&apos;m nabeliwo
        <NabeliwoIcon />
      </p>

      <div className="mt-8">
        <HtmlContent>{content}</HtmlContent>
      </div>
    </div>
  )
}
