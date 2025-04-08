'use client'
import { useState, useEffect } from 'react'

const fallbackImage = '/imgs/product-placeholder.webp'
type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string
  src: string
}
export default function ImageWithFallback({ fallback = fallbackImage, src, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [src])
  return (
    <img
      {...props}
      onError={() => setError(true)}
      src={error ? fallback : src}
    />
  )
}
