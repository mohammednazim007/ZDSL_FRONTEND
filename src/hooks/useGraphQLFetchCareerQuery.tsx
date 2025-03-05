/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '@/libs/tokenUtils'
import { useState } from 'react'

// Define the structure for a successful query response
interface QueryResponse<T> {
  message: string
  data: T
  success: boolean
}

const useGraphQLFetchCareerQuery = <T,>() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchedData, setFetchedData] = useState<T | null>(null)

  //   const performQuery = async (
  //     mainQueryName: string,
  //     queryName: string, // Name of the query (e.g., 'blogs')
  //     returnFields: string[], // Fields to fetch in the query
  //     additionalVariables?: Record<string, { value: any; type: string }> // Additional variables to include in the query
  //   ): Promise<void> => {
  //     setLoading(true)
  //     setError(null)

  //     // Dynamically construct the query string from the returnFields
  //     const dynamicReturnFields = returnFields.join('\n')

  //     // Destructure additionalVariables to extract limit and page
  //     const { limit, page, isSingleData, ...restVariables } =
  //       additionalVariables || {}

  //       console.log('restVariables', restVariables);

  //     let query
  //     // console.log('isSingleData', isSingleData);
  //     if (isSingleData.value) {
  //       query = `
  //   query ${mainQueryName} ( ${
  //     Object.keys(restVariables).length > 0
  //       ? Object.keys(restVariables)
  //           .map((varName) => `$${varName}: ${restVariables[varName].type}`)
  //           .join(', ')
  //       : ''
  //   } ){
  //     ${queryName} ( ${
  //       Object.keys(restVariables).length > 0
  //         ? Object.keys(restVariables)
  //             .map((varName) => `${varName}: $${varName}`)
  //             .join(', ')
  //         : ''
  //     } ) {
  //       success
  //       message
  //       data {
  //         ${dynamicReturnFields}
  //       }
  //     }
  //   }
  // `
  //     } else {
  //       query = `
  //       query ${mainQueryName}  ${
  //         Object.keys(restVariables).length > 0
  //           ? Object.keys(restVariables)
  //               .map((varName) => `$${varName}: String`)
  //               .join(', ')
  //           : ''
  //       } {
  //         ${queryName}${
  //           Object.keys(restVariables).length > 0
  //             ? Object.keys(restVariables)
  //                 .map((varName) => `${varName}: $${varName}`)
  //                 .join(', ')
  //             : ''
  //         } {
  //           success
  //           message
  //           data {
  //             ${dynamicReturnFields}
  //           }
  //         }
  //       }
  //     `
  //     }

  //     console.log('query ==>', query);

  //     const authToken =
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmRmZTQzYmRiYzdhZTMzNTNlNzJjNjEiLCJlbWFpbCI6InNoYWtpbEBnbWFpbC5jb20iLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTcyODc0OTc4NywiZXhwIjoxNzI5MzU0NTg3fQ.zSpaYtXtvboPyu00REmHinGS-HSX1Q2ShIrKqyc75XM'

  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `${authToken}`,
  //           },
  //           body: JSON.stringify({
  //             query: query,
  //             variables: { limit, page, ...restVariables }, // Merge with additional variables
  //           }),
  //         }
  //       )

  //       if (!response.ok) {
  //         const errorResponse = await response.text()
  //         throw new Error(`Error fetching data: ${errorResponse}`)
  //       }

  //       // console.log('response ==>', response)
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
  //       // console.log('queryResult ==>', queryResult)
  //       // Directly checking if the data is available
  //       if (queryResult.success) {
  //         setFetchedData(queryResult.data)
  //         // console.log(`${queryName} fetched successfully:`, queryResult.data)
  //       } else {
  //         throw new Error(queryResult?.message || 'Data fetch failed')
  //       }
  //     } catch (error: any) {
  //       setError(error.message)
  //       console.error('An error occurred while fetching data:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  const performQuery = async (
    mainQueryName: string,
    queryName: string, // Name of the query (e.g., 'blogs')
    returnFields: string[], // Fields to fetch in the query
    additionalVariables?: Record<string, { value: any; type: string }> // Additional variables to include in the query
  ): Promise<void> => {
    setLoading(true)
    setError(null)

    // Dynamically construct the query string from the returnFields
    const dynamicReturnFields = returnFields.join('\n')

    // Destructure additionalVariables to extract limit and page
    const { limit, page, isSingleData, ...restVariables } =
      additionalVariables || {}

    // Prepare the variables for the GraphQL query
    const variables: Record<string, any> = {
      limit,
      page,
      ...Object.fromEntries(
        Object.entries(restVariables).map(([key, value]) => [key, value.value])
      ),
    }

    let query
    if (isSingleData.value) {
      query = `
    query ${mainQueryName} ( ${Object.keys(restVariables).length > 0
          ? Object.keys(restVariables)
            .map((varName) => `$${varName}: ${restVariables[varName].type}`)
            .join(', ')
          : ''
        } ){
      ${queryName} ( ${Object.keys(restVariables).length > 0
          ? Object.keys(restVariables)
            .map((varName) => `${varName}: $${varName}`)
            .join(', ')
          : ''
        } ) {
        success
        message
        data {
          ${dynamicReturnFields}
        }
      }
    }
    `
    } else {
      query = `
      query ${mainQueryName}  ${Object.keys(restVariables).length > 0
          ? Object.keys(restVariables)
            .map((varName) => `$${varName}: String`)
            .join(', ')
          : ''
        } {
        ${queryName}${Object.keys(restVariables).length > 0
          ? Object.keys(restVariables)
            .map((varName) => `${varName}: $${varName}`)
            .join(', ')
          : ''
        } {
          success
          message
          data {
            ${dynamicReturnFields}
          }
        }
      }
    `
    }
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
            variables: variables, // Pass the formatted variables
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

export default useGraphQLFetchCareerQuery
