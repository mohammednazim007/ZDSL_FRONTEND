'use client'

import React, { useEffect } from 'react'
import StateCard from './StateCard'
import SectionWrapper from '../Wrappers/SectionWrapper'
import { gql, useQuery } from '@apollo/client'

const HOME_INFO = gql`
  query Query {
    getAllHomeInfo {
      _id
      heroTitle
      counters {
        value
        unit
        description
        visibility
      }
      visibility
      isDeleted
    }
  }
`

const TransformSpace = () => {
  const { data, loading, error } = useQuery(HOME_INFO)

  useEffect(() => {
    if (error) console.log(error)
  }, [error])

  const homeInfo = data?.getAllHomeInfo?.[0]
  const counters =
    homeInfo?.counters?.filter((counter: any) => counter.visibility) || []

  // // Dynamically modify font sizes or colors if inline styles are detected
  const modifyHTMLContent = (htmlContent: any) => {
    return htmlContent
      ?.replace(/font-size: \d+px;/g, 'font-size: 2.5rem;') // Adjust font size
      .replace(/color: rgb\(\d+, \d+, \d+\);/g, (match: any) => {
        const colorValue = match.match(/rgb\(\d+, \d+, \d+\)/)[0] // Extract color
        return `color: ${colorValue};` // Reapply color or adjust if needed
      })
  }

  const modifiedHeroTitle = modifyHTMLContent(homeInfo?.heroTitle || '')

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center mt-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-[#EAB308] animate-spin"></div>
          </div>
        </div>
      ) : (
        <SectionWrapper>
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="transformbg"
          >
            <div className="text-center font-poppins transformbg items-center justify-center flex flex-col gap-y-8 pb-10">
              <div
                dangerouslySetInnerHTML={{ __html: modifiedHeroTitle }}
                className="flex flex-col justify-center items-center text-center gap-0 font-semibold font-[family-name:var(--font-oswald)]"
              ></div>
            </div>
            <StateCard stats={counters} />
          </div>
        </SectionWrapper>
      )}
    </>
  )
}

export default TransformSpace
