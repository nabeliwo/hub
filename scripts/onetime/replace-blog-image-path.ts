import fs from 'fs'
import path from 'path'

// MEMO:
// 現時点ブログ記事は125件
// 画像を参照している箇所は176箇所
// 変更対象のファイルは36件

const cwd = process.cwd()
const REGEX = /(\!\[.*?\]\(\.)(.*?\.(gif|jpg|png))/
const REGEX_G = /(\!\[.*?\]\(\.)(.*?\.(gif|jpg|png))/g

function getFiles(dirName: string): string[] {
  return fs.readdirSync(dirName, { withFileTypes: true }).flatMap((dirent) => {
    if (dirent.isFile()) {
      return [`${dirName}/${dirent.name}`]
    }

    return getFiles(`${dirName}/${dirent.name}`)
  })
}

const files = getFiles(path.join(cwd, 'content/blog'))

files.forEach((file) => {
  const content = fs.readFileSync(file, { encoding: 'utf-8' })

  if (REGEX.test(content)) {
    const publicPath = 'images/blog/' + file.replace(cwd + '/content/blog/', '').replace('/index.md', '')
    const updated = content.replace(REGEX_G, `$1${publicPath}$2`).replace(/\(\./g, '(/')

    fs.writeFile(file, updated, (err) => {
      if (err) {
        throw err
      }
    })
  }
})
