export interface IJob {
  _id: string
  jobTitle: string
  employmentStatus: string
  jobLocation: string
  salary: string
  experience: string
  gender: string
  applicationDeadline: string
  publishDate: string
  aboutJob: string
  jobCategory: { category: string }[]
  jobTags: { tag: string }[]
  jobResponsibilities: { responsibility: string }[]
  additionalRequirements: { requirement: string }[]
  compensationAndOtherBenefits: { benefit: string }[]
  educationalRequirements: { requirement: string }[]
  workPlace: string
  publishedBy: string // assuming admin ID
  jobApplication: { applicant: string }[] // assuming applicant details
}

export interface IJobProps {
  jobs: IJob[] // Array of job objects
  totalJobs: number // Total number of jobs for pagination
  jobsPerPage: number // Number of jobs per page
  paginate: (pageNumber: number) => void // Function to handle pagination
  currentPage: number // Current active page
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  getPageNumbers: () => (number | string)[]
}
