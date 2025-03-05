/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UnitDetail {
  id: string
  unitName: string
  flatSize: string
  pricePerSft: string
  floorNo?: string
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

export interface ProjectDetails {
  videoUrl: any
  projectBrochure: any
  virtualTourLink: any
  salesManager: any
  projectTitle: string
  projectType: string
  projectStatus: string
  projectLocation: {
    address: string
  }
  category: {
    categoryName: string
  }
  aboutProject: string
  description: string
  isCctvAccess: boolean
  projectFeatures: {
    _id: string
    name: string
    isActive: boolean
  }[]
  googleMapIframeCode: string
  images: { path: string }[]
  balconyNo: number
  basementNo: number
  bedroomNo: number
  bathroomNo: number
  buildingStoried: string
  flatSize: string
  unitNo: number
  carParkingSlot: number
  floorNo: number
  landArea: string
  projectFacing: string
  nearbyFacilities?: any
}

export interface PropertyFeaturesCardProps {
  name: string
}

export interface UnitDescriptionProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

export type FloorPlan = {
  id: string
  path: string
  caption: string | null
}

export type UniteDescriptionProps = {
  id: string
  project: string
  unitPrefix: string
  unitName: string
  unitSuffix: string
  flatSize: string
  bedroomNo: number
  bathroomNo: number
  balconyNo: number
  floorNo: number
  flatFacing: string
  pricePerSft: string
  landSharing: string
  floorPlan: FloorPlan[]
  isSold: boolean
  isAvailable: boolean
  isBooked: boolean
  isReady: boolean
  createdAt: string
  updatedAt: string
}
