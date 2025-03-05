/* eslint-disable import/prefer-default-export */
export const managementTeamQuery = `
query Teams {
  teams {
    success
    message
    data {
      _id
      name
      position
      photo
      about
      description
      facebookUrl
      linkedinUrl
      gmail
      descriptionColor
      bodyBgColor
      imageBgColor
      nameColor
      positionColor
      readMoreColor
    }
  }
}`
