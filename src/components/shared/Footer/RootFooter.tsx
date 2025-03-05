'use client'
import dynamic from 'next/dynamic'
import Loader from '../Loder'

const Footer = dynamic(() => import('@/components/shared/Footer/Footer'), {
  ssr: false, // Optional: Disable server-side rendering if necessary
  loading: () => <Loader />, // Optional: Fallback UI while the component is loading
})

const RootFooter = () => {
  return <Footer />
}

export default RootFooter
