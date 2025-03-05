/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '@/libs/tokenUtils'
import { useState } from 'react'

// Define the structure for a successful query response
interface QueryResponse<T> {
  message: string
  projects: T
}

const useGraphQLFetchQueryTempNew = <T,>() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchedData, setFetchedData] = useState<T | null>(null)

  const performQuery = async (
    queryName: string, // Name of the query (e.g., 'blogs')
    returnFields: string[], // Fields to fetch in the query
    additionalVariables?: Record<string, any> // Additional variables to include in the query
  ): Promise<void> => {
    setLoading(true)
    setError(null)

    // Dynamically construct the query string from the returnFields
    const dynamicReturnFields = returnFields.join('\n')

    // Destructure additionalVariables to extract limit and page
    const { limit, page, ...restVariables } = additionalVariables || {}

    // Map additionalVariables to their types
    const variableDefinitions = Object.entries(restVariables)
      .map(([key, value]) => {
        const type =
          typeof value === 'boolean'
            ? 'Boolean'
            : typeof value === 'number'
              ? 'Int'
              : 'String'
        return `$${key}: ${type}`
      })
      .join(', ')

    const variableUsages = Object.keys(restVariables)
      .map((key) => `${key}: $${key}`)
      .join(', ')

    const query = `
      query ${queryName}($limit: Int, $page: Int${variableDefinitions ? ', ' + variableDefinitions : ''
      }) {
        ${queryName}(limit: $limit, page: $page${variableUsages ? ', ' + variableUsages : ''
      }) {
          ${dynamicReturnFields}
        }
      }
    `
    const accessToken = getCookie('zdsl_accessToken')

    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
    }

    if (accessToken) headers['Authorization'] = accessToken

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: query,
            variables: { limit, page, ...restVariables }, // Merge with additional variables
          }),
        }
      )

      if (!response.ok) {
        const errorResponse = await response.text()
        throw new Error(`Error fetching data: ${errorResponse}`)
      }

      const jsonResponse: {
        data: { [key: string]: QueryResponse<T> }
        errors?: any[]
      } = await response.json()

      if (jsonResponse.errors) {
        throw new Error(
          'Error in GraphQL query: ' + jsonResponse.errors[0].message
        )
      }

      const queryResult = jsonResponse.data[queryName]

      if (queryResult && queryResult.projects) {
        setFetchedData(queryResult.projects)
      } else {
        throw new Error(queryResult?.message || 'Data fetch failed')
      }
    } catch (error: any) {
      setError(error.message)
      console.error('An error occurred while fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    performQuery,
    loading,
    error,
    fetchedData,
  }
}

export default useGraphQLFetchQueryTempNew
