import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_ID!,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY!
  }
})

export async function saveFile(file: File) {
  if (!file) return null
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const objectKey = randomUUID()
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
    Key: objectKey,
    Body: buffer
  })

  try {
    await R2.send(putObjectCommand)
    return objectKey
  } catch (error) {
    console.log(error)
    return null
  }
}
