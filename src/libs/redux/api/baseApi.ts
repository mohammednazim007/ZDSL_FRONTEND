import { getCookie } from '@/libs/tokenUtils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    prepareHeaders: (headers) => {
      const accessToken = getCookie('zdsl_accessToken')
      if (accessToken) headers.set('authorization', accessToken)

      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['USER_PROFILE', 'HEADER', 'Project-Zone'],
  endpoints: () => ({}),
})

export default baseApi
