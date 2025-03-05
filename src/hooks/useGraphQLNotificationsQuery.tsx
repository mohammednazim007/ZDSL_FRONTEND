/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getCookie } from '../libs/tokenUtils'

// Define the type for the GraphQL response
interface GraphQLResponse<T> {
  data: T | null
  errors?: { message: string }[]
}

// Define the type for the notification data (update based on actual API response)
interface Notification {
  id: string
  message: string
  body: string
  image?: string
  createdAt: string
  // Add other fields based on your API structure
}

// Hook to fetch notifications with role-based filters
const useGraphQLNotificationsQuery = <T,>(
  query: string,
  variables?: Record<string, any>
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const authToken = getCookie('zdsl_accessToken')

    const fetchNotifications = async () => {
      try {
        if (!authToken) {
          throw new Error('No token available for authorization')
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${authToken}`,
            },
            body: JSON.stringify({
              query,
              variables,
            }),
          }
        )

        const jsonResponse: GraphQLResponse<T> = await response.json()

        if (jsonResponse.errors) {
          throw new Error(jsonResponse.errors[0].message)
        }

        setData(jsonResponse.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        )
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return { data, loading, error }
}

export default useGraphQLNotificationsQuery
