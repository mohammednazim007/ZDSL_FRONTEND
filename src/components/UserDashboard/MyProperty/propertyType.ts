export type TProperty = {
  _id: string
  projectId: {
    projectTitle: string
    thumbnailImage: string
    expectedHandoverDate: string
    _id: string
    __typename: string
    projectLocation: {
      address: string
      projectZone: string
      __typename: string
    }
  }
  agreementTemplates: TAgreementTemplate[]
  __typename: string
}

export type TProgressTimeline = {
  id: string
  project: string
  workTitle: string
  workLoadShare: number
  targetedCompleteDate: string
  actualCompleteDate: string
  status: string
  createdAt: string
  updatedAt: string
}

export type TAgreementTemplate = {
  id: string
  mainTitle: string
  pages: {
    pageTitle: string
    content: {
      body: string
      header: string
    }
  }[]
}
