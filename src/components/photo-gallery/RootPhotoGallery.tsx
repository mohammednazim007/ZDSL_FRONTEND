'use client'

import dynamic from 'next/dynamic'
import Loader from '../shared/Loder'

const PhotoGalleryMain = dynamic(
  () => import('@/components/photo-gallery/PhotoGalleryMain'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
)

const RootPhotoGallery = () => {
  return <PhotoGalleryMain />
}

export default RootPhotoGallery
