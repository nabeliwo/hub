import { HtmlContent } from '../shared/HtmlContent'
import { Heading } from '../ui/Heading'

type Props = {
  title: string
  content: string
}

export function Profile({ title, content }: Props) {
  return (
    <div className="max-w-2xl">
      <Heading>{title}</Heading>

      <div className="mt-8">
        <HtmlContent>{content}</HtmlContent>
      </div>
    </div>
  )
}
