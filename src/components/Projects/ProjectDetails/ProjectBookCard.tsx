import React from 'react'
import Image from 'next/image'
import dateImg from '../../../assets/icon/date-time.png'

export default function ProjectBookCard() {
  return (
    <div className="border-[3px] border-[#F1CF81] bg-[#F9F4E9] rounded-md p-5">
      <h1 className="text-xl font-bold">Book a Visit</h1>
      <h1 className="text-sm">Choose a time that works for you</h1>

      <div className="flex">
        <div className="mt-5 mb-3 px-3 py-2 bg-white border-[3px] border-[#C2E2E2] rounded-full flex gap-2 items-center">
          <Image src={dateImg} alt="image" className="h-4 w-4" />
          <h1>
            January <span className="font-bold">2024</span>{' '}
          </h1>
        </div>
      </div>
    </div>
  )
}
