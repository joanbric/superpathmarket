import { connections, connect, models, model } from 'mongoose'
import { createClient } from '@libsql/client'
import { sketchSchema } from './mongodb/schemas'

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
})

if (connections.length === 0) {
  await connect(process.env.MONGOOSE_URI!)
}

const sketch = models.sketch || model('sketch', sketchSchema, 'sketches')

export const mongo = {
  sketch
}
