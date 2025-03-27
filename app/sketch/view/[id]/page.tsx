'use client'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

const Canvas = dynamic(() => import('@components/Canvas'), { ssr: false })
export default function Page() {
  const { id } = useParams()
  return (
    <>
      <Canvas sketchID={id as string} showPath />  
    </>
  )
}