import { AboutMe } from '@/components/page/AboutMe'
import { getPage } from '@/services/profile'

export default async function Home() {
  const { content } = await getPage('aboutMe')
  return <AboutMe content={content} />
}
