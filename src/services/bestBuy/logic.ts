import fs from 'fs'
import path from 'path'

import { bestBuy } from '@/constants/meta'
import { generateRssFeed } from '@/util/feed'
import { getMdContent } from '@/util/markdown'

import { isBestBuyFrontMatter } from './types'

import type { BestBuy } from './types'

const BEST_BUYS_DIRECTORY = 'content/bestBuy'
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
  const shortPath = filePath.replace(`${cwd}/${BEST_BUYS_DIRECTORY}`, '')
  return shortPath.replace('.md', '')
}

function getDescription(content: string) {
  const rows = content.split('\n').filter((item) => item)
  return rows[0] ?? ''
}

export async function getBestBuys(): Promise<BestBuy[]> {
  const fileNames = getFiles(path.join(cwd, BEST_BUYS_DIRECTORY))

  const contents = await Promise.all(
    fileNames.map(async (filePath) => {
      const file = fs.readFileSync(filePath, 'utf8')
      const { metaData, content, originalContent } = await getMdContent(file)

      if (!isBestBuyFrontMatter(metaData)) {
        throw new Error(`frontmatter の値が不正です。該当記事のパス: ${filePath}`)
      }

      return {
        ...metaData,
        content,
        description: getDescription(originalContent),
        slug: getSlug(filePath),
      }
    }),
  )

  const sortedContents = contents.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  return sortedContents
}

export async function getBestBuy(pathname: string): Promise<BestBuy | null> {
  const fullPath = path.join(cwd, BEST_BUYS_DIRECTORY, pathname)

  try {
    const file = fs.readFileSync(fullPath + '.md', 'utf8')
    const { metaData, content, originalContent } = await getMdContent(file)

    if (!isBestBuyFrontMatter(metaData)) {
      throw new Error(`frontmatter の値が不正です。該当記事のパス: ${fullPath}`)
    }

    return { ...metaData, content, description: getDescription(originalContent), slug: pathname }
  } catch (e) {
    return null
  }
}

export async function generateBestBuyRssFeed(weeklies: BestBuy[]) {
  await generateRssFeed(
    {
      url: bestBuy.url,
      title: bestBuy.siteName,
      description: bestBuy.description,
      type: 'best-buy',
    },
    weeklies.map((item) => ({
      title: item.title,
      description: item.description,
      content: item.content,
      date: item.date,
      url: bestBuy.url + item.slug,
      image: item.image,
    })),
  )
}
