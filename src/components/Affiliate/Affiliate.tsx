/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { gql, useQuery } from '@apollo/client'
import affiliateImg from '@/assets/affiliate/affiliate.png'
import Image from 'next/image'
import MultiCarousel from '../shared/MultiCarousel'
import SectionWrapper from '../Wrappers/SectionWrapper'
import AffiliateCard from './AffiliateCard'
import { ResponsiveType } from 'react-multi-carousel'
import { useState } from 'react'

const GET_AFFILIATED_CAROUSEL = gql`
  query Query {
    getAffiliatedCarousel {
      _id
      heroTitle
      description
      visibility
      sliders {
        url
        mediaFile
      }
      isDeleted
    }
  }
`

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.25,
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

const Affiliate = () => {
  const { data, loading, error } = useQuery(GET_AFFILIATED_CAROUSEL)
  const [showFullText, setShowFullText] = useState(false)

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const affiliateData = data?.getAffiliatedCarousel?.[0]

  const words = affiliateData?.description.split(' ')
  const initialText = words.slice(0, 16).join(' ')

  // // Dynamically modify font sizes or colors if inline styles are detected
  const modifyHTMLContent = (htmlContent: any) => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth

      // Determine font size based on screen width
      let fontSize = '30px' // Default font size for mobile
      if (screenWidth >= 1024) {
        fontSize = '40px' // Font size for large devices (1024px and above)
      }

      return htmlContent
        ?.replace(/font-size: \d+px;/g, `font-size: ${fontSize};`) // Apply dynamic font size
        .replace(/color: rgb\(\d+, \d+, \d+\);/g, (match: any) => {
          const colorValue = match.match(/rgb\(\d+, \d+, \d+\)/)[0] // Extract color
          return `color: ${colorValue};` // Reapply color
        })
    }
  }

  const modifiedHeroTitle = modifyHTMLContent(affiliateData?.heroTitle || '')

  return (
    <SectionWrapper>
      <div className="py-10 ">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-2 items-center md:justify-start justify-center md:text-4xl text-2xl font-[family-name:var(--font-oswald)]">
            <Image src={affiliateImg} alt="affiliate" height={35} width={35} />
            <div
              className=""
              style={{ fontSize: '10px' }}
              dangerouslySetInnerHTML={{
                __html: modifiedHeroTitle || 'We are affiliated with',
              }}
            ></div>
          </div>
          {/* for desktop */}
          <div className="hidden lg:block">
            <p className="text-[#063354] md:text-lg text-sm font-poppins md:text-left text-left px-2">
              {affiliateData?.description || ''}
            </p>
          </div>

          {/* for mobile */}
          <div className="lg:hidden">
            {affiliateData?.description ? (
              <p className="text-[#063354] md:text-lg text-sm font-poppins md:text-left text-left px-2">
                {showFullText
                  ? affiliateData?.description
                  : `${initialText}...`}
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-[#ECB432] underline ml-1"
                >
                  {showFullText ? 'Show Less' : 'Show More'}
                </button>
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
        <MultiCarousel
          responsiveMobileDeviceTitle=" "
          rightArrowId="AffiliateRightArrow"
          leftArrowId="AffiliateLeftArrow"
          animationSecond={2000}
          responsive={responsive}
        >
          {affiliateData?.sliders.map((slider: any, index: number) => (
            <AffiliateCard slider={slider} key={index} />
          ))}
        </MultiCarousel>
      </div>
    </SectionWrapper>
  )
}

export default Affiliate
