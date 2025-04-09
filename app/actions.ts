'use server'
import { z } from 'zod'
import { saveFile } from '@libs/R2Manager'
import { createClient } from '@libsql/client'

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
})

const productSchema = z.object({
  name: z.string().nonempty(),
  plu: z.string(),
  image: z.instanceof(File).optional(),
  prices: z
    .array(
      z.object({
        storeId: z.number().nonnegative().int(),
        price: z.number().nonnegative().int()
      })
    )
    .nonempty()
})

export async function createProduct(form: FormData) {
  const { name, plu, image } = Object.fromEntries(form.entries())
  const prices = Array.from(form.entries())
    .filter(([name]) => name === 'store' || name === 'price')
    .reduce((acc, [name, value]) => {
      if (name === 'store') acc.push({ storeId: Number(value), price: -1 })
      if (name === 'price') acc[acc.length - 1].price = Number(value)
      return acc
    }, [] as { storeId: number; price: number }[])

  const productValidation = productSchema.safeParse({ name, plu, image, prices })
  if (!productValidation.success) throw new Error(productValidation.error.message)
  try {
    const product = productValidation.data
    let url = null
    if (product.image && product.image.size > 0) {
      url = await saveFile(product.image)
    }

    const { lastInsertRowid } = await turso.execute('INSERT INTO products (name, img_url) VALUES (?, ?)', [product.name, url ? url : null])
    if (!lastInsertRowid) throw new Error('Failed to create product')
    const sqlValues = product.prices.map(() => '(?, ?, ?, ?)').join(', ')
    const sqlParams = product.prices.flatMap(p => [Number(lastInsertRowid), p.storeId, p.price, Date.now()])
    const query = `INSERT INTO product_prices (product_id, store_id, price, date_created) VALUES ${sqlValues}`
    await turso.execute(query, sqlParams)
  } catch (error) {
    console.log(error)
  }
}

export async function createStore(form: FormData) {
  const name = form.get('name') as string
  const address = form.get('address') as string

  try {
    await turso.execute('INSERT INTO stores (name, address) VALUES (?, ?)', [name, address])
  } catch (error) {
    console.log(error)
  }
}
