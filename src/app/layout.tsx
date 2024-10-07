import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../components/styles/globals.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const geistSans = localFont({
  src: '../components/styles/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../components/styles/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'VRDE Studio',
  description: 'VRDE Studio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
