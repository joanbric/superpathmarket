'use server'

import { mongo } from '@libs/db'
import { NextRequest } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) return new Response(JSON.stringify({ msg: 'No sketch id provided' }), { status: 400 })

    const sketch = await mongo.sketch.findOne({ store_id: id })
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) return new Response(JSON.stringify({ msg: 'No sketch id provided' }), { status: 400 })

    const body = await req.json()

    const result = await mongo.sketch.updateOne({ store_id: id }, { $set: { nodes: body.nodes } })

    if (!result) return new Response(JSON.stringify({ msg: 'Error al actualizar sketch' }), { status: 500 })
    if (result.modifiedCount === 0) return new Response(JSON.stringify({ msg: 'No se actualizaron nodos' }), { status: 400 })

    return new Response(JSON.stringify({ success: true, msg: 'Sketch updated successfully' }), { status: 200 })
  } catch (error) {
    console.error('Error al actualizar sketch:', error)
    return new Response(JSON.stringify({ msg: 'Error al actualizar sketch' }), { status: 500 })
  }
}
