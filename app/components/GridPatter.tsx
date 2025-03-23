'use client'
export default function GridPattern({
  size = 20,
  lineWidth = 1,
  lineColor = '#e2e8f0',
  className = ''
}: {
  size?: number
  lineWidth?: number
  lineColor?: string
  className?: string
}) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <svg
        className="h-full w-full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`grid-${size}-${lineWidth}-${lineColor.replace('#', '')}`}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${size} 0 L 0 0 0 ${size}`}
              fill="none"
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#grid-${size}-${lineWidth}-${lineColor.replace('#', '')})`}
        />
      </svg>
    </div>
  )
}
