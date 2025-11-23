import React from "react"
import { games } from "@/data/games"
import { notFound } from "next/navigation"
import GamePlayer from "@/components/GamePlayer"
import Link from "next/link"
import GameListRow from "@/components/GameListRow"
import { ReviewsSection } from "@/components/ReviewsSection"
import { DetailsPageProps } from "@/types/page"
import ShareToSocialMedia from "@/components/ShareButton"

export default async function page({ params }: DetailsPageProps) {
  const { id } = await params
  const game = games.find((g) => g.id === id)
  if (!game) return notFound()

  const related = games.filter(
    (g) =>
      g.id !== game.id && g.category.some((cat) => game.category.includes(cat))
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-4">
      <div className="col-span-8">
        <div className="mb-4">
          <nav className="text-sm text-gray-600 dark:text-gray-100">
            <Link href="/">Home</Link> &nbsp;/&nbsp; <span>{game.title}</span>
          </nav>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold mt-2">{game.title}</h1>
            <ShareToSocialMedia
              title={game.title}
              description={game.description}
            />
          </div>

          <p className="text-gray-600 dark:text-gray-300">{game.description}</p>
        </div>

        <GamePlayer
          iframeUrl={game.iframeUrl}
          title={game.title}
          gameId={game.id}
        />
        <ReviewsSection gameId={id} reviews={game.reviews} />
      </div>

      {related.length > 0 && (
        <section className="mt-8 col-span-4">
          <h2 className="text-lg font-semibold mb-3">Related games</h2>
          <div className="grid grid-cols-1 gap-4">
            {related.map((r) => (
              <GameListRow key={r.id} game={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
