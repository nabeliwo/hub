import { redirect, notFound } from 'next/navigation'

import { path } from '@/constants/path'

type Props = {
  params: {
    old_slug: string[]
  }
}

function isValidDate(str: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/

  if (!regex.test(str)) {
    return false
  }

  const date = new Date(str)

  return date instanceof Date && !isNaN(date.getTime())
}

function formatDate(date: string) {
  const [year, month, day] = date.split('-')
  return `/${year}/${month}-${day}`
}

function isValidOldBlogPath(strings: string[]): boolean {
  const yearRegex = /^\d{4}$/
  const monthRegex = /^\d{2}$/

  if (!yearRegex.test(strings[0] ?? '') || !monthRegex.test(strings[1] ?? '')) {
    return false
  }

  const date = new Date(`${strings[0]}/${strings[1]}`)

  return date instanceof Date && !isNaN(date.getTime())
}

export default async function OldRedirectedPage({ params }: Props) {
  // 旧 nippo の URL へのアクセスの場合
  if (params.old_slug.length === 1 && isValidDate(params.old_slug[0] ?? '')) {
    return redirect(path.weeklyItem(formatDate(params.old_slug[0] ?? '')))
  }

  // 旧 blog へのアクセスの場合
  if (params.old_slug.length === 3 && isValidOldBlogPath(params.old_slug)) {
    return redirect(path.blogItem(`/${params.old_slug.join('/')}`))
  }

  return notFound()
}
