import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const AllProjects = dynamic(() => import('@/components/Projects/AllProjects'), {
  ssr: false,
})

const Projects = () => {
  return (
    <Suspense fallback={<></>}>
      <AllProjects />
    </Suspense>
  )
}

export default Projects
