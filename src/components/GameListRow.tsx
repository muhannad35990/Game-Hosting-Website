import Link from "next/link"
import type { Game } from "@/types/game"
import Image from "next/image"

export default function GameListRow({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.id}`}
      className="bg-white rounded-lg shadow-2xl flex items-center gap-3 h-20 border border-gray-100"
    >
      <div className="w-20 h-20 relative rounded-s-lg overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex items-center justify-between flex-1">
        <div>
          <div className="font-medium text-base ">{game.title}</div>
          <div className="text-xs text-gray-500 line-clamp-1">
            {game.category}
          </div>
        </div>
        <Link
          href={`/games/${game.id}`}
          className="inline-block px-8 py-1.5 bg-blue-600 text-white rounded-full text-sm"
        >
          Play
        </Link>
      </div>
    </Link>
  )
}
