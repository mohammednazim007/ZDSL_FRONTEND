/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import arrow1 from '@/assets/hero/arrow1.png'
import arrow2 from '@/assets/hero/arrow2.png'
import icon1 from '@/assets/hero/icon1.svg'
import icon2 from '@/assets/hero/icon2.svg'
import icon3 from '@/assets/hero/icon3.svg'
import { gql, useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const GET_SLIDER = gql`
  query Query {
    getSlider {
      _id
      sliders {
        _id
        mediaFile
        headingText
        textColor
        textVisibility
        projectStatus
        isDeleted
      }
      isDeleted
    }
  }
`

const typingContainerVariant = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeAutoNext] = useState(6000)
  const [autoSliderId, setAutoSliderId] = useState<any>()

  const { data, loading, error } = useQuery(GET_SLIDER)

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % (data?.getSlider[0]?.sliders.length || 1)
      )
    }, timeAutoNext)
    setAutoSliderId(autoSlide)

    return () => clearInterval(autoSlide) // Cleanup interval on component unmount
  }, [timeAutoNext, data])

  const showSlider = (type: 'next' | 'prev') => {
    // clearInterval(autoSliderId)
    setCurrentSlide((prev) =>
      type === 'next'
        ? (prev + 1) % (data?.getSlider[0]?.sliders.length || 1)
        : (prev - 1 + (data?.getSlider[0]?.sliders.length || 1)) %
        (data?.getSlider[0]?.sliders.length || 1)
    )
  }

  const renderTypingAnimation = (text: any, color: any) => {
    return (
      <motion.div
        key={currentSlide}
        className="title 2xl:text-6xl md:text-5xl text-2xl font-bold"
        initial="hidden"
        animate="visible"
        variants={typingContainerVariant}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {text.split('').map((char: any, index: any) => (
          <motion.h2
            key={index}
            custom={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{ display: 'inline-block' }}
            className="tracking-wide text-[#063354] font-oswald [text-shadow:_0_2px_2px_white/20] leading-snug font-manrope font-extrabold"
          >
            {char}
          </motion.h2>
        ))}
      </motion.div>
    )
  }

  if (loading) return <p></p>
  if (error) return <p>Error loading slider data</p>

  const slides = data.getSlider[0].sliders
  console.log('color ', slides)

  return (
    <section className="carousel md:h-screen h-[50vh] w-screen overflow-hidden relative backdrop-filter backdrop-blur-lg backdrop-brightness-75 shadow-lg">
      {slides.map((slide: any, index: any) => (
        <motion.div
          key={slide._id}
          className={`item absolute w-full inset-0 md:bottom-10 bottom-0 ${currentSlide === index ? 'block' : 'opacity-0'
            }`}
          style={{ zIndex: 20 }}
        >
          <div className="absolute z-50 bottom-16 left-1/2 transform px-2 -translate-x-1/2 text-center mx-auto w-full md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
            {slide.textVisibility &&
              renderTypingAnimation(slide.headingText, slide.textColor)}
            {/* buttons  ongoing, upcoming, completed */}
            <div className="buttons bg-white border-[3px] w-full text-center border-[#003366] hidden md:grid grid-cols-3 gap-2 p-2 rounded-md mt-4">
              <Link
                href="/projects?project_status=ongoing"
                className="flex gap-1 bg-white md:px-5 text-center px-1.5 py-1 md:py-2.5 md:text-md text-sm justify-center text-[#003366] font-semibold transition duration-500 transform border-r border-r-[#00336680]"
              >
                <div className="md:w-7 md:block hidden w-20">
                  <Image src={icon1} alt="icon" width={20} height={20} />
                </div>
                <span className="font-osw uppercase text-[20px]">Ongoing</span>
              </Link>
              <Link
                href="/projects?project_status=upcoming"
                className="flex gap-1 bg-white md:px-5 text-center px-1.5 py-1 md:py-2 md:text-md text-sm justify-center text-[#003366] font-semibold transition duration-500 transform border-r border-r-[#00336680]"
              >
                <div className="md:w-7 md:block hidden w-20">
                  <Image src={icon2} alt="icon" width={20} height={20} />
                </div>
                <span className="font-osw uppercase text-[20px]">Upcoming</span>
              </Link>
              <Link
                href="/projects?project_status=completed"
                className="flex gap-1 bg-white md:px-5 text-center px-1.5 py-1 md:py-2 md:text-md text-sm justify-center text-[#003366] font-semibold transition duration-500 transform"
              >
                <div className="md:w-7 md:block hidden w-20">
                  <Image src={icon3} alt="icon" width={20} height={20} />
                </div>
                <span className="font-osw uppercase text-[20px]">
                  Completed
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
      <motion.div
        className="relative h-screen"
        key={currentSlide}
        initial={{
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0,
        }}
        animate={{
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          transition: { duration: 1.5, ease: 'easeInOut' },
        }}
        exit={{
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0,
          transition: { duration: 1.5, ease: 'easeInOut' },
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${slides[currentSlide]?.mediaFile}`}
          alt={`Slider ${currentSlide + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition opacity-60 duration-1000 ease-in-out"
          style={{
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </motion.div>
      <div className="absolute top-1/2 transform z-50 -translate-y-1/2 md:left-10 left-4">
        <Image
          onClick={() => showSlider('prev')}
          src={arrow1}
          alt="arrow"
          width={100}
          height={100}
          className="size-16 md:size-[4vw] rounded-full hover:scale-125 cursor-pointer transition-all rotate-180 duration-800"
        />
      </div>
      <div className="absolute top-1/2 transform z-50 -translate-y-1/2 md:right-10 right-4">
        <Image
          onClick={() => showSlider('next')}
          src={arrow2}
          alt="arrow"
          width={100}
          height={100}
          className="size-16 md:size-[4vw] rounded-full hover:scale-125 cursor-pointer transition-all duration-800"
        />
      </div>
      <div className="absolute md:bottom-6 bottom-4 z-50 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_: any, index: number) => (
          <div
            key={index}
            className={`w-3 h-3 border-2 border-white rounded-full ${currentSlide === index ? 'bg-[#FFCC33]' : 'bg-white'
              } cursor-pointer`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
