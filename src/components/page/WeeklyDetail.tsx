import type { Weekly } from '@/services/weekly'

import { HtmlContent } from '../shared/HtmlContent'
import { Datetime } from '../ui/Datetime'
import { Heading } from '../ui/Heading'

type Props = {
  weekly: Weekly
}

export function WeeklyDetail({ weekly }: Props) {
  console.log(weekly.date)
  return (
    <>
      <p className="text-sm text-grey-text">
        <Datetime>{weekly.date}</Datetime>
      </p>

      <Heading>{weekly.title}</Heading>

      <div className="mt-12">
        <HtmlContent>{weekly.content}</HtmlContent>
      </div>
    </>
  )
}
