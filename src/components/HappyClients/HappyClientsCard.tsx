/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import profileDemi from '@/assets/news_blogs/profileDemi.jpg'
import { TTestimonial } from '@/interface/clients/happyClients'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import LottiePlay from '../shared/LottiePlay'

const HappyClientsCard = ({
  testimonial,
  setModalOpen,
  setPlaying,
}: {
  testimonial: TTestimonial
  setModalOpen: (state: boolean) => void
  setPlaying: (play: boolean, file: string) => void
}) => {
  const [showFullText, setShowFullText] = useState<boolean>(false)

  const words = testimonial?.testimonial?.content?.split(' ')
  const initialText = words?.slice(0, 16).join(' ')

  const handlePlay = () => {
    setPlaying(true, testimonial?.file)
    setModalOpen(true)
  }

  const profilePicData: any =
    testimonial?.testimonial?.user?.userDetails?.profilePic
  const profilePicUrl = profilePicData?.url || profilePicData

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="p-3 mx-2 rounded-md shadow-sm bg-white"
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
            onClick={handlePlay}
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
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
              src={
                profilePicUrl
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${profilePicUrl}`
                  : profileDemi // Ensure `profileDemi` is a valid URL or relative path starting with "/"
              }
              alt="Profile"
            />
            <div>
              <h2 className="font-oswald !text-[18px] font-bold">
                {testimonial?.testimonial?.firstName}{' '}
                {testimonial?.testimonial?.lastName}
              </h2>
              <p className="font-poppins !text-[14px] line-clamp-1 text-[#8198A8]">
                {testimonial?.testimonial?.user?.userDetails?.profession}
              </p>
              <p className="!flex flex-row items-center gap-x-0.5">
                {[
                  ...Array(
                    Math.ceil(Number(testimonial?.testimonial?.rating || 0))
                  ),
                ]?.map((_, i) => (
                  <div key={i}>
                    <FaStar size={15} className="text-[#F3C65D]" />
                  </div>
                ))}
                <span className="!text-[14px] text-[#8198A8] ml-1">
                  ({testimonial?.testimonial?.rating || 0})
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="font-poppins md:text-base text-sm text-[#063354] p-4 w-full hidden md:flex">
          <button className="text-left">
            {showFullText
              ? testimonial?.testimonial?.content
              : ` ${initialText}...`}{' '}
            <span
              onClick={() => setShowFullText((prev) => !prev)}
              className="text-orange-300"
            >
              {showFullText.length > 16 &&
                (showFullText ? 'show less' : 'show more')}
            </span>
          </button>
        </div> */}
        <div className="font-poppins h-24 overflow-auto md:text-base text-sm text-[#063354] p-4 w-full hidden md:flex">
          <button className="text-left">
            {showFullText
              ? testimonial?.testimonial?.content
              : ` ${initialText}...`}{' '}
            <span
              onClick={() => setShowFullText((prev) => !prev)}
              className="text-orange-300 cursor-pointer"
            >
              {words?.length > 16 && (showFullText ? 'show less' : 'show more')}
            </span>
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default HappyClientsCard
