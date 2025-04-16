'use server'

import { mongo } from '@libs/db'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) return new Response(JSON.stringify({ msg: 'No sketch id provided' }), { status: 400 })

    const sketch = await mongo.sketch.findOne({ store_id: 1 })
    if (sketch) {
      return new Response(JSON.stringify(sketch), { status: 200 })
    } else {
      return new Response(JSON.stringify({ msg: 'Sketch not found' }), { status: 404 })
    }
  } catch (error) {
    console.error('Error al obtener los sketches:', error)
    return new Response(JSON.stringify({ msg: 'Error al obtener los sketches' }), { status: 500 })
  }
}
