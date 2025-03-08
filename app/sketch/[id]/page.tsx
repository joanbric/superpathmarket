'use client'

import { Stage, Layer, Circle, Rect } from 'react-konva'

export default function SketchManager() {
  return (
    <>
      <h1 className="text-4xl font-bold">SketchManager</h1>

      <Stage
        width={400}
        height={400}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={200}
            height={200}
            fill="red"
          />
          <Circle
            x={0}
            y={0}
            radius={100}
            stroke="blue"
            strokeWidth={2}
          />
        </Layer>
      </Stage>
    </>
  )
}
