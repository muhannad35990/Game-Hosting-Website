"use client"
import react from "react"
import { Star } from "lucide-react"

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
          }
        />
      ))}
    </div>
  )
}
