'use client'

import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import Cookies from 'js-cookie'

// Create an HTTP link for the Apollo Client
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BASE_URL,
})

// Set the Authorization header for the Apollo Client
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('zdsl_accessToken')
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: token }),
    },
  }
})

// Initialize the Apollo Client with the httpLink and authLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>{children}</Provider>
      </ApolloProvider>
      <Toaster toastOptions={{ className: 'text-sm' }} />
    </>
  )
}

export default Providers
