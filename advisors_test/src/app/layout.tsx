import type { Metadata } from "next"
import localFont from "next/font/local"
import "./normalize.css"

const rubik = localFont({
  src: "./fonts/RubikVF.woff",
  variable: "--font-rubik",
  display: "swap",
})

const playfairDisplay = localFont({
  src: "./fonts/PlayfairDisplayVF.woff",
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ZOE Financial - Advisors Finder",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} ${playfairDisplay.variable}`}>
        {children}
      </body>
    </html>
  )
}
