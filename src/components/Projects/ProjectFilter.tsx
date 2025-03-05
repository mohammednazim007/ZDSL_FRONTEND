/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiAdjustmentsVertical } from 'react-icons/hi2'
import { MdOutlineCancel } from 'react-icons/md'

interface FilterOptions {
  status: string
  project: string
  category: string
  includeStatus: boolean
  includeProject: boolean
  includeCategory: boolean
}

interface Project {
  projectTitle: string
  category: {
    _id: string
    categoryName: string
  }
}

interface ManageFilterProps {
  projects: Project[]
  filterOptions: FilterOptions
  setFilterOptions: (filterOptions: FilterOptions | any) => void
}

const ProjectFilter: React.FC<ManageFilterProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const [minRange, setMinRange] = useState(0)
  // const [maxRange, setMaxRange] = useState(1000)

  const minRange = 0
  const maxRange = 1000

  // Selected values within the range
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1000)

  // Handle changes for the left (min) slider
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue - 1) // Prevent overlap with maxValue
    setMinValue(value)
  }

  // Handle changes for the right (max) slider
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue + 1) // Prevent overlap with minValue
    setMaxValue(value)
  }

  const toggleFilter = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full z-50 ">
      <button
        onClick={toggleFilter}
        className={`w-full text-[#063354] border-2 flex items-center gap-2 border-[#dee4e8] px-4 py-[6px] rounded-md focus:outline-none ${isOpen && 'border border-yellow-500 text-yellow-600'}`}
      >
        <HiAdjustmentsVertical size={20} />
        <span>Filter</span>
      </button>

      {/* Filter Section with Framer Motion Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute w-64 p-4 bg-white shadow-lg rounded-lg mt-2 right-1 border"
          >
            {/* Filter by Status */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm">Filter</p>
                <div className="flex justify-center items-center border p-2 gap-1 rounded-md cursor-pointer">
                  <button
                    className="text-gray-700 hover:text-gray-900 text-xs"
                    onClick={toggleFilter}
                  >
                    Clear all
                  </button>
                  <MdOutlineCancel className="" />
                </div>
              </div>
              <div className="bg-white z-50">
                <p className="text-gray-700 text-sm mb-2">PROPERTY TYPE</p>
                <div className="grid grid-cols-2 space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      All
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      Commercial
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      Residential
                    </p>
                  </label>
                </div>
              </div>

              <div className="bg-white z-50 mt-5">
                <p className="text-gray-700 text-sm mb-2">PROPERTY Category</p>
                <div className="grid grid-cols-2 space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      All
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      Apartment
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      Building
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      Shop
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className=" text-[#E8A610] bg-[#F3C65D] rounded-sm !hover:border-none"
                      style={{
                        appearance: 'none',
                        backgroundColor: '#F3C65D',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    />
                    <p className="ml-2 font-semibold text-xs mt-1 text-[#063354] cursor-pointer">
                      Office
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex flex-col w-full mt-5">
                <p className="text-gray-700 text-sm mb-4">PRICE RANGE</p>

                {/* Range Slider */}
                <div className="relative w-full max-w-lg flex justify-between items-center">
                  {/* Left (min) slider */}
                  <input
                    type="range"
                    min={minRange}
                    max={maxRange}
                    value={minValue}
                    onChange={handleMinChange}
                    className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto z-10"
                  />

                  {/* Right (max) slider */}
                  <input
                    type="range"
                    min={minRange}
                    max={maxRange}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className="absolute w-full h-1 appearance-none bg-transparent pointer-events-auto z-20"
                  />

                  {/* Yellow Selected Range Line */}
                  <div
                    className="absolute h-1 bg-yellow-500 rounded-full pointer-events-none"
                    style={{
                      left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
                      right: `${100 - ((maxValue - minRange) / (maxRange - minRange)) * 100}%`,
                    }}
                  />
                </div>

                {/* Display the selected price values */}
                <div className="flex justify-between w-full mt-6 text-black max-w-lg">
                  <span>{minValue} TK</span>
                  <span>{maxValue} TK</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectFilter
