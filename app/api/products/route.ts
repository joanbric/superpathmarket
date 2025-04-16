import {turso} from '@/libs/db'
export async function GET() {
  try {
    const result = await turso.execute('SELECT * FROM products')
    console.log(result)
    return new Response(JSON.stringify(result.rows), { status: 200})
  } catch {
    return new Response(JSON.stringify([{ error: 'Error creating product' }]), { status: 500 })
  }
}
