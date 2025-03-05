import Image from 'next/image'
import miniBuildingBg from '@/assets/FAQ/minibuildinbg.png'
import SupportActionBox from '../shared/SupportActionBox/SupportActionBox'

const FaqContactNow = () => {
  return (
    <>
      <div className="relative bg-[#FBFBFB]  w-ma-[69rem] mx-auto max-h-[45.438rem] sm:pt-[5rem] 2xl:pt-[8.063rem] overflow-hidden ">
        {/* Background image */}
        <div className="absolute border-red-500 inset-0 z-0">
          <Image
            src={miniBuildingBg}
            alt="Building Background"
            layout="fill"
            quality={100}
            className="opacity-100 3xl:object-scale-down"
          />
        </div>

        {/* Grid container */}
        <div className="relative z-10  mx-auto px-4 mb-10 lg:mb-[10.688rem] ">
          <SupportActionBox isRounded={false} />
        </div>
      </div>
    </>
  )
}

export default FaqContactNow
