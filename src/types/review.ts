export type Review = {
  id: string
  gameId?: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}

export type GameWithReviews = {
  id: string
  title: string
  reviews: Review[]
}
