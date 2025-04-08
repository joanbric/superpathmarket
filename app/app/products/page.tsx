import ImageWithFallback from '@/components/ImageWithFallback'
import EditProductModal from './EditProductModal'
import { Card, ListGroup, ListItem } from 'flowbite-react'

type Product = {
  id: number
  name: string
  price: number
  img_url: string
  plu: null
}

const assetsURL = 'https://assets.joanbric.dev'

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api'

export default async function ProductsPage() {
  const products = await fetch(`${API_URL}/products`)
  const productsData = (await products.json()) as Product[]

  return (
    <>
      {/* 🚨 Remember h1 tag in the header. Only use h2 to h6 tags. */}

      <div className="flex mb-4">
        <EditProductModal operationType="create" />
      </div>

      <ListGroup className="grid grid-min-cols-5 gap-2">
        {productsData.map(product => (
          <ListItem key={product.id}>
            <Card className="md:max-w-xs">
              <ImageWithFallback
                src={`${assetsURL}/${product.img_url}`}
                alt="Product image"
                fallback="/imgs/product-placeholder.webp"
                height={288}
                className="aspect-square h-[288px] object-cover"
              />

              <a href="#">
                <h5 className="dark:text-white font-semibold text-gray-900 text-lg tracking-tight">{product.name}</h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="dark:text-white font-bold text-gray-900 text-lg">$599</span>
                <a
                  href="#"
                  className="bg-cyan-700 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium hover:bg-cyan-800 px-5 py-2.5 rounded-lg text-center text-sm text-white"
                >
                  Edit
                </a>
              </div>
            </Card>
          </ListItem>
        ))}
      </ListGroup>
    </>
  )
}
