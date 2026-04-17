import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ReSource Pro Sales Dashboard',
  description: 'Carrier NCA Sales Dashboard Q2 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}