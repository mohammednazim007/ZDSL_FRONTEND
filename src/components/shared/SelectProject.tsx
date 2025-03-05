/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Project } from '@/interface/Projects'
import { useGetAllProjectsForFilterQuery } from '@/services/user/project.service'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import Loader from './Loder'

const SelectProject = ({
  getSelected,
}: {
  getSelected: (value: string) => void
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<string | undefined>(
    undefined
  )
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const {
    data: projectQueryRes,
    isLoading,
    isError,
  } = useGetAllProjectsForFilterQuery({
    search: searchTerm,
  })

  console.log('projectQueryRes', { projectQueryRes })

  function toggleDropdown() {
    setOpenDropdown((prev) => !prev)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e?.target?.value)
  }

  function handleSelectProject(projectId: string, name: string) {
    setSelectedProject(name)
    getSelected(projectId)
  }

  function handleInputClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    // Prevent the dropdown from closing when clicking on the input
    e.stopPropagation()
  }

  const projects = projectQueryRes?.data?.getProjects?.projects

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="w-full flex justify-end items-center gap-3">
      <div className="flex-grow relative" onClick={toggleDropdown}>
        <div className="flex justify-between items-center px-2 h-[2.5rem] border rounded-md cursor-pointer">
          <div className="w-full text-nowrap overflow-hidden">
            {selectedProject || 'Select a project here'}
          </div>
          <div>
            <TiArrowSortedDown className="text-[#9A9CA3] font-bold" />
          </div>
        </div>
        <div className="relative w-full z-[9999]">
          {openDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full bg-white shadow-2xl rounded-md mt-2 max-h-auto overflow-auto p-6"
            >
              <h3 className="text-black mb-2 font-osw tracking-wide">
                Select a project
              </h3>

              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search here"
                  className="block w-full p-4 py-2 ps-4 text-sm text-[#063354] placeholder-[#063354] border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-0 focus:border-gray-300"
                  value={searchTerm}
                  onChange={handleSearch}
                  onClick={handleInputClick}
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <ul className="max-h-[30vh] overflow-x-hidden overflow-y-auto">
                  {projects && projects.length > 0 ? (
                    projects?.map((project: Project) => (
                      <li
                        key={project?.id}
                        className="list-none py-2 ps-4 text-[#063354] hover:bg-[#fdf4df] hover:rounded duration-300 cursor-pointer hover:text-black"
                        onClick={() =>
                          handleSelectProject(
                            project._id,
                            project?.projectTitle
                          )
                        }
                      >
                        <p className="line-clamp-2">{project?.projectTitle}</p>
                      </li>
                    ))
                  ) : (
                    <div className="flex justify-center items-center">
                      <h3 className="text-base font-semibold">
                        No Projects Found
                      </h3>
                    </div>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectProject
