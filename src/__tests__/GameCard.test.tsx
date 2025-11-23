import React from "react"
import { render, screen } from "@testing-library/react"
import page from "@/app/games/[id]/page"
import { games } from "@/data/games"

// --- Mock  and child components ---
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>
}))

jest.mock("@/components/GamePlayer", () => ({
  __esModule: true,
  default: ({ title }: any) => <div data-testid="game-player">{title}</div>
}))

jest.mock("@/components/ReviewsSection", () => ({
  __esModule: true,
  ReviewsSection: ({ gameId }: any) => (
    <div data-testid="reviews-section">{gameId}</div>
  )
}))

jest.mock("@/components/ShareButton", () => ({
  __esModule: true,
  default: ({ title }: any) => <div data-testid="share-button">{title}</div>
}))

jest.mock("@/components/GameListRow", () => ({
  __esModule: true,
  default: ({ game }: any) => <div data-testid="related-game">{game.title}</div>
}))

describe("Game Page", () => {
  it("renders game details, player, reviews, share button, and related games", async () => {
    const game = games[0]
    const mockParams = { id: game.id }

    // Render the async page component
    const { container } = render(await page({ params: mockParams }))

    // Check main title & description
    expect(container.textContent).toContain(game.title)
    if (game.description)
      expect(container.textContent).toContain(game.description)

    // Check mocked components
    expect(screen.getByTestId("game-player")).toBeInTheDocument()
    expect(screen.getByTestId("reviews-section")).toBeInTheDocument()
    expect(screen.getByTestId("share-button")).toBeInTheDocument()

    // Related games
    const related = games.filter(
      (g) =>
        g.id !== game.id &&
        g.category.some((cat) => game.category.includes(cat))
    )
    if (related.length > 0) {
      related.forEach((r) =>
        expect(screen.getByText(r.title)).toBeInTheDocument()
      )
    }
  })
})
