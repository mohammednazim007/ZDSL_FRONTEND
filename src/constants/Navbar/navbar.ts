/* eslint-disable import/prefer-default-export */
export const query = `query GetHeader {
    getHeader {
      success
      message
      data {
        id
        headerLogo
        sections {
          title
          description
          url
          icon
          subHeaders {
            icon
            label
            url
          }
        }
        socialMedia {
          facebook
          linkedin
          twitter
          youtube
          instagram
        }
        navMenu {
          icon
          label
          url
        }
      }
    }
  }
  `