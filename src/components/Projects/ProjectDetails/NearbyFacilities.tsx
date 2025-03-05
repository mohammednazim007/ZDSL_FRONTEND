/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import React, { useState, useEffect } from 'react'
import { BiSolidShoppingBags } from 'react-icons/bi'
import { CiHospital1 } from 'react-icons/ci'
import { FiBookOpen } from 'react-icons/fi'
import { RiBankFill, RiRestaurantLine } from 'react-icons/ri'

const iconMap = {
  Education: FiBookOpen,
  Healthcare: CiHospital1,
  Shopping: BiSolidShoppingBags,
  Recreation: RiRestaurantLine,
  Banking: RiBankFill,
}

interface Facility {
  facility: string
  data: Record<string, string | number | boolean | string[] | null>[]
}

interface NearbyFacilitiesProps {
  facilities: Facility[]
}

export default function NearbyFacilities({
  facilities,
}: NearbyFacilitiesProps) {
  const [selectedFacility, setSelectedFacility] = useState<string>('')

  useEffect(() => {
    if (facilities?.length > 0) {
      setSelectedFacility(facilities[0]?.facility)
    }
  }, [facilities])

  const getIconComponent = (facility: string) => {
    return iconMap[facility as keyof typeof iconMap] || RiBankFill
  }

  // Unique key fix for facility selection
  const getFacilityKey = (facility: string, index: number) => {
    return `${facility}-${index}` // Combine facility name with index for a unique key
  }

  return (
    <div>
      <h1 className="font-oswald font-bold text-2xl pb-5">Nearby Facilities</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-[#ffffff]   border border-[#D9DFE3] ">
        {facilities?.map((facility, index) => {
          const IconComponent = getIconComponent(facility.facility)
          return (
            <div
              key={getFacilityKey(facility.facility, index)} // Use the unique key
              className={`flex items-center gap-2 px-2 py-2  cursor-pointer   hover:border-2 hover:border-[#E6A308] duration-200 ${selectedFacility === facility.facility ? 'border-[2px] border-[#E6A308] text-[#E6A308]' : ''}`}
              onClick={() => setSelectedFacility(facility.facility)}
            >
              <IconComponent className="text-xl hover:text-[#E6A308]" />
              <p className="capitalize">{facility.facility}</p>
            </div>
          )
        })}
      </div>

      <div className="p-5 pb-8 border-x border-b rounded-b-md">
        {selectedFacility && (
          <>
            <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2">
              {Object.keys(
                facilities.find((f) => f.facility === selectedFacility)
                  ?.data[0] || {}
              )

                .map((key) => {
                  return (
                    <div
                      key={key}
                      className="capitalize text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {key}
                    </div>
                  )
                })}
            </div>

            {facilities
              .find((f) => f.facility === selectedFacility)
              ?.data.map((detail, index) => (
                <div
                  key={`${selectedFacility}-${index}`}
                  className="grid grid-cols-4 gap-4 py-2 border-b last:border-none"
                >
                  {Object.entries(detail).map(([key, value]) => (
                    <div
                      key={key}
                      className="text-ellipsis overflow-hidden break-words"
                      title={typeof value === 'string' ? value : ''}
                    >
                      {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  )
}
