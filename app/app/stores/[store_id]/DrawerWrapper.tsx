'use client'
import { TOOLS } from '@libs/toolsSelected'
import { Drawer, DrawerHeader, DrawerItems } from 'flowbite-react'
import { Store, ChevronUp, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DrawerWrapper({ storeName, children, activeTool }: { storeName: string; children: React.ReactNode; activeTool: TOOLS }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)
  }, [activeTool])
  return (
    <Drawer
      onClose={() => setOpen(false)}
      open={open}
      edge
      position="bottom"
      theme={{
        root: { edge: 'bottom-14 shadow-[0_-4px_8px_rgba(0,0,0,0.2)]' },
        header: {
          inner: {
            closeButton: 'text-cyan-600 dark:text-cyan-400',
            closeIcon: 'w-6 h-6',
            titleIcon: 'w-6 h-6 absolute left-2',
            titleText: 'text-lg text-nowrap truncate block  max-w-[30ch] sm:max-w-[50ch] md:max-w-[70ch] pl-5 text-cyan-600 dark:text-cyan-400'
          }
        }
      }}
    >
      <DrawerHeader
        title={storeName}
        titleIcon={Store}
        onClick={() => setOpen(!open)}
        closeIcon={open ? ChevronDown : ChevronUp}
      />
      {open && <DrawerItems>{children}</DrawerItems>}
    </Drawer>
  )
}
