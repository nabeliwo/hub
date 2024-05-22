export const tagMap = {
  // tech
  hugo: 'Hugo',
  css: 'CSS',
  js: 'JavaScript',
  ts: 'TypeScript',
  node: 'Node.js',
  react: 'React',
  next: 'Next.js',
  express: 'Express',
  gatsby: 'Gatsby',
  gas: 'Google Apps Script',
  ruby: 'Ruby',
  rails: 'Ruby on Rails',
  netlify: 'Netlify',
  prettier: 'Prettier',
  eslint: 'ESLint',
  vscode: 'Visual Studio Code',
  'web-components': 'Web Components',
  unity: 'Unity',
  ue: 'Unreal Engine',
  wsl: 'WSL',

  // game
  switch: 'Nintendo Switch',
  ps4: 'Play Station 4',
  ps5: 'Play Station 5',
  zelda: 'ゼルダの伝説',
  splatoon: 'Splatoon',
  seikendensetsu: '聖剣伝説',
  pokemon: 'ポケモン',
  'blue-protocol': 'BLUE PROTOCOL',
  ff: 'ファイナルファンタジー',

  // gadget
  iphone: 'iPhone',
  razer: 'Razer',
  shure: 'Shure',
  hhkb: 'Happy Hacking Keyboard',
  'keyboard-build': '自作キーボード',

  // pc-build
  'game-streaming': 'ゲーム配信',

  // anime
  sao: 'ソードアート・オンライン',
}

export const categoryMap = {
  diary: '日記',
  made: '作ったもの',
  poem: 'ポエム',
  house: '家',
  gadget: 'ガジェット',
  'pc-build': '自作 PC',
  game: 'ゲーム',
  anime: 'アニメ',
  book: '読書',
  vr: 'VR',
  tech: '技術',
}

type BlogFrontMatter = {
  title: string
  description: string
  date: string
  category: keyof typeof categoryMap
  tags: Array<keyof typeof tagMap>
  image: string
  alt: string
}

export type Blog = BlogFrontMatter & {
  content: string
  slug: string
}

export function isBlogFrontMatter(metaData: unknown): metaData is BlogFrontMatter {
  if (typeof metaData !== 'object' || metaData === null) {
    return false
  }

  const value = metaData as Record<string, unknown>

  if (!('title' in value) || typeof value.title !== 'string') {
    return false
  }

  if (!('description' in value) || typeof value.description !== 'string') {
    return false
  }

  if (
    !('date' in value) ||
    typeof value.date !== 'string' ||
    new Date(value.date).toString() === 'Invalid Date'
  ) {
    return false
  }

  if (!('category' in value) || typeof value.category !== 'string' || !(value.category in categoryMap)) {
    return false
  }
  if (
    !('tags' in value) ||
    !Array.isArray(value.tags) ||
    !value.tags.every((tag) => typeof tag === 'string' && tag in tagMap)
  ) {
    return false
  }

  if (!('image' in value) || typeof value.image !== 'string') {
    return false
  }

  return true
}
