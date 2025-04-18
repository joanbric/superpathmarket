'use client'
import { useEffect } from 'react'

export function useCanvasResponsive(
  setCanvasSize: (size: { width: number; height: number }) => void,
  canvasSize: { width: number; height: number }
) {
  const handleResize = () => {
    if (window.innerWidth > canvasSize.width || window.innerHeight > canvasSize.height) {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [canvasSize])

  return canvasSize
}
