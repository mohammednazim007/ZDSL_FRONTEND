export const fields = [
  `
    projects {
      category { categoryName _id }
      createdAt
      floorNo
      _id
      isClosed
      thumbnailImage
      images {
        caption
        id
        path
      }
      projectLocation {
        address
        city
        latitude
        longitude
        projectZone
        state
        zipCode
      }
      projectStatus
      projectTitle
      projectType
    }
    meta {
      limit
      page
      total
      totalPage
    }
    `,
]
