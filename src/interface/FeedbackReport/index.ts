export type FeedbackReportFormValues = {
  firstName: string
  lastName: string
  phone: string
  email: string
  content: string
  file: File[]
  rating?: string
  project?: string
}

export type ReportFormValues = {
  firstName: string
  lastName: string
  phone: string
  email: string
  content: string
  file: File[]
  rating: string
}
