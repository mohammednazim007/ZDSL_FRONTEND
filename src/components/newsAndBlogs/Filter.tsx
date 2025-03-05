/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiAdjustmentsVertical } from 'react-icons/hi2'

interface FilterOptions {
  // status: string
  // project: string
  category: string
  // includeStatus: boolean
  // includeProject: boolean
  includeCategory: boolean
}

interface Project {
  _id: string
  categoryName: string
}

interface ManageFilterProps {
  categories: any[]
  category: string
  includeCategory: boolean
  setCategory: (val: string) => void
  setIncludeCategory: (val: boolean) => void
}

const FilterSection: React.FC<ManageFilterProps> = ({
  categories,
  category,
  setCategory,
  setIncludeCategory,
  includeCategory,
}) => {
  // const [excludeStatus, setExcludeStatus] = useState(true)
  // const [excludeProject, setExcludeProject] = useState(true)
  const [excludeCategory, setExcludeCategory] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const toggleFilter = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full">
      <button
        onClick={toggleFilter}
        className="w-full text-[#063354] border-2 flex items-center gap-2 border-[#dee4e8] px-4 py-[6px] rounded-md focus:outline-none"
      >
        <HiAdjustmentsVertical size={20} />
        <span className="">Filter</span>
      </button>

      {/* Filter Section with Framer Motion Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute w-64 p-4 bg-white shadow-lg rounded-lg mt-2 right-1"
          >
            {/* Filter by Category */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">
                  Filter by Category
                </h3>
              </div>
              <select
                className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-600"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories
                  .reduce((acc: Project[], project: Project) => {
                    if (!acc.some((item) => item._id === project._id))
                      acc.push(project)

                    return acc
                  }, [])
                  .map(
                    (
                      project: {
                        categoryName:
                          | string
                          | number
                          | readonly string[]
                          | undefined
                        category: {
                          _id: string | number | readonly string[] | undefined
                          categoryName:
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<React.AwaitedReactNode>
                            | null
                            | undefined
                        }
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <option key={index} value={project.categoryName}>
                        {project.categoryName}
                      </option>
                    )
                  )}
              </select>
              <button
                className="mt-1 text-yellow-500 flex items-center"
                onClick={() => {
                  setIncludeCategory(!includeCategory)
                }}
              >
                {!includeCategory ? 'Include Category' : 'Exclude Category'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FilterSection
