/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import profileImg from '@/assets/Profile/userProfile.png'
import SingleFileUpload from '@/components/shared/FileUpload/SingleFileUpload'
import Loader from '@/components/shared/Loder'
import { TUserInfoUpdate } from '@/interface/Settings'
import { useAppSelector } from '@/libs/redux/hooks'
import { getCookie } from '@/libs/tokenUtils'
import { useUpdateUserProfileMutation } from '@/services/user/user.services'
import removeFalsyValuesProperty from '@/utils/removeFalsyValuesProperty'
import uploadFile from '@/utils/uploadFile'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ChangePassword from './ChangePassword'

const MySettings = () => {
  const { user, profile } = useAppSelector((state) => state.user)
  const { control, handleSubmit, reset } = useForm<TUserInfoUpdate>()
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false)
  const [updateUserProfile] = useUpdateUserProfileMutation()

  const onSubmit = async (data: TUserInfoUpdate) => {
    try {
      setUpdateProfileLoading(true)
      if (data?.file) {
        const uploadedFileUrl = await uploadFile.single('users', data?.file)
        data.profilePic = uploadedFileUrl
      }
      // Removing all the properties which has falsy value. Calling twice for nested objects
      const sanitizedData = removeFalsyValuesProperty(
        removeFalsyValuesProperty(data)
      )
      const accessToken = getCookie('zdsl_accessToken')
      if (!accessToken) {
        toast.error('Login again to update profile')
        return
      }
      const userDecode: any = jwtDecode(accessToken)
      const id: string = userDecode?.userId
      const res = await updateUserProfile({ id, data: sanitizedData }).unwrap()
      if (res?.data?.updateProfile?.success) {
        toast.success(
          res?.data?.updateProfile?.message || 'Profile is updated successfully'
        )
        reset()
      } else if (res?.errors?.[0]?.message) {
        toast.error(res?.errors?.[0]?.message)
      }
      setUpdateProfileLoading(false)
    } catch (error) {
      setUpdateProfileLoading(false)
      toast.error('Something went wrong')
      console.log('Profile update error: ', error)
    }
  }

  return (
    <div className="relative">
      <div className=" mb-10">
        <h1 className="text-xl font-medium">Settings</h1>
      </div>

      <p className="text-sm font-semibold mb-5">Personal Info</p>

      <div className="xl:flex gap-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:w-[70%] w-full rounded-lg space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
            <div className="sm:w-[50%] w-full relative">
              <label className="block text-sm font-medium text-[#063354] mb-2">
                First Name <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="name.firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    defaultValue={profile?.name?.firstName || ''}
                    placeholder="First Name"
                    className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4 active:ring-[#E59F00] active:border-[#E59F00] p-2 text-black text-sm placeholder:text-[#a7a7a7] placeholder:text-sm"
                  />
                )}
              />
            </div>
            <div className="sm:w-[50%] w-full relative">
              <label className="block font-medium text-[#063354] mb-2 text-sm">
                Last Name <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="name.lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    defaultValue={profile?.name?.lastName || ''}
                    placeholder="Last Name"
                    className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4 active:ring-[#E59F00] active:border-[#E59F00] p-2 text-black text-sm placeholder:text-[#a7a7a7] placeholder:text-sm"
                  />
                )}
              />
            </div>
          </div>
          <div className="w-[100%]">
            <label className="block font-medium text-[#063354] mb-2 text-sm">
              Job Title
            </label>
            <Controller
              name="profession"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  defaultValue={profile?.profession || ''}
                  placeholder="Job Title"
                  className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4 active:ring-[#E59F00] active:border-[#E59F00] p-2 text-black text-sm placeholder:text-[#a7a7a7] placeholder:text-sm"
                />
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
            <div className="sm:w-[50%] w-full relative">
              <label className="block text-sm font-medium text-[#063354] mb-2">
                Your Phone <span style={{ color: 'red' }}>*</span>
              </label>
              <Controller
                name="contactInfo.phoneNo"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    typeof="phoneNumber"
                    defaultValue={profile?.contactInfo?.phoneNo || ''}
                    placeholder="Your phone number"
                    className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4 active:ring-[#E59F00] active:border-[#E59F00] p-2 text-sm text-black placeholder:text-[#a7a7a7] placeholder:text-sm"
                  />
                )}
              />
            </div>
            <div className="sm:w-[50%] w-full mt-5 sm:mt-0 relative">
              <label className="block font-medium text-[#063354] mb-2 text-sm">
                Email <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                placeholder="example@gmail.com"
                defaultValue={user?.email}
                className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4 active:ring-[#E59F00] active:border-[#E59F00] p-2 text-black text-sm placeholder:text-[#a7a7a7] placeholder:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-5 w-full">
            <div className="w-full">
              <label className="block font-medium text-[#063354] mb-2 text-sm">
                Full Address
              </label>
              <Controller
                name="contactInfo.presentAddress"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Write your feedback here..."
                    defaultValue={profile?.contactInfo?.presentAddress || ''}
                    className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4 active:ring-[#E59F00] active:border-[#E59F00] p-2 text-black text-sm placeholder:text-[#a7a7a7] placeholder:text-sm"
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="text-sm mb-2">
              <p className="font-medium">Profile Photo</p>
            </div>

            <div className="mt-2 flex gap-5 items-center">
              <Image
                src={
                  profile?.profilePic
                    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${profile?.profilePic}`
                    : profileImg
                }
                alt="Profile Media"
                height={300}
                width={400}
                className="object-cover w-16 h-16 rounded-full mb-2"
              />
              <div className="mt-2">
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SingleFileUpload
                      onChange={(file: File | undefined) => onChange(file)} // Update form value with selected files
                      existingFile={value} // Pass the existing value (optional)
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-start">
            <button
              type="submit"
              className="bg-[#F3C65D] font-medium text-sm py-3 px-4 rounded-md mt-4"
            >
              Save Changes
            </button>
          </div>

          <div>
            <p className="text-sm underline text-[#FF7A85] mt-4">
              Delete Account
            </p>
          </div>
        </form>
        <div className="xl:w-[30%] w-full mt-10 xl:mt-0">
          <ChangePassword />
        </div>
      </div>
      {updateProfileLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/40 rounded-md flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default MySettings
