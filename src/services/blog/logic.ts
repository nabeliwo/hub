import fs from 'fs'
import path from 'path'

import { getMdContent } from '@/utils/markdown'

import { isBlogFrontMatter, type Blog, type BlogFrontMatter } from './types'

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

      if (!isBlogFrontMatter(metaData)) {
        throw new Error(`frontmatter の値が不正です。該当記事のパス: ${filePath}`)
      }

      return { ...metaData, content, slug: getSlug(filePath) }
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

export async function getBlog(pathname: string): Promise<Blog> {
  const fullPath = path.join(cwd, BLOGS_DIRECTORY, pathname)
  let file: string

  // 昔は index.md を使わずに hoge.md の形で記事を書いていたので、今と昔の書き方どちらにも対応する
  try {
    file = fs.readFileSync(fullPath + '/index.md', 'utf8')
  } catch {
    file = fs.readFileSync(fullPath + '.md', 'utf8')
  }

  const { metaData, content } = await getMdContent(file)

  if (!isBlogFrontMatter(metaData)) {
    throw new Error(`frontmatter の値が不正です。該当記事のパス: ${fullPath}`)
  }

  return { ...metaData, content, slug: pathname }
}
