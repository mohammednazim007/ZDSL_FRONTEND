/* eslint-disable import/no-extraneous-dependencies */
'use client'
import React, { use, useCallback, useEffect, useState } from 'react'
import img from '@/assets/images/building.png'
import dateIcon from '@/assets/icons/date-time.png'
import home from '@/assets/icon/location.png'
import location from '@/assets/icon/home.png'
import constructionLogo from '@/assets/icon/ongoing.png'
import Image from 'next/image'
import { FaCodeCompare } from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'
import Link from 'next/link'
import { TProgressTimeline, TProperty } from './propertyType'
import formatDateStamp from '@/utils/formatDateStamp'
import { useQuery } from '@apollo/client'
import { GET_PROPERTY_PROGRESS_BY_ID } from './property.query'
import AgreementModal from './AgreementModal'
import ResponsiveModal from '@/components/shared/responsive-modal/ResponsiveModal'
import { PDFViewer } from '@react-pdf/renderer'

interface WindowSize {
  width: number
  height: number
}

const MyPropertyCard = ({ property }: { property: TProperty }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAddedToCompare, setIsAddedToCompare] = useState(true)
  const [open, setOpen] = useState(false)
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0, // Default to 0 for SSR
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  // handle open modal
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  const property_data = property?.projectId
  const agreementTemplates = property?.agreementTemplates

  // get progress timeline all property
  const { data, loading, error } = useQuery(GET_PROPERTY_PROGRESS_BY_ID, {
    variables: {
      projectId: property_data?._id,
    },
  })

  const inner_data = data?.getProjectTimelines?.data

  const totalWorkLoadShare = inner_data?.reduce(
    (total: number, progress: TProgressTimeline) =>
      total + (progress.workLoadShare || 0),
    0
  )

  const toggleBookmark = useCallback(() => setIsBookmarked((prev) => !prev), [])
  const toggleCompare = useCallback(
    () => setIsAddedToCompare((prev) => !prev),
    []
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <div className="border rounded-md p-1 md:p-2 md:bg-white bg-[#EBF7FF]">
      <div className="flex justify-between gap-2 md:gap-4">
        {/* house image & icon */}
        <div className="md:w-[20%] w-[23%] relative">
          <Link href={`/projects/${property_data?._id}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${property_data?.thumbnailImage}`}
              alt="house"
              width={1000}
              height={500}
              className="h-[200px] md:h-full md:w-full  object-cover rounded-md"
            />
          </Link>

          {/* bookmark & compare button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-1 md:hidden">
            <button
              onClick={toggleBookmark}
              className={`text-[10px] border rounded-full p-2 w-[30px] h-[27px] ${isBookmarked ? 'bg-yellow-500' : 'bg-white border-gray-300 hover:bg-[#063354] hover:text-white'}`}
            >
              <FaRegBookmark />
            </button>
            <button
              onClick={toggleCompare}
              className={`text-[10px] border rounded-full p-2 w-[30px] h-[27px] ${isAddedToCompare ? 'bg-yellow-500' : 'bg-white border-gray-300 hover:bg-[#063354] hover:text-white'}`}
            >
              <FaCodeCompare />
            </button>
          </div>
        </div>

        {/* middle section */}
        <div className="md:w-[50%] w-[75%]">
          <Link href={`/projects/${property_data?._id}`}>
            <h2 className="md:font-semibold text-[18px] md:text-xl ">
              {property_data?.projectTitle}
            </h2>
          </Link>

          {/* location for small screen  */}
          <div className="flex items-center mt-2 md:hidden space-x-2">
            <div className="flex items-center mt-2 md:hidden space-x-1">
              <Image
                src={home}
                alt="date"
                width={20}
                height={20}
                className="inline-block h-4 w-4"
              />
              <p className="md:text-sm text-xs font-thin">
                {property_data?.projectLocation?.address}
              </p>
            </div>

            <div className="flex items-center mt-2 md:hidden space-x-1">
              <Image
                src={location}
                alt="date"
                width={20}
                height={20}
                className="inline-block h-4 w-4"
              />
              <p className=" md:text-sm text-xs font-thin">
                {property_data?.projectLocation?.projectZone}
              </p>
            </div>
          </div>

          {/* date  for large screen */}
          <div className="items-center mt-2 hidden md:flex">
            <Image
              src={dateIcon}
              alt="date"
              width={20}
              height={20}
              className="inline-block h-4 w-4"
            />
            <p className="ml-2 md:text-sm text-xs font-semibold">
              {formatDateStamp(property_data?.expectedHandoverDate)}{' '}
              <span className="font-thin">(Handover)</span>{' '}
            </p>
          </div>

          {/* progress bar & title */}
          <div className="mt-1 md:border md:p-4 md:flex md:flex-row flex-col-reverse md:rounded-md md:bg-white">
            {/* image title */}
            <div className="flex items-center md:w-[100%] gap-x-2">
              <Image
                src={constructionLogo}
                alt="construction"
                width={20}
                height={20}
                className="h-5 w-5 hidden md:block"
              />
              <p className="md:font-semibold md:text-[14px] text-[10px] text-wrap hidden md:inline-block">
                Construction in progress
              </p>
            </div>

            {/* slider amount */}
            <div className="md:w-[50%] mt-3 md:mt-0">
              <div className="md:text-base text-xs text-center">
                <span className="hidden md:inline-block pr-2">Completed</span>
                <span className=" font-bold text-center">
                  {totalWorkLoadShare || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  className="bg-[#009898] h-1.5 rounded-full w-8"
                  style={{ width: `${totalWorkLoadShare || 0}%` }} // Change this value for dynamic progress
                />
              </div>
            </div>

            {/* description  title for mobile device */}
            <div className="md:hidden">
              <p className="md:font-semibold md:text-[14px] text-[12px] text-wrap mt-[5px]">
                Construction in progress
              </p>
            </div>
          </div>

          <div className=" mt-5 md:hidden block">
            <div className="flex justify-center items-center gap-1">
              <div className=" flex justify-center items-center w-full px-2 py-2 rounded-md border-[1px] border-[#008585]  cursor-pointer">
                <p onClick={onOpenModal} className="text-xs">
                  Agreement
                </p>
              </div>

              <div className="  lg:mt-0 w-full flex gap-1 justify-center items-center px-2 py-2 rounded-md border-[1px] border-[#FF7A85]  cursor-pointer">
                <div className=" h-3 w-3 bg-[#ff7a85] rounded-full" />
                <Link
                  href={`/dashboard/user/all-cctv/${property_data?._id}`}
                  className="text-xs text-nowrap"
                >
                  Live CC TV
                </Link>
              </div>

              {/* details button */}
              <div className="  lg:mt-0 w-full flex gap-1 justify-center items-center px-1 py-2 rounded-md border-[1px] border-gray-400  cursor-pointer">
                <p className="text-xs text-nowrap">Details</p>
              </div>
            </div>
          </div>
        </div>

        {/* button section */}
        <div className="w-[30%] md:block hidden ">
          <div className="flex justify-center items-center gap-4">
            {/* agreement button */}
            <div className=" flex justify-center items-center w-full px-2 py-2 rounded-full border-2 border-[#008585]  cursor-pointer">
              <p onClick={onOpenModal} className="text-xs font-semibold">
                Agreement
              </p>
            </div>

            {/* live cc tv button */}
            <div className="mt-3 lg:mt-0 w-full flex gap-1 justify-center items-center px-2 py-2 rounded-full border-2 border-[#FF7A85]  cursor-pointer">
              <div className=" h-3 w-3 bg-[#ff7a85] rounded-full" />
              <Link
                href={`/dashboard/user/all-cctv/${property_data?._id}`}
                className="font-semibold text-xs"
              >
                Live CC TV
              </Link>
            </div>
          </div>
        </div>

        {/* agreement modal */}
        <ResponsiveModal open={open} onClose={onCloseModal}>
          <div>
            <PDFViewer
              width={windowSize.width > 768 ? 750 : 400}
              height={windowSize.height > 768 ? 850 : 400}
            >
              <AgreementModal agreementTemplates={agreementTemplates} />
            </PDFViewer>
          </div>
        </ResponsiveModal>
      </div>
    </div>
  )
}

export default MyPropertyCard
