/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import { searchIconSvg } from '@/assets/svg'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoClose, IoSearch } from 'react-icons/io5'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaSearchLocation } from 'react-icons/fa'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Property')
  const options = ['Property', 'Blog & Events']
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleSearch = () => {
    setIsOpen(!isOpen)
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setIsDropdownOpen(false)
  }
  return (
    <div>
      <div
        onClick={toggleSearch}
        className={`h-[3.125rem]  w-[3.75rem] cursor-pointer rounded-md border justify-end pe-5 bg-white overflow-hidden  font-sans font-light text-[.8rem] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] flex items-center hover:duration-500 duration-500`}
      >
        <div className={`hover:scale-90`}>{searchIconSvg}</div>
      </div>

      {isOpen && (
        <motion.div
          className={`bg-[url('/searchbg.png')] fixed top-0 left-0 w-full h-full searchbg bg-white flex items-start justify-center !z-50`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full container mx-auto p-6">
            <div className="flex items-start justify-between md:pt-0 pt-20 pb-10">
              <div className="flex items-center gap-2 ">
                <FaSearchLocation className="text-[#003366]" size={18} />
                <h2 className={`font-oswald  text-lg font-bold `}>
                  Search Your Query
                </h2>
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className={` cursor-pointer rounded-md bg-white border justify-end overflow-hidden  font-sans font-light text-[.8rem] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] flex items-center justify-center p-2 duration-500`}
              >
                <IoClose size={25} />
              </div>
            </div>
            <div className="max-w-4xl mx-auto mt-4">
              <div className="relative flex bg-white drop-shadow-md border items-center px-3 py-1 gap-2 rounded-md">
                <div>
                  <IoSearch className="text-gray-500" size={25} />
                </div>

                {/* Add a label associated with the search input */}
                <label htmlFor="searchInput" className="sr-only">
                  Search
                </label>
                <motion.input
                  id="searchInput"
                  placeholder="Enter keywords..."
                  className="outline-none border-0 focus:border-0 focus:outline-none text-[16px] placeholder-[#9A9CA3] bg-transparent w-full font-normal px-4 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  transition={{ duration: 0.2 }}
                />
                <div className="relative ">
                  <motion.div
                    className="flex items-center md:w-40 w-full justify-between border-l select-none cursor-pointer bg-white px-3 py-1.5"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm md:block hidden text-center">
                      {selectedOption}
                    </span>
                    {isDropdownOpen ? (
                      <IoIosArrowUp
                        className="bg-[#F8E7C0] p-1 rounded-md"
                        size={22}
                      />
                    ) : (
                      <IoIosArrowDown
                        className="bg-[#F8E7C0] p-1 rounded-md"
                        size={22}
                      />
                    )}
                  </motion.div>

                  {isDropdownOpen && (
                    <motion.div
                      className="absolute z-10 p-1  bg-white border w-40 border-gray-300 rounded-md shadow-lg mt-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {options.map((option) => (
                        <div
                          key={option}
                          className="px-2 text-sm py-2 transition-all hover:bg-[#F8E7C0] rounded-md cursor-pointer"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar
