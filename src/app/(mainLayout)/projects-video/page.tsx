import AllProjects from '@/components/ProjectVideos/AllProjects'
import SuspenseLoader from '@/components/shared/SuspenseLoader'
import { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={<SuspenseLoader />}>
        <AllProjects />
      </Suspense>
    </div>
  )
}

export default page
 