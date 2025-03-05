'use client'

import dynamic from 'next/dynamic'
import Loader from '../shared/Loder'

const LatestNewsAndBlogs = dynamic(
  () => import('@/components/LatestNewsAndBlogs/LatestNewsAndBlogs'),
  {
    ssr: false, // Optional: Disable server-side rendering if necessary
    loading: () => <Loader />, // Optional: Fallback UI while the component loads
  }
)

const RootLatestNewsBlog = () => {
  return <LatestNewsAndBlogs />
}

export default RootLatestNewsBlog
