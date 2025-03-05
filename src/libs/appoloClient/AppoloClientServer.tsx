import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// Create an Apollo client instance
export const appoloClientServer = new ApolloClient({
  ssrMode: true, // Enables SSR mode on the server only
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}`, // Your GraphQL endpoint
    fetch, // For making HTTP requests on the server-side
  }),
  cache: new InMemoryCache(),
})
