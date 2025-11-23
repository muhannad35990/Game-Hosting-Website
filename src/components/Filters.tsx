"use client"
import { CATEGORIES } from "@/data/categories"
import { cn } from "@/lib/utils"
import { useGameStore } from "@/store/gameStore"
import { ChartLine, History, Star } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Filters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { selectedCategories, toggleCategory, clearCategories } = useGameStore(
    (state) => state
  )
  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchParams.get("filter") === filter) params.delete("filter")
    else {
      params.set("filter", filter)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }
  return (
    <aside
      className="
        w-64 border-e h-full flex flex-col gap-4"
    >
      {/* Quick Actions */}
      <div className="flex flex-col gap-3 mt-2 text-sm">
        <button
          onClick={() => handleFilter("fav")}
          className={cn(
            "flex items-center gap-2 hover:text-blue-700 transition cursor-pointer hover:bg-blue-200 p-2",
            searchParams.get("filter") === "fav" && "bg-blue-200"
          )}
        >
          <Star color="blue" size={18} /> Favorites
        </button>

        <button
          onClick={() => handleFilter("recent")}
          className={cn(
            "flex items-center gap-2 hover:text-blue-700 transition cursor-pointer hover:bg-blue-200 p-2",
            searchParams.get("filter") === "recent" && "bg-blue-200"
          )}
        >
          <History color="blue" size={18} /> Recently Played
        </button>

        <button className="flex items-center gap-2 hover:text-blue-700 transition cursor-pointer hover:bg-blue-200 p-2">
          <ChartLine color="blue" size={18} /> Top Rated
        </button>
      </div>

      <div className="border-t border-gary-200 mt-2 pt-3" />

      {/* Category checkboxes */}
      <div className="flex flex-col gap-1">
        {CATEGORIES.map((cat) => {
          const isSel = selectedCategories.includes(cat)
          return (
            <label
              key={cat}
              className={`
                flex items-center justify-between cursor-pointer
                px-3 py-2 rounded-lg transition
                ${
                  isSel
                    ? "bg-blue-600/30 text-blue-900 dark:text-gray-100"
                    : "hover:bg-white/10"
                }
              `}
            >
              <span className="text-sm">{cat}</span>

              <input
                type="checkbox"
                checked={isSel}
                onChange={() => toggleCategory(cat)}
                className="accent-blue-500"
              />
            </label>
          )
        })}
      </div>

      {/* Clear button */}
      <button
        onClick={clearCategories}
        className="
       text-xs py-2 text-red-400 hover:text-red-300 transition  border rounded-lg w-5/6 text-center self-center cursor-pointer"
      >
        Clear filters
      </button>
    </aside>
  )
}
