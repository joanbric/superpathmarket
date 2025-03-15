'use client'
import { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import Konva from 'konva'
import Wall from '@components/lib/Wall'
import Start from '@components/lib/Start'
import Goal from '@components/lib/Goal'
import Pathfinding, { AStarFinder, Grid } from 'pathfinding'

const exportedLayout = [
  {
    attrs: {
      radius: 50,
      fill: 'red',
      x: 200,
      y: 300,
      draggable: true
    },
    className: 'Circle'
  },
  {
    attrs: {
      radius: 50,
      fill: 'green',
      x: 700,
      y: 300,
      draggable: true
    },
    className: 'Circle'
  },
  {
    attrs: {
      ref: {},
      x: 400,
      y: 200,
      width: 100,
      height: 400,
      fill: 'red',
      draggable: true,
      skewX: 7.18243109871034e-27
    },
    className: 'Rect'
  },
  {
    attrs: {
      ref: {},
      keepRatio: false,
      x: 410,
      y: 162,
      flipEnabled: false
    },
    className: 'Transformer'
  }
]

const gridSize = 100
// const gridWidth = 1000
// const gridHeight = 1000
export default function Page() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [walls, setWalls] = useState<Konva.RectConfig[]>([])
  const refLayer = useRef<Konva.Layer>(null)
  const [pathToTarget, setPathToTarget] = useState<number[][]>([])
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    return () => {
      window.onresize = null
    }
  }, [])
  function exportLayout() {
    if (!refLayer.current) return
    const layout = refLayer.current.toObject()
    console.log(layout)
  }

  function showPath() {
    // Crear matriz con filas independientes
    const rows = Math.round(height / gridSize)
    const cols = Math.round(width / gridSize)
    const matrixGrid = new Array(rows).fill([]).map(() => new Array(cols).fill(0))
    const exportedLayer = refLayer.current?.getChildren()
    if (!exportedLayer) return
    console.log(matrixGrid)
    exportedLayer.forEach(item => {
      console.log('El item es:', item)
      if (item.className === 'Rect') {
        const { x, y, width, height } = item.attrs
        if (!x || !y || !width || !height) return
        for (let i = Math.round(y / gridSize); i < Math.round(y / gridSize) + Math.round(height / gridSize); i++) {
          matrixGrid[i] = matrixGrid[i].fill(1, Math.round(x / gridSize), Math.round(x / gridSize) + Math.round(width / gridSize))
        }
      }
    })

    console.log(matrixGrid)
    const grid = new Grid(matrixGrid)
    const finder = new AStarFinder()
    const start = refLayer.current?.findOne('#start')
    const goal = refLayer.current?.findOne('#target')
    console.log(start, goal)
    if (!start || !goal) return
    const path = finder.findPath(
      Math.round(start.attrs.x / gridSize),
      Math.round(start.attrs.y / gridSize),
      Math.round(goal.attrs.x / gridSize),
      Math.round(goal.attrs.y / gridSize),
      grid
    )
    if (!path) return
    setPathToTarget([...path])
    refLayer.current?.batchDraw()
    console.log(path)
  }

  useEffect(() => {
    console.log('Path to target:', pathToTarget)
  }, [pathToTarget])
  function handleWallDragMove(e: Konva.KonvaEventObject<DragEvent>) {
    const rect = e.target
    const x = Math.round(rect.x() / gridSize) * gridSize
    const y = Math.round(rect.y() / gridSize) * gridSize

    rect.position({
      x: x,
      y: y
    })
    refLayer.current?.batchDraw()
  }

  function showStart() {
    const start = refLayer.current?.findOne('#start')
    console.log(start)
  }
  function handleTransform(e: Konva.KonvaEventObject<Event>) {
    const rect = e.target
    let width = Math.round((rect.width() * rect.scaleX()) / gridSize) * gridSize
    let height = Math.round((rect.height() * rect.scaleY()) / gridSize) * gridSize

    if (width < gridSize) {
      width = gridSize
    }
    if (height < gridSize) {
      height = gridSize
    }
    rect.size({
      width: width,
      height: height
    })

    rect.scaleX(1)
    rect.scaleY(1)
    refLayer.current?.batchDraw()
  }
  return (
    <>
      <button
        onClick={() => {
          setWalls([...walls, { x: 100, y: 100, width: 200, height: 200, fill: 'red', draggable: true }])
        }}
      >
        Add wall
      </button>
      <button onClick={exportLayout}>Export layout</button>
      <button onClick={() => showPath()}>Show path</button>
      <button onClick={() => showStart()}>Show Start</button>
      <button onClick={() => setPathToTarget([...pathToTarget, [100, 100]])}>Add new Path in list</button>
      <Stage
        width={width}
        height={height}
      >
        <Layer ref={refLayer}>
          <Start
            radius={50}
            fill="red"
            x={100}
            y={100}
            onDragMove={handleWallDragMove}
          />
          <Goal
            radius={50}
            fill="green"
            x={400}
            y={400}
            onDragMove={handleWallDragMove}
          />
          {walls.map((wall, index) => (
            <Wall
              key={index}
              onDragMove={handleWallDragMove}
              onTransform={handleTransform}
              hasTransformer
              {...wall}
            />
          ))}

          {pathToTarget.map((position, index) => (
            <Rect
              key={index.toString() + 'path'}
              x={position[0] * gridSize}
              y={position[1] * gridSize}
              width={gridSize}
              height={gridSize}
              fill="green"
              draggable
            />
          ))}
        </Layer>
      </Stage>
    </>
  )
}
