export interface TPointerEvent extends MouseEvent {
  buttons: number
  offsetX: number
  offsetY: number
}

export type Tools = typeof Tools

export type Store = {
  id: number
  name: string
  address: string
  img_url: string | null
}

export type Sketch = { store_id: number; nodes: Konva.NodeConfig[] }
