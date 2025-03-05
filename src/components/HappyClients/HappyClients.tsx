/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import HappyClientsPNG from '@/assets/HappyClients/HappyClients.png'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import ReactPlayer from 'react-player'
import SectionWrapper from '../Wrappers/SectionWrapper'
import Loader from '../shared/Loder'
import Modal from '../shared/Modal'
import MultiCarousel from '../shared/MultiCarousel'
import HappyClientsCard from './HappyClientsCard'
import Link from 'next/link'
import { GET_ALL_HAPPY_CLIENT_REVIEWS_FOR_HOME_PAGE } from '@/constants/clients/happyClients'

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.25,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2.25,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.15,
  },
}

const HappyClients = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [file, setFile] = useState('')

  // Fetch data using Apollo's useQuery hook
  const { data, loading, error } = useQuery(
    GET_ALL_HAPPY_CLIENT_REVIEWS_FOR_HOME_PAGE
  )

  if (loading) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error loading reviews</div>
  }

  const reviewsSectionData = data?.getAllHappyClientReviews?.data?.[0] || {}
  const reviews = data?.getAllHappyClientReviews?.data[0]?.testimonials || []

  const handleCloseModal = () => {
    setModalOpen(false)
    setPlaying(false)
  }

  return (
    <section className="bg-[#DEE4E8]">
      <SectionWrapper>
        <div className="flex justify-between items-center pb-10 w-full">
          <div className="md:w-1/6"></div>

          <div className="flex flex-col justify-center items-center md:w-4/6">
            <div className="flex items-center gap-x-2 md:justify-start justify-center">
              <Image
                src={HappyClientsPNG}
                alt="company"
                width={45}
                height={52}
                className=""
              />

              <h1
                className="md:text-4xl text-2xl"
                dangerouslySetInnerHTML={{
                  __html: reviewsSectionData?.heroTitle || 'Happy Clients',
                }}
              ></h1>
            </div>
            <p className="md:text-base text-sm mt-2 text-center font-poppins">
              {reviewsSectionData?.heroText ||
                'Watch video testimonials to see what our clients have to say about their experience with us'}
            </p>
          </div>

          <div className="md:w-1/6 flex justify-end">
            <button className="bg-white hidden sm:block py-2 px-3 border text-sm text-[#063354] font-medium rounded-md">
              <Link href={'/happy-clients'}> All Happy Clients</Link>
            </button>
          </div>
        </div>
        {reviews && reviews?.length > 0 ? (
          <MultiCarousel
            responsiveMobileDevicePathLink="/about"
            responsiveMobileDeviceTitle=""
            animationSecond={2000}
            rightArrowId="OurHappyClientsRightArrow"
            leftArrowId="OurHappyClientsLeftArrow"
            responsive={responsive}
          >
            {reviews?.map((item: any, index: number) => {
              return (
                <HappyClientsCard
                  key={index}
                  testimonial={item}
                  setModalOpen={setModalOpen}
                  setPlaying={(play, file) => {
                    setPlaying(play)
                    setFile(item?.testimonial?.file || '')
                  }}
                />
              )
            })}
          </MultiCarousel>
        ) : (
          <div className="h-[30vh] flex justify-center items-center">
            <h1>No Reviews found</h1>
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
      </SectionWrapper>
    </section>
  )
}

export default HappyClients
