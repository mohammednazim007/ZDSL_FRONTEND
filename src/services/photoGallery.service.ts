/* eslint-disable import/prefer-default-export */
import query from '@/constants/photo-gallery/photoGallery.const'
import baseApi from '@/libs/redux/api/baseApi'

interface IPhotoGalleryPayload {
  page?: number
  limit?: number
  totalPage?: number
  total?: number
}

const photoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPhotoGallery: builder.query({
      query: ({
        page = 1,
        limit = 10,
        totalPage,
        total,
      }: IPhotoGalleryPayload) => {
        const variables = { page, limit, totalPage, total }

        return {
          url: '',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        }
      },
    }),
  }),
})

export const { useGetAllPhotoGalleryQuery } = photoGalleryApi
