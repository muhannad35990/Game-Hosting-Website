"use client"
import Image from "next/image"
import Link from "next/link"
import { FeaturedProps } from "@/types/game"
import react from "react"

export default function Featured({ items }: FeaturedProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Featured Games
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((game) => (
          <Link
            href={`/games/${game.id}`}
            key={game.id}
            className="group block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
                {game.title}
              </h3>
              {game.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {game.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
