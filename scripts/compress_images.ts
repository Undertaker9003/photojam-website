import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const INPUT_DIR = 'scripts/r2-photos'
const OUTPUT_DIR = 'scripts/r2-ready'
const MAX_WIDTH = 2400
const QUALITY = 85
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

function getImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return (fs.readdirSync(dir, { recursive: true, encoding: 'utf-8' }) as string[])
    .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .map(f => path.join(dir, f))
}

async function convertToWebP() {
  const files = getImageFiles(INPUT_DIR)
  if (files.length === 0) {
    console.log(`No images found in ${INPUT_DIR}/`)
    console.log(`Create that folder and add subfolders matching your gallery slugs:`)
    console.log(`  scripts/r2-photos/poilam-workshop/photo1.jpg`)
    return
  }

  for (const inputPath of files) {
    const relative = path.relative(INPUT_DIR, inputPath)
    const outputPath = path.join(OUTPUT_DIR, relative.replace(/\.[^.]+$/, '.webp'))

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    const beforeBytes = fs.statSync(inputPath).size
    const image = sharp(fs.readFileSync(inputPath))
    const metadata = await image.metadata()

    let pipeline = image.rotate()
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH)
    }

    await pipeline.webp({ quality: QUALITY }).toFile(outputPath)

    const afterBytes = fs.statSync(outputPath).size
    const saving = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(0)
    console.log(`${relative} → ${path.basename(outputPath)}  ${(beforeBytes / 1e6).toFixed(1)}MB → ${(afterBytes / 1e6).toFixed(1)}MB  (${saving}% smaller)`)
  }

  console.log(`\nDone. Upload the contents of ${OUTPUT_DIR}/ to your R2 bucket.`)
}

convertToWebP()
