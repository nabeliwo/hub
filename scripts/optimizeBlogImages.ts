import fs from 'fs'
import path from 'path'

import sharp from 'sharp'

/**
 * ブログ記事の画像を最適化するスクリプト。
 *
 * 通常モード: `npm run images`
 *   public/images/blog/YYYY/MM/slug/ に置かれた「まだ記事から参照されていない画像」を
 *   連番にリネームし、横幅 1440px に縮小・圧縮した上で、
 *   対応する content/blog/YYYY/MM/slug.md の末尾に画像タグを追記する。
 *   記事から参照済みの画像には触らないので、何度実行しても結果は変わらない。
 *
 * 最適化のみモード: `npm run images -- --optimize-only`
 *   参照状況やファイル名に関係なく、すべての画像を縮小・圧縮する。
 *   リネームも md への追記も行わない。過去記事の画像をまとめて縮めるとき用。
 *
 * `--dry-run` を付けるとファイルを一切変更せずに結果だけ出力する。
 */

const cwd = process.cwd()
const IMAGES_DIRECTORY = 'public/images/blog'
const BLOGS_DIRECTORY = 'content/blog'

const MAX_WIDTH = 1440
const JPEG_QUALITY = 80

// gif はアニメーションが壊れるため対象外にする
const TARGET_EXTENSIONS = ['.jpg', '.jpeg', '.png']

// 再エンコードで増える誤差レベルの変化しかない場合は書き換えない
const MIN_SAVING_RATIO = 0.05

const NUMBERED_NAME_PATTERN = /^(\d{2})\.(jpg|jpeg|png)$/i
const THUMBNAIL_BASE_NAME = 'thumbnail'

type Options = {
  dryRun: boolean
  optimizeOnly: boolean
}

type PlannedImage = {
  /** 現在のファイル名 */
  currentName: string
  /** リネーム後のファイル名。リネームしない場合は currentName と同じ */
  nextName: string
  /** 記事から参照されていない = 今回追加された画像。最適化の対象になる */
  isNew: boolean
  /** frontmatter に書くサムネイル。本文の画像タグには含めない */
  isThumbnail: boolean
}

/** 画像ファイルを直接持っているディレクトリを再帰的に集める */
function getImageDirectories(dirName: string): string[] {
  const entries = fs.readdirSync(dirName, { withFileTypes: true })
  const hasImageFile = entries.some((entry) => entry.isFile() && isTargetImage(entry.name))
  const childDirectories = entries.filter((entry) => entry.isDirectory())

  return [
    ...(hasImageFile ? [dirName] : []),
    ...childDirectories.flatMap((entry) => getImageDirectories(path.join(dirName, entry.name))),
  ]
}

function isTargetImage(fileName: string): boolean {
  return TARGET_EXTENSIONS.includes(path.extname(fileName).toLowerCase())
}

/** .jpeg と大文字の拡張子を .jpg に寄せる */
function normalizeExtension(fileName: string): string {
  const extension = path.extname(fileName).toLowerCase()
  return extension === '.jpeg' ? '.jpg' : extension
}

/** public/images/blog/2026/09/foo/01.jpg -> /images/blog/2026/09/foo/01.jpg */
function toPublicPath(imageDirectory: string, fileName: string): string {
  return `/${path.join(path.relative('public', imageDirectory), fileName)}`
}

/** public/images/blog/2026/09/foo -> content/blog/2026/09/foo.md */
function toMdPath(imageDirectory: string): string {
  return `${path.join(BLOGS_DIRECTORY, path.relative(IMAGES_DIRECTORY, imageDirectory))}.md`
}

function readMd(imageDirectory: string): string | null {
  const mdPath = toMdPath(imageDirectory)

  if (!fs.existsSync(mdPath)) {
    return null
  }

  return fs.readFileSync(mdPath, 'utf8')
}

function isThumbnail(fileName: string): boolean {
  return path.basename(fileName, path.extname(fileName)).toLowerCase() === THUMBNAIL_BASE_NAME
}

/**
 * ディレクトリ内の画像について、リネーム後の名前と新規かどうかを決める。
 *
 * - md から参照済みの画像とサムネイルは、リンク切れを起こさないので名前を変えない
 * - 未参照の画像のうち NN.jpg 形式で番号が空いているものは、その番号を尊重する
 * - それ以外の未参照の画像には、ファイル名順に空き番号を若い方から割り当てる
 */
