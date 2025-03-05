export type ProjectType = {
  _id: string
  projectTitle: string
  bedroomNo: number
  bathroomNo: number
  thumbnailImage: string
  isBestProject: boolean
  flatSize: string
  projectLocation: {
    address: string
  }
}
