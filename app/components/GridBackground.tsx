// This version uses pure CSS for the grid, which is more efficient for simple patterns
export default function OptimizedCssGrid() {
  const gridSize = 50
  const lineWidth = 1
  const lineColor = '#aaa3'

  const style = {
    backgroundImage: `linear-gradient(to right, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px), 
                      linear-gradient(to bottom, ${lineColor} ${lineWidth}px, transparent ${lineWidth}px)`,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    willChange: 'transform' // Hardware acceleration hint
  }

  return (
    /* CSS Grid Background */
    <div
      className="absolute inset-0 -z-10"
      style={style}
    >
      <div className="container mx-auto p-4">Hola</div>
    </div>
  )
}
