import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export async function getSingleMdContent(filePath: string) {
  const fileFullPath = path.join(process.cwd(), filePath)
  const file = fs.readFileSync(fileFullPath, 'utf8')
  const { data, content } = matter(file)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noreferrer'] })
    .use(rehypeStringify)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    metaData: data,
    content: contentHtml,
  }
}
