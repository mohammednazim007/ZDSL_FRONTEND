/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import jobLocationIcon from '../../../assets/icons/carrer/jobPlace.svg'
import websiteIcon from '../../../assets/icons/carrer/website.svg'
import callIcon from '../../../assets/icons/carrer/call.svg'
import emailIcon from '../../../assets/icons/carrer/email.svg'
import zdslLogo from '../../../assets/Logos/zdslLogoCarrer.svg'

//!===================================================================================================>>>

const ZdslContactDetails = ({ jobDetails }: any) => {
  return (
    <div
      className={`font-poppins sm:flex justify-between items-center gap-6  
      md:h-[14.5rem] h-full w-full border-[0.313rem] rounded-[5px]    border-[#E6A206] border-opacity-[.4] mt-[3.125rem] mb-[5.063rem] 
      xl:px-[5.375rem] lg:px-[2.8rem] md:px-[1.1rem] sm:px-[.8rem] `}
    >
      {/* zdsl logo */}
      <section className="mb-3 sm:mb-0 flex justify-center items-center py-2 sm:py-0 sm:md:block ">
        <Image
          className="h-[6.5rem] w-[8.188rem]"
          src={zdslLogo}
          alt="ZDSL"
        ></Image>
      </section>

      {/* contact section */}

      <section className="space-y-[1.25rem] md:ml-2 lg:ml-4 sm:ml-4  mb-3 sm:mb-0 px-3 sm:px-0 lg:flex-grow ">
        <h1
          className={`font-oswald  font-[500] lg:text-2xl md:text-xl text-xl `}
        >
          Zubion Development Solutions Limited
        </h1>

        {/* address */}
        <div className="flex items-center gap-[0.788rem] font-normal">
          <>
            {' '}
            <Image
              src={jobLocationIcon}
              alt=""
              className="h-[1.125rem] w-[1.125rem]"
            ></Image>
            <p className="text-base">
              38 (Gold House), Road- 11 (New), Dhanmondi, Dhaka - 1209.
            </p>
          </>
        </div>

        {/* contact details section*/}
        <div className="lg:flex lg:justify-between lg:items-center lg:gap-[1.25rem] lg:w-max">
          <div className="flex gap-x-[.625rem] font-normal lg:justify-center md:justify-start items-center">
            <Image
              src={websiteIcon}
              alt=""
              className="h-[1.125rem] w-[1.125rem]"
            ></Image>
            <Link
              href={'https://zdslbd.com'}
              target="_blank"
              className="underline"
            >
              https://zdslbd.com
            </Link>
          </div>
          <div className="flex gap-x-[.625rem] font-normal lg:justify-center md:justify-start items-center">
            <Image
              src={callIcon}
              className="h-[1.125rem] w-[1.125rem]"
              alt=""
            ></Image>
            <p className=" font-normal">+8801618855557</p>
          </div>

          <div className="flex gap-x-[.625rem] font-normal lg:justify-center md:justify-start items-center">
            <Image
              src={emailIcon}
              className="h-[1.125rem] w-[1.125rem]"
              alt=""
            ></Image>
            <p className=" font-normal">info@zdslbd.com</p>
          </div>
        </div>
      </section>

      {/* apply now button*/}

      <section className="cursor-pointer  flex justify-center items-center text-center">
        <Link
          style={{
            backgroundImage:
              'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
            fontWeight: '500',
          }}
          href={`/career/${jobDetails?._id}/apply`}
          className={`font-poppins md:text-[1.125rem] inline-flex justify-center font-medium text-[0.938rem] 
                    md:px-[1.875rem] px-[1.875rem] md:py-[0.75rem] py-[0.75rem] sm:py-3 mb-3 sm:mb-0 sm:px-5 rounded-md text-[#063354]`}
        >
          Apply now
        </Link>
      </section>
    </div>
  )
}

export default ZdslContactDetails
