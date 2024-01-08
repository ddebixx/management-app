"use client"

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
  const location = typeof window !== 'undefined' ? window.location : undefined;
  
  return (
    <html lang="en">
      <body>
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
