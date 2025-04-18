'use client'
import { SidebarItemGroup, SidebarItems, SidebarItem, Sidebar, Drawer, DrawerHeader, DrawerItems } from 'flowbite-react'
import { ArrowLeft, Menu, ChartPie, ListTodo, Citrus, MenuIcon, Store } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

enum Sections {
  Dashboard = 'Dashboard',
  ShoppingLists = 'Shopping Lists',
  SketchesStore = 'Sketches store',
  Stores = 'Stores',
  Products = 'Products'
}

export default function AppMenu() {
  const pathname = usePathname()

  const currentSection = (() => {
    if (pathname === '/app') {
      return Sections.Dashboard
    } else if (pathname.includes('/app/shoppinglists')) {
      return Sections.ShoppingLists
    } else if (pathname.includes('/app/sketches')) {
      return Sections.SketchesStore
    } else if (pathname.includes('/app/products')) {
      return Sections.Products
    } else if (pathname.includes('/app/stores')) {
      return Sections.Stores
    }
    return Sections.Dashboard
  })()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  const getSectionColor = (section: Sections) => {
    return section === currentSection ? 'dark:bg-cyan-700 bg-gray-300 dark:text-white dark:stroke-white' : ''
  }

  const sections = [
    { name: Sections.Dashboard, href: '/app', icon: ChartPie },
    { name: Sections.ShoppingLists, href: '/app/shoppinglists', icon: ListTodo },
    { name: Sections.Stores, href: '/app/stores', icon: Store },
    { name: Sections.Products, href: '/app/products', icon: Citrus }
  ]
  if(pathname.includes('/app/stores/')) {
    return null
  }
  return (
    <>
      <header className="dark:text-white flex items-center justify-start max-w-7xl mx-auto md:my-4 md:px-4 relative w-full">
        <Drawer
          onClose={closeSidebar}
          open={isSidebarOpen}
          edge
          theme={{
            root: {
              base: !isSidebarOpen ? 'bg-transparent dark:bg-transparent relative' : '',
              edge: !isSidebarOpen ? 'h-auto w-fit translate-0 flex justify-center' : ''
            },
            header: {
              collapsed: {
                off: 'hidden',
                on: 'hidden'
              },
              inner: {
                closeButton: isSidebarOpen ? 'text-amber-700' : 'text-black dark:text-white bg-indigo-100 dark:bg-cyan-700 translate-x-0 static',
                closeIcon: 'w-6 h-6',
                titleText: isSidebarOpen ? '' : 'hidden'
              }
            },
            items: {
              base: `${isSidebarOpen ? 'block' : 'hidden'}`
            }
          }}
        >
          <DrawerHeader
            title="Menu"
            titleIcon={Menu}
            closeIcon={isSidebarOpen ? ArrowLeft : MenuIcon}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <DrawerItems>
            <Sidebar
              aria-label="Default sidebar"
              title="Menu"
            >
              <SidebarItems>
                <SidebarItemGroup>
                  {sections.map(section => (
                    <SidebarItem
                      key={section.name}
                      href={section.href}
                      icon={section.icon}
                      className={getSectionColor(section.name)}
                      as={Link}
                      onClick={closeSidebar}
                    >
                      {section.name}
                    </SidebarItem>
                  ))}
                </SidebarItemGroup>
              </SidebarItems>
            </Sidebar>
          </DrawerItems>
        </Drawer>
        <h1 className="font-bold  text-3xl">{currentSection}</h1>
      </header>
    </>
  )
}
