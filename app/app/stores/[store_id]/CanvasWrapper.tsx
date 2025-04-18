'use client'
import dynamic from 'next/dynamic'
import { CanvasProps } from '@components/Canvas'
const Canvas = dynamic(() => import('@components/Canvas'), { ssr: false })
import { TOOLS } from '@libs/toolsSelected'
import DrawingTools from './components/DrawingTools'
import { useState } from 'react'
import { Button, Card } from 'flowbite-react'
import DrawerWrapper from './DrawerWrapper'
import { Store } from '@/types'
import { Pencil, PencilOff } from 'lucide-react'

export default function CanvasWrapper({ store, ...props }: CanvasProps & { store: Store }) {
  const [activeTool, setActiveTool] = useState<TOOLS>(TOOLS.NONE)
  const [editMode, setEditMode] = useState(false)


  return (
    <>
      <Canvas
        {...props}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        editMode={editMode}
      />

      <DrawerWrapper activeTool={activeTool} storeName={store.name}>
        {editMode && (
          <DrawingTools
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
        )}
        <Button onClick={() => setEditMode(!editMode)} className="w-full md:w-auto mb-6 mt-3 flex justify-between gap-2 text-md md:mb-10" outline>
          {!editMode ? <PencilOff className='w-5 h-5' /> : <Pencil className='w-5 h-5' />}
          {!editMode ? 'View only' : 'Edit enabled'}
          {!editMode ? <PencilOff className='w-5 h-5' /> : <Pencil className='w-5 h-5' />}
        </Button>
        <Card
          className="mb-2 w-full md:mb-4"
          theme={{ root: { children: 'p-3 gap-0 md:p-6 md:gap-4' } }}
        >
          <p className="dark:text-gray-300 line-clamp-2 text-gray-500 text-pretty text-sm">
            <b>Location:</b> {store.address}
          </p>
        </Card>
      </DrawerWrapper>
    </>
  )
}
