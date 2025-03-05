/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'
import { useEffect, useState, useRef, useCallback, Suspense } from 'react'
import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
import { TVideo } from '@/interface/video'
import Image from 'next/image'
import Loader from '../shared/Loder'
import SuspenseLoader from '../shared/SuspenseLoader'
import SubHeader from '../newsAndBlogs/SubHeader'
import YouTube from 'react-youtube'
import rightArrowBack from '@/assets/icons/rightArrowBack.gif'
import { IoSearch } from 'react-icons/io5'
import VideoFilter from '../Projects/VideoFilter'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Modal from '../shared/Modal'
import ReactPlayer from 'react-player'

const VideoFilterTabs: React.FC<{ onTabChange: (filter: string) => void }> = ({
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>('All Videos')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const router = useRouter()

  const tabs: { name: string; filter: string }[] = [
    { name: 'All Videos', filter: 'All' },
    { name: 'Projects', filter: 'Project' },
    { name: 'Events', filter: 'Event' },
    { name: 'Others', filter: 'Other' },
  ]

  return (
    <div className="">
      {/* back arrow button for mobile */}
      <div className="flex items-center gap-2 justify-start ml-4 md:hidden">
        <Image
          src={rightArrowBack}
          alt="back arrow"
          width={40}
          height={40}
          onClick={() => router.back()}
        />

        <span>Video</span>
      </div>

      <div className="flex justify-between md:flex-row items-center p-2">
        <div className="hidden md:block">
          <SubHeader title="All Videos" subtitle="Find all of our videos" />
        </div>

        {/* Tabs */}
        <div className="md:flex hidden border rounded border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name)
                onTabChange(tab.filter)
              }}
              className={`px-4 py-2 text-sm transition-all font-medium ${activeTab === tab.name
                  ? 'text-yellow-500 border-2 rounded border-yellow-500'
                  : 'text-gray-800'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* search input & filter icon */}
        <div className="flex items-center gap-2 justify-between w-full md:w-[8%] ">
          {/* search input  */}
          <div
            className={`border pr-1 rounded flex items-center gap-2 transition-all md:hidden ${isInputFocused ? 'bg-white' : 'bg-transparent'
              }`}
          >
            <input
              type="text"
              placeholder="Enter any key."
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="outline-0 !border-transparent focus:!border-transparent focus:!ring-transparent !bg-transparent transition-all w-[100%] bg-yellow-600"
            />
            <button
              className={`flex items-center p-2 border rounded text-gray-800`}
            >
              <IoSearch />
            </button>
          </div>

          {/* filter icon */}
          <div className="">
            <VideoFilter onFilterChange={onTabChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AllProjects() {
  const [videos, setVideos] = useState<TVideo[]>([]) // Store all videos
  const [page, setPage] = useState(1) // Pagination page
  const [hasMore, setHasMore] = useState(true) // If more data exists
  const observer = useRef<IntersectionObserver | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<TVideo | null>(null)
  const limit = 5 // Number of videos per page
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const videoHeight =
    typeof window !== 'undefined' && window.innerWidth <= 768 ? '370' : '430'

  const { performQuery, loading, fetchedData } =
    useGraphQLFetchQuery<TVideo[]>()

  // Helper function to extract video ID
  const getVideoId = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.searchParams?.get('v')
    } catch (error) {
      console.error('Invalid URL:', error)
      return null
    }
  }

  // Fetch videos
  const fetchVideos = async () => {
    try {
      // Define Variables as Record<string, { value: any; type: string }>
      const variables: Record<string, { value: any; type: string }> = {
        limit: { value: limit, type: 'Int' },
        page: { value: page, type: 'Int' },
      }

      if (activeFilter !== 'All') {
        variables.videoType = { value: activeFilter, type: 'String' }
      }

      const result = await performQuery(
        'getAllVideos',
        [
          '_id',
          'VideoTitle',
          'VideoUrl',
          'publishDate',
          'thumbnailImage',
          'videoType',
          'isDeleted',
        ],
        variables
      )
    } catch (error) {
      console.error('fetchVideos error:', error)
    }
  }

  // to stop website scrolling when video is playing
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden' // Stop scrolling
    } else {
      document.body.style.overflow = '' // Restore scrolling
    }

    return () => {
      document.body.style.overflow = '' // Cleanup
    }
  }, [isPopupOpen])

  // Update the videos list with fetched data
  useEffect(() => {
    if (fetchedData && fetchedData.length > 0) {
      setVideos((prevVideos) => {
        const newVideos = fetchedData.filter(
          (newVideo) => !prevVideos.some((video) => video._id === newVideo._id)
        )
        return [...prevVideos, ...newVideos]
      })
      setHasMore(fetchedData.length === limit)
    } else {
      setHasMore(false)
    }
  }, [fetchedData])

  const lastCardRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        console.log('IntersectionObserver entries:', entries)
        if (entries[0].isIntersecting && hasMore) {
          console.log('Incrementing page')
          setPage((prevPage) => prevPage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  // Fetch videos when `page` or `status` changes
  // Reset videos and fetch new data on filter change
  useEffect(() => {
    setVideos([]) // Clear the videos array
    setPage(1) // Reset the page to 1
    fetchVideos() // Fetch videos for the new filter
  }, [activeFilter])

  // Fetch videos when `page` changes
  useEffect(() => {
    if (page > 1) {
      fetchVideos()
    }
  }, [page])

  // Toggle popup
  const togglePopup = (video: TVideo | null) => {
    setSelectedVideo(video)
    setIsPopupOpen((prev) => !prev)
  }
  const handleCloseModal = () => {
    setIsPopupOpen(false)
  }
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container mx-auto ">
        <div className="pt-36 pb-5">
          <VideoFilterTabs onTabChange={setActiveFilter} />
        </div>
        {loading && page === 1 ? (
          <div className="h-[80vh] pb-20 flex justify-center items-center">
            <Loader />
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-2 md:gap-5 pb-20 mx-1">
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                className={`border px-2 pt-2 pb-16 md:pb-10 rounded-md w-full ${index === 0
                    ? 'col-span-2 row-span-2'
                    : 'col-span-1 row-span-1'
                  }`}
                ref={index === videos.length - 1 ? lastCardRef : null}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-full w-full ">
                  <Image
                    width={1000}
                    height={500}
                    quality={100}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${video?.thumbnailImage}`}
                    alt={video?.VideoTitle}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Play button overlay */}
                    <div
                      className="playButtonAnimation"
                      onClick={() => {
                        togglePopup(video)
                      }}
                    >
                      <div className="w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem] rounded-full bg-gradient-to-b from-[#F3C65D] to-[#E59F00] flex justify-center items-center relative z-30 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 13.534 15.468"
                        >
                          <path
                            id="Icon_awesome-play"
                            data-name="Icon awesome-play"
                            d="M12.821,6.487,2.187.2A1.442,1.442,0,0,0,0,1.448V14.019a1.449,1.449,0,0,0,2.187,1.248L12.821,8.983A1.449,1.449,0,0,0,12.821,6.487Z"
                            transform="translate(0 -0.002)"
                            fill="#fff"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Video Title and Publish Date */}
                <div className="md:flex flex-row items-center pt-2 justify-between">
                  <h1 className="text-md font-medium line-clamp-1">
                    {video?.VideoTitle}
                  </h1>
                  <p className="text-[#EBB028] text-sm line-clamp-1">
                    {new Date(Number(video?.publishDate))?.toDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-[80vh] pb-20 flex justify-center items-center">
            <h2 className="font-semibold text-center text-xl">
              No Videos Found
            </h2>
          </div>
        )}

        {loading && page > 1 && (
          <div className="pb-10 flex justify-center items-center">
            <Loader />
          </div>
        )}

        {!hasMore && !loading && (
          <div className="text-center text-gray-500 my-6">
            {/* <p>No more videos to display</p> */}
          </div>
        )}

        <AnimatePresence>
          {isPopupOpen && selectedVideo && (
            <Modal isOpen={isPopupOpen} onClose={handleCloseModal}>
              <div className="relative w-full h-[23rem] md:h-[27rem]">
                <YouTube
                  videoId={getVideoId(selectedVideo.VideoUrl || '')}
                  opts={{
                    width: '100%',
                    height: videoHeight,
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </Suspense>
  )
}
