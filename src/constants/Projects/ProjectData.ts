import { Tab } from '../../interface/Projects'

export const tabsData: Tab[] = [
  {
    label: 'All Projects',
    path: '/projects?project_status=all',
    isActive: true,
    id: 1,
  },
  {
    label: 'Ongoing',
    path: '/projects?project_status=ongoing',
    isActive: false,
    id: 2,
  },
  {
    label: 'Upcoming',
    path: '/projects?project_status=upcoming',
    isActive: false,
    id: 3,
  },
  {
    label: 'Completed',
    path: '/projects?project_status=completed',
    isActive: false,
    id: 4,
  },
]

export const options = [
  { id: 1, name: 'Property' },
  { id: 2, name: 'Blog & Events' },
]

export const dummyProjects = [
  {
    projectTitle: 'Project 1',
    category: {
      _id: '1',
      categoryName: 'Residential',
    },
  },
  {
    projectTitle: 'Project 2',
    category: {
      _id: '2',
      categoryName: 'Commercial',
    },
  },
  {
    projectTitle: 'Project 3',
    category: {
      _id: '3',
      categoryName: 'Industrial',
    },
  },
]

export const getAllProjectsQuery = [
  `
  projects {
    category { categoryName _id }
    createdAt
    floorNo
    _id
    isClosed
    projectTitle
    thumbnailImage
    bedroomNo
    bathroomNo
    flatSize
    images {
      caption
      id
      path
    }
    projectLocation {
      address
      city
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

export const getAllProjectsQueryForSearchFilter = [
  `
  projects {
    projectTitle
    _id
  }
  `,
]

export const getProjectDetailsQuery = `query GetProjectById($getProjectByIdId: ID!) {
  getProjectById(id: $getProjectByIdId) {
    images {
      path
    }
    category {
      categoryName
    }
    projectTitle
    projectLocation {
      address
      city
      state
      zipCode
      projectZone
    }
    projectType
    isCctvAccess
    balconyNo
    basementNo
    bathroomNo
    bedroomNo
    flatSize
    buildingStoried
    carParkingSlot
    aboutProject
    expectedHandoverDate
    projectFeatures {
      _id
      name
      isSubFeature
      projectCount
      isActive
      isTrash
      isDeleted
    }
    landArea
    thumbnailImage
    unitNo
    videoUrl
    virtualTourLink {
    _id
      path
      caption
    }
    nearbyFacilities {
      facility
      icon
      data
    }
    googleMapIframeCode
    projectBrochure
    salesManager {
      id
      userName
      email
      role
      isDeleted
      status
      socialAuthId
      userDetails {
        _id
        bloodGroup
        contactInfo {
          phoneNo
          officeNo
          presentAddress
          permanentAddress
        }
        dateOfBirth
        gender
        name {
          firstName
          middleName
          lastName
        }
        nationality
        personalInfo {
          spouseName
          fatherName
          motherName
          tinNo
          passportNo
          nid
          birthId
        }
        profession
        profilePic
      }
    }
  }
}`

export const getUnitDetailsQuery = `
query GetAllUnitDetailsByProject($projectId: ID!) {
  getAllUnitDetailsByProject(projectId: $projectId) {
    data {
      id
      project
      unitPrefix
      unitName
      unitSuffix
      flatSize
      bedroomNo
      bathroomNo
      balconyNo
      floorNo
      flatFacing
      pricePerSft
      landSharing
      floorPlan {
        id
        path
        caption
      }
      isSold
      isAvailable
      isBooked
      isReady
      createdAt
      updatedAt
    }
    message
  }
}
`

export const getUnitShortDetailsQuery = `
query GetAllUnitDetailsByProject($projectId: ID!) {
  getAllUnitDetailsByProject(projectId: $projectId) {
    data {
      id
      
      flatSize
      
      pricePerSft
      
      isReady
      createdAt
      updatedAt
    }
    message
  }
}
`

export const getCompareProjectsQuery = `query GetCompareProperties($ids: [ID!]!) {
  getCompareProperties(ids: $ids) {
    success
    message
    data {
      id
      thumbnailImage
      projectTitle
      projectType
      expectedHandoverDate
      projectStatus
      buildingStoried
      bedroomNo
      balconyNo
      bathroomNo
      projectFacing
      flatSize
      projectLocation {
        address
      }
      projectFeatures {
        name
      }
      nearbyFacilities {
        icon
        facility
        data 
      }      
    }
  }
}`
