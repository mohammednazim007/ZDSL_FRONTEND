import type { Metadata } from 'next'
import { Oswald, Poppins, Roboto } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  subsets: ['latin'],
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Zubion Development Solutions Limited',
  description:
    'Zubion, founded in 2012, expanded into building construction as Zubion Development Solutions Limited (ZDSL). With a skilled, experienced team, ZDSL focuses on quality, art, and value for money in residential projects.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${poppins.variable} ${roboto.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
