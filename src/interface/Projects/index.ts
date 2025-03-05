/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Tab {
  label: string
  path: string
  isActive: boolean
  id: number
}

export interface ContentNavigatorProps {
  tabs: Tab[]
  onTabChange: (newStatus: string) => void
}

export interface ProjectImage {
  caption: string
  id: string
  path: string
}

export interface Project {
  _id: string
  id: string
  projectTitle: string
  aboutProject: string
  description: string
  projectType: string
  projectStatus: string
  projectLocation: {
    address: string
    city: string
    state: string
  }
  bedroomNo: number
  bathroomNo: number
  flatSize: string
  basementNo: number
  floorNo: number
  buildingStoried: string
  expectedStartDate: string
  expectedHandoverDate: string
  salesManager: string[]
  projectFacing: string
  chauhaddiOfLand: {
    east: string
    west: string
    north: string
    south: string
  }
  category: string
  subCategory: string
  salesStatus: string
  landArea: string
  isCctvAccess: boolean
  carParkingSlot: number
  projectFeatures: string[]
  facilities: {
    facility: string
    isDeleted: boolean
    _id: string
  }[]
  agreementTemplates: {
    template: string
    isDeleted: boolean
  }[]
  isFeatured: boolean
  isClosed: boolean
  isSuspended: boolean
  isDeleted: boolean
  thumbnailImage: string
  images: string[]
  createdAt: string
  updatedAt: string
  __v: number
  isBestProject: boolean
}

export interface IMeta {
  total: number
  limit: number
  page: number
  totalPages: number | null
}

export interface TCompareProductInfo {
  id: string
  thumbnailImage: string
  projectTitle: string
  projectType: string
  expectedHandoverDate: string
  projectStatus: string
  buildingStoried: string
  bedroomNo: number
  balconyNo: number
  bathroomNo: number
  projectFacing: string
  flatSize: string
  projectLocation: {
    address: string
  }
  projectFeatures?: {
    name: string
  }[]
  nearbyFacilities?: TNearbyFacility[]
}

export interface TNearbyFacility {
  icon: string
  facility: string
  data: any[]
}




export interface TProjectZone {
  id: string
  zone: string
  isActive: boolean
  updatedAt?: string
}
