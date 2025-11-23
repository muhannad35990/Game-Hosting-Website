import { Review } from "@/types/review"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAverageRating(reviews: Review[]) {
  if (!reviews.length) return 0
  return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
}
