'use client'

import userProfile from '@/assets/Profile/userProfile.png'
import { useAppSelector } from '@/libs/redux/hooks'
import Image from 'next/image'
import Routes from './Routes'
import './sidebar.css'

const Sidebar = () => {
  const userInfo = useAppSelector((state) => state.user)
  const userData = userInfo?.user
  const profileData = userInfo?.profile

  return (
    <div className=" sticky top-5 ">
      <div className="bg-white w-[300px] border rounded-md shadow pb-10 ">
        <div className="flex justify-center items-center w-full mt-8">
          <div className="space-y-4">
            <Image
              src={
                profileData?.profilePic
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${profileData?.profilePic}`
                  : userProfile
              }
              alt=""
              height={300}
              width={400}
              className="h-28 w-28 rounded-full mx-auto"
            />
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold capitalize">
                {profileData?.name?.firstName || userData?.userName || 'User'}
              </h1>
              <p className="text-xs text-[#008585] mt-2">
                {profileData?.profession || ''}
              </p>
            </div>
          </div>
        </div>
        <Routes />
      </div>
    </div>
  )
}

export default Sidebar
