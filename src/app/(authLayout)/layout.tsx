import authPageBuilding from '../../assets/auth/aurh_page_building_icon.svg'
import Image from 'next/image'
import AuthBackgroundDesign from './components/shared/AuthBackgroundDesign'
// import bgImg from '@/assets/image/Search Banner.png'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // here two class add before max-h-screen and overflow-hidden
    <div className={`font-poppins overflow-y-scroll`}>
      {/* <Image
        className="absolute left-0 top-0 object-cover hidden md:block z-0"
        src={bgImg}
        alt=""
      /> */}

      <AuthBackgroundDesign>{children}</AuthBackgroundDesign>

      <Image
        className="absolute right-0 bottom-0 h-[415px] xl:h-[315px] lg:w-[530px] lg:h-[250px] md:w-[300px] md:h-[200px] hidden md:block"
        src={authPageBuilding}
        alt=""
      />
    </div>
  )
}

export default AuthLayout
