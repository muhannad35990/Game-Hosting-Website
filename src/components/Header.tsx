import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import Image from "next/image"

function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl">
          <Image src={"/logo-2line.svg"} width={160} height={50} alt="logo" />
        </Link>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/" className="text-sm">
            Home
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
