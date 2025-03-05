/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import careerHeaderIcon from '../../../assets/icons/carrer/carrerHeader.svg'
import Image from 'next/image'
import filterIcon from '../../../assets/icons/carrer/filter.svg'
import CareerHeaderBgImage from '../../../assets/career/career-header-bg.png'
import searchIcon from '../../../assets/icons/carrer/search.svg'
import { useState } from 'react'

//!=======================================================================>>>

const CareerHeader = ({ onSearch }: any) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value)
    onSearch(e.target.value) // Send search input back to parent component
  }

  return (
    <>
      <div className="relative pt-28">
        {' '}
        {/* Adjust margin-top to clear navbar */}
        <div className="relative flex items-center justify-center h-28 w-full md:hidden ">
          <div className="">
            <div
              className="absolute bottom-0 right-0 w-32 h-32"
              style={{
                backgroundImage: `url(${CareerHeaderBgImage.src})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
                opacity: 0.9,
              }}
            />
          </div>
        </div>
        {/* Main Career Header Section */}
        <div className="relative z-10 md:mt-16 mt-8">
          {' '}
          {/* Adjust spacing to ensure it's below the navbar */}
          <div className="hidden md:flex justify-center items-center gap-4">
            <Image src={careerHeaderIcon} alt="" />
            <h1 className="text-[2.5rem] font-oswald font-[500]">Career</h1>
          </div>
          <p className="ml-4 md:ml-0 md:text-[1.125rem] text-[0.875rem] text-center lg:mt-[1.266rem] mt-[14px] font-bold md:font-normal">
            &quot;Be a part of our elite team of real estate professionals&quot;
          </p>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between p-4 md:justify-center md:gap-4 w-full">
              <div className="hidden md:block flex-1"></div>

              {/* Search Input */}
              <div className="flex-1 md:flex-none w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Jobs..."
                    className="w-full px-4 ps-6 py-2 rounded-lg border border-gray-500 h-12"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-5 flex items-center  text-gray-500"
                  >
                    <Image className="w-[1.2rem]" src={searchIcon} alt="" />
                  </button>
                </div>
              </div>

              {/* Filter Icon */}
              <div className="flex justify-end md:flex-1 md:mt-0">
                <div className="md:py-[12px] py-4 ml-2 cursor-pointer md:px-[12px] px-2 border-[1.2px] border-[#BFCBD3] bg-[#FFFFFF] rounded-[5px]">
                  <Image
                    className="md:h-[1rem] h-[10px] w-[12px] md:w-[1.533rem]"
                    src={filterIcon}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CareerHeader
