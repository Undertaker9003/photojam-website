import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const INPUT_DIR = 'scripts/r2-photos'
const OUTPUT_DIR = 'scripts/r2-ready'
const MAX_WIDTH = 2400
const QUALITY = 85
const MAX_FILE_SIZE = 500 * 1024 // 500KB
const MIN_QUALITY = 40
const QUALITY_STEP = 5
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

function getImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return (fs.readdirSync(dir, { recursive: true, encoding: 'utf-8' }) as string[])
    .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .map(f => path.join(dir, f))
}

async function compressToWebP(inputPath: string, outputPath: string, maxWidth: number) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })

  const beforeBytes = fs.statSync(inputPath).size
  const buffer = fs.readFileSync(inputPath)
  const metadata = await sharp(buffer).metadata()

  let quality = QUALITY
  let afterBytes = 0

  while (quality >= MIN_QUALITY) {
    let pipeline = sharp(buffer).rotate()
    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth)
    }

    await pipeline.webp({ quality }).toFile(outputPath)
    afterBytes = fs.statSync(outputPath).size

    if (afterBytes <= MAX_FILE_SIZE) break
    quality -= QUALITY_STEP
  }

  const saving = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(0)
  const qualityNote = quality < QUALITY ? ` (quality: ${quality})` : ''
  const sizeStr = afterBytes > 1e6
    ? `${(afterBytes / 1e6).toFixed(1)}MB`
    : `${(afterBytes / 1024).toFixed(0)}KB`
  console.log(`${path.relative(process.cwd(), inputPath)} → ${path.basename(outputPath)}  ${(beforeBytes / 1e6).toFixed(1)}MB → ${sizeStr}  (${saving}% smaller)${qualityNote}`)
}

async function convertToWebP() {
  const files = getImageFiles(INPUT_DIR)
  if (files.length === 0) {
    console.log(`No images found in ${INPUT_DIR}/`)
    console.log(`Create that folder and add subfolders matching your gallery slugs:`)
    console.log(`  scripts/r2-photos/poilam-workshop/photo1.jpg`)
  } else {
    console.log('--- R2 gallery images ---')
    for (const inputPath of files) {
      const relative = path.relative(INPUT_DIR, inputPath)
      const outputPath = path.join(OUTPUT_DIR, relative.replace(/\.[^.]+$/, '.webp'))
      await compressToWebP(inputPath, outputPath, MAX_WIDTH)
    }
    console.log(`\nDone. Upload the contents of ${OUTPUT_DIR}/ to your R2 bucket.`)
  }
}

async function convertThumbnails() {
  const thumbnails = getImageFiles('public').filter(f =>
    path.basename(f).toLowerCase().includes('thumbnail')
  )

  if (thumbnails.length === 0) {
    console.log('\nNo thumbnails found in public/')
    return
  }

  console.log('\n--- Thumbnails ---')
  for (const inputPath of thumbnails) {
    const outputPath = inputPath.replace(/\.[^.]+$/, '.webp')
    if (inputPath === outputPath) continue
    await compressToWebP(inputPath, outputPath, MAX_WIDTH)
  }
}

async function main() {
  await convertToWebP()
  await convertThumbnails()
}

main()
