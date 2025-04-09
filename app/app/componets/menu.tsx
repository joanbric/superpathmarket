'use client'
import {
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
  Sidebar,
  Drawer,
  DrawerHeader,
  DrawerItems,
  ThemeProvider,
  createTheme
} from 'flowbite-react'
import { ArrowLeft, Menu, ChartPie, ListTodo, Map, Citrus, MenuIcon, Store } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const getTheme = (isSidebarOpen: boolean) => {
  return createTheme({
    drawer: {
      root: {
        base: '',
        edge: 'left-10 absolute h-full py-2 flex overflow-hidden rounded-2xl'
      },
      header: {
        collapsed: {
          off: 'hidden',
          on: 'hidden'
        },
        inner: {
          closeButton: isSidebarOpen ? 'text-amber-700' : 'text-white bg-blue-900 top-1/2 -translate-y-1/2',
          closeIcon: 'w-6 h-6'
        }
      },
      items: {
        base: `${isSidebarOpen ? 'block' : 'hidden'}`
      }
    }
  })
}

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
    } else if (pathname === '/app/shoppinglists') {
      return Sections.ShoppingLists
    } else if (pathname === '/app/sketches') {
      return Sections.SketchesStore
    } else if (pathname === '/app/products') {
      return Sections.Products
    }else if (pathname === '/app/stores'){
      return Sections.Stores
    }
    return Sections.Dashboard
  })()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  const getSectionColor = (section: Sections) => {
    return section === currentSection ? 'dark:bg-cyan-700 bg-gray-300' : ''
  }



  const sections = [
    { name: Sections.Dashboard, href: '/app' , icon: ChartPie},
    { name: Sections.ShoppingLists, href: '/app/shoppinglists' , icon: ListTodo},
    { name: Sections.SketchesStore, href: '/app/sketches' , icon: Map},
    { name: Sections.Stores, href: '/app/stores' , icon: Store},
    { name: Sections.Products, href: '/app/products' , icon: Citrus}
  ]
  return (
    <>
      <header className="dark:text-white flex justify-start  items-center my-4 relative">

        <ThemeProvider theme={getTheme(isSidebarOpen)}>
          <Drawer
            onClose={closeSidebar}
            open={isSidebarOpen}
            edge
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
        </ThemeProvider>
        <h1 className="font-bold ml-10 text-3xl">{currentSection}</h1>

      </header>
    </>
  )
}
