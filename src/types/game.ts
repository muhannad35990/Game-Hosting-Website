import { Review } from "./review"

export type Category =
  | "Action"
  | "Arcade"
  | "Puzzle"
  | "Sports"
  | "Adventure"
  | "Strategy"
  | "Simulation"
  | "Other"

export interface Game {
  id: string // unique id or slug
  title: string
  description?: string
  thumbnail: string // url
  iframeUrl: string // the game distribution iframe src
  category: Category[]
  featured?: boolean
  reviews: Review[]
}

export interface FeaturedProps {
  items: Game[]
}
export type GameStore = {
  query: string
  setQuery: (q: string) => void

  selectedCategories: string[]
  toggleCategory: (c: string) => void
  clearCategories: () => void

  favorites: string[]
  toggleFavorite: (id: string) => void

  played: string[]
  markPlayed: (id: string) => void
}

export interface GamePlayerProps {
  iframeUrl: string
  title: string
  gameId: string
}

export type ShareBtnProps = {
  title: string
  description?: string
}
