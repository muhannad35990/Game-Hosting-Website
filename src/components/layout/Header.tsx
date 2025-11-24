"use client"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "../common/ThemeToggle"
import MobileMenu from "./MobileMenu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
      <div className="container1 mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl">
            <Image src={"/logo-2line.svg"} width={160} height={50} alt="logo" />
          </Link>
          <Link
            href="/"
            className={cn(
              "text-sm ms-2 md:ms-16",
              pathname === "/" && "border-b-2 font-medium border-blue-500"
            )}
          >
            Home
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <ThemeToggle />

          {pathname === "/" && (
            <div className="block lg:hidden">
              <MobileMenu />
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
