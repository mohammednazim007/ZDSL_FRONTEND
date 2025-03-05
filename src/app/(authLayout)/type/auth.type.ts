export type IRegisterUser = {
  userName: string
  email: string
  password: string
}
export type IForgotPassword = {
  email: string
}
export type ILoginFormInputs = {
  email: string
  password: string
}

export interface IRegisterFormInputs {
  name: string
  email: string
  password: string
}
