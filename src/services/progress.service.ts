import baseApi from '@/libs/redux/api/baseApi'
interface IProgressPayload {
  id: string
  page?: number
  limit?: number
  totalPage?: number
  total?: number
}

export const query = `
query GetProjectTimelines($projectId: ID!) {
  getProjectTimelines(projectId: $projectId) {
    success
    message
    data {
      id
      project
      workTitle
      workLoadShare
      targetedCompleteDate
      actualCompleteDate
      status
      createdAt
      updatedAt
    }
    meta {
      page
      limit
      total
      totalPage
    }
  }
}
`

const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query({
      query: ({ id, page, limit, totalPage, total }: IProgressPayload) => {
        const variables = { projectId: id, page, limit, totalPage, total }

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

export const { useGetProgressQuery } = progressApi
