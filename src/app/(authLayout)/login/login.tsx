/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { setUser } from '@/libs/redux/features/auth/authSlice'
import { setCookie } from '@/libs/tokenUtils'
import formDataSanitize from '@/utils/formDataSanitize'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import loginInputIcon from '../../../assets/auth/email.svg'
import passwordIcon from '../../../assets/auth/password.svg'
import SocialLogins from '../components/shared/SocialLogins'
import { ILoginFormInputs } from '../type/auth.type'

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ILoginFormInputs>()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const passwordValue = watch('password')

  const getPasswordErrorMessage = () => {
    const rules = [
      { test: /[A-Z]/, message: 'One capital letter.' },
      { test: /[a-z]/, message: 'One small letter.' },
      { test: /[0-9]/, message: 'One number.' },
      { test: /.{6,}/, message: 'At least 6 characters.' },
    ]
    return rules
      .filter((rule) => !rule.test.test(passwordValue))
      .map((rule) => rule.message)
      .join(' ')
  }

  const onSubmit = async (data: { email: string; password: string }) => {
    setError('') // Clear any existing errors

    const sanitizedData = formDataSanitize({
      email: data.email,
      password: data.password,
    })

    const graphqlQuery = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        success
        message
        accessToken
      }
    }
  `

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: graphqlQuery,
            variables: sanitizedData,
          }),
        }
      )

      const result = await response.json()
      const token = result?.data?.login?.accessToken

      if (token) {
        const userDecode: any = jwtDecode(token)
        const id = userDecode?.userID
        const user = { id, role: userDecode?.role }

        setCookie('zdsl_accessToken', token)
        setCookie('zdsl_user', JSON.stringify(user))
        dispatch(setUser({ user, token }))

        toast.success('Login successful!')
        router.push('/')
      } else toast.error(result?.data?.login?.message || 'Login failed')
    } catch (error) {
      console.error('Error:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  const errorMessageReset = () => setError('')

  return (
    <div className="rounded-lg w-[28.688rem] px-3 sm:px-2 md:px-0 flex flex-col justify-between h-full">
      {/* login form */}
      <div className=" my-auto ">
        {/* <div className=" w-full flex justify-center items-center mb-10">
          <Image
            src={logoSvg}
            height={100}
            width={400}
            alt="logo"
            className=" h-14"
          />
        </div> */}

        <form
          className="flex flex-col space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl space-x-0 font-semibold text-center">
            Sign In
          </h1>
          {/* Email input */}
          <div className="relative">
            <input
              onFocus={errorMessageReset}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address',
                },
              })}
              defaultValue={''}
              type="email"
              name="email"
              placeholder="ashik@zdslbd.com"
              className={` placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#D9DFE3] rounded-md  !py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] bg-primary !pl-12`}
            />

            <div className="absolute inset-y-0 left-3 top-1 flex items-center px-2">
              <div className="h-5 w-5">
                <Image
                  className="w-[1.125rem] h-[1.125rem]"
                  src={loginInputIcon}
                  alt="email icon"
                />
              </div>
            </div>
          </div>
          {errors?.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}

          {/* Password Input*/}
          <div className="relative ">
            <input
              onFocus={errorMessageReset}
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{6,}$/,
                  message:
                    'One uppercase letter, one lowercase letter, and one number',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              defaultValue={''}
              name="password"
              placeholder="Password"
              className={`placeholder-[#7E7E7E] placeholder:text-base  bg-transparent border border-[#D9DFE3] rounded-md !py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] !pl-12`}
            />

            <button
              type="button"
              className="absolute inset-y-0 right-5 flex items-center px-2 "
              onClick={togglePasswordVisibility}
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
            <div className="absolute inset-y-0 left-3 top-1 flex items-center px-2">
              <div className="h-5 w-5">
                <Image
                  className="w-[18px] h-[18px]"
                  src={passwordIcon}
                  alt="password icon"
                />
              </div>
            </div>
          </div>
          {errors?.password && !passwordValue && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
          {passwordValue && (
            <span className="text-red-500 text-sm mt-1">
              {getPasswordErrorMessage()}
            </span>
          )}

          {/* Remember me and forgot password */}
          <div className="flex items-center justify-between cursor-pointer ">
            <label className="flex items-center">
              <input
                type="checkbox"
                className=" text-[#E8A610] bg-[#F3C65D] rounded-sm"
                style={{ outline: 'none', boxShadow: 'none' }}
              />
              <span className="ml-2 text-[0.938rem] mt-1 text-[#063354] cursor-pointer">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-[0.938rem] text-[#063354] underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login button */}
          <span className="relative">
            <button
              type="submit"
              className="w-full relative text-black text-[0.875rem] font-[600] bg-gradient-to-b from-[#F3C65D] to-[#E59F00] py-4 px-4 rounded"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 text-sm left-0 w-full absolute -top-12 text-center">
                {error}
              </p>
            )}
          </span>
        </form>

        {/* Google and Facebook login component */}
        <SocialLogins />
        <div className="text-center">
          <p className="text-sm">
            Dont have an account?{' '}
            <Link href={'/register'}>
              <span className="cursor-pointer text-blue-600 underline">
                Sign Up
              </span>{' '}
            </Link>
            /{' '}
            <Link href={'/'}>
              <span className="cursor-pointer text-blue-600 underline">
                Guest Use
              </span>{' '}
            </Link>
          </p>
        </div>
      </div>

      <div className=" flex justify-center items-center">
        <button className=" border-2 rounded-md py-2 px-5 flex justify-center items-center space-x-2 hover:border-[#E59F00] active:bg-[#E59F00] active:bg-opacity-15">
          <Image src={'/web.svg'} width={20} height={50} alt="web" />
          <text className=" font-medium">WEBSITE</text>
        </button>
      </div>
    </div>
  )
}

export default Login

// import React from 'react';
// import Login from './Login';

// const page = () => {
//   return (
//     <div>
//       <Login/>
//     </div>
//   );
// };

// export default page;
