'use client'
import { toast } from 'sonner'
import { useState } from 'react'
import cp from '@/assets/comapnayprofile/cp.jpg'
import Image from 'next/image'
import LottiePlay from '../shared/LottiePlay'
import Modal from '../shared/Modal' // Import Modal component
import ReactPlayer from 'react-player' // For video playback if needed
import ResponsiveModal from '../shared/responsive-modal/ResponsiveModal'

type TvideoCardProps = {
  videoUrl: string
  description: string
  videoTitle: string
}

const VideoCard = ({ videoUrl, description, videoTitle }: TvideoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setPlaying(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPlaying(false)
  }

  return (
    <div className="bg-white relative rounded-md w-full p-2">
      <div className="relative h-[440px] w-full rounded-md overflow-hidden">
        <Image
          onClick={() => toast.info('This Video Feature will be coming soon')}
          quality={100}
          src={cp}
          alt="AllProjectsLocationMap"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300" />
        <button onClick={handleOpenModal}>
          <LottiePlay
            path="/animate-play.json"
            height={150}
            width={150}
            style={{
              position: 'absolute',
              width: '105px',
              height: '105px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              cursor: 'pointer',
            }}
          />
        </button>
      </div>
      <div className="py-3 flex flex-col gap-y-1">
        <h1 className="md:text-3xl text-xl">{videoTitle || ''}</h1>
        <p className="lg:text-lg text-sm text-secondary">{description || ''}</p>
      </div>

      {/* Modal for Video */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative w-full h-[20rem] md:h-[27rem]">
          {/* You can replace the URL with your actual video URL */}
          <ReactPlayer
            url={videoUrl} // Replace with your actual video URL
            playing={playing}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </div>
  )
}

export default VideoCard
