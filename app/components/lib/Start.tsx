import { Circle} from 'react-konva'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
interface CustomCircleConfig extends Konva.CircleConfig {
  onDragMove?: (e: KonvaEventObject<DragEvent>) => void
}
export default function Start(props: CustomCircleConfig) {
  return (
    <Circle
      {...props}
      fill="red"
      onDragMove={props.onDragMove}
      draggable
      id="start"
    />
  )
}
