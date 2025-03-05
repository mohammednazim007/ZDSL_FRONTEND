import { gql } from '@apollo/client'

/* eslint-disable import/prefer-default-export */
export const getAllHappyClientsQuery = `
query GetAllHappyClientReviews {
  getAllHappyClientReviews {
    id
    heroTitle
    heroText
    testimonials {
      testimonial {
        _id
        firstName
        lastName
        email
        content
        file
        rating
      }
    }
  }
}
`

// GraphQL query to fetch happy client reviews
export const GET_ALL_HAPPY_CLIENT_REVIEWS_FOR_HOME_PAGE = gql`query GetAllHappyClientReviews {
  getAllHappyClientReviews {
    success
    message
    data {
      id
      heroTitle
      heroText
      visibility
      isDeleted
      testimonials {
        testimonial {
          _id
          firstName
          lastName
          user {
            userName
            userDetails {
              profilePic
              profession
            }
          }
          rating
          content
          file
         
        }
        visibility
      }
    }
  }
}
`
// GraphQL query to fetch happy client reviews
export const GET_ALL_HAPPY_CLIENT_REVIEWS = gql`
  query GetAllFeedbacks {
    getAllFeedbacks {
      success
      message
      data {
        _id
        firstName
        lastName
        phone
        email
        content
        file
        rating

        user {
          id
          userName
          email
          role
          isDeleted
          status
          socialAuthId
          userDetails {
            _id
            profession
            gender

            nationality
            dateOfBirth
            bloodGroup
            profilePic
            name {
              firstName
              middleName
              lastName
            }
          }
        }
        isDeleted
        isActive
        isHappyClient
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
