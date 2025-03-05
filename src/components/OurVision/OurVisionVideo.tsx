/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import LottiePlay from '@/components/shared/LottiePlay'
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPlayer from 'react-player'

const OurVisionVideo = ({ videoUrl }: { videoUrl: string }) => {
  const [playing, setPlaying] = useState(false)
  const [buffering, setBuffering] = useState(false)

  const handlePlay = () => {
    setBuffering(true)
    setPlaying(true)
  }

  return (
    <>
      <div className="bg-slate-50 p-1.5 rounded-md h-fit">
        <div className="w-full mx-auto rounded-md ">
          {!playing && (
            <div
              className="relative w-full after:absolute after:content-[''] after:inset-0 after:bg-black/20"
              onClick={handlePlay} // Attach handlePlay to the container
            >
              <Image
                src="https://res.cloudinary.com/dq95fwkeq/image/upload/v1727199657/Rectangle_6891_2x_qiqttm.png"
                alt="Thumbnail"
                width={1000}
                height={1000}
                className="w-full object-fill rounded-[5px] "
              />
              <LottiePlay
                path="/animate-play.json"
                height={100}
                width={150}
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '150px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                  cursor: 'pointer',
                }}
              />
            </div>
          )}
          <div>
            <ReactPlayer
              width="100%"
              height="390px"
              url={videoUrl}
              playing={playing}
              controls
              onBuffer={() => setBuffering(false)}
              className="rounded-md"
              style={{ display: playing ? 'block' : 'none' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default OurVisionVideo
