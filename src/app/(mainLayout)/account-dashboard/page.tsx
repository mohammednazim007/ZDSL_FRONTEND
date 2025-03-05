'use client'
import { useAppSelector } from '@/libs/redux/hooks'
import Image from 'next/image'
import React from 'react'
import Routes from '@/components/UserDashboard/Routes'
import avatar from '@/assets/image/avatarProfile.png'

const AccountPage = () => {
  const userInfo = useAppSelector((state) => state.user)

  const userData = userInfo?.user
  const profileData = userInfo?.profile

  return (
    <div className="bg-white">
      <div className="mt-20">
        <div className="bg-white  pb-10 ">
          <div className=" flex items-center gap-3 mx-10 pb-3 border-b border-b-[#F3C65D]">
            <Image
              src={
                profileData?.profilePic
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${profileData.profilePic}`
                  : avatar
              }
              width={100}
              height={100}
              alt="profile"
              className="h-16 w-16 rounded-full shadow-md"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold capitalize">
                {userData?.userName || 'user'}
              </h1>
              <p className="text-xs text-[#008585] mt-2">
                {profileData?.profession || 'Founder and CEO of ACB'}
              </p>
            </div>
          </div>
          <Routes />
        </div>
      </div>
    </div>
  )
}

export default AccountPage
