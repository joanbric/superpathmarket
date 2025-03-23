import { useEffect, useRef, useState } from 'react'

import Konva from 'konva'

export function useDrawGrid(canvasSize: { width: number; height: number }, gridSize: number, scale: number) {
  const [horizontalLines, setHorizontalLines] = useState<Konva.LineConfig[]>([])
  const [vertialLines, setVertialLines] = useState<Konva.LineConfig[]>([])
  const maxVerticalLines = Math.round(canvasSize.width / gridSize)
  const maxHorizontalLines = Math.round(canvasSize.height / gridSize)
  const lastMaxScale = useRef(scale)
  useEffect(() => {
    const linesH: Konva.LineConfig[] = []
    const linesV: Konva.LineConfig[] = []

    const STROKE_GRID_LINES_WIDTH = 0.1
    const OPACITY_GRID_LINES = 0.5

    if (lastMaxScale.current < scale) return
    lastMaxScale.current = scale

    for (let i = 0; i <= Math.round(maxVerticalLines / scale); i++) {
      
      linesV.push({
        points: [i * gridSize, 0, i * gridSize, canvasSize.height / scale],
        stroke: 'white',
        strokeWidth: STROKE_GRID_LINES_WIDTH,
        opacity: OPACITY_GRID_LINES
      })
    }

    for (let i = 0; i <= Math.round(maxHorizontalLines / scale); i++) {
      linesH.push({
        points: [0, i * gridSize, canvasSize.width / scale, i * gridSize],
        stroke: 'white',
        strokeWidth: STROKE_GRID_LINES_WIDTH,
        opacity: OPACITY_GRID_LINES
      })
    }
    setHorizontalLines([...linesH])
    setVertialLines([...linesV])
  }, [canvasSize, scale])

  return { horizontalLines, vertialLines }
}
