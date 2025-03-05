/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-use-before-define */
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { TProjectZone } from '@/interface/Projects'
import OutsideClick from '../outsideclick'
import { useGetAllProjectZoneQuery } from '@/services/projectZone.service'
import { locationSvg } from '@/constants'
import { MdOutlineCancel } from 'react-icons/md'

const SelectProjectZone = ({
  getSelected,
  selected,
  className,
}: {
  getSelected: (value: string) => void
  selected?: string
  className?: string
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [allProjectZones, setAllProjectZones] = useState<TProjectZone[]>([])
  const [filteredZones, setFilteredZones] = useState<TProjectZone[]>([])
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    undefined
  )
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const { data: response } = useGetAllProjectZoneQuery({
    page: 1,
    limit: 100,
    search: searchTerm,
  })

  useEffect(() => {
    const data: TProjectZone[] = response?.data?.getZones?.data || []
    if (data) {
      setAllProjectZones(data)
      setFilteredZones(data)
    }
  }, [response])

  function toggleDropdown() {
    setOpenDropdown((prev) => !prev)
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e?.target?.value)
  }

  function handleSelectProject(name: string) {
    setSelectedItem(name)
  }

  function handleInputClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.stopPropagation()
  }

  // Close dropdown on outside click
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClearSelected() {
    setSelectedItem(undefined)
    setFilteredZones(allProjectZones)
    getSelected('')
  }

  function handleFilter() {
    if (searchTerm) {
      const filtered = allProjectZones.filter(
        (zone) =>
          zone.zone.toLowerCase().includes(searchTerm.toLowerCase()) &&
          zone.isActive
      )
      setFilteredZones(filtered)
    } else {
      setFilteredZones(allProjectZones.filter((zone) => zone.isActive))
    }
    setOpenDropdown(false)
    getSelected(selectedItem || '')
  }

  return (
    <div className="w-full flex justify-end items-center gap-3">
      <div className="flex-grow relative cursor-pointer" ref={dropdownRef}>
        <div className="relative w-full">
          <div
            onClick={toggleDropdown}
            className={`w-full text-[#063354] text-sm md:text-base border-2 flex justify-center items-center gap-2 border-[#dee4e8] px-4 py-[6px] rounded-md focus:outline-none ${selectedItem ? 'bg-gray-200' : 'bg-white'
              }`}
          >
            <span>{locationSvg}</span>

            <div className="w-full text-nowrap overflow-hidden line-clamp-1">
              {selected || selectedItem || 'Select a zone here'}
            </div>
          </div>
        </div>
        <div>
          {openDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-[90vw] sm:w-[500px] absolute z-50 -left-[90%] sm:-left-[60%] md:left-auto md:right-0 p-[25px] bg-white shadow-lg rounded-lg mt-2 border"
            >
              <div className="flex justify-between items-center mb-5">
                <p className="text-sm md:text-base text-black font-semibold">
                  Find by Location
                </p>
                <div
                  className="flex justify-center items-center border border-[#D9DFE3] p-2 gap-1 rounded-md cursor-pointer"
                  onClick={handleClearSelected}
                >
                  <button className="text-black text-sm">Clear Filter</button>
                  <MdOutlineCancel />
                </div>
              </div>
              <p className="text-[#65635F] text-sm md:text-base font-semibold mb-2 uppercase">
                Select Dream Location
              </p>

              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search here"
                  className="block w-full px-4 py-4 ps-4 text-md text-[#063354] placeholder-[#063354] border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-0 focus:border-gray-300"
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
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <ul className="max-h-[20vh] 2xl:max-h-[30vh] overflow-x-hidden mt-3 scrollbar-hide border rounded-lg overflow-y-auto">
                  {filteredZones && filteredZones.length > 0 ? (
                    filteredZones?.map((item) =>
                      item.isActive ? (
                        <li
                          key={item?.id}
                          className={`list-none py-3 ps-4 text-[#063354] hover:bg-[#fdf4df] duration-300 cursor-pointer hover:text-black ${selectedItem === item.zone
                              ? 'bg-[#f3c65d] text-black'
                              : ''
                            }`}
                          onClick={() => handleSelectProject(item?.zone)}
                        >
                          <p className="line-clamp-2 text-lg">{item?.zone}</p>
                        </li>
                      ) : null
                    )
                  ) : (
                    <div className="flex justify-center items-center mt-4">
                      <h3 className="text-sm font-poppins">No Zones Found</h3>
                    </div>
                  )}
                </ul>
              </div>
              <div className="bg-white z-50 mt-5">
                <div className="flex justify-end items-center">
                  <button
                    onClick={handleFilter}
                    className={`px-3 md:px-5 py-2 text-center text-sm md:text-base rounded-md ${selectedItem
                        ? 'bg-gradient-to-b from-[#F3C65D] to-[#E59F00] text-black'
                        : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      }`}
                    disabled={!selectedItem}
                  >
                    Find Result
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectProjectZone
