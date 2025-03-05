import { getAllProjectZoneQuery } from '@/constants/projectZone/zone.const'
import baseApi from '@/libs/redux/api/baseApi'

export interface TProjectZonePayload {
  search?: string
  sort?: string
  order?: string
  page?: number
  limit?: number
}

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjectZone: builder.query({
      query: (payload: TProjectZonePayload) => {
        return {
          url: ``,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: getAllProjectZoneQuery,
            variables: payload,
          }),
        }
      },
      providesTags: ['Project-Zone'],
    }),
  }),
})

export const { useGetAllProjectZoneQuery } = projectApi
