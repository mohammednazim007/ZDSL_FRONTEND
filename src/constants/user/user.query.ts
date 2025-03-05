/* eslint-disable import/prefer-default-export */
export const getMeQuery = `
    query getMyProfile {
  getMe {
    message
    success
    data {
      profile {
        name {
          firstName
          lastName
        }
        profession
        profilePic
        contactInfo {
          phoneNo
          presentAddress
        }
      }
      user {
        email
        userName
        id
      }
    }
  }
}`
