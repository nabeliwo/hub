import fs from 'fs'
import path from 'path'

const cwd = process.cwd()

function getFiles(dirName: string): string[] {
  return fs.readdirSync(dirName, { withFileTypes: true }).flatMap((dirent) => {
    // .md 以外 = 画像のみ抽出
    if (dirent.name.endsWith('.md')) {
      return []
    }

    if (dirent.isFile()) {
      return [`${dirName}/${dirent.name}`]
    }

    return getFiles(`${dirName}/${dirent.name}`)
  })
}

const images = getFiles(path.join(cwd, 'content/blog'))

images.forEach(async (image) => {
  const afterPath = path.join(cwd, 'public/images/blog', image.replace(cwd + '/content/blog/', ''))
  const afterPathArray = afterPath.split('/')
  const directory = afterPathArray.slice(0, afterPathArray.length - 1).join('/')
  console.log('------------------')
  console.log(image)
  console.log(afterPath)
  console.log(directory)

  await fs.promises.mkdir(directory, { recursive: true })
  fs.renameSync(image, afterPath)
})
