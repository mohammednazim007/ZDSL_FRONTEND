/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { locationSvg } from '@/constants'
import { setOpenLocationFilter } from '@/libs/redux/features/projectsFilter/projectsFilter'
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineCancel } from 'react-icons/md'

const locationOptions: { title: string; value: string }[] = [
  {
    title: 'Dhaka',
    value: 'Dhaka',
  },
  {
    title: 'Gulshan',
    value: 'Gulshan',
  },
  {
    title: 'Uttara',
    value: 'Uttara',
  },
  {
    title: 'Banani',
    value: 'Banani',
  },
  {
    title: 'Chittagong',
    value: 'Chittagong',
  },
  {
    title: 'Khulna',
    value: 'Khulna',
  },
  {
    title: 'Rajshahi',
    value: 'Rajshahi',
  },
]

interface LocationFilterProps {
  setFilterLocation: React.Dispatch<React.SetStateAction<string>>
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  setFilterLocation,
}: any) => {
  const dispatch = useAppDispatch()
  const filterOptions = useAppSelector((state) => state.filter)
  const openLocationFilter = filterOptions?.openLocationFilter

  const toggleFilter = () => {
    dispatch(setOpenLocationFilter(!openLocationFilter))
    setSearchText('Bangladesh')
  }

  const [searchText, setSearchText] = useState<string>('Bangladesh')
  const handleSearch = () => {
    setFilterLocation(searchText)
  }

  return (
    <div className="relative w-full z-50">
      <button
        onClick={toggleFilter}
        className={`w-full text-[#063354] text-sm md:text-base border-2 flex justify-center items-center gap-2 border-[#dee4e8] px-4 py-[6px] rounded-md focus:outline-none ${openLocationFilter && 'border border-yellow-500 text-yellow-600'}`}
      >
        <span>{locationSvg}</span>
        <span>Bangladesh</span>
      </button>

      {/* Filter Section with Framer Motion Animation */}
      <AnimatePresence>
        {openLocationFilter && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-[90vw] sm:w-[440px] absolute -left-[90%] sm:-left-[60%] md:left-auto md:right-0 p-[30px] bg-white shadow-lg rounded-lg mt-2 border"
          >
            {/* Filter by Location */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm md:text-base text-black font-semibold">
                  Find by Location
                </p>
                <div className="flex justify-center items-center border border-[#D9DFE3] p-2 gap-1 rounded-md cursor-pointer">
                  <button className="text-black text-sm" onClick={toggleFilter}>
                    Clear Location
                  </button>
                  <MdOutlineCancel className="" />
                </div>
              </div>

              <div className="bg-white z-50">
                <p className="text-[#65635F] text-sm md:text-base font-semibold mb-2 uppercase">
                  Select Dream Location
                </p>
                <div className="w-full border border-[#D9DFE3] rounded relative">
                  <input
                    type="text"
                    defaultValue={'Bangladesh'}
                    value={searchText}
                    className="w-[90%] !py-3 text-[#063354] font-semibold text-sm md:text-xl border-none outline-none focus:border-none focus:outline-none focus:ring-transparent"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <div className="absolute top-0 right-0 h-full w-[10%] flex justify-center items-center cursor-pointer">
                    <CiSearch className="size-4 2xl:size-[1.2vw]" />
                  </div>
                </div>
              </div>

              <div className="bg-white z-50 mt-5">
                <div className="w-full h-[35vh] border borer-[#063354] rounded-md flex flex-col justify-between item-center overflow-y-auto overflow-x-hidden scrollbar-hide">
                  {locationOptions?.map((item, index) => (
                    <div
                      onClick={() => setSearchText(item.title)}
                      key={index}
                      className="w-full px-3 py-4 text-start text-[#063354] font-semibold text-sm md:text-lg bg-transparent hover:bg-[#D9DFE3] duration-300"
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white z-50 mt-5">
                <div className="flex justify-end items-center">
                  <button
                    onClick={handleSearch}
                    className="px-3 md:px-5 py-2 bg-gradient-to-b from-[#F3C65D] to-[#E59F00] text-black text-center text-sm md:text-base rounded-md"
                  >
                    Find Result
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LocationFilter
