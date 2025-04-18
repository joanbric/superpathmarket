'use client'

import { TOOLS } from '@libs/toolsSelected'

export default function DrawingTools({ activeTool, setActiveTool }: { activeTool: TOOLS; setActiveTool: (tool: TOOLS) => void }) {
  const backgroundColor = (tool: TOOLS) => (activeTool === tool ? '#0c8ce9' : 'transparent')
  return (
    <div className="bg-white dark:bg-[#2c2c2c] text-gray-500 dark:text-gray-300 fixed flex flex-col gap-3 items-center left-3 p-2 rounded-lg top-4 z-50">
      <button
        className="p-2 rounded-lg"
        style={{ backgroundColor: backgroundColor(TOOLS.SQUARE) }}
        onClick={() => setActiveTool(TOOLS.SQUARE)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icon-tabler-square icons-tabler-outline"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        </svg>
      </button>
      <button
        className="p-2 rounded-lg"
        style={{ backgroundColor: backgroundColor(TOOLS.CIRCLE) }}
        onClick={() => setActiveTool(TOOLS.CIRCLE)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icon-tabler-circle icons-tabler-outline"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        </svg>
      </button>
      <button
        className="p-2 rounded-lg"
        style={{ backgroundColor: backgroundColor(TOOLS.STAR) }}
        onClick={() => setActiveTool(TOOLS.STAR)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icon-tabler-star icons-tabler-outline"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
      </button>
      <button
        className="p-2 rounded-lg"
        style={{ backgroundColor: backgroundColor(TOOLS.LINE) }}
        onClick={() => setActiveTool(TOOLS.LINE)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icon-tabler-line icons-tabler-outline"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M18 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M7.5 16.5l9 -9" />
        </svg>
      </button>
      <button
        className="p-2 rounded-lg"
        style={{ backgroundColor: backgroundColor(TOOLS.TEXT) }}
        onClick={() => setActiveTool(TOOLS.TEXT)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icon-tabler-letter-case icons-tabler-outline"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M17.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
          <path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" />
          <path d="M3 13h7" />
          <path d="M21 12v7" />
        </svg>
      </button>
    </div>
  )
}
