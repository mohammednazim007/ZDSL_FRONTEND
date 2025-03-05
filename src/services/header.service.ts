/* eslint-disable import/prefer-default-export */
import { query } from '@/constants/Navbar/navbar'
import baseApi from '@/libs/redux/api/baseApi'

const dynamicHeaderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeaders: builder.query({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      }),
      providesTags: [{ type: 'HEADER' }],
    }),
  }),
})

export const { useGetHeadersQuery } = dynamicHeaderApi
