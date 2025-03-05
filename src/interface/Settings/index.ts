export type TUserInfoUpdate = {
  name?: {
    firstName?: string
    lastName?: string
  }
  profession?: string
  contactInfo?: {
    phoneNo?: string
    presentAddress?: string
  }
  profilePic?: string
  file?: File | undefined
}

export type changePassValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
