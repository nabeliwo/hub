import { WeeklyList } from '@/components/page/WeeklyList'
import { getWeeklies } from '@/services/weekly'
import { paginate } from '@/util/pageHelper'

export default async function Weekly() {
  const weeklies = await getWeeklies()
  const { items, totalPages, currentPage } = paginate(weeklies, '1')

  return <WeeklyList weeklies={items} totalPages={totalPages} currentPage={currentPage} />
}
