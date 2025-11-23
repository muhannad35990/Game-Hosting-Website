import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Filters from "@/components/Filters"

// Mock navigation hooks
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => null,
    toString: () => ""
  }),
  usePathname: () => "/games"
}))

// Mock Zustand store
const mockToggleCategory = jest.fn()
const mockClearCategories = jest.fn()
jest.mock("@/store/gameStore", () => ({
  useGameStore: jest.fn(() => ({
    selectedCategories: ["Action"],
    toggleCategory: mockToggleCategory,
    clearCategories: mockClearCategories
  }))
}))

describe("Filters component", () => {
  it("renders all filter buttons and category checkboxes", () => {
    render(<Filters />)

    // Check quick filter buttons
    expect(screen.getByText("Favorites")).toBeInTheDocument()
    expect(screen.getByText("Recently Played")).toBeInTheDocument()
    expect(screen.getByText("Top Rated")).toBeInTheDocument()

    // Check category checkboxes (mocked selected "Action")
    expect(screen.getByText("Action")).toBeInTheDocument()
    const checkbox = screen.getByRole("checkbox", {
      name: /Action/i
    }) as HTMLInputElement
    expect(checkbox.checked).toBe(true)

    // Check clear button
    expect(screen.getByText("Clear filters")).toBeInTheDocument()
  })

  it("calls toggleCategory when a category checkbox is clicked", () => {
    render(<Filters />)
    const checkbox = screen.getByRole("checkbox", { name: /Action/i })
    fireEvent.click(checkbox)
    expect(mockToggleCategory).toHaveBeenCalledWith("Action")
  })

  it("calls clearCategories when Clear filters button is clicked", () => {
    render(<Filters />)
    const clearButton = screen.getByText("Clear filters")
    fireEvent.click(clearButton)
    expect(mockClearCategories).toHaveBeenCalled()
  })

  it("calls router.push when Favorites or Recently Played buttons are clicked", () => {
    render(<Filters />)

    const favButton = screen.getByText("Favorites")
    fireEvent.click(favButton)
    expect(mockPush).toHaveBeenCalled()

    const recentButton = screen.getByText("Recently Played")
    fireEvent.click(recentButton)
    expect(mockPush).toHaveBeenCalled()
  })
})
