import { gql } from '@apollo/client'

export const LOGIN_FEATURE = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      accessToken
    }
  }
`
