"use client"
import React from "react"
import type { Game } from "@/types/game"
import GameCard from "./GameCard"
import { useGameStore } from "@/store/gameStore"
import { CustomPagination } from "./CustomPagination"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function GameGrid({ games }: { games: Game[] }) {
  const pageSize = 9
  const { favorites, played, query, selectedCategories } = useGameStore(
    (s) => s
  )
  const searchParams = useSearchParams()

  const [paginated, setPaginated] = useState<Game[]>([])
  const [totalPages, setTotalPages] = useState(0)

  const currentPage = Number(searchParams.get("pageNumber") || 1)
  const filter = searchParams.get("filter")

  // Select source list (default, favorites, or recent)
  let baseGames: Game[] = games

  if (filter === "fav") {
    baseGames = games.filter((g) => favorites.includes(g.id))
  }

  if (filter === "recent") {
    baseGames = games.filter((g) => played.includes(g.id))
  }

  useEffect(() => {
    const lowerQuery = query.toLowerCase()

    // 1. Apply search + category filters
    const filtered = baseGames.filter((g) => {
      if (lowerQuery && !g.title.toLowerCase().includes(lowerQuery)) {
        return false
      }

      if (selectedCategories.length > 0) {
        const hasCategory = g.category.some((cat) =>
          selectedCategories.includes(cat)
        )
        if (!hasCategory) return false
      }

      return true
    })

    // 2. Pagination
    const start = (currentPage - 1) * pageSize
    const pageSlice = filtered.slice(start, start + pageSize)

    setPaginated(pageSlice)
    setTotalPages(Math.ceil(filtered.length / pageSize))
  }, [query, selectedCategories, favorites, played, searchParams, games])

  if (paginated.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">No results found.</div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-items-center">
        {paginated.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      <CustomPagination totalPages={totalPages} />
    </div>
  )
}
