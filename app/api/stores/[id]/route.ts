import { turso, mongo } from '@libs/db'
import z from 'zod'

const paramsSchema = z.object({
  id: z.preprocess(id => Number(id), z.number().int().positive().finite().safe())
})

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const paramsData = await params

  try {
    const paramsParsed = paramsSchema.safeParse(paramsData)

    if (!paramsParsed.success) return new Response(JSON.stringify({ msg: 'Invalid store id' }), { status: 400 })

    const { id } = paramsParsed.data
    const response = await turso.execute('SELECT * FROM stores WHERE id = ?', [id])
    if (response.rows.length === 0) return new Response(JSON.stringify({ msg: 'Store not found' }), { status: 404 })

    const store = response.rows[0]

    let sketch = await mongo.sketch.findOne({ store_id: id })
    if (!sketch){
      sketch = await mongo.sketch.insertOne({ store_id: id, nodes: [] })
    }


    const res = JSON.stringify({ store, sketch })
    return new Response(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ msg: 'Unexpected error' }), { status: 500 })
  }
}
