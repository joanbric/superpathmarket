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
import { ArrowLeft, Menu, ChartPie, ListTodo, Map, Citrus, MenuIcon } from 'lucide-react'
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
                    <SidebarItem
                      href="/app"
                      icon={ChartPie}
                      className={getSectionColor(Sections.Dashboard)}
                      as={Link}
                      onClick={closeSidebar}
                    >
                      Dashboard
                    </SidebarItem>
                    <SidebarItem
                      href="/app/shoppinglists"
                      icon={ListTodo}
                      label="3"
                      labelColor="dark"
                      className={getSectionColor(Sections.ShoppingLists)}
                      as={Link}
                      onClick={closeSidebar}
                    >
                      Shopping Lists
                    </SidebarItem>
                    <SidebarItem
                      href="/app/sketches"
                      icon={Map}
                      label="3"
                      className={getSectionColor(Sections.SketchesStore)}
                      as={Link}
                      onClick={closeSidebar}
                    >
                      Sketches store
                    </SidebarItem>
                    <SidebarItem
                      href="/app/products"
                      icon={Citrus}
                      className={getSectionColor(Sections.Products)}
                      as={Link}
                      onClick={closeSidebar}
                    >
                      Products
                    </SidebarItem>
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
