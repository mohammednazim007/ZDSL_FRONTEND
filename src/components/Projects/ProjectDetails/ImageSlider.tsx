/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Custom Left Arrow
const CustomLeftArrow: React.FC<{
  onClick: any
  id: string
  disabled: boolean
}> = ({ onClick, id, disabled }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`absolute hidden left-0 z-10 p-2 transform -translate-y-1/2 bg-gray-800 rounded-full top-1/2 hover:bg-gray-600 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  )
}

// Custom Right Arrow
const CustomRightArrow: React.FC<{
  onClick: any
  id: string
  disabled: boolean
}> = ({ onClick, id, disabled }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`absolute hidden right-0 z-10 p-2 transform -translate-y-1/2 bg-gray-800 rounded-full top-1/2 hover:bg-gray-600 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  )
}

interface MultiCarouselProps {
  children: React.ReactNode
  leftArrowId: string
  rightArrowId: string
  animationSecond?: number
  responsiveMobileDeviceTitle?: string
  responsiveMobileDevicePathLink?: any
}

const ImageSlider: React.FC<MultiCarouselProps> = ({
  children,
  leftArrowId,
  rightArrowId,
  animationSecond = 2000,
  responsiveMobileDeviceTitle,
  responsiveMobileDevicePathLink,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isStartOfCarousel, setIsStartOfCarousel] = useState(true)
  const [isEndOfCarousel, setIsEndOfCarousel] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleBeforeChange = (
    nextSlide: number,
    { slidesToShow, totalItems }: any
  ) => {
    setIsStartOfCarousel(nextSlide === 0)
    setIsEndOfCarousel(nextSlide >= totalItems - slidesToShow)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    )

    if (carouselRef.current) observer.observe(carouselRef.current)

    return () => {
      if (carouselRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(carouselRef.current)
    }
  }, [])

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

  return (
    <>
      <div className="relative md:px-5 md:ms-primary-padding" ref={carouselRef}>
        <Carousel
          responsive={responsive}
          infinite={false}
          customLeftArrow={
            <CustomLeftArrow
              id={leftArrowId}
              onClick={() => {}}
              disabled={isStartOfCarousel}
            />
          }
          customRightArrow={
            <CustomRightArrow
              id={rightArrowId}
              onClick={() => {}}
              disabled={isEndOfCarousel}
            />
          }
          autoPlay={isVisible} // Auto play only when the carousel is visible
          autoPlaySpeed={animationSecond}
          showDots={false}
          keyBoardControl
          beforeChange={handleBeforeChange}
        >
          {children}
        </Carousel>
      </div>

      <div
        className={`flex px-5 md:mx-primary-padding ${
          responsiveMobileDeviceTitle
            ? 'justify-between md:justify-end'
            : 'md:justify-end'
        } items-center sm:justify-end gap-3 mt-4`}
      >
        {responsiveMobileDeviceTitle && responsiveMobileDevicePathLink && (
          <Link href={responsiveMobileDevicePathLink}>
            <button className="bg-white mb-5 sm:hidden block py-2 px-3 border text-[#063354] font-bold rounded-md">
              {responsiveMobileDeviceTitle}
            </button>
          </Link>
        )}
        <div className="flex gap-2">
          {/* <button
          onClick={() => {
            document.getElementById(leftArrowId)?.click();  
          }}
          className={`p-2 flex justify-center  items-center w-[3.125rem] h-[3.125rem]   rounded-lg transition-transform duration-300 ease-in-out transform  hover:shadow-xl active:scale-95 
            ${
              isStartOfCarousel
                ? " bg-[#E4E4E4]    cursor-not-allowed"
                : " hover:scale-105 border border-[#E4E4E4] shadow-md bg-white hover:bg-gray-100"
            }`}
          disabled={isStartOfCarousel} // Disable button at end
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 12.963 8.646"
            className={`   
              ${ isStartOfCarousel
                ? " bg-[#E4E4E4]  scale-75  cursor-not-allowed"
                : "hover:scale-125 "} 
                transition-transform duration-300 ease-in-out  active:scale-110`}
          >
            <path
              id="Icon_ionic-ios-arrow-round-forward"
              data-name="Icon ionic-ios-arrow-round-forward"
              d="M12.571,11.417a.588.588,0,0,1,0,.829L9.838,14.988H20.258a.585.585,0,0,1,0,1.171H9.843L12.58,18.9a.593.593,0,0,1,0,.829.583.583,0,0,1-.824,0l-3.71-3.737h0A.657.657,0,0,1,7.92,15.8a.559.559,0,0,1-.045-.225.587.587,0,0,1,.167-.41l3.71-3.737A.574.574,0,0,1,12.571,11.417Z"
              transform="translate(-7.875 -11.252)"
              fill="#063354"
            />
          </svg>
        </button> */}

          {/* <button
          onClick={() => {
            document.getElementById(rightArrowId)?.click();
          }}
          className={`p-2 flex justify-center border border-[#E4E4E4] items-center w-[3.125rem] h-[3.125rem]   rounded-lg transition-transform duration-300 ease-in-out transform  hover:shadow-xl active:scale-95 
            ${
              isEndOfCarousel
                ? " bg-[#E4E4E4]  cursor-not-allowed"
                : " hover:scale-105  shadow-md bg-white  hover:bg-gray-100"
            }`}
          disabled={isEndOfCarousel} // Disable button at end
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 12.963 8.646"
            className={`   
              ${ isEndOfCarousel
                ? " bg-[#E4E4E4]  scale-75  cursor-not-allowed"
                : "hover:scale-125 "} 
                transition-transform rotate-180 duration-300 ease-in-out  active:scale-110`}
          >
            <path
              id="Icon_ionic-ios-arrow-round-forward"
              data-name="Icon ionic-ios-arrow-round-forward"
              d="M12.571,11.417a.588.588,0,0,1,0,.829L9.838,14.988H20.258a.585.585,0,0,1,0,1.171H9.843L12.58,18.9a.593.593,0,0,1,0,.829.583.583,0,0,1-.824,0l-3.71-3.737h0A.657.657,0,0,1,7.92,15.8a.559.559,0,0,1-.045-.225.587.587,0,0,1,.167-.41l3.71-3.737A.574.574,0,0,1,12.571,11.417Z"
              transform="translate(-7.875 -11.252)"
              fill="#063354"
            />
          </svg>
        </button> */}
        </div>
      </div>
    </>
  )
}

export default ImageSlider
