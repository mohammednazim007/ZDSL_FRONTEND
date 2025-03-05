'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiAdjustmentsVertical } from 'react-icons/hi2'
import { MdOutlineCancel } from 'react-icons/md'

type VideoFilterProps = {
  onFilterChange: (filter: string) => void
}

const VideoFilter: React.FC<VideoFilterProps> = ({ onFilterChange }) => {
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

  const filters = ['All', 'Project', 'Event', 'Other']

  const toggleFilter = () => {
    setOpenFilter(!openFilter)
  }

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    onFilterChange(filter)
    setOpenFilter(false) // Close the filter dropdown after selection
  }

  const clearFilters = () => {
    setSelectedFilter('All')
    onFilterChange('All')
  }

  return (
    <div className="relative w-full z-50">
      <button
        onClick={toggleFilter}
        className={`w-full text-black text-sm md:text-base border-2 flex items-center gap-2 border-[#dee4e8] px-2 md:px-4 py-[6px] rounded-md focus:outline-none ${
          openFilter && 'border border-yellow-500 text-yellow-600'
        }`}
      >
        <HiAdjustmentsVertical size={20} />
        <span>Filter</span>
      </button>

      <AnimatePresence>
        {openFilter && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-[300px] absolute right-0 p-[20px] bg-white shadow-lg rounded-lg mt-2 border"
          >
            <div className="flex justify-between items-center mb-5">
              <p className="text-base text-black font-semibold">
                Filter by Type
              </p>
              <div
                className="flex justify-center items-center border p-2 gap-1 rounded-md cursor-pointer"
                onClick={clearFilters}
              >
                <button className="text-black text-sm">Clear</button>
                <MdOutlineCancel />
              </div>
            </div>

            <div className="space-y-3">
              {filters.map((filter) => (
                <label
                  key={filter}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="videoFilter"
                    checked={selectedFilter === filter}
                    onChange={() => handleFilterSelect(filter)}
                    className="mr-2"
                  />
                  <span className="text-black font-medium">{filter}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VideoFilter
