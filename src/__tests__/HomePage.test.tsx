import React from "react"
import { render, screen } from "@testing-library/react"
import HomePage from "@/app/page" // adjust import path if needed
import { games as mockGames } from "@/data/games"

// Mock child components
jest.mock("@/components/SearchBar", () => () => (
  <div data-testid="search-bar" />
))
jest.mock("@/components/Filters", () => () => <div data-testid="filters" />)
jest.mock("@/components/GameGrid", () => ({ games }: { games: any }) => (
  <div data-testid="game-grid">{games.length} games</div>
))
jest.mock("@/components/Featured", () => ({ items }: { items: any }) => (
  <div data-testid="featured">{items.length} featured</div>
))

describe("HomePage", () => {
  it("renders SearchBar, Filters, GameGrid, and Featured components", () => {
    render(<HomePage />)

    // Check if SearchBar is rendered
    expect(screen.getByTestId("search-bar")).toBeInTheDocument()

    // Check if Filters is rendered
    expect(screen.getByTestId("filters")).toBeInTheDocument()

    // Check if GameGrid is rendered with all games
    expect(screen.getByTestId("game-grid")).toHaveTextContent(
      `${mockGames.length} games`
    )

    // Check if Featured receives only featured items
    const featuredCount = mockGames.filter((g) => g.featured).length
    expect(screen.getByTestId("featured")).toHaveTextContent(
      `${featuredCount} featured`
    )
  })
})
