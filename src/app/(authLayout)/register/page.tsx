/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { setUser } from '@/libs/redux/features/auth/authSlice'
import { setCookie } from '@/libs/tokenUtils'
import formDataSanitize from '@/utils/formDataSanitize'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import gmailIcon from '../../../assets/auth/email.svg'
import passwordIcon from '../../../assets/auth/password.svg'
import registratationUserIcon from '../../../assets/auth/registation_user_name.svg'
import SocialLogins from '../components/shared/SocialLogins'
import { registerUser } from '../server-actions/auth.serverActions'
import { IRegisterFormInputs } from '../type/auth.type'
import Link from 'next/link'
import SuspenseLoader from '@/components/shared/SuspenseLoader'

const Register = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterFormInputs>()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const passwordValue = watch('password')

  // Real-time password error display function
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

  // Register submit function
  const onSubmit = async (data: {
    name: string
    email: string
    password: string
  }) => {
    setError('') // Clear any existing errors

    const sanitizedData = formDataSanitize({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    try {
      const createUser = await registerUser({
        userName: sanitizedData.name,
        email: sanitizedData.email,
        password: sanitizedData.password,
      })

      const accessToken = createUser?.register?.accessToken

      if (accessToken) {
        toast('Registration successful!')
        const userDecode: any = jwtDecode(accessToken)
        const id = userDecode?.userID
        const user = { id, role: userDecode?.role }

        setCookie('zdsl_accessToken', accessToken)
        setCookie('zdsl_user', JSON.stringify(user))
        dispatch(setUser({ user, token: accessToken }))

        router.push('/')
      } else {
        toast.error('something went wrong, try again')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    }
  }

  // Clear error message when typing in email or password
  const errorMessageReset = () => {
    setError('')
  }
  return (
    <div className={`rounded-lg w-[28.688rem] px-3 sm:px-2 md:px-0`}>
      <h1 className="text-2xl space-x-0 font-medium text-center">
        Registration
      </h1>
      {/* Registration form */}
      <form
        className="space-y-4 mt-[2.201rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name input */}
        <div className="relative bg-[#FFFFFF]">
          <input
            onFocus={errorMessageReset}
            {...register('name', {
              required: 'Name is required',
            })}
            type="text"
            name="name"
            placeholder="Name"
            className={`placeholder-[#7E7E7E] placeholder:text-base  bg-transparent border border-[#D9DFE3] rounded-md !py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] !pl-12`}
          />
          <div className="absolute inset-y-0 left-3 flex items-center px-2">
            <div className="h-5 w-5">
              <Image
                className="w-[1.125rem] h-[1.125rem]"
                src={registratationUserIcon}
                alt="user icon"
              />
            </div>
          </div>
        </div>
        {errors?.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}

        {/* Email input */}
        <div className="relative bg-[#FFFFFF]">
          <input
            onFocus={errorMessageReset}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            })}
            type="email"
            name="email"
            placeholder="Email"
            className={`placeholder-[#7E7E7E] placeholder:text-base  bg-transparent border border-[#D9DFE3] rounded-md !py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] !pl-12`}
          />
          <div className="absolute inset-y-0 left-3 flex items-center px-2">
            <div className="h-5 w-5">
              <Image
                className="w-[1.125rem] h-[1.125rem]"
                src={gmailIcon}
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

        {/* Password input */}
        <div className="relative bg-[#FFFFFF]">
          <input
            onFocus={errorMessageReset}
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message:
                  'One uppercase letter, one lowercase letter, and one number',
              },
            })}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className={`placeholder-[#7E7E7E] placeholder:text-base  bg-transparent border border-[#D9DFE3] rounded-md !py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] !pl-12`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-5 flex items-center px-2"
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
          <div className="absolute inset-y-0 left-3 flex items-center px-2">
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

        {/* Remember me */}
        <div className={`flex items-center justify-between`}>
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
        </div>

        {/* Register button */}
        <span className="relative">
          <button
            type="submit"
            style={{ marginTop: '1.674rem' }}
            className="w-full text-black text-[0.875rem] font-[600] bg-gradient-to-b from-[#F3C65D] to-[#E59F00] py-4 px-4 rounded"
          >
            Sign Up
          </button>
          {error && (
            <p className="text-red-500 text-sm left-0 w-full absolute -top-12 text-center">
              {error}
            </p>
          )}
        </span>
      </form>

      {/* Google and Facebook login component */}
      <Suspense fallback={<SuspenseLoader />}>
        <SocialLogins />
      </Suspense>

      <div className="md:mt-12 sm:mt-10 mt-5 text-center text-sm">
        Already have an account?{' '}
        <Link href={"/login"}>
          <span
            className="text-[#2868F8] underline font-medium cursor-pointer"
          >
            Login
          </span>{' '}
        </Link>
        /{' '}
        <Link href={"/"}>
          <span className="text-[#2868F8] underline font-medium">Guest User</span>
        </Link>
      </div>
    </div>
  )
}

export default Register
