'use client'

import Konva from 'konva'
import { Circle, Group, Rect, Star } from 'react-konva'
import { GRID_SIZE } from '@libs/constants'

export default function Drawer({
  node,
  updateNode,
  editMode = false
}: {
  node: Konva.NodeConfig
  updateNode: ({ nodeId, newNodeConfig }: { nodeId: string; newNodeConfig: Konva.NodeConfig }) => void
  editMode?: boolean
}) {
  function handleWallDragMove(e: Konva.KonvaEventObject<DragEvent>) {
    const rect = e.target

    const x = Math.round(rect.x() / GRID_SIZE) * GRID_SIZE
    const y = Math.round(rect.y() / GRID_SIZE) * GRID_SIZE

    rect.position({
      x: x,
      y: y
    })
  }

  function handleDragEnd(e: Konva.KonvaEventObject<DragEvent>) {
    const shape = e.target
    if (!node.id) return
    updateNode({ nodeId: node.id, newNodeConfig: { x: shape.x(), y: shape.y() } })
  }
  function handleTransform(e: Konva.KonvaEventObject<Event>) {
    if (node.name?.includes('rect')) {
      const modifiedNode = e.target
      let width = Math.round((modifiedNode.width() * modifiedNode.scaleX()) / GRID_SIZE) * GRID_SIZE
      let height = Math.round((modifiedNode.height() * modifiedNode.scaleY()) / GRID_SIZE) * GRID_SIZE

      if (width < GRID_SIZE) {
        width = GRID_SIZE
      }
      if (height < GRID_SIZE) {
        height = GRID_SIZE
      }
      modifiedNode.size({
        width: width,
        height: height
      })

      modifiedNode.scaleX(1)
      modifiedNode.scaleY(1)
      modifiedNode.getLayer()?.batchDraw()
      if (!node.id) return
      updateNode({ nodeId: node.id, newNodeConfig: { width, height } })
    }
  }

  return (
    <>
      <>
        <Group
          x={node.x}
          y={node.y}
          onDragMove={editMode ? handleWallDragMove : undefined}
          onDragEnd={editMode ? handleDragEnd : undefined}
          draggable={editMode}
        >
          {node.name?.includes('rect') && (
            <Rect
              onTransform={editMode ? handleTransform : undefined}
              {...node}
              x={0}
              y={0}
            />
          )}
          {node.name?.includes('circle') && (
            <Circle
              onTransform={editMode ? handleTransform : undefined}
              {...node}
              x={0}
              y={0}
            />
          )}
          {node.name?.includes('star') && (
            <Star
              numPoints={0}
              innerRadius={0}
              outerRadius={0}
              onTransform={editMode ? handleTransform : undefined}
              {...node}
              x={0}
              y={0}
            />
          )}
          {/*   It's the delete button and it should include the delete icon. It is
               placed at the top right corner of Konva Node. */}
          {/* <Circle
            zIndex={100}
            x={node.width}
            y={25}
            radius={10}
            fill="red"
          /> */}
        </Group>
      </>
    </>
  )
}
