import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { MdOutlineMail } from 'react-icons/md'
import phone from '@/assets/icon/phone.png'
const AppointmentCard = () => {
  return (
    <div className="md:flex gap-5 justify-between items-center border-2 border-[#97CCCC] bg-white p-3 rounded-md">
      <div className="lg:w-[40%] md:w-[30%] w-full md:p-5">
        <h1>Zubion Windy Palace</h1>
        <p className="md:text-sm text-xs pt-1">Block- L, Bashundhara R/A</p>

        <div className="flex ">
          <button className="bg-[#E6A206] font-semibold text-black hover:text-white transition-all px-4 py-2 rounded-sm mt-3 text-[11px] md:block hidden">
            Check Project
          </button>
        </div>
      </div>
      <div className="lg:w-[30%] md:w-[20%] w-full mt-2 md:mt-0 ">
        <div className="flex items-center text-sm gap-1">
          <p className="font-semibold">15, June </p>
          <p> 2023,</p>
          <p className="text-[#009999] font-semibold">09:50 AM</p>
        </div>
        <p className="text-xs pt-1 text-[#FF7A85]">Remaining</p>

        <div className="flex items-center gap-2 mt-3">
          <div className="w-10">
            <div className="bg-[#F3C65D] mb-0.5 px-2 font-semibold text-sm w-7   flex justify-center items-center">
              05
            </div>
            <p className="text-xs">Days</p>
          </div>
          <div className="w-10">
            <div className="bg-[#F3C65D] mb-0.5 px-2 font-semibold text-sm flex justify-center items-center w-7 ">
              05
            </div>
            <p className="text-xs">Hours</p>
          </div>
          <div className="w-10">
            <div className="bg-[#F3C65D] mb-0.5 px-2 font-semibold text-sm flex justify-center items-center w-7 ">
              05
            </div>
            <p className="text-xs">Minutes</p>
          </div>
        </div>
      </div>
      <div className="lg:w-[30%] md:w-[50%] w-full bg-[#FBF6EB] rounded-md mt-5 md:mt-0">
        <div
          className="p-4 border-2 border-[#F3C65D]/50 rounded-lg shadow-sm bg-no-repeat bg-right-top"
          // style={{
          //   backgroundImage: "url('/icon/user.png')",
          //   backgroundSize: '100px',
          // }}
        >
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2">
              <Image
                src="https://i.pravatar.cc/150?img=5"
                height={70}
                width={70}
                alt="image"
                className="w-[50px] h-[50px] rounded-full object-cover mb-4"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">Imran Hossen</p>
                <p className="text-xs text-red-500">Full Stack Developer</p>
                <p className="text-xs text-black mt-2 flex items-center">
                  <Image src={phone} alt="phone" width={13} height={13} />
                  <a href={`tel:${'0234884329342'}`} className="ml-2">
                    0183958304893
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 border rounded-full p-1 bg-white text-blue-900 flex justify-center items-center">
                <FaFacebookF className="text-sm" />
              </div>
              <div className="h-6 w-6 border rounded-full p-1 bg-white text-blue-900 flex justify-center items-center">
                <FaLinkedinIn className="text-sm" />
              </div>
              <div className="h-6 w-6 border rounded-full p-1 bg-white text-blue-900 flex justify-center items-center">
                <MdOutlineMail className="text-sm" />
              </div>
              <div className="flex justify-center items-center gap-1 text-white bg-gradient-to-b from-[#006565] to-[#00A8A8]  rounded-full px-3 py-1 cursor-pointer">
                <IoLogoWhatsapp className="" />
                <p className="text-xs">Whatsapp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard
