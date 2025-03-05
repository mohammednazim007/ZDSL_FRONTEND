'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LottiePlay from '@/components/shared/LottiePlay'
import Container from '@/components/shared/Container'
import videoThumbnail from '@/assets/video-intro-dummy.png'
export const CompanyProfileSvg = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42.603"
      height="41.389"
      viewBox="0 0 42.603 41.389"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#f3c65d" />
          <stop offset="1" stopColor="#e59f00" />
        </linearGradient>
      </defs>
      <g
        id="Group_11066"
        data-name="Group 11066"
        transform="translate(-1061.362 -2793.444)"
      >
        <circle
          id="Ellipse_139"
          data-name="Ellipse 139"
          cx="13.345"
          cy="13.345"
          r="13.345"
          transform="translate(1077.276 2808.143)"
          fill="url(#linear-gradient)"
        />
        <g id="address-book_outline" transform="translate(1053.962 2793.444)">
          <path
            id="Path_15192"
            data-name="Path 15192"
            d="M23.564,10.2a1.364,1.364,0,1,0,0,2.728H30.84a1.364,1.364,0,1,0,0-2.728Z"
            transform="translate(-0.794 -2.469)"
            fill="url(#linear-gradient)"
          />
          <path
            id="Path_15193"
            data-name="Path 15193"
            d="M5.128.731C6.213.105,7.615.015,10.131,0V0h14.1c5.145,0,7.717,0,9.315,1.6s1.6,4.171,1.6,9.315V25.465c0,5.145,0,7.717-1.6,9.315s-4.171,1.6-9.315,1.6h-14.1v0c-2.515-.013-3.918-.1-5-.729a5.456,5.456,0,0,1-2-2C2.4,32.384,2.4,30.684,2.4,27.284V9.095c0-3.4,0-5.1.731-6.366A5.457,5.457,0,0,1,5.128.731ZM32.413,25.465V10.914a47.931,47.931,0,0,0-.176-5.624c-.159-1.183-.416-1.554-.624-1.762s-.579-.465-1.762-.624a47.945,47.945,0,0,0-5.624-.175H12.859V33.651H24.228a47.929,47.929,0,0,0,5.624-.176c1.184-.159,1.554-.416,1.762-.624s.465-.579.624-1.762A47.929,47.929,0,0,0,32.413,25.465ZM10.131,33.648V2.731c-1.013.005-1.763.023-2.373.078a3.069,3.069,0,0,0-1.265.285,2.728,2.728,0,0,0-1,1,3.069,3.069,0,0,0-.285,1.265c-.078.857-.08,1.987-.08,3.737v18.19c0,1.75,0,2.881.08,3.737a3.069,3.069,0,0,0,.285,1.265,2.728,2.728,0,0,0,1,1,3.067,3.067,0,0,0,1.265.285C8.368,33.626,9.117,33.643,10.131,33.648Z"
            transform="translate(5)"
            fill="#063354"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  </>
)

export default function CompanyProfile() {
  const [showMore, setShowMore] = useState<boolean>(false)

  return (
    <section
      id="ourCompanyProfile"
      className="bg-[#DEE4E8] shadow-md py-24 h-full w-full"
    >
      <Container>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
          {/* Left Section */}
          <div className="bg-white shadow-lg rounded-lg h-fit">
            <div className="flex flex-col p-2">
              <div className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black after:opacity-20">
                <Image
                  src={videoThumbnail}
                  alt="video intro dummy"
                  height={440}
                  width={760}
                  className="w-full"
                />
                {/* <LottiePlay
                  path="/animate-play.json"
                  height={150}
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
                /> */}
              </div>
              <div className="flex flex-col gap-y-0 px-4 py-4">
                <h3 className="text-xl text-black font-semibold">
                  Introduction to our company in motion
                </h3>
                <p className="text-sm text-[#063354] font-poppins">
                  Your dream home , is our priority
                </p>
              </div>
            </div>
          </div>

          {/* Right Section (Text Section) */}
          <div className="flex flex-col gap-y-4 py-2">
            <div className="flex flex-col gap-y-10 flex-grow">
              <h2 className="flex gap-2 items-center text-4xl font-medium text-gray-800">
                {CompanyProfileSvg} Our Company Profile
              </h2>
              <article className="flex flex-col gap-y-4">
                <p className="text-gray-600 text-sm font-poppins">
                  Zubion started its journey in the real estate development
                  sector in 2012 partnering with the renowned project named
                  &lsquo;Aksir Nagar.
                </p>
                <p className="text-gray-600 text-sm font-poppins">
                  Backing with the current good reputation and sector
                  experience, Zubion has expanded its footprint to the building
                  construction sector; naming as Zubion Development Solutions
                  Limited (zdsl).
                </p>
                <p className="text-gray-600 text-sm font-poppins">
                  Zdsi promises to provide a complete solution of the
                  people&apos;s cherished residence focusing on quality, art,
                  commitment, and value for money.
                </p>
                <p className="text-gray-600 text-sm font-poppins">
                  Zdsl has a skilled, experienced, and committed management team
                  who are all graduated from the University of Dhaka. To achieve
                  the ultimate mission and vision of the company, zdsl gathers
                  widely experienced professionals, trained both at home and
                  abroad, including civil engineers, structural engineers, and
                  architects.
                </p>

                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col gap-y-4"
                    >
                      <p className="text-gray-600 text-sm font-poppins">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Ipsum laborum distinctio molestiae, nisi voluptate
                        doloremque sed accusantium error delectus, eos minus
                        neque velit, quos sint dolorem. Eius alias officiis
                        recusandae delectus quaerat. Iusto earum dignissimos at
                        atque, ea optio ducimus, dolorum aliquid, natus
                        praesentium aliquam. Laborum quos perspiciatis
                        doloremque ullam.
                      </p>
                      <p className="text-gray-600 text-sm font-poppins">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Obcaecati fugit reiciendis nisi excepturi, vel ullam!
                        Quasi, ad dolorem debitis similique nobis itaque nisi
                        nemo impedit excepturi porro repudiandae autem incidunt
                        architecto. Doloremque deserunt facilis placeat tenetur
                        in nisi praesentium at dignissimos vero laborum
                        exercitationem officia id nesciunt cum, accusantium
                        autem.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {showMore ? (
                  <button
                    type="button"
                    className="underline font-oswald text-base font-medium w-fit text-[#063354]"
                    onClick={() => setShowMore(false)}
                  >
                    Read less
                  </button>
                ) : (
                  <button
                    type="button"
                    className="underline font-oswald text-base font-medium w-fit text-[#063354]"
                    onClick={() => setShowMore(true)}
                  >
                    Read more
                  </button>
                )}
              </article>
            </div>

            <button
              type="button"
              className="w-fit bg-gradient-to-b from-[#F3C65D] to-[#E59F00] text-black py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors --font-oswald"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Download Company Profile
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
