/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import React, { use } from 'react'
import CctvCard from './CctvCard'
import TopHeader from './TopHeader'
import FilterInputBox from './FilterInputBox'
import { useParams } from 'next/navigation'
import Loader from '../shared/Loder'
import GET_PROJECT_CCTV from './query'
import { useQuery } from '@apollo/client'
import ProjectCctvCard from '../project-cctv/ProjectCcTvCard'
import PulseLoader from '../shared/pulse-loader/PulseLoader'

const AllCcTv_main = () => {
  const params = useParams<{ id: string }>()

  const { data, loading, error } = useQuery(GET_PROJECT_CCTV, {
    variables: { projectId: params?.id },
    skip: !params?.id, // Skip the query if projectId is not available
    fetchPolicy: 'cache-first', // Use cached data when possible
  })

  const allCCTVs = data?.getAllCCTVs?.data

  // Handle loading and error states
  if (loading) <Loader />

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load CCTV data. Please try again later.
      </div>
    )
  }

  return (
    <div>
      {/* top header for mobile device*/}
      <div className="block md:hidden mt-[-40px]">
        <TopHeader />
        <FilterInputBox />
        <CctvCard />
      </div>

      {/* title & cctv button for desktop */}
      <div className="hidden md:block pb-4">
        <div className="flex justify-between items-center gap-1">
          <p className="text-[20px] md:text-[1.5rem] md:font-semibold">
            Zubion Breeze Blows and Happy Mornings
          </p>

          {/* live cc tv button */}
          <div className="relative lg:mt-0 flex gap-1 justify-center items-center px-2 py-2 rounded-md border-[1px] border-[#FF7A85]  cursor-pointer">
            <div className="h-3 w-3 bg-[#ff7a85] rounded-full" />
            <span className="text-xs text-nowrap">Live CC TV</span>
            <div className="absolute -bottom-[4px] right-[60px] ">
              <PulseLoader />
            </div>
          </div>
        </div>
      </div>
      {/* cctv card */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
        {allCCTVs?.length > 0 ? (
          allCCTVs.map((cctv: any) => (
            <ProjectCctvCard key={cctv?.id} data={cctv} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No CCTV data available.
          </div>
        )}
      </div>
    </div>
  )
}

export default AllCcTv_main
