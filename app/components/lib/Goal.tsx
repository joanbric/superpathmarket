import Konva from 'konva'
import { Circle } from 'react-konva'

export default function Goal(props: Konva.CircleConfig) {
  return <Circle {...props} fill="green" draggable id="target" />
}