export type CctvCardProps = {
  createdAt: string
  live: string
  id: string
  project: {
    projectTitle: string
    _id: string
  }
  camera: {
    location: string
  }
  config: {
    username: string
    password: string
    ipAddress: string
    port: string
    channel: string
    subtype: string
  }
  rtsp: string
  isActive: boolean
  isTrash: boolean
  isDeleted: boolean
}
