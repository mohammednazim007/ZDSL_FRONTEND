import { StaticImageData } from 'next/image'

export interface AffiliateWithCardProps {
  image?: StaticImageData
  index: number
  width?: number
  height?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' // Optional
}
