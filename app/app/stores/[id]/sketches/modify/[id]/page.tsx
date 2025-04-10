'use client'
import { TOOLS } from '@libs/toolsSelected'
import dynamic from 'next/dynamic'
import DrawingTools from './components/DrawingTools'
import { useState } from 'react'
import { useParams } from 'next/navigation'

const Canvas = dynamic(() => import('@components/Canvas'), { ssr: false })

export default function ModifingSketchPage() {
  const { id } = useParams()
  console.log(id)
  const [activeTool, setActiveTool] = useState(TOOLS.NONE)
  return (
    <>
      <Canvas
        showGrid={true}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        sketchID={id as string}
        editMode={true}
      />
      <DrawingTools
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />
    </>
  )
}
