'use client'

import Image from 'next/image'
import CelendarSvg from '@/assets/contact-us/Celenedar.svg'

import { FC } from 'react'
import Link from 'next/link'
import { hexToRGB } from '@/utils/helpers'

interface BookAVsisitCardProps {
  title: string
  subTitle: string
  path: string
  borderColor?: string
  isHeader?: boolean
}

const BookAVsisitCard: FC<BookAVsisitCardProps> = ({
  isHeader = true,
  title,
  subTitle,
  path,
  borderColor = '#E6A206',
}) => {
  return (
    <>
      {isHeader && (
        <h1 className={`font-oswald  font-semibold mb-5 text-[1.5rem]`}>
          Book a project visit
        </h1>
      )}
      <div
        style={{
          borderColor: hexToRGB(borderColor, 0.5),
        }}
        className="  border-[4px] border-opacity-25  bg-[#F9F4E9] bg-opacity-50
      w-full  max-w-[24.5rem]  flex flex-col  items-center justify-center  rounded-lg  
      p-6  "
      >
        {/* Profile Image */}

        <div className="flex     w-full justify-start  gap-[10px]">
          <div className={``}>
            <h1
              className={`font-oswald  font-medium text-[1.625rem] text-primary_color`}
            >
              {title}
            </h1>
            <p className={`font-poppins text-base text-[#000]`}>{subTitle}</p>
          </div>
        </div>

        <div className="flex  gap-3 mt-[1.313rem] w-full ">
          <Link
            href={path}
            className={` font-poppins gap-1 w-[11.563rem] h-[3.125rem] max-h-[3.125rem] text-base text-primary_color bg-white border-[3px] border-[#B5DCDC]  max-w-[11.563rem]  font-normal flex items-center justify-center text-[14px]     rounded-full `}
          >
            <Image
              src={CelendarSvg}
              alt="Profile"
              className="w-[1.25rem]  h-[1.25rem] max-w-[1.25rem]  object-cover"
              width={80}
              height={80}
            />
            &nbsp;January <span className="font-bold ">2024</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default BookAVsisitCard
