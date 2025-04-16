'use client'
import { TOOLS } from '@libs/toolsSelected'
import dynamic from 'next/dynamic'
import DrawingTools from './components/DrawingTools'
import { useState } from 'react'
import { useParams } from 'next/navigation'

const Canvas = dynamic(() => import('@components/Canvas'), { ssr: false })

export default function ModifingSketchPage() {
  const { sketch_id } = useParams()
  const [activeTool, setActiveTool] = useState(TOOLS.NONE)
  if (!sketch_id) return <p className="font-bold py-5 text-center text-gray-500">Begin by creating a sketch</p>
  return (
    <>
      <Canvas
        showGrid={true}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        sketchID={sketch_id as string}
        editMode={true}
      />
      <DrawingTools
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />
    </>
  )
}
