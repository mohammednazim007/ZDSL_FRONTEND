'use client'
import React from 'react'
import AppointmentCard from './AppointmentCard'
import dateIcon from '@/assets/icons/date-time.png'
import Image from 'next/image'

const MyAppointments = () => {
  return (
    <div>
      <div className="md:flex justify-between ">
        <h1 className="text-xl font-medium">Appointments</h1>
        <div className="flex gap-5 justify-between items-center bg-[#FDF8ED] border-2 border-[#F3C65D]/50 p-3 rounded-md mt-5 md:mt-0 ">
          <div className="w-[50%]">
            <p className="text-sm font-semibold">Book a Visit</p>
            <p className="text-xs">Choose a time that works for you</p>
          </div>
          <div className="flex items-center bg-white border-2 border-[#B5DCDC] px-4 py-2 rounded-full cursor-pointer w-[45%]">
            <Image src={dateIcon} alt="date-time" width={15} height={15} />
            <span className="ml-2 text-xs font-medium text-gray-700">
              January 2023
            </span>
          </div>
        </div>
      </div>

      <div className="md:mt-5 mt-10 space-y-5">
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </div>
    </div>
  )
}

export default MyAppointments
