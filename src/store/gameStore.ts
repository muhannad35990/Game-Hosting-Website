import { GameStore } from "@/types/game"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      query: "",
      setQuery: (q) => set({ query: q }),

      selectedCategories: [],
      toggleCategory: (c) => {
        const current = get().selectedCategories
        if (current.includes(c))
          set({ selectedCategories: current.filter((x) => x !== c) })
        else set({ selectedCategories: [...current, c] })
      },
      clearCategories: () => set({ selectedCategories: [] }),

      favorites: [],
      toggleFavorite: (id) => {
        const fav = get().favorites
        if (fav.includes(id)) set({ favorites: fav.filter((x) => x !== id) })
        else set({ favorites: [...fav, id] })
      },

      played: [],
      markPlayed: (id) => {
        const list = get().played
        if (!list.includes(id)) {
          set({ played: [...list, id] })
        }
      }
    }),
    {
      name: "game-store",
      partialize: (s) => ({
        favorites: s.favorites,
        played: s.played // persist played games too
      })
    }
  )
)
