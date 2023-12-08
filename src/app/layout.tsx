"use client"

// import { GeistSans } from 'geist/font'
import './globals.css'
import { ModalProvider } from '@/providers/ModalProvider'
import { AuthModal } from '@/components/AuthModal/AuthModal'
import { ToasterProvider } from '@/providers/ToasterProvider'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserContextProvider from '@/actions/userContextProvider'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body
        // className={GeistSans.className}
      >
        <ToasterProvider />
        <SupabaseProvider>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <ModalProvider />
              <AuthModal />
              {children}
            </UserContextProvider>
          </QueryClientProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
