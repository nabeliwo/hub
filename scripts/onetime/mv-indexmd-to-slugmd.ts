import fs from 'fs'
import path from 'path'

// ブログ記事の数は125件
// ファイル名が index.md の記事は60件
// ファイル名が index.md 以外の記事は65件

function getFiles(dirName: string): string[] {
  return fs.readdirSync(dirName, { withFileTypes: true }).flatMap((dirent) => {
    if (dirent.isFile()) {
      if (!dirent.name.endsWith('index.md')) {
        return []
      }

      return [`${dirName}/${dirent.name}`]
    }

    return getFiles(`${dirName}/${dirent.name}`)
  })
}

const files = getFiles(path.join(process.cwd(), 'content/blog'))

files.forEach((file) => {
  const directory = file.replace('/index.md', '')
  const afterPath = file.replace('/index', '')

  fs.renameSync(file, afterPath)
  fs.rmdir(directory, (err) => {
    if (err) {
      throw err
    }
  })
})
