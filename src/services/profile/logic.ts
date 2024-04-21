import { getSingleMdContent } from '@/utils/markdown'

export async function getPage(name: string) {
  const { metaData, content } = await getSingleMdContent(`content/profile/${name}.md`)

  return {
    title: metaData.title as string,
    description: metaData.description as string,
    content,
  }
}
