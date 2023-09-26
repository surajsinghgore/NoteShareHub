import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  icons: {
    icon: "./icon.png",
  },
  title: 'Note Share Hub',
  description: 'Note Share Hub',
  keywords: [
    "Note Share Hub",
    "Cloud Notes",
  ],
  authors: [
    { name: "suraj singh" },
    { name: "suraj singh", url: "https://www.linkedin.com/in/surajsinghgore" },
  ],
  creator: "suraj singh",
  publisher: "suraj singh",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
