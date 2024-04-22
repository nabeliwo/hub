import fs from 'fs'
import path from 'path'

function getFiles(dirName: string): string[] {
  return fs.readdirSync(dirName, { withFileTypes: true }).flatMap((dirent) => {
    if (dirent.isFile()) {
      return [`${dirName}/${dirent.name}`]
    }

    return getFiles(`${dirName}/${dirent.name}`)
  })
}

const images = getFiles(path.join(process.cwd(), 'public/images/blog/thumbnails'))

images.forEach(async (image) => {
  const array = image.split('/')
  const fileName = array[array.length - 1]?.split('.')[0]

  if (fileName) {
    const afterPath = image.replace('/thumbnails', '').replace(fileName, `${fileName}/thumbnail`)
    const directory = afterPath.split('/thumbnail.')[0]

    if (directory) {
      await fs.promises.mkdir(directory, { recursive: true })
      fs.renameSync(image, afterPath)
    }
  }
})
