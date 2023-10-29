import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from '@/context/StoreProvider'
import SessionProvider from '@/context/SessionProvider'
import ThemeProvider from '@/context/ThemeProvider'
import ToastProvider from '@/context/ToastProvider'
import QueryProvider from '@/context/QueryProvider'
import ProgressBarProvider from '@/context/ProgressBarProvider'
import UserDetails from '@/DefaultComponents/UserDetails'



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
            <QueryProvider>
              <StoreProvider>{children}
              
              <UserDetails />
              </StoreProvider>
            </QueryProvider>
          </ThemeProvider>

        </SessionProvider>
        <ProgressBarProvider />
        <ToastProvider />
      </body>
    </html>
  )
}
