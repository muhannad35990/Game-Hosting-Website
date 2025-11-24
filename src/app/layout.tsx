import react from "react"
import { ThemeProvider } from "@/components/common/ThemeProvider"
import "./globals.css"
import Footer from "@/components/layout/Footer"
import { Roboto } from "next/font/google"
import Header from "@/components/layout/Header"

export const metadata = {
  title: "GameHost",
  description: "Browse and play GameDistribution games"
}
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap"
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={"en"} className={`${roboto.variable} `}>
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100 text-gray-900">
        <ThemeProvider>
          <Header />
          <main className="container1 mx-auto p-4">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
