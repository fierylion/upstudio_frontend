import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from '@/context/StoreProvider'
import SessionProvider from '@/context/SessionProvider'
import ThemeProvider from '@/context/ThemeProvider'
import ToastProvider from '@/context/ToastProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UpStudio Africa – Design, Create, Launch',
  description: 'UpStudio Africa – Design, Create, Launch',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        style={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <SessionProvider>
          <ThemeProvider>
            <StoreProvider>
              <ToastProvider />
              {children}
            </StoreProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
