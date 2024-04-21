const DEFAULT_PAGE = 1
const DEFAULT_PER = 20

export function paginate<T>(
  items: T[],
  searchParams: { [key: string]: string | string[] | undefined },
): {
  items: T[]
  totalPages: number
  currentPage: number
} {
  const pageArg = Number(typeof searchParams.page === 'string' ? searchParams.page : `${DEFAULT_PAGE}`)
  const perArg = Number(typeof searchParams.per === 'string' ? searchParams.per : `${DEFAULT_PER}`)

  const page = pageArg < 1 ? DEFAULT_PAGE : pageArg
  const per = perArg <= 0 ? DEFAULT_PER : perArg
  const totalPages = Math.ceil(items.length / per)
  const currentPage = page > totalPages ? totalPages : page

  const startIndex = (currentPage - 1) * per
  const endIndex = startIndex + per
  const pageItems = items.slice(startIndex, endIndex)

  return { items: pageItems, totalPages, currentPage }
}
