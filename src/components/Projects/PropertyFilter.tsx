/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  clearAllPropertyFilter,
  setBathroom,
  setBedroom,
  setMaxPrice,
  setMaxSize,
  setMinPrice,
  setMinSize,
  setOpenPropertyFilter,
  setProjectTypeAll,
  setSelectApartment,
  setSelectBuilding,
  setSelectCommercial,
  setSelectOffice,
  setSelectProjectCategoryAll,
  setSelectResidential,
  setSelectShop,
  TFilterState,
} from '@/libs/redux/features/projectsFilter/projectsFilter'
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import toast from 'react-hot-toast'
import { HiAdjustmentsVertical } from 'react-icons/hi2'
import { MdOutlineCancel } from 'react-icons/md'
import PriceRangeSelector from './RangeSelector'

const PropertyFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const filterOptions = useAppSelector((state) => state.filter)
  const openPropertyFilter = filterOptions?.openPropertyFilter
  const selectProjectTypeAll = filterOptions?.selectProjectTypeAll
  const selectCommercial = filterOptions?.selectCommercial
  const selectResidential = filterOptions?.selectResidential
  const selectProjectCategoryAll = filterOptions?.selectProjectCategoryAll
  const selectApartment = filterOptions?.selectApartment
  const selectBuilding = filterOptions?.selectBuilding
  const selectShop = filterOptions?.selectShop
  const selectOffice = filterOptions?.selectOffice
  const minPrice = filterOptions?.price?.min
  const maxPrice = filterOptions?.price?.max
  const minSize = filterOptions?.flatSize?.min
  const maxSize = filterOptions?.flatSize?.max
  const bedroom = filterOptions?.bedroom
  const bathroom = filterOptions?.bathroom
  const projectType = filterOptions?.projectType
  const projectCategory = filterOptions?.propertyCategory

  const toggleFilter = () => {
    dispatch(setOpenPropertyFilter(!openPropertyFilter))
  }

  const handlePriceRange = (values: number[]) => {
    dispatch(setMinPrice(values[0]))
    dispatch(setMaxPrice(values[1]))
  }

  const handleFindResult = () => {
    if (minSize < 0 || maxSize < 0) {
      toast.error('Invalid min size value!')
      return
    }
    if (maxSize < 0 || maxSize < 0) {
      toast.error('Invalid max size value!')
      return
    }
    if (minSize > 0 && maxSize > 0 && minSize > maxSize) {
      toast.error('Min size should be smaller than maxSize!')
      return
    }
    if (bedroom < 0) {
      toast.error('Invalid bedroom value!')
      return
    }
    if (bathroom < 0) {
      toast.error('Invalid batroom value!')
      return
    }
    toast.success('Applying filter....')
    const payload: Partial<TFilterState> = {
      projectType: projectType,
      propertyCategory: projectCategory,
      price: {
        min: minPrice,
        max: maxPrice,
      },
      flatSize: {
        min: minSize,
        max: maxSize,
      },
      bedroom,
      bathroom,
    }
    console.log(payload)

    dispatch(setOpenPropertyFilter(false))
  }

  return (
    <div className="relative w-full z-50">
      <button
        onClick={toggleFilter}
        className={`w-full text-black text-sm md:text-base border-2 flex items-center gap-2 border-[#dee4e8] px-2 md:px-4 py-[6px] rounded-md focus:outline-none ${openPropertyFilter && 'border border-yellow-500 text-yellow-600'}`}
      >
        <HiAdjustmentsVertical size={20} />
        <span className="hidden md:block ">Filter</span>
      </button>

      {/* Filter Section with Framer Motion Animation */}
      <AnimatePresence>
        {openPropertyFilter && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-[360px] absolute -right-[50%] lg:-right-[0%] p-[30px] bg-white shadow-lg rounded-lg mt-2 border"
          >
            {/* Filter by Status */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <p className="text-base text-black font-semibold">Filter</p>
                <div
                  className="flex justify-center items-center border p-2 gap-1 rounded-md cursor-pointer"
                  onClick={() => {
                    dispatch(clearAllPropertyFilter())
                  }}
                >
                  <button className="text-black text-sm">Clear all</button>
                  <MdOutlineCancel className="" />
                </div>
              </div>

              <div className="bg-white z-50">
                <p className="text-[#65635F] text-base mb-2 capitalize">
                  PROPERTY TYPE
                </p>
                <div className="grid grid-cols-2 space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectProjectTypeAll}
                      onChange={(e) => {
                        dispatch(setProjectTypeAll(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      All
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectCommercial}
                      onChange={(e) => {
                        dispatch(setSelectCommercial(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      Commercial
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectResidential}
                      onChange={(e) => {
                        dispatch(setSelectResidential(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      Residential
                    </p>
                  </label>
                </div>
              </div>

              <div className="bg-white z-50 mt-5">
                <p className="text-[#65635F] text-base mb-2 capitalize">
                  PROPERTY CATEGORY
                </p>
                <div className="grid grid-cols-2 space-y-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectProjectCategoryAll}
                      onChange={(e) => {
                        dispatch(setSelectProjectCategoryAll(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 text-base mt-1 text-black font-semibold cursor-pointer">
                      All
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectApartment}
                      onChange={(e) => {
                        dispatch(setSelectApartment(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      Apartment
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectBuilding}
                      onChange={(e) => {
                        dispatch(setSelectBuilding(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      Building
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectShop}
                      onChange={(e) => {
                        dispatch(setSelectShop(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      Shop
                    </p>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectOffice}
                      onChange={(e) => {
                        dispatch(setSelectOffice(e.target?.checked))
                      }}
                      className="propertyFilterCheckbox"
                    />
                    <p className="ml-2 font-semibold text-base mt-1 text-black cursor-pointer">
                      Office
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex flex-col w-full mt-5">
                <p className="text-[#65635F] text-base mb-4">PRICE RANGE</p>

                <PriceRangeSelector
                  minValue={minPrice}
                  maxValue={maxPrice}
                  handleChange={handlePriceRange}
                />

                {/* Display the selected price values */}
                <div className="flex justify-between w-full mt-6 text-black font-semibold text-base max-w-lg">
                  <span>{minPrice} TK</span>
                  <span>{maxPrice} TK</span>
                </div>
              </div>

              <div className="bg-white z-50 mt-5">
                <p className="text-[#65635F] text-base mb-2 capitalize">SIZE</p>
                <div className="flex justify-between items-center gap-2">
                  <div className="w-[45%] flex justify-between items-center border border-[#D9DFE3] rounded-md">
                    <input
                      type="number"
                      placeholder="MIN"
                      value={minSize === 0 ? 'MIN' : minSize}
                      onChange={(e) => {
                        dispatch(setMinSize(Number(e.target?.value)))
                      }}
                      className="text-black text-sm !border-none !outline-none !focus:border-none !focus:outline-none !focus:ring-0 w-[70%] rounded-l-md placeholder:text-sm placeholder:text-black placeholder:font-semibold"
                    />
                    <div className="w-[30%] flex justify-center items-center font-semibold text-sm text-[#9A9CA3] cursor-pointer">
                      sqft
                    </div>
                  </div>
                  <div className="w-[45%] flex justify-between items-center border border-[#D9DFE3] rounded-md">
                    <input
                      type="number"
                      placeholder="MAX"
                      value={maxSize === 0 ? 'MAX' : maxSize}
                      onChange={(e) => {
                        dispatch(setMaxSize(Number(e.target?.value)))
                      }}
                      className="text-black text-sm border-none outline-none focus:border-none focus:outline-none  focus:ring-transparent w-[70%] placeholder:text-sm placeholder:text-black placeholder:font-semibold"
                    />
                    <div className="w-[30%] flex justify-center items-center font-semibold text-sm text-[#9A9CA3] cursor-pointer">
                      sqft
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white z-50 mt-6">
                <div className="flex justify-between items-center gap-2">
                  <div className="w-[45%] flex flex-col items-start gap-2 rounded-md">
                    <p className="text-[#65635F] text-base capitalize">
                      BEDROOM
                    </p>
                    <div className="w-full border border-[#D9DFE3] rounded">
                      <input
                        type="number"
                        value={bedroom === 0 ? '' : bedroom}
                        onChange={(e) => {
                          dispatch(setBedroom(Number(e.target?.value)))
                        }}
                        className="w-full text-black text-sm border-none outline-none focus:border-none focus:outline-none focus:ring-transparent"
                      />
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col items-start gap-2 rounded-md">
                    <p className="text-[#65635F] text-base capitalize">
                      BATHROOM
                    </p>
                    <div className="w-full border border-[#D9DFE3] rounded-md">
                      <input
                        type="number"
                        value={bathroom === 0 ? '' : bathroom}
                        onChange={(e) => {
                          dispatch(setBathroom(Number(e.target?.value)))
                        }}
                        className="w-full text-black text-sm border-none outline-none focus:border-none focus:outline-none focus:ring-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white z-50 mt-5">
                <div className="flex justify-end items-center">
                  <button
                    className="px-3 md:px-5 py-2 bg-gradient-to-b from-[#F3C65D] to-[#E59F00] text-black text-center text-sm md:text-base rounded-md"
                    onClick={handleFindResult}
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

export default PropertyFilter
