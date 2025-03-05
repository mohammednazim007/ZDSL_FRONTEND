/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '@/libs/tokenUtils'
import { useState } from 'react'

// Define the structure for a successful query response
interface QueryResponse<T> {
  success: boolean
  message: string
  data: T
}

const useGraphQLFetchQuery = <T,>() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchedData, setFetchedData] = useState<T | null>(null)

  const performQuery = async (
    queryName: string,
    returnFields: string[],
    additionalVariables?: Record<string, { value: any; type: string }>
  ): Promise<void> => {
    setLoading(true)
    setError(null)

    const dynamicReturnFields = returnFields.join('\n')
    const variableDefinitions = Object.entries(additionalVariables || {})
      .map(([varName, { type }]) => `$${varName}: ${type}`)
      .join(', ')

    const queryVariables = Object.entries(additionalVariables || {})
      .map(([varName]) => `${varName}: $${varName}`)
      .join(', ')

    const query = `
      query ${queryName}${variableDefinitions ? `(${variableDefinitions})` : ''} {
        ${queryName}${queryVariables ? `(${queryVariables})` : ''} {
          success
          message
          data {
            ${dynamicReturnFields}
          }
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
            query,
            variables: additionalVariables
              ? Object.fromEntries(
                Object.entries(additionalVariables).map(
                  ([key, { value }]) => [key, value]
                )
              )
              : {},
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
      if (queryResult.success) {
        setFetchedData(queryResult.data)
        // console.log(`${queryName} fetched successfully:`, queryResult.data)
      } else {
        throw new Error(queryResult.message || 'Data fetch failed')
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

export default useGraphQLFetchQuery

// origin code, where page and limit is mandaroty, but the above code limit and page is not mandatory

// /* eslint-disable curly */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { getCookie } from '@/libs/tokenUtils'
// import { useState } from 'react'

// // Define the structure for a successful query response
// interface QueryResponse<T> {
//   success: boolean
//   message: string
//   data: T
// }

// const useGraphQLFetchQuery = <T,>() => {
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [fetchedData, setFetchedData] = useState<T | null>(null)

//   const performQuery = async (
//     queryName: string, // Name of the query (e.g., 'blogs')
//     returnFields: string[], // Fields to fetch in the query
//     additionalVariables?: Record<string, { value: any; type: string }> // Variables with their types (e.g., { blogId: { value: "123", type: "ID!" } })
//   ): Promise<void> => {
//     setLoading(true)
//     setError(null)

//     const dynamicReturnFields = returnFields.join('\n')

//     const { limit, page, ...restVariables } = additionalVariables || {}

//     const variableDefinitions = [
//       ...(limit ? ['$limit: Int'] : []),
//       ...(page ? ['$page: Int'] : []),
//       ...Object.keys(restVariables).map((varName) => {
//         const varType =
//           varName === 'category' ? '[String]' : restVariables[varName].type // Handle 'category' specifically
//         return `$${varName}: ${varType}`
//       }),
//     ].join(', ')

//     const queryVariables = [
//       ...(limit ? ['limit: $limit'] : []),
//       ...(page ? ['page: $page'] : []),
//       ...Object.keys(restVariables).map((varName) => `${varName}: $${varName}`),
//     ].join(', ')

//     const query = `
//     query ${queryName}(${variableDefinitions}) {
//       ${queryName}(${queryVariables}) {
//         success
//         message
//         data {
//           ${dynamicReturnFields}
//         }
//       }
//     }
//   `

//     const accessToken = getCookie('zdsl_accessToken')

//     const headers: Record<string, any> = {
//       'Content-Type': 'application/json',
//     }

//     if (accessToken) headers['Authorization'] = accessToken
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}`,
//         {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({
//             query: query,
//             variables: {
//               ...(limit && { limit: limit.value }), // Pass only the value, not the object
//               ...(page && { page: page.value }), // Pass only the value, not the object
//               ...Object.keys(restVariables).reduce(
//                 (acc, key) => {
//                   acc[key] = restVariables[key].value
//                   return acc
//                 },
//                 {} as Record<string, any>
//               ),
//             },
//           }),
//         }
//       )

//       if (!response.ok) {
//         const errorResponse = await response.text()
//         throw new Error(`Error fetching data: ${errorResponse}`)
//       }

//       const jsonResponse: {
//         data: { [key: string]: QueryResponse<T> }
//         errors?: any[]
//       } = await response.json()

//       if (jsonResponse.errors) {
//         throw new Error(
//           'Error in GraphQL query: ' + jsonResponse.errors[0].message
//         )
//       }

//       const queryResult = jsonResponse.data[queryName]
//       if (queryResult.success) {
//         setFetchedData(queryResult.data)
//         console.log(`${queryName} fetched successfully:`, queryResult.data)
//       } else {
//         throw new Error(queryResult.message || 'Data fetch failed')
//       }
//     } catch (error: any) {
//       setError(error.message)
//       console.error('An error occurred while fetching data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return {
//     performQuery,
//     loading,
//     error,
//     fetchedData,
//   }
// }

// export default useGraphQLFetchQuery
