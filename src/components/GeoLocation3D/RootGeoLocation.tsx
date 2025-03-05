'use client'

import dynamic from 'next/dynamic'
import Loader from '../shared/Loder'

const GeoLocation3D = dynamic(
  () => import('@/components/GeoLocation3D/GeoLocation3D'),
  {
    ssr: false, // Optional: Disable server-side rendering for this component if required
    loading: () => <Loader />, // Optional: A fallback while the component loads
  }
)

const RootGeoLocation = () => {
  return <GeoLocation3D />
}

export default RootGeoLocation
