'use server'

import { saveFile } from '@libs/R2Manager'
import { createClient } from '@libsql/client'

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!
})

export async function createProduct(form: FormData) {
  console.log('El formulario del action', form)
  const file: File = form.get('image') as File
  const name = form.get('name') as string

  try {
    const url = await saveFile(file)
    // console.log(url)
    await turso.execute('INSERT INTO products (name, img_url, price ) VALUES (?, ?, ?)', [name, url, 0])
  } catch (error) {
    console.log(error)
  }
}


export async function createStore(form: FormData) {
  console.log('El formulario del action', form)
  const name = form.get('name') as string
  const address = form.get('address') as string

  try {
    await turso.execute('INSERT INTO stores (name, address) VALUES (?, ?)', [name, address])
  } catch (error) {
    console.log(error)
  }
}