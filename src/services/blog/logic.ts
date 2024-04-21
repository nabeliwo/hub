import fs from 'fs'
import path from 'path'

import { getMdContent } from '@/utils/markdown'

import type { Blog, BlogFrontMatter } from './types'

const BLOGS_DIRECTORY = 'content/blog'
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
  const shortPath = filePath.replace(`${cwd}/${BLOGS_DIRECTORY}`, '')

  // 昔は index.md を使わずに hoge.md の形で記事を書いていたので、今と昔の書き方どちらにも対応する
  const replaceTarget = shortPath.includes('index.md') ? '/index.md' : '.md'

  return shortPath.replace(replaceTarget, '')
}

export async function getBlogs(): Promise<Blog[]> {
  const fileNames = getFiles(path.join(cwd, BLOGS_DIRECTORY))

  const contents = await Promise.all(
    fileNames.map(async (filePath) => {
      const file = fs.readFileSync(filePath, 'utf8')
      const { metaData, content } = await getMdContent(file)
      const typedMetaData = metaData as BlogFrontMatter

      return { ...typedMetaData, content, slug: getSlug(filePath) }
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

// TODO: index.md で終わるパターンと slug.md で終わるパターンがあるので考慮する必要あり
// `${cwd}/${BLOGS_DIRECTORY}` を除外すると slug にできそう