function planImages(imageDirectory: string, md: string | null): PlannedImage[] {
  const fileNames = fs
    .readdirSync(imageDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isTargetImage(entry.name))
    .map((entry) => entry.name)
    .sort()

  const isReferenced = (fileName: string) =>
    md !== null && md.includes(toPublicPath(imageDirectory, fileName))

  // 参照済みの画像とサムネイルは、リンク切れや frontmatter とのズレを避けるため名前を変えない
  const keptNames = fileNames.filter((fileName) => isReferenced(fileName) || isThumbnail(fileName))
  const renamableNames = fileNames.filter((fileName) => !keptNames.includes(fileName))

  const usedNumbers = new Set<number>()

  for (const fileName of keptNames) {
    const matched = fileName.match(NUMBERED_NAME_PATTERN)

    if (matched?.[1] !== undefined) {
      usedNumbers.add(Number(matched[1]))
    }
  }

  const planned: PlannedImage[] = keptNames.map((fileName) => ({
    currentName: fileName,
    nextName: fileName,
    isNew: !isReferenced(fileName),
    isThumbnail: isThumbnail(fileName),
  }))
  const unnumberedNames: string[] = []

  // 既に NN.jpg 形式で置かれていて番号が空いているものは、その番号を尊重する
  for (const fileName of renamableNames) {
    const matched = fileName.match(NUMBERED_NAME_PATTERN)
    const number = matched?.[1] === undefined ? null : Number(matched[1])

    if (number !== null && !usedNumbers.has(number)) {
      usedNumbers.add(number)
      planned.push({
        currentName: fileName,
        nextName: `${String(number).padStart(2, '0')}${normalizeExtension(fileName)}`,
        isNew: true,
        isThumbnail: false,
      })
    } else {
      unnumberedNames.push(fileName)
    }
  }

  let nextNumber = 1

  for (const fileName of unnumberedNames) {
    while (usedNumbers.has(nextNumber)) {
      nextNumber += 1
    }

    usedNumbers.add(nextNumber)
    planned.push({
      currentName: fileName,
      nextName: `${String(nextNumber).padStart(2, '0')}${normalizeExtension(fileName)}`,
      isNew: true,
      isThumbnail: false,
    })
  }

  return planned
}

function renameImages(imageDirectory: string, planned: PlannedImage[], options: Options): string[] {
  const logs: string[] = []

  for (const image of planned) {
    if (image.currentName === image.nextName) {
      continue
    }

    const currentPath = path.join(imageDirectory, image.currentName)
    const nextPath = path.join(imageDirectory, image.nextName)

    if (fs.existsSync(nextPath)) {
      throw new Error(`リネーム先が既に存在します: ${nextPath}`)
    }

    logs.push(`  ${image.currentName} -> ${image.nextName}`)

    if (!options.dryRun) {
      fs.renameSync(currentPath, nextPath)
    }
  }

  return logs
}

/** EXIF の回転を考慮した、実際に表示されるときの横幅 */
async function getDisplayWidth(input: Buffer): Promise<number | null> {
  const metadata = await sharp(input).metadata()

  if (metadata.width === undefined || metadata.height === undefined) {
    return null
  }

  // orientation 5〜8 は 90 度回転なので、縦横が入れ替わる
  const isRotated = (metadata.orientation ?? 1) >= 5

  return isRotated ? metadata.height : metadata.width
}

/**
 * 画像を横幅 MAX_WIDTH に収めて再圧縮する。
 * EXIF は落とすので、スマホ写真に埋まっている位置情報も一緒に消える。
 */
