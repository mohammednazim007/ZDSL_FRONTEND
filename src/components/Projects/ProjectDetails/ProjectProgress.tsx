/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import img from '../../../assets/icon/brochure.png'
import CheckDetails from './CheckDetails'
import { useGetProgressQuery } from '@/services/progress.service'
import Loader from '@/components/shared/Loder'

const formatDate = (timestamp: any) => {
  const date = new Date(Number(timestamp))
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ProjectProgress({
  projectId,
  details,
}: {
  projectId: string
  details: any
}) {
  const [isModalVisible, setModalVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, isError, error } = useGetProgressQuery({
    id: projectId,
  })

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalVisible(false)
      }
    }

    if (isModalVisible) {
      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isModalVisible])
  console.log({ isModalVisible })
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return <div>Error</div>
  }

  //   const progressData = data?.data?.getProjectTimelines?.data || []
  //   // Sum the workLoadShare values
  // const totalWorkLoadShare = progressData?.reduce((sum: any, item: any) => {
  //   return sum + (item.workLoadShare || 0);  // Add workLoadShare, ensuring it defaults to 0 if undefined
  // }, 0);
  // const progressPercentage = Math.min(totalWorkLoadShare, 100);

  // console.log('Total Work Load Share:', totalWorkLoadShare);
  //   console.log('progressData ', progressData)

  const progressData = data?.data?.getProjectTimelines?.data || []

  // Sum the workLoadShare values for only completed projects
  const totalWorkLoadShare = progressData?.reduce((sum: any, item: any) => {
    if (
      item.status === 'Complete' ||
      item.status === 'Completed' ||
      item.status === 'Done' ||
      item.status === 'done'
    ) {
      return sum + (item.workLoadShare || 0) // Add workLoadShare, ensuring it defaults to 0 if undefined
    }
    return sum // If status is not "Complete", don't add workLoadShare
  }, 0)

  // Calculate the progress percentage (ensuring it doesn't exceed 100)
  const progressPercentage = Math.min(totalWorkLoadShare, 100)

  // console.log('Total Work Load Share for Completed Projects:', totalWorkLoadShare);
  // console.log('Progress Percentage:', progressPercentage);
  // console.log('Progress Data:', progressData);

  return (
    <div>
      {/* for desktop device */}
      <div className="border-[4px] border-[#009898]/50 p-8 rounded lg:block hidden">
        <div className="flex justify-between mb-4">
          <div className="w-[70%] mt-3">
            <h1 className={`font-[family-name:var(--font-poppins)] font-bold `}>
              {' '}
              {formatDate(details?.expectedHandoverDate)}
            </h1>
            <h1 className="text-sm font-thin font-[family-name:var(--font-poppins)]">
              Project Handover
            </h1>
          </div>
          <div className="w-[30%]">
            <Image src={img} alt="" className="object-cover w-full" />
          </div>
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-poppins)]">
            Construction in Progress...
          </h1>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${progressPercentage}%`, // Dynamically set the width
                background: 'linear-gradient(180deg, #006565 0%, #00A8A8 100%)',
              }}
            />
          </div>
          <span className="text-sm font-bold text-center mt-2 block">
            {totalWorkLoadShare}%
          </span>
        </div>

        <div
          className="flex justify-center mt-10 mb-5 cursor-pointer"
          onClick={() => setModalVisible(true)}
        >
          <div className="border-2 border-[#97D4D4] rounded-full px-3 py-2">
            <h1 className="font-semibold text-sm">Check Details </h1>
          </div>
        </div>
      </div>

      {/* for mobile device */}
      <div className="border-[3px] border-[#97D4D4] rounded lg:hidden block">
        <div className="flex justify-between">
          <div className="w-[50%] bg-[#E7F3F6] p-3">
            <h1 className={`font-oswald  font-bold `}>
              {' '}
              {formatDate(details?.expectedHandoverDate)}
            </h1>
            <h1 className="text-xs font-semibold">Project Handover mobile</h1>
            <div className=" md:mt-10 mt-5 mb-5">
              <div className="border-2 border-[#97D4D4] w-[80%] flex justify-center rounded px-3 py-2">
                <h1
                  className="font-semibold sm:text-sm text-xs cursor-pointer"
                  onClick={() => setModalVisible(true)}
                >
                  Check Details
                </h1>
              </div>
            </div>
          </div>
          <div className="w-[50%] p-3">
            <Image
              src={img}
              alt=""
              className="object-cover md:w-20 w-16 mx-auto md:mb-5 mb-2"
            />
            <div>
              <h1 className="lg:text-md sm:text-sm text-xs font-semibold">
                Construction in Progress
              </h1>
              <div className="w-full bg-gray-200 rounded-full h-2 md:mt-2 mt-1">
                <div
                  className="bg-[#009898] h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }} // Dynamically set the width
                />
              </div>
              <span className="text-sm font-bold text-center md:mt-2 mt-1 block">
                {totalWorkLoadShare}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* modal for check details */}
      {progressData?.length > 0 ? (
        <CheckDetails
          modalRef={modalRef}
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          data={progressData}
          details={details}
        />
      ) : (
        ''
      )}
    </div>
  )
}
