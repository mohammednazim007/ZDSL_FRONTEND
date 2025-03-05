'use client'
import dateImg from '@/assets/icon/date.png'
import phoneImg from '@/assets/icon/phone.png'
import img from '@/assets/image/house1.avif'
import { TCompareProductInfo } from '@/interface/Projects'
import Image from 'next/image'

interface SelectedComparePropertyProps {
  active?: boolean
  projectInfo: TCompareProductInfo
  index: number
}

export default function CompareProjectInfo({
  active = false,
  projectInfo,
  index,
}: SelectedComparePropertyProps) {
  return (
    <div
      className={`w-full rounded-t-md select-none cursor-pointer ${active && 'border-[3px] border-[#e6a306d7] bg-[#FAF5E9] '
        }`}
    >
      <div
        className={`w-full h-[260px] md:h-[400px] ${!active && 'border rounded-t-md'}`}
      >
        <div className="h-[120px] md:h-[260px] w-full p-1">
          <Image
            src={
              projectInfo?.thumbnailImage
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${projectInfo?.thumbnailImage}`
                : img
            }
            height={260}
            width={320}
            className="w-full h-[115px] md:h-[260px] object-cover rounded-md"
            alt=""
          />
        </div>
        <div className="h-[140px] flex justify-center items-center">
          <div>
            <div className="size-[40px] bg-[#EFBB43] text-2xl rounded-full text-white flex justify-center items-center mx-auto mb-3 overflow-x-auto scrollbar-hide">
              {index}
            </div>
            <h1 className={`md:text-xl text-center`}>
              {projectInfo?.projectTitle}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-[#AFD7D7] flex items-center px-5 h-16">
        <div className="w-full">
          <h1 className="font-semibold text-sm">
            Completed <span className="font-bold text-sm">45%</span>
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-1.5 md:mt-2 mt-1">
            <div
              className="bg-[#009898] h-1.5 rounded-full"
              style={{ width: '45%' }} // Change this value for dynamic progress
            ></div>
          </div>
        </div>
      </div>
      <div className="border-x text-sm">
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.projectType}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {new Date(Number(projectInfo?.expectedHandoverDate))?.toDateString()}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.projectStatus}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.buildingStoried}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.bedroomNo}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.bathroomNo}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.projectFacing}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.flatSize}
        </div>
        <div className="h-12 flex items-center px-5 border-b  ">
          {projectInfo?.projectLocation?.address}
        </div>
        <div className="h-72 space-y-5 pt-4 px-5 border-b overflow-auto">
          {projectInfo?.projectFeatures?.map((item, index) => (
            <div className="flex items-center gap-3" key={index}>
              {/* checkbox */}
              <input
                type="checkbox"
                className="form-checkbox h-[20px] w-[20px] rounded-md overflow-hidden text-[#E8A610] cursor-pointer"
                checked={true}
                style={{ outline: 'none', boxShadow: 'none' }}
              />
              <p className="text-sm">{item?.name}</p>
            </div>
          ))}
        </div>
        <div className="h-[450px] pt-4 border-b overflow-auto pb-5">
          {projectInfo?.nearbyFacilities?.map((item, index) => {
            return (
              <div key={index} className="w-full">
                <div className="bg-[#E9EFE4] w-full px-5 py-1">
                  <p className="font-semibold">{item?.facility}</p>
                </div>
                {item?.data && item?.data?.length && (
                  <div className="px-5 space-y-3 my-3">
                    {item?.data?.map((item, index) => {
                      if (item?.name) {
                        return <p key={index}>{item?.name}</p>
                      }
                      if (item?.University) {
                        return <p key={index}>{item?.University}</p>
                      } else {
                        return <></>
                      }
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="h-[200px] flex justify-center items-center px-5 border-b overflow-auto">
          <div className="w-full">
            <div className="flex justify-center">
              <div className="border-[#F4D691] px-4 py-2 border-2 rounded-full flex gap-2 items-center">
                <Image src={phoneImg} alt="" className="h-4 w-4" />
                <p className="font-semibold text-sm">0182948392483</p>
              </div>
            </div>

            <div className=" mx-auto mt-5">
              <h1 className="text-[16px] font-semibold text-center">
                Book a Visit
              </h1>

              <div className="flex justify-center mt-3">
                <div className="border-[#B5DCDC] px-4 py-2 border-[3px] rounded-full flex gap-2 items-center">
                  <Image src={dateImg} alt="" className="h-4 w-4" />
                  <p className="text-xs">
                    January <span className="font-semibold">2025</span>{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
