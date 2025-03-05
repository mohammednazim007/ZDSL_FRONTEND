import { gql } from '@apollo/client'

export const GeoLocationQuery = gql`
  query GetProjects {
    getProjects {
      success
      projects {
        _id
        projectTitle
        projectLocation {
          coordinate
        }
      }
    }
  }
`
export const PROJECT_DETAILS_QUERY = gql`
  query GetProjectById($getProjectByIdId: ID!) {
    getProjectById(id: $getProjectByIdId) {
      projectLocation {
        address
        city
        projectZone
        state
        zipCode
      }
      thumbnailImage
      expectedHandoverDate
      salesManager {
        userDetails {
          profilePic
          name {
            firstName
            lastName
          }
        }
      }
      projectTitle
      projectType
      landArea
      bathroomNo
      flatSize
      floorNo
      unitNo
    }
  }
`
