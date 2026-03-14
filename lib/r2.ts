import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { type ProjectImage } from "./projects"

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function getGalleryImages(slug: string): Promise<ProjectImage[]> {
  const { Contents } = await r2.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      Prefix: `${slug}/`,
    })
  )

  if (!Contents) return []

  return Contents
    .filter(obj => {
      if (!obj.Key) return false
      const ext = obj.Key.slice(obj.Key.lastIndexOf(".")).toLowerCase()
      return IMAGE_EXTENSIONS.has(ext)
    })
    .map(obj => ({
      url: `${process.env.R2_PUBLIC_URL}/${obj.Key}`,
      alt: obj.Key!.replace(`${slug}/`, "").replace(/\.[^.]+$/, ""),
    }))
}
