/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import { useRouter } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'

export default function AddComparePropertyCard() {
  const router = useRouter()

  return (
    <div className="w-full rounded-t-md overflow-hidden">
      <div className="bg-[#FAF5E9] w-full h-[260px] md:h-[400px] flex justify-center items-center rounded-md">
        <div>
          <div
            onClick={() => router.push('/projects')}
            className="h-[70px] w-[70px] bg-[#EFBB43] rounded-full flex justify-center items-center mx-auto mb-3 cursor-pointer"
          >
            <FiPlus className="text-4xl" />
          </div>
          <p className="text-sm text-center">Add New Property to compare</p>
        </div>
      </div>
      <div className="bg-[#AFD7D7] flex items-center px-5 h-16">
        <h1 className="font-semibold text-sm">Construction in progress</h1>
      </div>
      <div className="border-x text-sm">
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Project Type
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Handover Date
        </div>
        <div className="h-12 flex items-center px-5 border-b  font-semibold">
          Project Status
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Floor Distribution
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Bedroom
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Bathroom
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Project Facing
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Flat sizes (sft)
        </div>
        <div className="h-12 flex items-center px-5 border-b font-semibold">
          Location
        </div>
        <div className="h-72 flex pt-4 px-5 border-b text-sm font-semibold">
          Features
        </div>
        <div className="h-[450px] flex pt-4 px-5 border-b  font-semibold">
          Nearby facilities within 10km
        </div>
        <div className="h-[200px] flex pt-4 px-5 border-b   font-semibold">
          Contact
        </div>
      </div>
    </div>
  )
}
