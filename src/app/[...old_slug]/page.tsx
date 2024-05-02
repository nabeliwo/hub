import { redirect, notFound } from 'next/navigation'

import { path } from '@/constants/path'

type Props = {
  params: {
    old_slug: string[]
  }
}

function isValidOldBlogPath(strings: string[]): boolean {
  if (typeof strings[2] !== 'string') {
    return false
  }

  const yearRegex = /^\d{4}$/
  const monthRegex = /^\d{2}$/

  if (!yearRegex.test(strings[0] ?? '') || !monthRegex.test(strings[1] ?? '')) {
    return false
  }

  const date = new Date(`${strings[0]}/${strings[1]}`)

  return date instanceof Date && !isNaN(date.getTime())
}

export default async function OldBlogPage({ params }: Props) {
  if (!isValidOldBlogPath(params.old_slug)) {
    return notFound()
  }

  return redirect(path.blogItem(`/${params.old_slug.join('/')}`))
}
