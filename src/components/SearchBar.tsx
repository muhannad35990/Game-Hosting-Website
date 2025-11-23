"use client"
import { useEffect, useState } from "react"
import { useGameStore } from "@/store/gameStore"

export default function SearchBar() {
  const query = useGameStore((s) => s.query)
  const setQuery = useGameStore((s) => s.setQuery)
  const [value, setValue] = useState(query)

  // real-time search with small debounce
  useEffect(() => {
    const t = setTimeout(() => setQuery(value), 200)
    return () => clearTimeout(t)
  }, [value, setQuery])

  return (
    <div className="w-full flex justify-center ">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search games by title..."
        className="x-3 p-2 border rounded-lg outline-none w-[700px] bg-white"
      />
    </div>
  )
}
