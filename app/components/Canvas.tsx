'use client'
import { useCanvasResponsive } from '@/hooks/useCanvasResponsive'
import { useDrawGrid } from '@/hooks/useDrawGrid'
import { Layer, Line, Rect, Stage, Transformer } from 'react-konva'
import { useEffect, useRef, useState } from 'react'
import { TOOLS } from '@libs/toolsSelected'
import Konva from 'konva'
import Drawer from '@components/Drawer'
import { GRID_SIZE } from '@libs/constants'
import { AStarFinder, Grid } from 'pathfinding'

type Props = {
  sketchID: string
  showGrid?: boolean
  activeTool?: TOOLS
  setActiveTool?: (tool: TOOLS) => void
  nodes?: Konva.NodeConfig[]
  editMode?: boolean
  showPath?: boolean
}

export default function Canvas({
  sketchID,
  showGrid = true,
  activeTool,
  setActiveTool,
  nodes = [],
  editMode = false,
  showPath = false
}: Props) {
  const [scale, setScale] = useState(1)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [children, setChildren] = useState<Konva.NodeConfig[]>(nodes)
  const refTransformer = useRef<Konva.Transformer | null>(null)
  const [selectedNode, setSelectedNode] = useState<Konva.Rect | null | Konva.Circle>(null)
  const refStage = useRef<Konva.Stage | null>(null)
  const isFirstLoad = useRef(true)
  const [pathToTarget, setPathToTarget] = useState<number[][]>([])

  const handleCanvasKeyDown = (e: KeyboardEvent) => {
    if (editMode && e.key === 'Delete') {
      if (!selectedNode) return
      setChildren(children.filter(child => child.id !== selectedNode.id()))
      setSelectedNode(null)
      e.preventDefault()
    }
  }

  // Load nodes from localStorage
  useEffect(() => {
    const storage = localStorage.getItem(sketchID)
    if (storage) {
      setChildren(JSON.parse(storage))
    }
  }, [])

  // Save nodes to localStorage in every change in children state
  if (editMode) {
    useEffect(() => {
      if (!isFirstLoad.current) {
        localStorage.setItem(sketchID, JSON.stringify(children))
      }
      isFirstLoad.current = false
    }, [children])
  }

  useEffect(() => {
    if (!refStage.current) return
    const stage = refStage.current
    const container = stage.container()
    container.tabIndex = 1
    container.addEventListener('keydown', handleCanvasKeyDown)
    container.focus()

    return () => {
      container.removeEventListener('keydown', handleCanvasKeyDown)
    }
  }, [selectedNode])
  if (editMode) {
    useEffect(() => {
      if (!refTransformer.current) return
      if (selectedNode) refTransformer.current.attachTo(selectedNode)
      else refTransformer.current.detach()
    }, [selectedNode])
  }
  const handleCanvasClickOnViewMode = () => {}
  const handleCanvasClick = ({ evt, target }: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === TOOLS.NONE && target.name() === 'Stage') {
      setSelectedNode(null)
      return
    }
    if (target.name() === 'Stage') {
      let newChild: Konva.RectConfig | Konva.CircleConfig | null = null
      if (activeTool === TOOLS.SQUARE) {
        newChild = {
          id: crypto.randomUUID(),
          name: 'rect',
          type: 'Rect',
          x: evt.offsetX,
          y: evt.offsetY,
          width: 100,
          height: 100,
          fill: 'white'
        } as Konva.RectConfig
      }
      if (activeTool === TOOLS.CIRCLE) {
        newChild = {
          id: crypto.randomUUID(),
          name: 'circle',
          type: 'Circle',
          x: evt.offsetX,
          y: evt.offsetY,
          radius: 25,
          fill: 'green',
          opacity: 1
        } as Konva.CircleConfig
      }
      if (activeTool === TOOLS.STAR) {
        newChild = {
          id: crypto.randomUUID(),
          name: 'star',
          type: 'Star',
          x: evt.offsetX,
          y: evt.offsetY,
          numPoints: 5,
          innerRadius: 25,
          outerRadius: 50,
          fill: 'yellow',
          opacity: 1
        } as Konva.StarConfig
      }

      if (newChild)
        setChildren(prev => {
          const shortFn = (a: Konva.RectConfig | Konva.CircleConfig, b: Konva.RectConfig | Konva.CircleConfig) => {
            if (b.name === 'circle') return -1
            return 1
          }
          return [...prev, newChild].sort(shortFn)
        })
      setSelectedNode(null)
    } else {
      const ref = target as Konva.Rect | null | Konva.Circle
      setSelectedNode(ref)
    }
    if (setActiveTool) setActiveTool(TOOLS.NONE)
  }

  const handleCanvasWheel = ({ evt, currentTarget }: Konva.KonvaEventObject<WheelEvent>) => {
    if (currentTarget.name() !== 'Stage') return
    evt.preventDefault()
    const stage = currentTarget as Konva.Stage
    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()

    if (!pointer) return
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale
    }

    // how to scale? Zoom in? Or zoom out?
    let direction = evt.deltaY > 0 ? 1 : -1

    // when we zoom on trackpad, evt.ctrlKey is true
    // in that case lets revert direction
    if (evt.ctrlKey) {
      direction = -direction
    }

    const scaleBy = 1.1
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

    if (newScale < 0.5 || newScale > 10) return
    stage.scale({ x: newScale, y: newScale })

    const newPosX = pointer.x - mousePointTo.x * newScale
    const newPosY = pointer.y - mousePointTo.y * newScale
    const newPos = {
      x: newPosX,
      y: newPosY
    }
    stage.position(newPos)
    setScale(newScale)
    stage.batchDraw()
  }

  useCanvasResponsive(setCanvasSize, { ...canvasSize })

  const { horizontalLines, vertialLines } = useDrawGrid(canvasSize, GRID_SIZE, scale)

  const updateNode = ({ nodeId, newNodeConfig }: { nodeId: string; newNodeConfig: Konva.NodeConfig }) => {
    setChildren(
      children.map(child => {
        if (child.id === nodeId) {
          return { ...child, ...newNodeConfig }
        }
        return child
      })
    )
  }

  function drawPath() {
    // const rows = Math.round(canvasSize.height / GRID_SIZE)
    // const cols = Math.round(canvasSize.width / GRID_SIZE)
    const rows = Math.round(3000 / GRID_SIZE)
    const cols = Math.round(3000 / GRID_SIZE)

    const matrixGrid = Array.from({ length: rows }, () => Array(cols).fill(0))

    if (!Array.isArray(children) || children.length === 0) return

    children.forEach(child => {
      if (child.name === 'rect') {
        const { x, y, width, height } = child
        console.group('Rect')
        console.log(x, y, width, height)
        if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width) || !Number.isFinite(height)) return

        const startY = Math.round(y as number / GRID_SIZE)
        const endY = Math.min(startY + Math.round(height as number / GRID_SIZE), rows)
        const startX = Math.round(x as number / GRID_SIZE)
        const endX = Math.min(startX + Math.round(width as number / GRID_SIZE), cols)

        console.log(startY, endY, startX, endX)
        console.groupEnd()
        for (let i = startY; i < endY; i++) {
          matrixGrid[i] = matrixGrid[i].fill(1, startX, endX)
        }
      }
    })

    const grid = new Grid(matrixGrid)
    const finder = new AStarFinder()
    const start = children.find(child => child.name === 'star')
    const goal = children.find(child => child.name === 'circle')

    if (!start || !goal || !start.x || !start.y || !goal.x || !goal.y) {
      console.error('Start or goal position not found')
      return
    }

    try {
      const path = finder.findPath(
        Math.round(start.x / GRID_SIZE),
        Math.round(start.y / GRID_SIZE),
        Math.round(goal.x / GRID_SIZE),
        Math.round(goal.y / GRID_SIZE),
        grid
      )
      if (path && path.length > 0) {
        setPathToTarget([...path])
        console.log('Path found:', path)
      } else {
        console.log('No path found')
      }
    } catch (error) {
      console.error('Error finding path:', error)
    }
  }

  useEffect(() => {
    if (showPath) drawPath()
  }, [children])
  return (
    <Stage
      width={canvasSize.width}
      height={canvasSize.height}
      onClick={editMode ? handleCanvasClick : handleCanvasClickOnViewMode}
      onWheel={handleCanvasWheel}
      name="Stage"
      draggable
      ref={refStage}
    >
      <Layer>
        {showGrid &&
          horizontalLines.map((line, index) => (
            <Line
              key={index}
              {...line}
            />
          ))}
        {showGrid &&
          vertialLines.map((line, index) => (
            <Line
              key={index}
              {...line}
            />
          ))}

        {children.map((child, index) => (
          <Drawer
            key={index}
            node={child}
            updateNode={updateNode}
            editMode={editMode}
          />
        ))}

        {pathToTarget.map((position, index) => (
          <Rect
            key={index.toString() + 'path'}
            x={position[0] * GRID_SIZE}
            y={position[1] * GRID_SIZE}
            width={GRID_SIZE}
            height={GRID_SIZE}
            fill="green"
          />
        ))}

        {selectedNode && (
          <Transformer
            ref={refTransformer}
            keepRatio={selectedNode?.attrs?.name?.includes('circle')}
            flipEnabled={false}
            borderEnabled={false}
          />
        )}
      </Layer>
    </Stage>
  )
}
