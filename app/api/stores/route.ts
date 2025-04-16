import {turso} from '@libs/db'

export async function GET() {
  try{
    const response = await turso.execute('SELECT * FROM stores')
    const res = JSON.stringify(response.rows)
    return new Response(res, { status: 200 })
  } catch (error) {
    console.error('Error al obtener los stores:', error)
    return new Response('Error al obtener los stores', { status: 500 })
  }
}
