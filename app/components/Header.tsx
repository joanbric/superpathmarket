'use client'
import Link from 'next/link'
import DarkLightToggle from '@components/DarkLightToggle'
import { usePathname } from 'next/navigation'
export default function Header() {
  const rutaCompleta = usePathname()

  const isInSketch = rutaCompleta.includes('sketch')
  const justifyContent = isInSketch ? 'flex-end' : 'space-between'
  return (
    <header className="fixed flex items-center left-0 p-4 right-0 top-0 z-50" style={{ justifyContent }}>
      {!isInSketch && (
        <nav className="flex gap-2 items-center">
          <b className="font-bold">La ruta es: {rutaCompleta}</b>
          <Link href="/sketch/modify/asda-boldon">Modify asda boldon</Link>
        </nav>
      )}
      <DarkLightToggle />
    </header>
  )
}
