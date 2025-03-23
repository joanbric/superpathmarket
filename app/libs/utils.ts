import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
