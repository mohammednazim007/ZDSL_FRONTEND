import { gql } from '@apollo/client'

export const GET_ALL_BEST_PROJECT = gql`
  query Query {
    getAllBestProject {
      success
      message
      data {
        id
        heroTitle
        visibility
        isDeleted
        trendingProjects {
          trendingProjectId {
            _id
            bathroomNo
            bedroomNo
            flatSize
            projectLocation {
              address
            }
            projectStatus
            projectTitle
            projectType
            thumbnailImage
          }
          visibility
          BestProjectType
        }
      }
    }
  }
`
export const GET_BEST_PROJECT_URL = gql`
  query GetProjects($isBestProject: Boolean, $projectStatus: String) {
    getProjects(isBestProject: $isBestProject, projectStatus: $projectStatus) {
      success
      message
      projects {
        _id
        projectTitle
        bedroomNo
        bathroomNo
        thumbnailImage
        isBestProject
        flatSize
        projectLocation {
          address
        }
        projectStatus
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
