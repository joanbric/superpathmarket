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
import { useDebouncedCallback } from 'use-debounce'
import { uuidv4 } from '@/libs/utils'

export type CanvasProps = {
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
}: CanvasProps) {
  const [scale, setScale] = useState(1)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [children, setChildren] = useState<Konva.NodeConfig[]>(nodes)
  const refTransformer = useRef<Konva.Transformer | null>(null)
  const [selectedNode, setSelectedNode] = useState<Konva.Rect | null | Konva.Circle>(null)
  const refStage = useRef<Konva.Stage | null>(null)
  const isFirstLoad = useRef(true)
  const [pathToTarget, setPathToTarget] = useState<number[][]>([])
  const [hasPendingChanges, setHasPendingChanges] = useState(false)


  const handleCanvasKeyDown = (e: KeyboardEvent) => {
    if (editMode && e.key === 'Delete') {
      if (!selectedNode) return
      setChildren(children.filter(child => child.id !== selectedNode.id()))
      setSelectedNode(null)
      e.preventDefault()
    }
  }

  // Save nodes to DB every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (hasPendingChanges) {
        const res = await fetch('/api/sketch/1', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes: children })
        })
        if (!res.ok) {
          console.error('Failed to save nodes to DB')
          return
        }
        const data = await res.json()
        if(data.success) setHasPendingChanges(false)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [hasPendingChanges])


  // Load nodes from localStorage
  useEffect(() => {
    const storage = localStorage.getItem(sketchID)
    if (storage) {
      setChildren(JSON.parse(storage))
    }
  }, [])

  // Save nodes to localStorage in every change in children state
  useEffect(() => {
    if (!editMode) return
    if (!isFirstLoad.current) {
      localStorage.setItem(sketchID, JSON.stringify(children))
    }
    isFirstLoad.current = false
  }, [children, editMode])

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

  useEffect(() => {
    if (!editMode) return
    if (!refTransformer.current) return
    if (selectedNode) refTransformer.current.attachTo(selectedNode)
    else refTransformer.current.detach()
  }, [selectedNode, editMode])

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
          id: uuidv4(),
          name: 'rect',
          type: 'Rect',
          x: evt.offsetX,
          y: evt.offsetY,
          width: 100,
          height: 100,
          fill: 'blue'
        } as Konva.RectConfig
      }
      if (activeTool === TOOLS.CIRCLE) {
        newChild = {
          id: uuidv4(),
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
          id: uuidv4(),
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



  /**
   * This method is used to calculate the distance between two nodes in a canvas.
   * It's used to update the distances of a node when it's moved.
   * It takes a nodeId as an argument and returns an array of distances.
   * The distances are calculated using the A* algorithm.
   * The method is debounced to prevent too many calculations when the node is moved.
   * @constant 1000ms delay for a recalculation
   * @param nodeId The id of the node to calculate the distance for
   */
  const distanceDebounced = useDebouncedCallback((nodeId: string) => {
    const nodeMoved = children.find(child => child.id === nodeId)

    if (!nodeMoved) return
    if (nodeMoved.name !== 'circle' && nodeMoved.name !== 'star') return

    const distances = children
      .filter(child => (child.name === 'circle' || child.name === 'star') && child.id !== nodeId)
      .map(target => {
        const aPos = {
          x: nodeMoved.x as number,
          y: nodeMoved.y as number
        }

        const bPos = {
          x: target.x as number,
          y: target.y as number
        }

        const path = getPath({ aPos, bPos })

        return { targetId: target.id, distance: path?.length || -1 }
      })
    setChildren(
      children.map(child => {
        if (child.id === nodeId) {
          return { ...child, distances }
        } else {
          return {
            ...child,
            distances:
              child.distances?.map((d: { targetId: string; distance: number }) =>
                d.targetId === nodeId ? { ...d, distance: distances.find(d => d.targetId === child.id)?.distance || -1 } : d
              ) || []
          }
        }
      })
    )
  }, 1000)

  const updateNode = ({ nodeId, newNodeConfig }: { nodeId: string; newNodeConfig: Konva.NodeConfig }) => {
    setChildren(
      children.map(child => {
        if (child.id === nodeId) {
          return { ...child, ...newNodeConfig }
        }
        return child
      })
    )
    distanceDebounced(nodeId)
    setHasPendingChanges(true)
  }

  function getPath(pos?: { aPos: { x: number; y: number }; bPos: { x: number; y: number } } | null): number[][] {
    // TODO: I have to calculate the canvas size in base of the children
    // const rows = Math.round(canvasSize.height / GRID_SIZE)
    // const cols = Math.round(canvasSize.width / GRID_SIZE)
    const rows = Math.round(3000 / GRID_SIZE)
    const cols = Math.round(3000 / GRID_SIZE)

    const matrixGrid = Array.from({ length: rows }, () => Array(cols).fill(0))

    if (!Array.isArray(children) || children.length === 0) return [[]]

    children.forEach(child => {
      if (child.name === 'rect') {
        const { x, y, width, height } = child
        if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width) || !Number.isFinite(height)) return

        const startY = Math.round((y as number) / GRID_SIZE)
        const endY = Math.min(startY + Math.round((height as number) / GRID_SIZE), rows)
        const startX = Math.round((x as number) / GRID_SIZE)
        const endX = Math.min(startX + Math.round((width as number) / GRID_SIZE), cols)

        for (let i = startY; i < endY; i++) {
          matrixGrid[i] = matrixGrid[i].fill(1, startX, endX)
        }
      }
    })

    const grid = new Grid(matrixGrid)
    const finder = new AStarFinder()

    const start = pos ? pos.aPos : children.find(child => child.name === 'star')
    const goal = pos ? pos.bPos : children.find(child => child.name === 'circle')

    if (!start || !goal || !start.x || !start.y || !goal.x || !goal.y) {
      return [[]]
    }

    const path = finder.findPath(
      Math.round(start.x / GRID_SIZE),
      Math.round(start.y / GRID_SIZE),
      Math.round(goal.x / GRID_SIZE),
      Math.round(goal.y / GRID_SIZE),
      grid
    )
    return path
  }

  function drawPath() {
    let next = children.find(child => child.name === 'star')?.id
    const order = []
    let remainingNodes = [...children.filter(child => child.name === 'circle' || child.name === 'star')] // Copy of original data to modify

    while (remainingNodes.length > 0) {
      const nextItem = remainingNodes.find(item => item?.id === next)

      if (!nextItem) break // Exit if node not found

      order.push(nextItem)

      // Remove the current node from remainingNodes
      remainingNodes = remainingNodes.filter(item => item.id !== next)

      // Find the closest connected node that still exists in remainingNodes
      let minDistance = Infinity // Initialize to a very large number
      let nextNode = null

      nextItem.distances.forEach((item: { targetId: string; distance: number }) => {
        // Only consider nodes that are still in remainingNodes
        const targetExists = remainingNodes.some(node => node.id === item.targetId)

        if (targetExists && item.distance < minDistance) {
          minDistance = item.distance
          nextNode = item.targetId
        }
      })

      if (!nextNode) break // No valid next node found
      next = nextNode
    }

    let nodeA = 0
    let nodeB = 1
    const path = []
    while (nodeB < order.length) {
      const aPos = {
        x: order[nodeA].x as number,
        y: order[nodeA].y as number
      }
      const bPos = {
        x: order[nodeB].x as number,
        y: order[nodeB].y as number
      }
      path.push(...getPath({ aPos, bPos }))
      nodeA++
      nodeB++
    }

    if (path && path.length > 0) {
      setPathToTarget([...path])
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
      onTap={editMode ? handleCanvasClick : handleCanvasClickOnViewMode}
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
