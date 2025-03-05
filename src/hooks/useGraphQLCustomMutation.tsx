import { useState } from 'react'
import { getCookie } from '../libs/tokenUtils'

// Define the type for the GraphQL response
interface GraphQLResponse<T> {
  data: T | null
  errors?: { message: string }[]
}

// Define the custom mutation hook
const useGraphQLCustomMutation = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeMutation = async (
    query: string,
    variables?: Record<string, unknown>
  ) => {
    setLoading(true)
    setError(null)

    try {
      const authToken = getCookie('zdsl_accessToken')
      console.log(authToken)
      if (!authToken) {
        throw new Error('Authorization token is missing')
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`, // Proper Bearer token format
        },
        body: JSON.stringify({ query, variables }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const jsonResponse: GraphQLResponse<T> = await response.json()

      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message)
      }

      setData(jsonResponse.data)
    } catch (err) {
      console.error('Error executing mutation:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { executeMutation, data, loading, error }
}

export default useGraphQLCustomMutation
