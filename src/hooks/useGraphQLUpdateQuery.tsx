/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from '@/libs/tokenUtils'
import { useState } from 'react'

// Generalized interface for input data
interface GraphQLUpdateInput {
  [key: string]: any
}

interface UpdateResponse {
  message: string
  success: boolean
  data: any
}

const useGraphQLUpdateQuery = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [updatedData, setUpdatedData] = useState<any | null>(null)

  const performUpdate = async (
    mutationName: string, // The name of the mutation (e.g., "updateProject")
    idFieldName: string, // The name of the ID field in the mutation (e.g., "updateProjectId")
    inputVar: string,
    updateData: GraphQLUpdateInput, // The input data for the update
    returnFields: string[], // The fields to return after the update
    idValue: string // The value of the ID for the object you're updating
  ): Promise<void> => {
    setLoading(true)
    setError(null)

    // Dynamically construct the return fields based on the provided returnFields array
    const dynamicReturnFields = returnFields.join('\n')

    const mutation = `
      mutation ${mutationName}($${idFieldName}: ID!, $input: ${inputVar}!) {
        ${mutationName}(id: $${idFieldName}, input: $input) {
          message
          success
          data {
            ${dynamicReturnFields}
          }
        }
      }
    `

    console.log(mutation)

    const variables = {
      [idFieldName]: idValue,
      input: updateData,
    }

    console.log(variables, 'var')

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
            query: mutation,
            variables: variables,
          }),
        }
      )

      if (!response.ok) {
        const errorResponse = await response.text() // Get the response body
        throw new Error(`Error performing update: ${errorResponse}`)
        // throw new Error('Error performing update')
      }

      const jsonResponse: {
        data: { [key: string]: UpdateResponse }
        errors?: any[]
      } = await response.json()

      console.log('GraphQL Response:', jsonResponse)

      if (jsonResponse.errors) {
        throw new Error(
          'Error in GraphQL mutation: ' + jsonResponse.errors[0].message
        )
      }

      const updateResult = jsonResponse.data[mutationName]

      if (updateResult.success) {
        setUpdatedData(updateResult.data)
        console.log(`${mutationName} updated successfully:`, updateResult.data)
      } else {
        throw new Error(updateResult.message || 'Update failed')
      }
    } catch (error: any) {
      setError(error.message)
      console.error('An error occurred while updating:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    performUpdate,
    loading,
    error,
    updatedData,
  }
}

export default useGraphQLUpdateQuery
