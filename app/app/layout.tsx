'use client'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import { ChartPie, Map, ListTodo, Menu, ArrowLeft, Citrus } from 'lucide-react'
import { useState } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <header className="dark:text-white flex gap-4 items-center my-4 pl-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="font-bold text-3xl">Products</h1>
      </header>
      <div className="flex min-h-screen">
        <Sidebar
          aria-label="Default sidebar"
          title="Menu"
          className={`w-64 fixed z-50 md:relative   top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <button
            className="text-amber-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem
                href="/app"
                icon={ChartPie}
              >
                Dashboard
              </SidebarItem>
              <SidebarItem
                href="/app/shoppinglists"
                icon={ListTodo}
                label="3"
                labelColor="dark"
              >
                Shopping Lists
              </SidebarItem>
              <SidebarItem
                href="/app/sketches"
                icon={Map}
                label="3"
              >
                Sketches store
              </SidebarItem>
              <SidebarItem
                href="/app/products"
                icon={Citrus}
              >
                Products
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>

        <main className="duration-300 flex-1 p-4 transition-all">{children}</main>
      </div>
    </>
  )
}
