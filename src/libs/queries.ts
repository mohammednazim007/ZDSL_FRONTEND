import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query GetProjects(
    $search: String
    $projectType: String
    $projectStatus: String
    $city: String
    $state: String
    $projectZone: String
    $salesStatus: String
    $isClosed: Boolean
    $sort: String
    $order: SortOrder
    $page: Int
    $limit: Int
  ) {
    getProjects(
      search: $search
      projectType: $projectType
      projectStatus: $projectStatus
      city: $city
      state: $state
      projectZone: $projectZone
      salesStatus: $salesStatus
      isClosed: $isClosed
      sort: $sort
      order: $order
      page: $page
      limit: $limit
    ) {
      projects {
        id
        projectTitle
        isClosed
        isSuspended
        isDeleted
        createdAt
        updatedAt
      }
      meta {
        page
        limit
        total
        totalPages
      }
    }
  }
`
export const GET_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      ... on User {
        _id
        email
        role
        socialAuthId
        status
        userName
      }
    }
  }
`
