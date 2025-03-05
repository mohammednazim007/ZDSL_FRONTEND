import { gql } from '@apollo/client'

export const missionQuery = gql`
  query GetVisionMissionValues {
    getVisionMissionValues {
      success
      message
      data {
        _id
        heading
        icon
        HeadingDescription
        MSection {
          title
          description
          videoUrl
          icon
          faqs {
            question
            answer
            isOpen
          }
          isDeleted
        }
      }
    }
  }
`
export type MSTypes = {
  _id: string
  heading: string
  icon: string
  HeadingDescription: string
  MSection: {
    title: string
    description: string
    videoUrl: string
    icon: string
    faqs: {
      question: string
      answer: string
      isOpen: boolean
    }[]
    isDeleted: boolean
  }[]
}
