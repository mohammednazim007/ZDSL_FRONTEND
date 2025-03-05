import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $userName: String) {
    register(email: $email, password: $password, userName: $userName) {
      accessToken
    }
  }
`

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgetPassword($email: String!) {
    forgetPassword(email: $email) {
      message
    }
  }
`
