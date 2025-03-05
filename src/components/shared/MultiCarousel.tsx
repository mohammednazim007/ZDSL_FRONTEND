/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import Carousel from 'react-multi-carousel'
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
  responsive?: any
  carouselInstance?: any
  className?: string
}

const MultiCarousel: React.FC<MultiCarouselProps> = ({
  children,
  leftArrowId,
  rightArrowId,
  animationSecond = 2000,
  responsiveMobileDeviceTitle,
  responsiveMobileDevicePathLink,
  responsive,
  carouselInstance,
  className,
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
      { threshold: 0.1 }
    )

    if (carouselRef.current) observer.observe(carouselRef.current)

    return () => {
      if (carouselRef.current) observer.unobserve(carouselRef.current)
    }
  }, [isVisible])

  return (
    <div>
      <div className={`relative md:pt-5 ${className}`} ref={carouselRef}>
        <Carousel
          ref={carouselInstance}
          responsive={responsive}
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
          autoPlay={false}
          autoPlaySpeed={animationSecond}
          showDots={false}
          keyBoardControl={true}
          beforeChange={handleBeforeChange}
        >
          {children}
        </Carousel>
      </div>
      <div
        className={`flex ${
          responsiveMobileDeviceTitle
            ? 'justify-between md:justify-end'
            : 'md:justify-end'
        } md:items-center items-center sm:justify-end gap-3 mt-6`}
      >
        {responsiveMobileDeviceTitle && responsiveMobileDevicePathLink && (
          <Link href={responsiveMobileDevicePathLink}>
            <button className="bg-white sm:hidden block py-2 px-3 border text-[#063354] rounded-md">
              {responsiveMobileDeviceTitle}
            </button>
          </Link>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              document.getElementById(leftArrowId)?.click()
            }}
            className={`p-2 flex justify-center items-center w-[3.125rem] h-[3.125rem] rounded-lg transition-transform duration-300 ease-in-out transform active:scale-95 
        ${isStartOfCarousel ? ' bg-[#E4E4E4] cursor-not-allowed' : 'hover:scale-105 border border-[#E4E4E4] shadow-md bg-white hover:bg-gray-100'}`}
            disabled={isStartOfCarousel} // Disable button at the start
          >
            <FaArrowLeftLong
              className={`${isStartOfCarousel ? 'cursor-not-allowed' : 'hover:scale-125 hover:shadow-xl'} transition-transform duration-300 ease-in-out active:scale-110`}
              size={15}
              color="#063354" // Change color based on state
            />
          </button>
          <button
            onClick={() => {
              document.getElementById(rightArrowId)?.click()
            }}
            className={`p-2 flex justify-center border border-[#E4E4E4] items-center w-[3.125rem] h-[3.125rem] rounded-lg transition-transform duration-300 ease-in-out transform  active:scale-95 
        ${isEndOfCarousel ? ' bg-[#E4E4E4] cursor-not-allowed' : 'hover:scale-105 shadow-md bg-white hover:bg-gray-100'}`}
            disabled={isEndOfCarousel} // Disable button at the end
          >
            <FaArrowRightLong
              className={`${isEndOfCarousel ? 'cursor-not-allowed' : 'hover:scale-125 hover:shadow-xl'} transition-transform duration-300 ease-in-out active:scale-110`}
              size={15}
              color="#063354" // Change color based on state
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MultiCarousel
