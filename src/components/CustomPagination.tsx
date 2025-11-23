"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { CustomPaginationProps } from "@/types/pagination"

export function CustomPagination({ totalPages }: CustomPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("pageNumber") || 1)

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("pageNumber", page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Function to calculate pages to show with ellipsis
  const getPages = () => {
    const delta = 2 // pages around current page
    const range: number[] = []
    const pages: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i)
      }
    }

    let l: number | null = null
    for (const i of range) {
      if (l !== null) {
        if (i - l === 2) {
          pages.push(l + 1)
        } else if (i - l > 2) {
          pages.push("...")
        }
      }
      pages.push(i)
      l = i
    }

    return pages
  }

  const pagesToRender = getPages()

  return (
    <Pagination className="my-8">
      <PaginationContent className="">
        {/* Previous */}
        <PaginationItem className="">
          <PaginationPrevious
            className=""
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) goToPage(currentPage - 1)
            }}
          />
        </PaginationItem>

        {/* Page numbers with ellipsis */}
        {pagesToRender.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`} className="">
              <PaginationEllipsis className="" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} className="">
              <PaginationLink
                className=""
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  goToPage(Number(page))
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem className="">
          <PaginationNext
            className=""
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) goToPage(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
