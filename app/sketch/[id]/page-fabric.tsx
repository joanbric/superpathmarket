'use client'

import { TPointerEvent } from '@/types'
import { Canvas, Point, Rect, TPointerEventInfo } from 'fabric'
import { useEffect, useRef, useState } from 'react'

export default function SketchManager() {
  const refCanvasElement = useRef<HTMLCanvasElement>(null)
  const refFabricCanvas = useRef<Canvas>(null)
  const prevMousePosition = new Point(0, 0)
  const [dragEvent, setDragEvent] = useState(null)

  useEffect(() => {
    console.log('Iniciamos el efecto')
    if (!refCanvasElement.current) return
    if (refFabricCanvas.current !== null) return
    refFabricCanvas.current = new Canvas(refCanvasElement.current, {
      backgroundColor: 'white',
      width: 800,
      height: 800,
      allowTouchScrolling: true,
      controlsAboveOverlay: true,
      skipOffscreen: true,
      uniScaleKey: 'shiftKey',
      uniformScaling: false,
      enableRetinaScaling: true
    })
    refFabricCanvas.current.add(new Rect({ width: 100, height: 100, fill: 'red' }))
    refFabricCanvas.current.on('mouse:up', () => {
      prevMousePosition.setFromPoint(new Point(0, 0))
    })
    refFabricCanvas.current.on('mouse:down', (options: TPointerEventInfo) => {
      const e = options.e as unknown as TPointerEvent
      if (e.buttons !== 1 || !e.altKey) return
      prevMousePosition.setFromPoint(new Point(e.offsetX, e.offsetY))
    })
    refFabricCanvas.current.on('mouse:move', (options: TPointerEventInfo) => {
      const e = options.e as unknown as TPointerEvent
      if (e.buttons !== 1 || !e.altKey) return

      console.log('Event: ', e)
      const currentMousePosition = new Point(e.offsetX, e.offsetY)

      if (!refFabricCanvas.current) return
      const movement = currentMousePosition.subtract(prevMousePosition)
      // const { x, y } = refFabricCanvas.current.getScenePoint()
      refFabricCanvas.current?.relativePan(movement)
      prevMousePosition.setFromPoint(currentMousePosition)
    })
    refFabricCanvas.current.on('mouse:move', (options: TPointerEventInfo) => {
      const e = options.e as unknown as TPointerEvent
      setDragEvent({ type: e.type, offsetX: e.offsetX, offsetY: e.offsetY })
    })

    refFabricCanvas.current.renderAll()

    console.log('canvas initialized', refFabricCanvas.current)
  }, [refCanvasElement.current])

  const handleAddText = () => {
    if (!refFabricCanvas.current) return
    refFabricCanvas.current.add(new Rect({ width: 100, height: 100, fill: 'blue' }))
    refFabricCanvas.current.renderAll()
  }

  return (
    <>
      <h1>SketchManager</h1>
      <canvas
        ref={refCanvasElement}
        className="border"
      />

      <button onClick={handleAddText}>Add more shape</button>
      <button onClick={() => console.log(JSON.stringify(refFabricCanvas.current))}>Show JSON</button>
      <button onClick={() => refFabricCanvas.current?.setZoom(2)}>Zoom</button>
      <button onClick={() => refFabricCanvas.current?.setZoom(1)}>Reset Zoom</button>
      <button onClick={() => refFabricCanvas.current?.absolutePan(new Point(10, 10))}>Move</button>
      {/* <button onClick={() => refFabricCanvas.current?.setViewportTransform([1, 0, 0, 1, 30, 40])}>Move</button> */}
      {dragEvent && <p>Drag event: {JSON.stringify(dragEvent)}</p>}
    </>
  )
}
