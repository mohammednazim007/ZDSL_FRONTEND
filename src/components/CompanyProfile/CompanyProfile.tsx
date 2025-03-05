'use client'
import React, { useState } from 'react'
import SectionWrapper from '../Wrappers/SectionWrapper'
import VideoCard from './VideoCard'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gql, useQuery } from '@apollo/client'
import comapnayIcon from '@/assets/comapnayprofile/Group 11066.svg'
import Button from '../shared/Button'
import getPureString from './textSplit'
import Loader from '../shared/Loder'
import getLimitedHtml from '../shared/getLimitedHTML/getLimitedHtml'

const GET_COMPANY_PROFILE = gql`
  query GetAbout {
    getAbout {
      success
      message
      data {
        id
        heading
        icon
        headingDescription
        CompanySections {
          visibility
          title
          description
          icon
          companyProfileUrl
          videoUrl
          videoTitle
          videoDescription
          tramlineImage
        }
        isDeleted
        ASection {
          title
          icon
        }
      }
    }
  }
`

const CompanyProfile = () => {
  const { data, loading, error } = useQuery(GET_COMPANY_PROFILE)
  const [isReadMore, setMore] = useState<boolean>(false)

  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>

  const isVisible = data?.getAbout?.data[0]?.CompanySections[0]?.visibility
  const companyProfile = data?.getAbout?.data[0]?.CompanySections[0]
  const title = companyProfile?.title

  // const displayedText = isReadMore
  //   ? companyProfile?.description || ''
  //   : truncateHtmlWithLineBreaks(companyProfile?.description || '', 200)
  console.log('main text ', companyProfile?.description?.length)

  if (!isVisible) {
    return null // Do not render if visibility is false
  }

  return (
    <>
      {isVisible && (
        <section className="bg-gray-100">
          <SectionWrapper>
            <h1 className="text-xl lg:text-3xl font-semibold md:hidden py-2">
              {getPureString(title)}
            </h1>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-start">
              {/* video card */}
              <VideoCard
                videoUrl={companyProfile?.videoUrl}
                description={companyProfile?.videoDescription}
                videoTitle={companyProfile?.videoTitle}
              />

              {/* company info */}
              <div>
                <motion.div
                  className="w-full " // Ensure it takes half the available space on large screens
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div className="w-full h-auto px-5 md:py-0">
                    <div className="gap-2 md:justify-start justify-center items-center hidden md:flex">
                      <Image
                        src={
                          companyProfile?.icon
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${companyProfile?.icon}`
                            : comapnayIcon
                        }
                        alt="company"
                        width={42.6}
                        height={41.39}
                        className="w-10 h-10"
                      />
                      <h1 className="text-xl lg:text-3xl font-semibold ">
                        {getPureString(title)}
                      </h1>
                    </div>

                    <div className="font-poppins flex flex-col gap-4 my-8 md:text-base !text-sm">
                      <div>
                        <p
                          className="text-md"
                          dangerouslySetInnerHTML={{
                            __html: isReadMore
                              ? companyProfile?.description
                              : getLimitedHtml(
                                  companyProfile?.description,
                                  150
                                ),
                          }}
                        />
                        {companyProfile?.description.length >= 1199 && (
                          <div>
                            <button
                              onClick={() => setMore(!isReadMore)}
                              className="text-[#E9B338] cursor-pointer font-semibold border-b border-[#063354] mt-2 font-oswald text-sm"
                            >
                              {!isReadMore ? 'Read More' : 'See Less'}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto flex-grow"></div>
                      <div className="mt-auto space-x-4">
                        <a
                          href={companyProfile?.companyProfileUrl}
                          download={true}
                          target="_blank"
                        >
                          <Button>Download Company Profile</Button>
                        </a>

                        <button className="font-[family-name:var(--font-oswald)] shadow-md rounded-[5px] md:py-3 py-1 px-2 md:px-4 lg:hidden font-normal">
                          View Company Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SectionWrapper>
        </section>
      )}
    </>
  )
}

export default CompanyProfile
