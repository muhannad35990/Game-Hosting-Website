"use client"
import { useGameStore } from "@/store/gameStore"
import { GamePlayerProps } from "@/types/game"
import { Expand } from "lucide-react"
import { useRef, useState } from "react"

export default function GamePlayer({
  iframeUrl,
  title,
  gameId
}: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [errored, setErrored] = useState(false)
  const [loading, setLoading] = useState(true)
  const markPlayed = useGameStore((s) => s.markPlayed)

  const enterFullscreen = async () => {
    const el = containerRef.current
    if (!el) return

    if (el.requestFullscreen) await el.requestFullscreen()
    else if ((el as any).webkitRequestFullscreen)
      (el as any).webkitRequestFullscreen()
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="bg-black rounded-md overflow-hidden aspect-video relative"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            Loading...
          </div>
        )}
        {errored && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/60">
            <div>Failed to load game.</div>
            <button
              onClick={() => {
                setErrored(false)
                iframeRef.current?.contentWindow?.location.reload()
              }}
              className="mt-2 px-3 py-1 bg-white text-black rounded"
            >
              Retry
            </button>
          </div>
        )}

        <iframe
          ref={iframeRef}
          title={title}
          src={iframeUrl}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="w-full h-full"
          onLoad={() => {
            setLoading(false)
            markPlayed(gameId) // ← This stores the game ID as "played"
          }}
          onError={() => {
            setErrored(true)
            setLoading(false)
          }}
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={enterFullscreen}
          className="px-3 py-1 bg-gray-800 text-white rounded flex items-center gap-4"
        >
          <Expand />
          Fullscreen
        </button>
      </div>
    </div>
  )
}
