/* eslint-disable import/prefer-default-export */
import baseApi from "@/libs/redux/api/baseApi";

// Define the GraphQL query as a string
const GET_ALL_BEST_PROJECT = `query GetProjects($isBestProject: Boolean) {
  getProjects(isBestProject: $isBestProject) {
    success
    message
    projects {
      _id
      projectTitle  
      thumbnailImage
      projectStatus
   
      projectLocation {
        address
      }
      expectedHandoverDate      
      expectedStartDate


    }
    meta {
      page
      limit
      total
      totalPage
    }
  }
}`

const bestProjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBestProjects: builder.query({
      query: ({ isBestProject, page, limit, totalPage, total }) => {
        const variables = { isBestProject, page, limit, totalPage, total };
        return {
          url: '', 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: GET_ALL_BEST_PROJECT, 
            variables,
          }),
        };
      },
    //   transformResponse: (response) => response?.data?.getProjects, // Transform the response if needed
    }),
  }),
});

export const { useGetBestProjectsQuery } = bestProjectApi;
