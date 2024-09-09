import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import { rehypeImageFigure } from '@/lib/rehype'

// file: md ファイルの中身の文字列
export async function getMdContent(file: string) {
  // data: md ファイル内の frontmatter 部分
  // content: md ファイル内の frontmatter 以外の部分(記事本文)
  const { data, content } = matter(file)

  const processedContent = await unified()
    .use(remarkParse) // markdown テキストを mdast に変換する
    .use(remarkRehype, { allowDangerousHtml: true }) // mdast を hast に変換する
    .use(rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noreferrer'] }) // 外部サイトへのリンクを別タブリンクにする
    .use(rehypeImageFigure) // 画像を figure でラップして画像タイトルを figcaption にする
    .use(rehypeStringify, { allowDangerousHtml: true }) // hast を html に変換する
    .process(content) // 実行
  const contentHtml = processedContent.toString()

  return {
    metaData: data,
    content: contentHtml,
    originalContent: content,
  }
}
