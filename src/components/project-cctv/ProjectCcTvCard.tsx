/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React, { useCallback, useRef } from 'react'
import { GoScreenFull } from 'react-icons/go'
import { BiCctv } from 'react-icons/bi'
import { CctvCardProps } from './types'

const ProjectCctvCard = ({ data }: { data: CctvCardProps }) => {
  const videoContainerRef = useRef<HTMLDivElement | null>(null)

  // CCTV video handler
  const handleVideoFn = useCallback(() => {
    const element = videoContainerRef.current

    if (!element) return

    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if ((element as any).webkitRequestFullscreen) {
      return (element as any).webkitRequestFullscreen() // Safari fallback
    } else if ((element as any).msRequestFullscreen) {
      return (element as any).msRequestFullscreen() // IE/Edge fallback
    }
  }, [])

  return (
    <div className="border-2 border-[#ddd6d67a] rounded-md p-1 hover:border-[#EFBA40] transition-all duration-300 shadow-md">
      {/* Video container for fullscreen */}
      <div className="relative" ref={videoContainerRef}>
        {/* Embed an iframe if live feed exists */}
        {data?.live ? (
          <iframe
            className="object-cover w-full rounded-md h-full"
            src={data.live}
            frameBorder="0"
            allowFullScreen
            title="CCTV Live Feed"
          ></iframe>
        ) : (
          <p>No video source available</p> // Fallback message if live feed is undefined
        )}

        {/* CCTV title and room */}
        <div className="absolute top-1 right-1 flex items-end justify-end gap-1 bg-white p-2 text-[18px] rounded-full text-xs">
          <BiCctv className="w-[17px] h-[17px] text-orange-300" />
          <span>{data.camera?.location || 'Unknown Location'}</span>
        </div>

        {/* Fullscreen button */}
        <button
          onClick={handleVideoFn}
          className="absolute bottom-1 right-1 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full text-xs text-black"
        >
          <GoScreenFull />
        </button>
      </div>
    </div>
  )
}

export default ProjectCctvCard
