'use client'
import dynamic from 'next/dynamic'
import Loader from '../shared/Loder'

const ProjectVideos = dynamic(
  () => import('@/components/ProjectVideos/ProjectVideos'),
  {
    ssr: false, // Disable server-side rendering if necessary
    loading: () => <Loader />, // Fallback UI while the component is loading
  }
)

const RootProjectVideo = () => {
  return <ProjectVideos />
}

export default RootProjectVideo
