import { useState } from 'react'
import { getCookie } from '@/libs/tokenUtils'

interface Category {
  _id: string
  categoryName: string
  type: string
  slug: string
  tags: Array<{
    _id: string
    tagsName: string
  }>
  metaDescription?: string
  projectCount?: number
  parentCategory?: {
    _id: string
    categoryName: string
  }
  subCategory?: Array<{
    _id: string
    categoryName: string
  }>
  isDeleted?: boolean
  isTrash?: boolean
  isActive?: boolean
  isSubCategory?: boolean
}

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const performCategoryQuery = async (type: string) => {
    setLoading(true)
    setError(null)

    const accessToken = getCookie('zdsl_accessToken')

    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
    }

    if (accessToken) headers['Authorization'] = accessToken

    const query = `
      query GetAllCategories($type: String!) {
        getAllCategories(type: $type) {
          success
          message
          data {
            _id
            categoryName
          }
        }
      }
    `

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query,
            variables: { type },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Error fetching categories: ${response.statusText}`)
      }

      const jsonResponse = await response.json()

      if (jsonResponse.errors) {
        throw new Error(`GraphQL Error: ${jsonResponse.errors[0].message}`)
      }

      const result = jsonResponse.data.getAllCategories

      if (result.success) {
        setCategories(result.data)
      } else {
        throw new Error(result.message || 'Failed to fetch categories')
      }
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    performCategoryQuery,
    categories,
    loading,
    error,
  }
}

export default useFetchCategories
