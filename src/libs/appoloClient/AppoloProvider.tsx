/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URL,
  cache: new InMemoryCache(),
  ssrMode: true,
})

export default function ApolloClientProvider({
  children,
  client,
}: {
  children: React.ReactNode
  client: any
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
