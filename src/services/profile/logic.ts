import fs from 'fs'
import path from 'path'

import { getMdContent } from '@/utils/markdown'

export async function getPage(name: string) {
  const fileFullPath = path.join(process.cwd(), `content/profile/${name}.md`)
  const file = fs.readFileSync(fileFullPath, 'utf8')
  const { metaData, content } = await getMdContent(file)

  return {
    title: metaData.title as string,
    description: metaData.description as string,
    content,
  }
}
