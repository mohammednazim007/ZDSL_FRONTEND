/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { appoloClientServer } from '@/libs/appoloClient/AppoloClientServer'
import {
  FORGOT_PASSWORD_MUTATION,
  REGISTER_MUTATION,
} from '../mutations/auth.mutations'
import { IForgotPassword, IRegisterUser } from '../type/auth.type'

export const registerUser = async ({
  userName,
  email,
  password,
}: IRegisterUser) => {
  try {
    const response = await appoloClientServer.mutate({
      mutation: REGISTER_MUTATION,
      variables: { email, password, userName },
    })

    // Check for GraphQL errors
    if (response.errors && response.errors.length > 0)
      throw new Error(response.errors[0].message)

    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const forgotPassword = async ({ email }: IForgotPassword) => {
  try {
    const response = await appoloClientServer.mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: { email },
    })

    // Check for GraphQL errors
    if (response.errors && response.errors.length > 0)
      throw new Error(response.errors[0].message)

    return response.data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
