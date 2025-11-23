import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Roboto } from "next/font/google"

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
          <main className="container mx-auto p-4">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
