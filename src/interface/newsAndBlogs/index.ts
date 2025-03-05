/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
export interface Tab {
  label: string
  path: string
  isActive?: boolean
}

export interface ContentNavigatorProps {
  tabs: Tab[]
  onTabChange: (newStatus: string) => void
}

export interface SubHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export interface ProjectLocation {
  address: string
  city: string
  latitude: string | null
  longitude: string | null
  projectZone: string
  state: string
  zipCode: string | null
}

export interface ProjectImage {
  caption: string
  id: string
  path: string
}

export interface Project {
  projectTitle: string
  images: ProjectImage[]
  description: string
  price: string
  category: {
    categoryName: string
    _id: string
  }
  categoryName: string
  _id: string
  createdAt: string
  floorNo: number
  id: number
  isClosed: boolean
  projectLocation: ProjectLocation
  projectStatus: string
  projectType: string
  thumbnailImage: string
}

export interface IProjectDetails {
  projectTitle: string
  projectType: string
  projectStatus: string
  projectLocation: {
    address: string
  }
  aboutProject: string
  description: string
  isCctvAccess: boolean
  projectFeatures: {
    _id: string
    name: string
    isActive: boolean
  }[]
  images: { path: string }[]
}

export interface UnitDetail {
  id: string
  unitName: string
  flatSize: string
}

export type UnitDetails = UnitDetail[]

export interface Unit {
  id: string
  unitName: string
  flatSize: string
}

export interface UnitResponse {
  uniteHeader: string[]
  uniteBody: {
    floor: number
    units: ({
      id: string
      name: string
      size: string
    } | null)[]
  }[]
}

export interface IBlog {
  id: any
  _id: string
  metaImage: string | undefined
  featuredImage: string | undefined
  blogTitle: string
  description: string
  publishDate: string
  blogType: string
  projects: {
    position: string | null
    projectIds: any
  }
  user: {
    userName: string
    userDetails: any
  }
  tag: string[]
  permalink: string
  cardProjects?: any
  titleText?: []
  popularBlogs?: any
  comments?:any
}

export interface IProject {
  category: {
    categoryName: string
    _id: string
  }
  createdAt: string // Assuming the createdAt is a string timestamp
  floorNo: number
  id: string
  isClosed: boolean
  thumbnailImage: string
  images: string[] // Assuming it's an array of image URLs
  projectLocation: {
    address: string
    city: string
    latitude: number | null
    longitude: number | null
    projectZone: string
    state: string
    zipCode: string | null
  }
  projectStatus: 'Ongoing' | 'Completed' | 'Pending' // Assuming projectStatus has limited string values
  projectTitle: string
  projectType: string | null // Could be a nullable field
}
