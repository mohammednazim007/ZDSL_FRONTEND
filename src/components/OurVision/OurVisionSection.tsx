/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
const OurVisionEyesSvg = (
  <>
    <svg
      id="Group_10382"
      data-name="Group 10382"
      xmlns="http://www.w3.org/2000/svg"
      width="56.812"
      height="40.827"
      viewBox="0 0 56.812 40.827"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#f3c65d" />
          <stop offset="1" stop-color="#e59f00" />
        </linearGradient>
      </defs>
      <circle
        id="Ellipse_574"
        data-name="Ellipse 574"
        cx="13.345"
        cy="13.345"
        r="13.345"
        transform="translate(30.122 14.137)"
        fill="url(#linear-gradient)"
      />
      <g id="Group_9200" data-name="Group 9200">
        <path
          id="Path_13630"
          data-name="Path 13630"
          d="M29.11,46.868a24.088,24.088,0,0,1-11.384-2.924,33.586,33.586,0,0,1-8.23-6.3,42.687,42.687,0,0,1-6.787-9.1,1.856,1.856,0,0,1,0-1.712,42.687,42.687,0,0,1,6.787-9.1,33.586,33.586,0,0,1,8.23-6.3,23.564,23.564,0,0,1,21.814-.483A31.85,31.85,0,0,1,47.4,16.426a1.857,1.857,0,0,1-2.535,2.713c-4.918-4.6-10.218-6.926-15.753-6.926-5.985,0-11.666,2.7-16.884,8.031a41.024,41.024,0,0,0-5.734,7.44,41.028,41.028,0,0,0,5.734,7.44c5.219,5.329,10.9,8.031,16.884,8.031,6.013,0,11.717-2.726,16.954-8.1a39.345,39.345,0,0,0,6.152-8.224,1.857,1.857,0,0,1,3.295,1.712,42.688,42.688,0,0,1-6.787,9.1,33.587,33.587,0,0,1-8.23,6.3A24.088,24.088,0,0,1,29.11,46.868Z"
          transform="translate(-2.5 -8.5)"
          fill="#063354"
        />
        <path
          id="Path_13635"
          data-name="Path 13635"
          d="M25.783,35.065A9.293,9.293,0,0,1,16.5,25.783a1.857,1.857,0,0,1,3.713,0,5.57,5.57,0,1,0,5.57-5.57,1.857,1.857,0,0,1,0-3.713,9.283,9.283,0,0,1,0,18.565Z"
          transform="translate(0.829 -6.598)"
          fill="#063354"
        />
      </g>
    </svg>
  </>
)
import React, { useState } from 'react'
import SubHeaderWithLogo from '@/components/shared/SubHeaderWithLogo/SubHeaderWithLogo'
import OurVisionVideo from './OurVisionVideo'
import FaqQuestionAnswer from '@/components/shared/FaqQuestionAnswer/FaqQuestionAnswer'
import Container from '../shared/Container'

type FaqDataTypes = {
  question: string
  answer: string
  isOpen: boolean
}

type missionType = {
  title: string
  description: string
  videoUrl: string
  icon: string
  faqs: FaqDataTypes[]
}

const OurVisionSection = ({
  visionData,
  index,
}: {
  visionData: any
  index: number
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleToggleAccordion = (index: number) => {
    setOpenFaqIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const isEven = index % 2 === 0

  return (
    <div
      id={`section-${index}`}
      className={`${isEven ? 'bg-white' : 'bg-[#DEE4E8]'}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <Container>
        <section
          id={`${0}`}
          className={` py-10 lg:py-20 px-5 lg:px-10 flex flex-col items-center w-full`}
        >
          <div
            className={`flex flex-col ${
              !isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'
            } gap-7 lg:gap-10`}
          >
            {/*===  parent  Video div === */}
            <div className="w-full lg:basis-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              <OurVisionVideo videoUrl={visionData?.videoUrl || ''} />
            </div>

            {/* === parent Content  div === */}
            <div className="w-full lg:basis-1/2">
              <SubHeaderWithLogo
                logo={visionData?.icon}
                title={visionData?.title || 'Our Vision'}
                subtitle={visionData?.description || ''}
              />

              <div className="mt-7 flex flex-col">
                {visionData?.faqs?.length > 0 &&
                  visionData?.faqs?.map((faq: any, index: number) => (
                    <FaqQuestionAnswer
                      key={index}
                      id={index.toString()}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openFaqIndex === index}
                      toggleAccordion={() => handleToggleAccordion(index)}
                      isVisible={faq?.isOpen}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default OurVisionSection
