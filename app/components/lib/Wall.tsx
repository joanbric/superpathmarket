import { Rect, Transformer } from 'react-konva'
import Konva from 'konva'
import { useEffect, useRef } from 'react'

interface CustomRectConfig extends Konva.RectConfig {
  hasTransformer?: boolean
}
export default function Wall(props: CustomRectConfig) {
  const refRect = useRef<Konva.Rect>(null)
  const refTransformer = useRef<Konva.Transformer>(null)
  useEffect(() => {
    refTransformer.current?.nodes([refRect.current!])
  }, [])
  return (
    <>
      <Rect
        ref={refRect}
        {...props}
      />
      {props.hasTransformer && (
        <Transformer
          ref={refTransformer}
          keepRatio={false}
          flipEnabled={false}
        />
      )}
    </>
  )
}
