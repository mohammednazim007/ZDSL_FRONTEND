/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable curly */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { options } from '@/constants/Projects/ProjectData'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoClose, IoSearch } from 'react-icons/io5'
import { searchIconSvg } from '../../constants'
import BlogsSearch from '../Search/BlogsSearch'
import ProjectsSearch from '../Search/ProjectsSearch'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Property')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isProjectSelected, setIsProjectSelected] = useState<boolean>(true)

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
    if (option === 'Property') {
      setIsProjectSelected(true)
    } else {
      setIsProjectSelected(false)
    }
  }

  return (
    <div>
      <div
        onClick={toggleSearch}
        className="rounded-md cursor-pointer bg-white md:border !text-secondary md:w-[3.125rem] w-[2rem] md:h-[3.125rem] h-[2rem] flex justify-center items-center group z-50" // Add 'group' class to parent
      >
        <div className="!text-secondary group-hover:scale-90 transition-all duration-300 ease-out">
          {searchIconSvg}
        </div>
      </div>

      {isOpen && (
        <motion.div
          className={`bg-[url('/searchbg.png')] fixed top-0 left-0 w-full h-full searchbg bg-white flex items-start justify-center z-50`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full container mx-auto p-6">
            <div className="flex items-start justify-between pb-10">
              <div className="flex items-center gap-2 ">
                <FaSearchLocation className="text-[#003366]" size={18} />
                <h2 className={`font-oswald  text-lg font-bold `}>
                  Search Your Query
                </h2>
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className={` cursor-pointer rounded-md bg-white border overflow-hidden  font-sans font-light text-[.8rem] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] flex items-center justify-center p-2 duration-500`}
              >
                <IoClose size={25} />
              </div>
            </div>
            <div className="w-full mx-auto mt-4">
              <div className="w-full lg:w-[60%] mx-auto relative flex bg-white drop-shadow-md items-center px-3 py-1 gap-2 rounded-md border-[2px] border-transparent hover:border-1 hover:border-primary focus-within:border-primary focus-within:border-1 transition-all">
                {/* Updated styling for search input */}
                <IoSearch className="text-gray-500" size={25} />
                <motion.input
                  placeholder="Search..."
                  className="outline-none cursor-pointer border-0 text-[16px] placeholder-[#9A9CA3] bg-transparent w-full font-normal px-4 py-2 focus:border-transparent focus:ring-0 focus:outline-none "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  transition={{ duration: 0.2 }}
                />
                <div className="overflow-visible">
                  <motion.div
                    className="flex items-center w-28 md:w-40 justify-between border-l select-none cursor-pointer bg-white px-3 py-1.5"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm text-center">
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
                      className="absolute top-full right-0 p-1 bg-white border w-40 border-gray-300 rounded-md shadow-lg mt-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {options.map((option) => (
                        <div
                          key={option.id}
                          className="px-2 text-sm py-2 transition-all hover:bg-[#F8E7C0] rounded-md cursor-pointer"
                          onClick={() => handleOptionSelect(option.name)}
                        >
                          {option.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full lg:w-[60%] mx-auto h-[65vh] lg:h-[75vh] overflow-auto  scrollbar-hide`}
                >
                  {isProjectSelected ? (
                    <ProjectsSearch search={searchTerm} />
                  ) : (
                    <BlogsSearch search={searchTerm} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SearchBar
