
import { ShoppingCart, MapPin, CheckSquare, Smartphone } from 'lucide-react'
import Link from 'next/link'

function HomePage() {
  return (
    <>


      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="dark:text-white font-bold mb-6 text-5xl text-gray-900">Shop Smarter, Not Harder</h1>
          <p className="dark:text-gray-300 max-w-2xl mb-12 mx-auto text-gray-600 text-xl">
            Navigate your supermarket like a pro with our intelligent shopping assistant. Find items faster, stay organized, and never
            forget what you need to buy.
          </p>
          <Link
            href="/app"
            className="bg-blue-600 font-medium hover:bg-blue-700 inline-flex items-center px-8 py-4 rounded-lg text-lg text-white transition-colors"
          >
            Start Shopping Now
            <ShoppingCart className="h-5 ml-2 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="dark:text-white font-bold mb-16 text-3xl text-center text-gray-900">Everything You Need for Efficient Shopping</h2>
          <div className="gap-12 grid md:grid-cols-3">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 h-16 inline-flex items-center justify-center mb-6 rounded-full w-16">
                <CheckSquare className="dark:text-blue-400 h-8 text-blue-600 w-8" />
              </div>
              <h3 className="dark:text-white font-semibold mb-4 text-xl">Smart Shopping Lists</h3>
              <p className="dark:text-gray-300 text-gray-600">
                Create and manage your shopping lists with ease. Mark items as you go and never miss an item.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 h-16 inline-flex items-center justify-center mb-6 rounded-full w-16">
                <MapPin className="dark:text-blue-400 h-8 text-blue-600 w-8" />
              </div>
              <h3 className="dark:text-white font-semibold mb-4 text-xl">Store Navigation</h3>
              <p className="dark:text-gray-300 text-gray-600">
                Find items quickly with our intelligent store mapping system. Know exactly where everything is.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 h-16 inline-flex items-center justify-center mb-6 rounded-full w-16">
                <Smartphone className="dark:text-blue-400 h-8 text-blue-600 w-8" />
              </div>
              <h3 className="dark:text-white font-semibold mb-4 text-xl">Mobile Friendly</h3>
              <p className="dark:text-gray-300 text-gray-600">
                Access your shopping assistant anywhere. Designed for the perfect mobile experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="dark:text-white font-bold mb-6 text-3xl text-gray-900">Ready to Transform Your Shopping Experience?</h2>
          <p className="dark:text-gray-300 max-w-2xl mb-12 mx-auto text-gray-600 text-xl">
            Join thousands of shoppers who have made their supermarket trips more efficient and enjoyable.
          </p>
          <Link
            href="/app"
            className="bg-blue-600 font-medium hover:bg-blue-700 inline-flex items-center px-8 py-4 rounded-lg text-lg text-white transition-colors"
          >
            Get Started
            <ShoppingCart className="h-5 ml-2 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4 space-x-3">
            <ShoppingCart className="dark:text-blue-400 h-6 text-blue-600 w-6" />
            <span className="dark:text-white font-bold text-gray-900 text-xl">SmartShop Assistant</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
