import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import { config } from "dotenv"

config({ path: ".env.local" })

const MAX_WIDTH = 2400
const QUALITY = 85
const MAX_FILE_SIZE = 500 * 1024 // 500KB
const MIN_QUALITY = 40
const QUALITY_STEP = 5
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("Missing R2 env vars. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME in .env.local")
  process.exit(1)
}

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

async function listAllObjects(): Promise<{ Key: string; Size: number }[]> {
  const objects: { Key: string; Size: number }[] = []
  let continuationToken: string | undefined

  do {
    const res = await r2.send(
      new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        ContinuationToken: continuationToken,
      })
    )

    for (const obj of res.Contents ?? []) {
      if (!obj.Key || !obj.Size) continue
      const ext = obj.Key.slice(obj.Key.lastIndexOf(".")).toLowerCase()
      if (IMAGE_EXTENSIONS.has(ext)) {
        objects.push({ Key: obj.Key, Size: obj.Size })
      }
    }

    continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined
  } while (continuationToken)

  return objects
}

async function downloadObject(key: string): Promise<Buffer> {
  const res = await r2.send(
    new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key })
  )
  const chunks: Uint8Array[] = []
  for await (const chunk of res.Body as AsyncIterable<Uint8Array>) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

async function compressBuffer(buffer: Buffer): Promise<{ data: Buffer; quality: number }> {
  const metadata = await sharp(buffer).metadata()
  let quality = QUALITY

  while (quality >= MIN_QUALITY) {
    let pipeline = sharp(buffer).rotate()
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH)
    }

    const data = await pipeline.webp({ quality }).toBuffer()
    if (data.length <= MAX_FILE_SIZE) {
      return { data, quality }
    }
    quality -= QUALITY_STEP
  }

  // Return at minimum quality even if still over limit
  let pipeline = sharp(buffer).rotate()
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH)
  }
  const data = await pipeline.webp({ quality: MIN_QUALITY }).toBuffer()
  return { data, quality: MIN_QUALITY }
}

async function uploadObject(key: string, data: Buffer) {
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: data,
      ContentType: "image/webp",
    })
  )
}

function formatSize(bytes: number): string {
  return bytes > 1e6
    ? `${(bytes / 1e6).toFixed(1)}MB`
    : `${(bytes / 1024).toFixed(0)}KB`
}

async function main() {
  console.log(`Listing objects in bucket "${R2_BUCKET_NAME}"...\n`)
  const objects = await listAllObjects()
  console.log(`Found ${objects.length} images\n`)

  let skipped = 0
  let updated = 0

  for (const obj of objects) {
    if (obj.Size <= MAX_FILE_SIZE) {
      console.log(`SKIP  ${obj.Key}  (${formatSize(obj.Size)} — already under 500KB)`)
      skipped++
      continue
    }

    console.log(`DOWNLOAD  ${obj.Key}  (${formatSize(obj.Size)})`)
    const buffer = await downloadObject(obj.Key)

    const { data, quality } = await compressBuffer(buffer)
    const qualityNote = quality < QUALITY ? ` (quality: ${quality})` : ""

    // Update key extension to .webp if not already
    const newKey = obj.Key.replace(/\.[^.]+$/, ".webp")

    console.log(`UPLOAD  ${newKey}  ${formatSize(obj.Size)} → ${formatSize(data.length)}${qualityNote}`)
    await uploadObject(newKey, data)
    updated++
  }

  console.log(`\nDone. ${updated} re-compressed, ${skipped} already under 500KB.`)
}

main().catch((err) => {
  console.error("Error:", err)
  process.exit(1)
})
