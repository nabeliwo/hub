import { WeeklyList } from '@/components/page/WeeklyList'
import { getWeeklies, generateWeeklyRssFeed } from '@/services/weekly'
import { paginate } from '@/util/pageHelper'

export default async function Weekly() {
  const weeklies = await getWeeklies()
  const { items, totalPages, currentPage } = paginate(weeklies, '1')

  await generateWeeklyRssFeed(weeklies)

  return <WeeklyList weeklies={items} totalPages={totalPages} currentPage={currentPage} />
}
