/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { getAllHappyClientsQuery } from '@/constants/clients/happyClients'
import {
  getAllProjectsQuery,
  getAllProjectsQueryForSearchFilter,
  getCompareProjectsQuery,
} from '@/constants/Projects/ProjectData'
import { managementTeamQuery } from '@/constants/team/managementTeam'
import baseApi from '@/libs/redux/api/baseApi'
import queryModifier from '@/utils/queryModifier'

interface TProjectPayload {
  page?: number
  limit?: number
  projectStatus?: string
  search?: string
}

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: ({
        page = 1,
        limit = 10,
        projectStatus,
        search,
      }: TProjectPayload) => {
        const { query, variables } = queryModifier(
          'getProjects',
          getAllProjectsQuery,
          {
            page,
            limit,
            projectStatus,
            search,
          }
        )
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: query,
            variables,
          }),
        }
      },
    }),
    getAllProjectsForFilter: builder.query({
      query: ({ page = 1, limit = 10, search }: TProjectPayload) => {
        const { query, variables } = queryModifier(
          'getProjects',
          getAllProjectsQueryForSearchFilter,
          {
            page,
            limit,
            search,
          }
        )
        return { 
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: query,
            variables,
          }),
        }
      },
    }),
    getAllCompareProjectsData: builder.query({
      query: (ids: string[]) => {
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: getCompareProjectsQuery,
            variables: { ids },
          }),
        }
      },
    }),
    getAllManagementTeam: builder.query({
      query: () => {
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: managementTeamQuery,
          }),
        }
      },
    }),
    getAllHappyClientsReview: builder.query({
      query: () => {
        return {
          url: ``,
          method: 'POST',
          body: JSON.stringify({
            query: getAllHappyClientsQuery,
          }),
        }
      },
    }),
  }),
})

export const {
  useGetAllProjectsQuery,
  useGetAllProjectsForFilterQuery,
  useGetAllCompareProjectsDataQuery,
  useGetAllManagementTeamQuery,
  useGetAllHappyClientsReviewQuery,
} = projectsApi
