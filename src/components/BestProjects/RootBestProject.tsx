import Loader from '../shared/Loder'
import dynamic from 'next/dynamic'

const BestProjects = dynamic(() => import('./BestProjects'), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => <Loader />, // Use your custom Loader component as the fallback
})

const RootBestProject = () => {
  return (
    <div>
      <BestProjects />
    </div>
  )
}

export default RootBestProject
