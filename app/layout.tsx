import type { Metadata } from 'next'
import './globals.css'
import '../styles/globals.css';


export const metadata: Metadata = {
  title: 'Salomon Says',
  description: 'Greetings! I am Salomon. I know about saints and holidays!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
