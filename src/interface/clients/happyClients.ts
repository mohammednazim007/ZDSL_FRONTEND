export interface THappyClientsReviews {
  id: string
  heroTitle: string
  heroText: string
  testimonials: {
    testimonial: TTestimonial
  }[]
}

export interface TTestimonial {
  [x: string]: any
  firstName: string
  lastName: string
  email: string
  content: string
  file: string
  rating: string
  user: {
    id: string
    userName: string
    email: string
    role: string
    isDeleted: boolean
    status: string
    socialAuthId: string
    userDetails: {
      _id: string
      profilePic: string
      profession: string
    }
  }
}

export interface IClient {
  _id: string
}
