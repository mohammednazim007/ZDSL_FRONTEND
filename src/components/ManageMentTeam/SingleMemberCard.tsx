'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

// Import your image assets as before
import { TManagementTeam } from '@/interface/team/managementTeam'
import EmailIcon from '../../assets/icon/Socialicons/EmailIcon.png'
import FaceBookIc0n from '../../assets/icon/Socialicons/facebookIcon.png'
import LinkdinIcon from '../../assets/icon/Socialicons/LinkdeinIcon.png'
import Container from '../shared/Container'

export default function SingleMemberCard({
  memberInfo,
  index,
}: {
  memberInfo: TManagementTeam
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section
      id={'experienced'}
      style={{ backgroundColor: `${memberInfo?.bodyBgColor}` }}
      className={`flex  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }  flex-col text-primary_color   ${memberInfo?.bodyBgColor}`}
    >
      <Container>
        <div
          className={`flex  ${index % 2 === 0
              ? 'md:flex-row'
              : 'md:flex-row-reverse flex-row-reverse'
            }  py-[3rem] lg:py-[8.752rem] flex-col text-primary_color  gap-11 2xL:gap-[3.75rem]  md:px-primary-padding   ${memberInfo?.bodyBgColor}`}
        >
          {/* Left Section - Image */}
          <div className="basis-1/2 flex 2xl:basis-[40%] w-full max-w-[30rem] md:max-w-[35rem] lg:max-w-[40rem] xl:max-w-[45rem] 2xl:max-w-[50rem] aspect-[1/1] mx-auto relative  items-center justify-center">
            <div className="relative w-full h-full z-10 flex justify-center items-center">
              <div className="w-[80%] h-[80%]  flex justify-center items-center relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${memberInfo?.photo}`}
                  alt={memberInfo?.name}
                  height={300}
                  width={300}
                  className="object-cover w-full h-full max-h-[530px] z-10 rounded-md"
                  quality={100}
                />
              </div>
              <div
                style={{ backgroundColor: `${memberInfo?.imageBgColor}` }}
                className="absolute rounded-md top-[50%] lg:top-[48%] left-0 w-full h-1/2 max-h-[335px] z-0"
              ></div>
            </div>
          </div>

          {/* Right Section - Content */}

          <div
            className={`basis-1/2 px-5 md:pt-[8rem] max-w-[60rem] min-h-full flex-grow 
            ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
            ${index % 2 === 0 ? 'flex-col-reverse' : 'flex-col'} sm:flex-row`}
          >
            <div
              className={`text-left 
              ${index % 2 === 0 ? 'sm:text-left' : 'sm:text-right'}`}
            >
              <h2
                style={{ color: `${memberInfo?.nameColor}` }}
                className={`font-poppins text-[1.9rem] md:text-[1.5rem] lg:text-[1.8rem] 2xl:text-[2.875rem] font-medium`}
              >
                {memberInfo?.name}
              </h2>

              <h3
                style={{ color: `${memberInfo?.positionColor}` }}
                className={`font-poppins text-[1.8rem] 2xl:text-[2.31rem]`}
              >
                {memberInfo?.position}
              </h3>
            </div>

            <div className="flex gap-8 flex-col pt-2">
              <motion.div
                transition={{ duration: 0.5 }}
                style={{ color: `${memberInfo?.descriptionColor}` }}
                className={`text-[12px] 2xl:text-[16px] font-poppins`}
              >
                <div
                  className={`flex flex-col gap-x-4 overflow-auto scrollbar-hide 
        ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className="text-[#E9AA1A]">
                    {index % 2 === 0 ? (
                      <FaQuoteLeft className="size-8" />
                    ) : (
                      <FaQuoteRight className="size-8" />
                    )}
                  </div>
                  <div className="scrollbar-hide overflow-hidden">
                    <p>{memberInfo?.about || memberInfo?.description}</p>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 scrollbar-hide"
                        >
                          <p className="scrollbar-hide">
                            {memberInfo?.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className={`flex flex-col w-full ${index % 2 === 0 ? 'items-start' : 'items-end'
                        }`}
                    >
                      <button
                        onClick={toggleReadMore}
                        style={{ color: memberInfo?.readMoreColor }}
                        className="underline font-oswald cursor-pointer text-base mt-4"
                      >
                        {isExpanded ? 'Read less...' : 'Read more...'}
                      </button>

                      <div className="flex mt-5 gap-1">
                        <a href={memberInfo?.facebookUrl} target="_blank">
                          <Image
                            alt="Facebook Icon"
                            src={FaceBookIc0n}
                            className="w-16 h-16 cursor-pointer"
                          />
                        </a>
                        <a href={memberInfo?.linkedinUrl} target="_blank">
                          <Image
                            alt="LinkedIn Icon"
                            src={LinkdinIcon}
                            className="w-16 h-16 cursor-pointer"
                          />
                        </a>
                        <a href={`mailto:${memberInfo?.gmail}`}>
                          <Image
                            alt="Email Icon"
                            src={EmailIcon}
                            className="w-16 h-16 cursor-pointer"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
