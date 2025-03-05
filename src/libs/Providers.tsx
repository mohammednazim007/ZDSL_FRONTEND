/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import ApolloClientProvider, { client } from './appoloClient/AppoloProvider'

export default function Providers({
  session,
  children,
}: {
  session: any
  children: ReactNode
}) {
  return (
    <SessionProvider session={session}>
      <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
    </SessionProvider>
  )
}
