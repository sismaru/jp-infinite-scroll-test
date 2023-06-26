import '../assets/css/globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '잡플래닛 1차 면접 과제',
  description: '잡플래닛 1차 면접 과제',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="h-screen font-notosans">{children}</body>
    </html>
  )
}
