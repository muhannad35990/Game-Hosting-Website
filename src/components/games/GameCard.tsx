"use client"
import React from "react"
import Link from "next/link"
import type { Game } from "@/types/game"
import Image from "next/image"
import { useGameStore } from "@/store/gameStore"
import { Star } from "lucide-react"
import { useState } from "react"

export default function GameCard({ game }: { game: Game }) {
  const toggleFav = useGameStore((s) => s.toggleFavorite)
  const isFav = useGameStore((s) => s.favorites).includes(game.id)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-3xl transition flex flex-col w-[300px] cursor-pointer ease-in-out hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/games/${game.id}`}>
        <div className="rounded-t-3xl overflow-hidden mb-3 relative">
          <Image
            src={game.thumbnail}
            alt={game.title}
            width={300}
            height={200}
            className="object-cover w-full h-[200px]"
          />

          {/* Preview overlay */}
          {hovered && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <iframe
                src={game.iframeUrl}
                className="w-full h-full pointer-events-none"
                title={`Preview of ${game.title}`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/games/${game.id}`}>
          <>
            <h3 className="text-lg font-semibold">{game.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
              {game.description}
            </p>
          </>
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <Link
            href={`/games/${game.id}`}
            className="inline-block px-8 py-1.5 bg-blue-600 text-white rounded-full text-sm"
          >
            Play
          </Link>

          <button
            onClick={() => toggleFav(game.id)}
            aria-label="toggle favorite"
            className={`px-2 py-1 rounded absolute top-1 end-2 text-4xl cursor-pointer ease-in-out`}
          >
            <Star
              color="orange"
              style={{ fill: isFav ? "orange" : "", stroke: "orange" }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
