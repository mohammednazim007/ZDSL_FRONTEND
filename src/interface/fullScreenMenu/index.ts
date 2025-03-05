export type ProjectStatus = 'Ongoing' | 'Upcoming' | 'Completed' | string

export type Project = {
  _id: string
  thumbnailImage: string
  projectStatus: 'Ongoing' | 'Upcoming' | 'Completed' | string
  projectTitle: string
  projectLocation: string
  expectedStartDate: string
}
