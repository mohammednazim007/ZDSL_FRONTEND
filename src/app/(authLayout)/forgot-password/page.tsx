/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import loginInputIcon from '@/assets/icons/email.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { forgotPassword } from '../server-actions/auth.serverActions'
import { useForm } from 'react-hook-form'
import formDataSanitize from '@/utils/formDataSanitize'

const ForgetPassword = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<{ email: string }>({
    mode: 'onChange',
  })

  const handleForgetPassword = async (data: { email: string }) => {
    setError('') // Clear any existing errors
    const sanitizedData = formDataSanitize({
      email: data.email,
    })
    try {
      const result = await forgotPassword({
        email: sanitizedData.email,
      })

      // Handle error messages returned by the authentication method
      if (result?.error)
        setError(result.error) // Set custom error message
      else if (result?.forgetPassword?.message) setEmail(sanitizedData.email)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    }
  }

  // Clear error message when typing in email or password
  const errorMessageReset = () => {
    setError('')
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`rounded-lg max-w-md w-full mt-4 md:mt-5 font-poppins`}>
        <h1 className="text-2xl space-x-0 font-medium text-center ">
          Forgot Password?
        </h1>
        <div className="flex justify-center items-center text-center mt-[0.653rem]">
          {!email ? (
            <p className="mb-6 w-[75%]">
              Please enter your email address and we&apos;ll send you a link to
              reset your password
            </p>
          ) : (
            <p className="mb-[0.625rem] w-[95%]">
              We have sent a password reset link to your email{' '}
              <span className="text-[#2868F8]">{email}</span>. Please check your
              email.
            </p>
          )}
        </div>

        <form
          className="px-3 md:px-0"
          onSubmit={handleSubmit(handleForgetPassword)}
        >
          {!email && (
            <div className="relative  bg-[#FFFFFF]">
              <input
                onFocus={errorMessageReset}
                type="email"
                placeholder="Enter your email"
                className={`placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#D9DFE3] mb-2 rounded-md h-[3.75rem] p-3 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] !pl-[3rem]`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              <div className="absolute inset-y-0 left-4 mt-[3.1px] bg-red-40 flex items-center justify-center px-2 bg-red-20 h-[3.75rem]">
                <div className="h-5 w-5">
                  <Image
                    className="w-[1.125rem] h-[1.125rem]"
                    src={loginInputIcon}
                    alt=""
                  />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}

          {!email ? (
            <span className="relative">
              <button
                type="submit"
                style={{ marginTop: '3.65rem' }}
                className="w-full text-black text-[0.875rem] font-[600] bg-gradient-to-b from-[#F3C65D] to-[#E59F00]  py-[1.25rem] px-4 rounded"
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
              {error && (
                <p className="text-red-500 text-sm left-0 w-full absolute -top-12 text-center">
                  {error}
                </p>
              )}
            </span>
          ) : (
            <Link href={'/login'}>
              <button
                style={{ marginTop: '3.75rem' }}
                className="w-full text-black text-[0.875rem] font-[600] bg-gradient-to-b from-[#F3C65D] to-[#E59F00]  py-[1.25rem] px-4 rounded"
              >
                Go to login page
              </button>
            </Link>
          )}
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
