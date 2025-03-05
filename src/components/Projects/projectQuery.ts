import { gql } from '@apollo/client'

export const ADD_TO_WISHLIST = gql`
  mutation Mutation($input: UpdateWishListInput!) {
    updateMyWishList(input: $input) {
      success
      message
      data {
        user
        projects
      }
    }
  }
`
export const GET_WISHLIST = gql`
  query GetWishlist {
    getMyWishList {
      success
      message
      data {
        projects {
          _id
        }
      }
    }
  }
`
