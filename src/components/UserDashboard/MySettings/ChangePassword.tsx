/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import passwordIcon from '@/assets/auth/password.svg'
import FormErrorMessage from '@/components/shared/FormErrorMessage'
import Loader from '@/components/shared/Loder'
import { changePassValues } from '@/interface/Settings'
import { logOut } from '@/libs/redux/features/auth/authSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import { useChangeUserPasswordMutation } from '@/services/user/user.services'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [changePassword] = useChangeUserPasswordMutation()
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<changePassValues>()

  const onSubmit = async (data: changePassValues) => {
    // Handle form submission
    const payload = {
      oldPassword: data?.currentPassword,
      newPassword: data?.newPassword,
    }
    try {
      setChangePasswordLoading(true)
      const res = await changePassword(payload).unwrap()
      if (res?.data?.changePassword?.success) {
        toast.success(
          res?.data?.changePassword?.message ||
            'Password is changed successfully'
        )
        reset()
        dispatch(logOut())
        router.push('/login')
      } else if (res?.errors?.[0]?.message) {
        toast.error(res?.errors?.[0]?.message)
      }
      setChangePasswordLoading(false)
    } catch (error) {
      setChangePasswordLoading(false)
      toast.error('Something went wrong')
      console.log('Password change error: ', error)
    }
  }

  const newPasswordValue = watch('newPassword')

  // Real-time password error display function
  const getPasswordErrorMessage = () => {
    const rules = [
      { test: /[A-Z]/, message: 'One capital letter.' },
      { test: /[a-z]/, message: 'One small letter.' },
      { test: /[0-9]/, message: 'One number.' },
      { test: /.{6,}/, message: 'At least 6 characters.' },
    ]

    return rules
      .filter((rule) => !rule.test.test(newPasswordValue))
      .map((rule) => rule.message)
      .join(' ')
  }

  const togglePasswordVisibility = (data: string) => {
    if (data === 'current') return setShowCurrentPassword(!showCurrentPassword)
    if (data === 'new') return setShowPassword(!showPassword)
    if (data === 'confirm') return setShowConfirmPassword(!showConfirmPassword)
  }

  const errorMessageReset = () => {
    setError('')
  }

  return (
    <div className="border-2 border-[#36cccc] rounded-md px-4 py-5 w-full relative">
      <div className="flex flex-col items-center mb-10 mt-3">
        <Image src={passwordIcon} alt="Password Icon" className="h-5 w-5" />
        <p className="text-sm font-semibold mt-3 text-center">
          Change Password
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full rounded-lg">
        <div className="w-full space-y-6">
          <div className="w-full relative">
            <label className="text-sm font-semibold w-52">
              Current Password <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="relative mt-1">
              <input
                onFocus={errorMessageReset}
                {...register('currentPassword', {
                  required: 'Current Password is required',
                })}
                type={showCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                placeholder="Current Password"
                className={`text-sm placeholder:text-sm placeholder-[#7E7E7E]   bg-transparent border border-[#D9DFE3] rounded-md !py-3 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]`}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-5 flex items-center px-2 "
                onClick={() => togglePasswordVisibility('current')}
              >
                {showCurrentPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors?.currentPassword && (
              <FormErrorMessage
                message={errors?.currentPassword?.message}
                className={'text-sm lowercase'}
              />
            )}
          </div>
          <div className="w-full relative">
            <label className="text-sm font-semibold w-52">
              New Password <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="relative mt-1">
              <input
                onFocus={errorMessageReset}
                {...register('newPassword', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                    message:
                      'One uppercase letter, one lowercase letter, and one number',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="New Password"
                className={`placeholder-[#7E7E7E] placeholder:text-sm  bg-transparent border border-[#D9DFE3] rounded-md !py-3 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]`}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-5 flex items-center px-2 "
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors?.newPassword && !newPasswordValue && (
              <FormErrorMessage
                message={errors?.newPassword?.message}
                className={'text-sm lowercase'}
              />
            )}
            {newPasswordValue && getPasswordErrorMessage() && (
              <FormErrorMessage
                message={getPasswordErrorMessage()}
                className={'text-sm lowercase line-clamp-1'}
              />
            )}
          </div>
        </div>
        <div className="w-full relative mt-6">
          <label className="text-sm font-semibold w-52">
            Confirm Password <span style={{ color: 'red' }}>*</span>
          </label>
          <div className="relative mt-1 ">
            <input
              onFocus={errorMessageReset}
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('newPassword') || 'Password do not match',
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`text-sm placeholder:text-sm placeholder-[#7E7E7E]   bg-transparent border border-[#D9DFE3] rounded-md !py-3 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]`}
            />

            <button
              type="button"
              className="absolute inset-y-0 right-5 flex items-center px-2 "
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors?.confirmPassword && (
            <FormErrorMessage
              message={errors?.confirmPassword?.message}
              className={'text-sm lowercase'}
            />
          )}
        </div>

        <div className="flex gap-4 justify-end mt-6">
          <button
            type="submit"
            className="bg-[#F3C65D] font-medium text-sm py-3 px-4 rounded-md mt-4"
          >
            Change Password
          </button>
        </div>
      </form>

      {changePasswordLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/40 rounded-md flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default ChangePassword
