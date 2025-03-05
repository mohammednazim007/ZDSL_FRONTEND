/* eslint-disable import/prefer-default-export */
import baseApi from "@/libs/redux/api/baseApi";

// Define the GraphQL query as a string
const GET_ALL_VIRTUAL_TOUR = `query GetAllVirtualTour($projectId: ID!) {
  getAllVirtualTour(projectId: $projectId) {
    success
    message
    data {
      id
      imageUrl
      title
      author
      width
      height
      pitch
      yaw
      hfov
      vaov
      autoLoad
      compass
      hotspots {
        pitch
        yaw
        text
        targetSceneId
        type
        createTooltipArgs
        url
      }
      project {
        _id
        projectTitle
        thumbnailImage
      }
      isActive
      isTrash
      isDeleted
    }
    meta {
      page
      limit
      total
      totalPage
    }
  }
}`;

const virtualTourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVirtualTours: builder.query({
      query: ({ projectId, page, limit }) => {
        const variables = { projectId, page, limit };
        return {
          url: '', // Add the correct API URL here
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: GET_ALL_VIRTUAL_TOUR,
            variables,
          }),
        };
      },
      // Uncomment the line below if you want to transform the response
      // transformResponse: (response) => response?.data?.getAllVirtualTour,
    }),
  }),
});

export const { useGetAllVirtualToursQuery } = virtualTourApi;
