"use client"

import { Star } from "lucide-react"
import { useState } from "react"

export function AddReview({ gameId }: { gameId: string }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  async function submitReview() {}

  return (
    <div className="mt-8 border p-4 rounded-lg bg-gray-50">
      <h3 className="font-medium mb-3">Write a Review</h3>

      <div className="flex gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} onClick={() => setRating(num)} className="p-1">
            <Star
              size={22}
              className={
                num <= rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-400"
              }
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full border rounded-lg p-2 mb-3"
      />

      <button
        onClick={submitReview}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  )
}
