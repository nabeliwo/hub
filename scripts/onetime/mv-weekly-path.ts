import fs from 'fs'
import path from 'path'

// weekly の記事件数は88件

const directory = path.join(process.cwd(), 'content/weekly')
const files = fs
  .readdirSync(directory, { withFileTypes: true })
  .map((dirent) => `${directory}/${dirent.name}`)

files.forEach(async (file) => {
  const fileName = file.replace(directory + '/', '')
  const year = fileName.slice(0, 4)
  const newFileName = fileName.slice(5)
  const afterDirectory = path.join(directory, year)
  const afterPath = path.join(directory, year, newFileName)

  await fs.promises.mkdir(afterDirectory, { recursive: true })
  fs.renameSync(file, afterPath)
})
