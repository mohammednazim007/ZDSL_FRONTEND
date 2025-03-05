import meassageSvg from '@/assets/contact-us/messageBoxSvg.svg'
import SubheaderWithImageSvg from '../shared/SubHeaderWithLogo/SubheaderWithImageSvg'
export default function ContactUsBanner() {
  return (
    <div className="max-h-[8.313rem] md:max-h-[25.313rem] py-[9.125rem] flex justify-center items-center ">
      <SubheaderWithImageSvg
        logo={meassageSvg}
        title="Contact us"
        subtitle="We're here to provide exceptional real estate services and assist you in any way possible."
      />
    </div>
  )
}
