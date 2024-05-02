import { redirect, notFound } from 'next/navigation'

import { path } from '@/constants/path'

type Props = {
  params: {
    old_slug: string
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

export default async function OldNippoPage({ params }: Props) {
  if (!isValidDate(params.old_slug)) {
    return notFound()
  }

  return redirect(path.weeklyItem(formatDate(params.old_slug)))
}