async function optimizeImage(
  filePath: string,
  options: Options,
): Promise<{ before: number; after: number } | null> {
  const before = fs.statSync(filePath).size
  const input = fs.readFileSync(filePath)
  const isPng = normalizeExtension(filePath) === '.png'

  // --optimize-only は最適化済みの画像も対象にするため、jpeg を作り直すと世代劣化が乗る。
  // 縮小の必要がない jpeg には触らない。png の再エンコードは可逆なのでそのまま処理してよい。
  if (options.optimizeOnly && !isPng) {
    const width = await getDisplayWidth(input)

    if (width !== null && width <= MAX_WIDTH) {
      return null
    }
  }

  const pipeline = sharp(input)
    // EXIF の回転情報を画像そのものに焼き込んでから縮小する
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })

  const output = isPng
    ? await pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer()
    : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()

  if (output.length > before * (1 - MIN_SAVING_RATIO)) {
    return null
  }

  if (!options.dryRun) {
    fs.writeFileSync(filePath, output)
  }

  return { before, after: output.length }
}

function appendImageTags(imageDirectory: string, fileNames: string[], options: Options): string[] {
  const mdPath = toMdPath(imageDirectory)
  const tags = fileNames.map((fileName) => `![](${toPublicPath(imageDirectory, fileName)} '')`)
  const block = [
    '',
    '<!-- ここから npm run images が追記した画像。alt と caption を書いて本文に移動してください -->',
    ...tags,
    '',
  ].join('\n')

  if (!options.dryRun) {
    const md = fs.readFileSync(mdPath, 'utf8')
    fs.writeFileSync(mdPath, `${md.replace(/\s*$/, '\n')}${block}`)
  }

  return [`  ${mdPath} の末尾に追記`, ...tags.map((tag) => `    ${tag}`)]
}

function formatSize(byte: number): string {
  return byte < 1024 * 1024 ? `${Math.round(byte / 1024)}KB` : `${(byte / 1024 / 1024).toFixed(1)}MB`
}

async function main(): Promise<void> {
  const options: Options = {
    dryRun: process.argv.includes('--dry-run'),
    optimizeOnly: process.argv.includes('--optimize-only'),
  }

  if (options.dryRun) {
    console.log('--dry-run: ファイルは変更しません\n')
  }

  const imageDirectories = getImageDirectories(path.join(cwd, IMAGES_DIRECTORY)).map((dirName) =>
    path.relative(cwd, dirName),
  )

  let totalBefore = 0
  let totalAfter = 0
  let optimizedCount = 0

  for (const imageDirectory of imageDirectories.sort()) {
    const md = readMd(imageDirectory)

    if (md === null) {
      console.log(`⚠ 対応する記事がありません: ${imageDirectory} (${toMdPath(imageDirectory)})`)
    }

    const planned = planImages(imageDirectory, md)
    const logs: string[] = options.optimizeOnly ? [] : renameImages(imageDirectory, planned, options)
    const targets = options.optimizeOnly ? planned : planned.filter((image) => image.isNew)

    for (const image of targets) {
      // --dry-run ではリネームしていないので、まだ元のファイル名のまま置かれている
      const fileName = options.dryRun ? image.currentName : image.nextName
      const result = await optimizeImage(path.join(imageDirectory, fileName), options)

      if (result === null) {
        continue
      }

      totalBefore += result.before
      totalAfter += result.after
      optimizedCount += 1
      logs.push(`  ${image.nextName} ${formatSize(result.before)} -> ${formatSize(result.after)}`)
    }

    // サムネイルは frontmatter の image に書くものなので、本文の画像タグには含めない
    const newImages = planned.filter((image) => image.isNew && !image.isThumbnail)
    const newThumbnail = planned.find((image) => image.isNew && image.isThumbnail)

    if (!options.optimizeOnly && md !== null && newImages.length > 0) {
      logs.push(
        ...appendImageTags(
          imageDirectory,
          newImages.map((image) => image.nextName),
          options,
        ),
      )
    }

    if (!options.optimizeOnly && md !== null && newThumbnail !== undefined) {
      logs.push(
        `  frontmatter に追記してください: image: '${toPublicPath(imageDirectory, newThumbnail.nextName)}'`,
      )
    }

    if (logs.length > 0) {
      console.log(imageDirectory)
      logs.forEach((log) => console.log(log))
    }
  }

  if (optimizedCount === 0) {
    console.log('\n最適化が必要な画像はありませんでした。')
    return
  }

  console.log(
    `\n${optimizedCount} 件を最適化: ${formatSize(totalBefore)} -> ${formatSize(totalAfter)} (${Math.round(
      (1 - totalAfter / totalBefore) * 100,
    )}% 削減)`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
