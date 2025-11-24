"use client"
import { Review } from "@/types/review"
import { getAverageRating } from "@/lib/utils"
import { RatingStars } from "../common/RatingStars"
import { AddReview } from "./AddReview"

export function ReviewsSection({
  gameId,
  reviews
}: {
  gameId: string
  reviews: Review[]
}) {
  const avg = getAverageRating(reviews)

  return (
    <section className="mt-16 w-full ">
      <div className="flex items-center gap-2 mb-4">
        <RatingStars rating={Math.round(avg)} />
        <span className="text-sm text-gray-600">
          {avg.toFixed(1)} / 5 ({reviews.length} reviews)
        </span>
      </div>

      <div className="space-y-5">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-700 dark:text-gray-200 flex flex-col gap-1"
          >
            <RatingStars rating={r.rating} />
            <p className="text-gray-700 dark:text-gray-200">{r.comment}</p>
            <span className="text-xs text-gray-400 dark:text-gray-200">
              {new Date(r.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
        <AddReview gameId={gameId} />
      </div>
    </section>
  )
}
