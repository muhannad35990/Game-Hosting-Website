"use client"
import react from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { Button } from "../ui/button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className=" dark:bg-gray-700 transition"
    >
      {theme === "dark" ? <Sun color="yellow" /> : <Moon />}
    </Button>
  )
}
