import { gql } from '@apollo/client'

const GET_PROJECT_CCTV = gql`
  query GetAllCCTVs($projectId: ID) {
    getAllCCTVs(projectId: $projectId) {
      success
      message
      data {
        id
        project {
          _id
          projectTitle
        }
        camera {
          location
        }
        config {
          username
          password
          ipAddress
          port
          channel
          subtype
        }
        rtsp
        isActive
        isTrash
        isDeleted
        createdAt
        updatedAt
        live
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
export default GET_PROJECT_CCTV
