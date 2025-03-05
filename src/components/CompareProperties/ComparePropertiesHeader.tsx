/* eslint-disable curly */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import comparePropertiesIcon from '@/assets/icons/compareProperties/compareProperties.svg'
import whiteDeleteIcon from '@/assets/icons/compareProperties/deleteWhite.svg'
import { TCompareProductInfo } from '@/interface/Projects'
import { clearComparedProjects } from '@/libs/redux/features/user/userSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import { useGetAllCompareProjectsDataQuery } from '@/services/user/project.service'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import Container from '../shared/Container'
import Loader from '../shared/Loder'
import MultiCarousel from '../shared/MultiCarousel'
import AddComparePropertyCard from './AddComparePropertyCard'
import CompareProjectInfo from './CompareProjectInfo'
import BackButton from '../shared/back-buttom/BackButton'

interface CarouselRefType {
  goToSlide: (slideIndex: number) => void
}

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1199, min: 761 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1,
  },
}

const ComparePropertiesHeader = () => {
  const [projectIds, setProjectIds] = useState<string[]>([])
  const carouselInstance = useRef<CarouselRefType | null>(null)
  const [refresh, setRefresh] = useState(false)
  const dispatch = useAppDispatch()
  const { data: compareProjectsData, isLoading } =
    useGetAllCompareProjectsDataQuery(projectIds)
  const compareProjects: TCompareProductInfo[] =
    compareProjectsData?.data?.getCompareProperties?.data || []

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('projectIds') || '[]')
    if (ids) setProjectIds(ids)
  }, [refresh])

  function handleClearAll() {
    localStorage.removeItem('projectIds')
    dispatch(clearComparedProjects())
    setRefresh((prev) => !prev)
  }

  if (isLoading) {
    return (
      <Container>
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      </Container>
    )
  }

  if (!compareProjects || compareProjects?.length === 0) {
    return (
      <Container>
        <section className="flex justify-between items-center pt-28">
          <div className="flex gap-[1rem] justify-center">
            <Image
              className="h-[2.2rem] w-[1.4rem]"
              src={comparePropertiesIcon}
              alt=""
            ></Image>
            <h1 className="md:text-2xl text-xl font-normal ">
              Compare Properties
            </h1>
          </div>
          <div
            onClick={handleClearAll}
            className="flex gap-[0.625rem] justify-center items-center py-[0.5rem] px-[1.313rem] bg-[#FFFFFF] border border-[#D9DFE3] rounded-[5px] cursor-pointer"
          >
            <Image
              className="h-[1.25rem] w-[1.063rem]"
              src={whiteDeleteIcon}
              alt=""
            ></Image>
            <p className="text-base font-medium">Clear all</p>
          </div>
        </section>
        <section className="grid grid-cols-4 gap-5 py-8">
          <AddComparePropertyCard />
          <div className="col-span-3 flex justify-center mt-20 font-poppins">
            <h1>No Property found!</h1>
          </div>
        </section>
      </Container>
    )
  }

  return (
    <Container>
      <div className="bg-[#FBFBFB] mb-20">
        <section className="flex justify-between items-center pt-28">
          <div className="mb-[-30px] md:hidden">
            {/* for mobile */}
            <BackButton title="Compare" />
          </div>
          {/* for desktop */}
          <div className="gap-[1rem] justify-center hidden md:flex">
            <Image
              className="h-[2.2rem] w-[1.4rem]"
              src={comparePropertiesIcon}
              alt=""
            ></Image>
            <h1 className="md:text-2xl text-xl font-normal text-nowrap">
              Compare Properties
            </h1>
          </div>

          {/* === clear all button ==== */}
          <div
            onClick={handleClearAll}
            className="flex gap-[0.625rem] justify-center items-center py-[0.5rem] px-[1.313rem] bg-[#FFFFFF] border border-[#D9DFE3] rounded-[5px] cursor-pointer flex-nowrap"
          >
            <Image
              className="h-[1.25rem] w-[1.063rem]"
              src={whiteDeleteIcon}
              alt=""
            ></Image>
            <p className="text-base font-medium text-nowrap">Clear all</p>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-5 py-8 w-full overflow-x-scroll">
          <AddComparePropertyCard />
          <section className="col-span-1 md:col-span-2 lg:col-span-3">
            <MultiCarousel
              rightArrowId={'bestProjectRightArrow'}
              leftArrowId="BestProjectLeftArrow"
              responsive={responsive}
              carouselInstance={carouselInstance}
              className="!pt-0 w-full"
            >
              {compareProjects?.map((item, index) => {
                // Calculate the sum for each item
                const sumValues = compareProjects.map(
                  (project) =>
                    (project.balconyNo || 0) +
                    (project.bedroomNo || 0) +
                    (project.bathroomNo || 0)
                )

                // Find the index of the project with the highest sum
                const maxIndex = sumValues.indexOf(Math.max(...sumValues))

                return (
                  <div key={item?.id} className="mr-5">
                    <CompareProjectInfo
                      active={index === maxIndex} // Highlight the item with the highest sum
                      projectInfo={item}
                      index={index + 1}
                    />
                  </div>
                )
              })}
            </MultiCarousel>
          </section>
        </section>
      </div>
    </Container>
  )
}

export default ComparePropertiesHeader
