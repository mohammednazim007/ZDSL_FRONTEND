/* eslint-disable react-hooks/rules-of-hooks */
import Affiliate from '@/components/Affiliate/Affiliate'
import RootBestProject from '@/components/BestProjects/RootBestProject'
import CompanyProfile from '@/components/CompanyProfile/CompanyProfile'
import RootGeoLocation from '@/components/GeoLocation3D/RootGeoLocation'
import HappyClients from '@/components/HappyClients/HappyClients'
import Hero from '@/components/Hero/Hero'
import RootLatestNewsBlog from '@/components/LatestNewsAndBlogs/RootLatestNewsBlog'
import RootPhotoGallery from '@/components/photo-gallery/RootPhotoGallery'
import RootProjectVideo from '@/components/ProjectVideos/RootProjectVideo'
import BottomNav from '@/components/shared/BottomNav/BottomNavbar'
import RootFooter from '@/components/shared/Footer/RootFooter'
import SubscribeBox from '@/components/SubscribeBox/SubscribeBox'
import TransformSpace from '@/components/TransformSpace/TransformSpace'
import HomeWrapper from '@/components/Wrappers/HomeWrapper'

const page = () => {
  return (
    <>
      <HomeWrapper>
        <main className="overflow-x-hidden ">
          <Hero />
          <TransformSpace />
          <RootBestProject />
          <RootGeoLocation />
          <CompanyProfile />
          <RootProjectVideo />
          <RootLatestNewsBlog />
          <Affiliate />
          <HappyClients />
          <RootPhotoGallery />
          <SubscribeBox />
          <RootFooter />
          <div className="md:hidden block z-[999]">
            <BottomNav />
          </div>
        </main>
      </HomeWrapper>
    </>
  )
}

export default page
