import fs from 'fs'
import path from 'path'

import { weekly } from '@/constants/meta'
import { generateRssFeed } from '@/util/feed'
import { getMdContent } from '@/util/markdown'

import { isWeeklyFrontMatter, type Weekly } from './types'

const WEEKLIES_DIRECTORY = 'content/weekly'
const cwd = process.cwd()

function getFiles(dirName: string): string[] {
  return fs.readdirSync(dirName, { withFileTypes: true }).flatMap((dirent) => {
    if (dirent.isFile()) {
      if (!dirent.name.endsWith('.md')) {
        return []
      }

      return [`${dirName}/${dirent.name}`]
    }

    return getFiles(`${dirName}/${dirent.name}`)
  })
}

function getSlug(filePath: string) {
  const shortPath = filePath.replace(`${cwd}/${WEEKLIES_DIRECTORY}`, '')
  return shortPath.replace('.md', '')
}

export async function getWeeklies(): Promise<Weekly[]> {
  const fileNames = getFiles(path.join(cwd, WEEKLIES_DIRECTORY))

  const contents = await Promise.all(
    fileNames.map(async (filePath) => {
      const file = fs.readFileSync(filePath, 'utf8')
      const { metaData, content } = await getMdContent(file)

      if (!isWeeklyFrontMatter(metaData)) {
        throw new Error(`frontmatter の値が不正です。該当記事のパス: ${filePath}`)
      }

      const slug = getSlug(filePath)

      return { ...metaData, date: slug.slice(1).replace('/', '-'), content, slug }
    }),
  )

  const sortedContents = contents.sort((a, b) => {
    if (a.slug < b.slug) {
      return 1
    } else {
      return -1
    }
  })

  return sortedContents
}

export async function getWeekly(pathname: string): Promise<Weekly | null> {
  const fullPath = path.join(cwd, WEEKLIES_DIRECTORY, pathname)

  try {
    const file = fs.readFileSync(fullPath + '.md', 'utf8')
    const { metaData, content } = await getMdContent(file)

    if (!isWeeklyFrontMatter(metaData)) {
      throw new Error(`frontmatter の値が不正です。該当記事のパス: ${fullPath}`)
    }

    return { ...metaData, date: pathname.replace('/', '-'), content, slug: pathname }
  } catch {
    return null
  }
}

export async function generateWeeklyRssFeed(weeklies: Weekly[]) {
  await generateRssFeed(
    {
      url: weekly.url,
      title: weekly.siteName,
      description: weekly.description,
      type: 'weekly',
    },
    weeklies.map((item) => ({
      title: item.title,
      description: item.description,
      content: item.content,
      date: item.date,
      url: weekly.url + item.slug,
    })),
  )
}
