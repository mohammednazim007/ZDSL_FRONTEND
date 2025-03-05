export interface Project {
  id: string // Maps from _id field
  projectTitle: string // Maps from projectTitle
  aboutProject: string // Description of the project
  description: string // Detailed description of the project
  projectType: string // Type of the project (e.g., Residential, Commercial)
  projectStatus: string // Current status (e.g., Completed, Ongoing)
  projectLocation: {
    address: string // Street address
    city: string // City name
    state: string // State name
    zipCode: string // Zip code
    latitude: string // Latitude for geolocation
    longitude: string // Longitude for geolocation
    projectZone: string // Zone information
  }
  thumbnailImage: string // Path to the thumbnail image
  images: { path: string }[] // Array of image objects related to the project
  isBestProject?: boolean // Optional flag for best projects
  // Add any other necessary fields based on the incoming data
}
