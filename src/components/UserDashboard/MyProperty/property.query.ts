import { gql } from '@apollo/client'

// GET_ALL_SALES_PROPERTY
export const GET_ALL_SALES_PROPERTY = gql`
  query GetAllSalesFromUser {
    getAllSalesFromUser {
      success
      message
      data {
        _id
        projectId {
          projectTitle
          thumbnailImage
          expectedHandoverDate
          _id
          projectLocation {
            address
            projectZone
          }
        }
        agreementTemplates {
          id
          _id
          mainTitle
          pages {
            pageTitle
            content {
              body
              header
            }
          }
        }
        agreementDate
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

// GET_PROJECT_PROGRESS_BY_ID

export const GET_PROPERTY_PROGRESS_BY_ID = gql`
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
