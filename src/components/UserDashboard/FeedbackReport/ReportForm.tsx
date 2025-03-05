/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import FileUpload from '@/components/shared/FileUpload/FileUpload'
import Loader from '@/components/shared/Loder'
import { ReportFormValues } from '@/interface/FeedbackReport'
import { useSubmitReportMutation } from '@/services/user/user.services'
import uploadFile from '@/utils/uploadFile'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ReportForm = () => {
  const [submitReport] = useSubmitReportMutation()
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormValues>()

  const onSubmit = async (data: ReportFormValues) => {
    setLoading(true)
    if (data?.file) {
      const uploadedFileUrl = await uploadFile.single('users', data?.file?.[0])
      data.file = uploadedFileUrl
    }
    try {
      const res = await submitReport(data).unwrap()
      if (res?.data?.createReport?.success) {
        toast.success(
          res?.data?.createReport?.message || 'Report is submitted successfully'
        )
        reset({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          content: '',
          file: [],
        })
      } else if (res?.errors?.[0]?.message) {
        toast.error(res?.errors?.[0]?.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log('Report submit error: ', error)
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      <p className="text-sm font-semibold mb-5">Personal Info</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="xl:w-[70%] w-full rounded-lg"
      >
        <div className="sm:flex   gap-5 w-full">
          <div className="sm:w-[50%] w-full">
            <label className="block text-sm font-medium text-[#063354] mb-2">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First Name is required' }} // Validation rule
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="First Name"
                  className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4    text-base placeholder:text-[#a7a7a7] placeholder:text-sm"
                />
              )}
            />
            {errors.firstName && (
              <span className="text-red-600 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="sm:w-[50%] w-full mt-5 sm:mt-0">
            <label className="block font-medium text-[#063354] mb-2 text-sm">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last Name is required' }} // Validation rule
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Last Name"
                  className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4    text-base placeholder:text-[#a7a7a7] placeholder:text-sm"
                />
              )}
            />
            {errors.lastName && (
              <span className="text-red-600 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="sm:flex   gap-5 mt-5 w-full">
          <div className="sm:w-[50%] w-full">
            <label className="block text-sm font-medium text-[#063354] mb-2">
              Your Phone
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Phone number is required' }} // Validation rule
              render={({ field }) => (
                <input
                  {...field}
                  typeof="phone"
                  placeholder="Your phone number"
                  className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4    text-base placeholder:text-[#a7a7a7] placeholder:text-sm"
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-600 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="sm:w-[50%] w-full mt-5 sm:mt-0">
            <label className="block font-medium text-[#063354] mb-2 text-sm">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }} // Validation rule
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="example@gmail.com"
                  className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4    text-base placeholder:text-[#a7a7a7] placeholder:text-sm"
                />
              )}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex   gap-5 mt-5 w-full">
          <div className="w-full">
            <label className="block font-medium text-[#063354] mb-2 text-sm">
              Your Issues
            </label>
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Issues is required' }} // Validation rule
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Write your issues here..."
                  className="w-full border border-[#dee4e8] rounded-[5px] focus:outline-none focus:ring-0 focus:ring-[#E59F00] focus:border-[#E59F00] active:outline-none active:ring-0 py-[11px] px-4    text-base placeholder:text-[#a7a7a7] h-32 placeholder:text-sm"
                />
              )}
            />
            {errors.content && (
              <span className="text-red-600 text-sm">
                {errors.content.message}
              </span>
            )}
          </div>
        </div>

        <div className="sm:flex items-center gap-10 mt-5 w-full">
          <div className="text-sm font-medium mb-2">
            <p>Upload media</p>
            <p>(Audio, Video, Images, PDF)</p>
          </div>

          <div className="sm:mt-2 mt-3">
            <Controller
              name="file"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FileUpload
                  onChange={(files: File[]) => onChange(files)} // Update form value with selected files
                  existingFiles={value} // Pass the existing value (optional)
                />
              )}
            />
            {errors.file && (
              <p style={{ color: 'red' }}>Media file is required.</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4 sm:justify-end justify-start md:mt-10  mt-10">
          <button
            type="submit"
            className="bg-[#F3C65D] font-medium text-sm py-3 px-4 rounded mt-4"
          >
            Submit Report
          </button>
        </div>
      </form>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/40 rounded-md flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ReportForm
