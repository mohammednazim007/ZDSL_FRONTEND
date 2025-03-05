/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Loader from '../shared/Loder'
import { useQuery } from '@apollo/client'
import { GET_ALL_HAPPY_CLIENT_REVIEWS } from '@/constants/clients/happyClients'
import { FaStar } from 'react-icons/fa6'
import LottiePlay from '../shared/LottiePlay'
import profileDemi from '@/assets/news_blogs/profileDemi.jpg'
import Modal from '../shared/Modal'
import ReactPlayer from 'react-player'
import { div, h1 } from 'framer-motion/client'

const RootHappyClients = () => {
  // for playing the file
  const [isModalOpen, setModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [file, setFile] = useState('')

  // clients
  const [displayedClients, setDisplayedClients] = useState([]) // Clients to display
  const [allClients, setAllClients] = useState([]) // All fetched clients
  const [hasMore, setHasMore] = useState(true) // If there are more clients to load
  const observer = useRef<IntersectionObserver | null>(null)
  const limit = 8 // Number of clients per chunk

  const { data, loading } = useQuery(GET_ALL_HAPPY_CLIENT_REVIEWS)

  // Fetch initial data from GraphQL
  useEffect(() => {
    if (data?.getAllFeedbacks?.data) {
      const reviews = data?.getAllFeedbacks?.data
      setAllClients(reviews) // Store all reviews in allClients
      setDisplayedClients(reviews.slice(0, limit)) // Display the first `limit` items
    }
  }, [data])

  // Load more clients when the last card comes into view
  const loadMoreClients = () => {
    const currentLength = displayedClients.length
    const moreClients = allClients.slice(currentLength, currentLength + limit)

    setDisplayedClients((prev) => [...prev, ...moreClients])

    // Stop loading if no more clients are available
    if (currentLength + moreClients.length >= allClients.length) {
      setHasMore(false)
    }
  }

  // Observer for the last card
  const lastCardRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreClients()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore, displayedClients]
  )

  // close modal
  const handleCloseModal = () => {
    setModalOpen(false)
    setPlaying(false)
  }

  if (loading) {
    return <Loader />
  }
  return (
    <div className="container mx-auto pt-36 pb-5">
      {loading && displayedClients?.length === 0 ? (
        <div className="h-[80vh] pb-20 flex justify-center items-center">
          <Loader />
        </div>
      ) : displayedClients?.length > 0 ? (
        <div>
          <>
            <h1 className="text-lg">Happy Client Review</h1>
            <p>Find all of our client videos</p>
          </>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 pb-20 mx-1">
            {displayedClients?.map((client: any, index: any) => {
              const profilePicData = client?.user?.userDetails?.profilePic
              const profilePicUrl = profilePicData?.url || profilePicData
              return (
                <>
                  <motion.div
                    key={client._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="p-3 mx-2 rounded-md shadow-sm bg-white"
                    ref={
                      index === displayedClients.length - 1 ? lastCardRef : null
                    }
                  >
                    <div className="relative w-full h-auto overflow-hidden aspect-w-4 aspect-h-3 rounded-[5px]">
                      <Image
                        src="https://res.cloudinary.com/dq95fwkeq/image/upload/v1727199657/Rectangle_6891_2x_qiqttm.png"
                        alt="Thumbnail"
                        width={670}
                        height={500}
                        className="w-full h-full object-contain rounded-[5px]"
                      />
                      <button
                        onClick={() => {
                          setPlaying(true)
                          setFile(client?.file)
                          setModalOpen(true)
                        }}
                        className="absolute inset-0 flex items-center justify-center p-3 rounded-full group"
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:opacity-75 rounded-[5px]" />
                        <LottiePlay
                          path="/animate-play.json"
                          height={200}
                          width={200}
                          style={{
                            position: 'absolute',
                            width: '100px',
                            height: '100px',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1,
                            cursor: 'pointer',
                          }}
                        />
                      </button>
                    </div>
                    <div className="md:flex items-start cursor-pointer gap-2 justify-between p-4">
                      <div className="flex gap-2 md:flex-row md:items-start items-center">
                        <Image
                          className="w-[50px] h-[50px] rounded-full object-cover"
                          src={
                            profilePicUrl
                              ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${profilePicUrl}`
                              : profileDemi // Ensure `profileDemi` is a valid URL or relative path starting with "/"
                          }
                          width={50}
                          height={50}
                          alt="Profile"
                        />
                        <div>
                          <h2 className="font-oswald !text-[18px] font-bold">
                            {client?.firstName} {client?.lastName}
                          </h2>
                          <p className="font-poppins !text-[14px] line-clamp-1 text-[#8198A8]">
                            {client?.user?.userDetails?.profession}
                          </p>
                          <p className="!flex flex-row items-center gap-x-0.5">
                            {[
                              ...Array(Math.ceil(Number(client?.rating || 0))),
                            ]?.map((_, i) => (
                              <div key={i}>
                                <FaStar size={15} className="text-[#F3C65D]" />
                              </div>
                            ))}
                            <span className="!text-[14px] text-[#8198A8] ml-1">
                              ({client?.rating || 0})
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="font-poppins md:text-base text-sm text-[#063354] p-4 w-full ">
                      <span className="line-clamp-none">{client?.content}</span>
                    </div>
                  </motion.div>
                </>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] pb-20 flex justify-center items-center">
          <h2 className="font-semibold text-center text-xl">
            No Clients Found
          </h2>
        </div>
      )}

      {loading && displayedClients.length > 0 && (
        <div className="pb-10 flex justify-center items-center">
          <Loader />
        </div>
      )}

      {!hasMore && !loading && (
        <div className="text-center text-gray-500 my-6">
          {/* <p>No more clients to display</p> */}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative w-full h-96">
          <ReactPlayer
            url={file || 'https://youtu.be/IjlYXtI2-GU?si=CT6xM42X_xyT6m3w'}
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

export default RootHappyClients
