import fs from 'fs'
import path from 'path'

import { parseISO } from 'date-fns'
import { Feed } from 'feed'

import { profile } from '@/constants/meta'

export type FeedOptions = {
  url: string
  title: string
  description: string
  type: string
}

type Item = {
  title: string
  description: string
  content: string
  date: string
  url: string
}

export async function generateRssFeed(feedOptions: FeedOptions, items: Item[]) {
  const siteUrl = profile.url

  const feed = new Feed({
    id: feedOptions.url,
    link: feedOptions.url,
    title: feedOptions.title,
    description: feedOptions.description,
    language: 'ja',
    image: `${siteUrl}/images/og-image/${feedOptions.type}.png'`,
    favicon: siteUrl + '/favicon.io',
    copyright: 'All rights reserved 2024, nabeliwo',
    feedLinks: {
      rss2: `${siteUrl}/rss/${feedOptions.type}/feed.xml'`,
      json: `${siteUrl}/rss/${feedOptions.type}/feed.json'`,
      atom: `${siteUrl}/rss/${feedOptions.type}/atom.xml'`,
    },
    author: {
      name: 'nabeliwo',
      email: 'nabeliwo@gmail.com',
      link: siteUrl,
    },
  })

  items.forEach((item) => {
    feed.addItem({
      id: item.url,
      link: item.url,
      title: item.title,
      description: item.description,
      content: item.content,
      date: parseISO(item.date),
      image: '', // TODO
    })
  })

  const directory = path.join(process.cwd(), 'public/rss', feedOptions.type)

  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, 'feed.xml'), feed.rss2())
  fs.writeFileSync(path.join(directory, 'atom.xml'), feed.atom1())
  fs.writeFileSync(path.join(directory, 'feed.json'), feed.json1())
}
