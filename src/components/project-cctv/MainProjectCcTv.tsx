/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import ProjectCctvCard from './ProjectCcTvCard'
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import GET_PROJECT_CCTV from './cctv-query'
import Loader from '../shared/Loder'
import PulseLoader from '../shared/pulse-loader/PulseLoader'

// const MainProjectCcTv = () => {
//   const params = useParams<{ id: string }>()

//   const { data, loading, error } = useQuery(GET_PROJECT_CCTV, {
//     variables: {
//       projectId: params?.id,
//     },
//     skip: !params?.id,
//   })

//   if (error) return <div>{error.message}</div>
//   const all_CCTV = data?.getAllCCTVs?.data

//   return (
//     <div className="mt-24 md:mt-36 container mx-auto my-16 md:h-screen bg-[#ffffff]">
//       <h1 className="text-[24px] md:text-[40px] text-center py-4 md:py-8 font-semibold text-[#023251]">
//         All Project CCTV
//       </h1>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className=" px-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
//           {all_CCTV?.map((cctv: any) => (
//             <ProjectCctvCard key={cctv?.id} src={cctv?.live} />
//           ))}
//         </div>
//       )}
//       {/* <div className=" px-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
//         <ProjectCctvCard src="https://rtsp.me/embed/AbfFDDNN/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/6Y7KahSy/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/e7EfakKt/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/FfhNk62E/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/E2ids97b/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/n56KD3bs/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/zTNAZnZ6/" />
//         <ProjectCctvCard src="https://rtsp.me/embed/hSdnr8nE/" />
//       </div> */}
//     </div>
//   )
// }

// export default MainProjectCcTv

const MainProjectCcTv = () => {
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

  // Main render
  return (
    <div className="mt-24 md:mt-36 container mx-auto my-16 bg-white">
      <div className="relative mb-[3rem] md:mb-[4rem]">
        <h1 className="text-2xl md:text-4xl text-center font-semibold text-[#023251] mb-8">
          Live CCTV
        </h1>
        <span className="absolute bottom-[11px] right-[52.2%] ">
          <PulseLoader />
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
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

export default MainProjectCcTv
