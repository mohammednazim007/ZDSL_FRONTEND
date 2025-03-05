// export default ProjectVideos
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { gql, useQuery } from '@apollo/client'
import HappyClientsPNG from '@/assets/comapnayprofile/cp-1.jpg'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import Loader from '../shared/Loder'
import Modal from '../shared/Modal'
import SectionWrapper from '../Wrappers/SectionWrapper'
import LottiePlay from '../shared/LottiePlay'

// New GraphQL query for fetching best videos
const GET_ALL_BEST_VIDEOS = gql`
  query Query {
    getAllBestVideos {
      success
      message
      data {
        id
        heroTitle
        visibility
        isDeleted
        testimonials {
          testimonial {
            _id
            VideoTitle
            VideoUrl
            publishDate
            thumbnailImage
            videoType
            isDeleted
          }
          visibility
        }
      }
    }
  }
`

const ProjectVideos = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoLimit, setVideoLimit] = useState(3) // Default limit for mobile
  const popupRef = useRef<HTMLDivElement | null>(null)

  // Apollo Client useQuery hook to fetch data
  const { data, loading, error } = useQuery(GET_ALL_BEST_VIDEOS)

  const handleLottieClick = (url: string) => {
    setVideoUrl(url)
    setIsModalOpen(true)
    setPlaying(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPlaying(false)
  }

  // Adjust video limit based on screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateVideoLimit = () => {
        const screenWidth = window.innerWidth
        setVideoLimit(screenWidth >= 768 ? Infinity : 3) // Show all videos for md+ devices
      }

      // Set initial video limit
      updateVideoLimit()

      // Add resize event listener
      window.addEventListener('resize', updateVideoLimit)

      return () => {
        window.removeEventListener('resize', updateVideoLimit)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node))
        setIsPopupOpen(false)
    }

    if (isPopupOpen) document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopupOpen])

  if (loading) return <Loader />
  if (error) return <p>{error.message}</p>

  const bestVideos = data?.getAllBestVideos?.data || []

  return (
    <SectionWrapper>
      <motion.div
        data-aos="fade-up"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <section className="flex flex-row items-center justify-between gap-x-4 md:gap-0 gap-4 md:justify-between w-full">
          <h1
            className="w-full text-center md:text-left"
            dangerouslySetInnerHTML={{
              __html: bestVideos[0]?.heroTitle || 'Our Latest Videos',
            }}
          ></h1>

          <Link
            href={'/projects-video?project_status=all'}
            className="hidden md:block"
          >
            <button className="bg-white py-2 px-3 border md:text-lg text-sm text-[#063354] rounded-md text-nowrap">
              Check All Videos
            </button>
          </Link>
        </section>

        {bestVideos?.length > 0 ? (
          <section className="mt-2 py-5 lg:py-[2vh] w-full grid grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[300px] gap-4 xl:gap-[1vw]">
            {bestVideos[0]?.testimonials
              ?.filter((item: any) => item.visibility)
              ?.splice(0, videoLimit) // Dynamically limit videos
              .map(({ testimonial }: any, index: number) => (
                <div
                  key={testimonial?._id}
                  className={`border px-2 pt-2 pb-10 rounded-md w-full ${index === 0
                      ? 'col-span-2 row-span-2'
                      : 'col-span-1 row-span-1'
                    }`}
                >
                  <div className="relative h-full w-full">
                    <div className="w-full h-full relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-[0.4] after:rounded-md">
                      <Image
                        layout="fill"
                        quality={100}
                        src={
                          testimonial?.thumbnailImage
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${testimonial?.thumbnailImage}`
                            : HappyClientsPNG
                        }
                        alt="Project Video Thumbnail"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Play button overlay */}
                      <div
                        className="playButtonAnimation"
                        onClick={() => handleLottieClick(testimonial?.VideoUrl)}
                      >
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
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center pt-2 justify-between">
                    <h1 className="md:text-base text-sm font-medium line-clamp-1">
                      {testimonial?.VideoTitle}
                    </h1>
                    <p className="text-[#EBB028] md:text-sm text-xs line-clamp-1">
                      {new Date(
                        Number(testimonial?.publishDate)
                      ).toDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </section>
        ) : (
          <div className="h-[30vh] pb-20 flex justify-center items-center">
            <h2 className="font-semibold text-center text-xl">
              No Videos Found
            </h2>
          </div>
        )}

        {/* for mobile */}
        <div className="w-full flex items-end justify-items-end mt-1">
          <Link
            href={'/projects-video?project_status=all'}
            className="md:hidden w-full text-end"
          >
            <button className="bg-white py-2 px-3 border md:text-lg text-sm text-[#063354] rounded-md text-nowrap ">
              Check All Videos
            </button>
          </Link>
        </div>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {loading ? (
          <Loader />
        ) : (
          <div className="relative w-full h-[20rem] md:h-[27rem] ">
            <ReactPlayer
              url={videoUrl}
              playing={playing}
              controls
              width="100%"
              height="100%"
            />
          </div>
        )}
      </Modal>
    </SectionWrapper>
  )
}

export default ProjectVideos
