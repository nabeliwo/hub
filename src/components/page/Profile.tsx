import { HtmlContent } from '../shared/HtmlContent'
import { Heading } from '../ui/Heading'

type Props = {
  title: string
  content: string
}

export function Profile({ title, content }: Props) {
  return (
    <>
      <Heading>{title}</Heading>

      <div className="mt-8">
        <HtmlContent>{content}</HtmlContent>
      </div>
    </>
  )
}
