import react from "react"
import { games as initialGames } from "@/data/games"
import GameGrid from "@/components/games/GameGrid"
import Filters from "@/components/games/Filters"
import SearchBar from "@/components/games/SearchBar"
import Featured from "@/components/games/Featured"

export default function HomePage() {
  return (
    <>
      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="flex gap-6 mt-8">
        <aside className="hidden lg:block w-64">
          <Filters />
        </aside>

        <section className="flex-1">
          <GameGrid games={initialGames} />
        </section>
      </div>
      <div className="mt-8"> </div>
      <Featured items={initialGames.filter((g) => g.featured)} />
    </>
  )
}
