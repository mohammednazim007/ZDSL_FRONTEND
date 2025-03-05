/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import Image from 'next/image'
import backBtn from '@/assets/cctv/backBtns.svg'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const TopHeader = () => {
  const router = useRouter()
  return (
    <div>
      {/* title & cctv button */}
      <div className="flex justify-between items-center gap-1 mb-8">
        {/* back button & button*/}

        <div
          onClick={() => router.back()}
          className="flex justify-center items-center gap-1 cursor-pointer gap-x-1"
        >
          <Image
            className="w-7 h-7 rounded-full bg-white border-2 border-gray-400 p-1"
            src={backBtn}
            alt="back"
            width={20}
            height={20}
          />
          <span className="text-[15px] text-black">Cloud View</span>
        </div>

        {/* live cctv button */}
        <div className="  lg:mt-0 flex gap-1 justify-center items-center px-2 py-2 rounded-md border-[1px] border-[#FF7A85]  cursor-pointer">
          <div className=" h-3 w-3 bg-[#ff7a85] rounded-full" />
          <Link
            href={`/dashboard/user/all-cctv`}
            className="text-xs text-nowrap"
          >
            Live CC TV
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopHeader
