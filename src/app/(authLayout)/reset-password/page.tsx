'use client'
import passwordIcon from '@/app/(authLayout)/assets/icons/password.svg'
import { gql, useMutation } from '@apollo/client'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ResetPasswordQuery = gql`
  mutation ResetPassword($newPassword: String!) {
    resetPassword(newPassword: $newPassword) {
      message
      success
    }
  }
`

const ResetPassword = () => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleReTypePasswordVisibility = () => {
    setShowReTypePassword(!showReTypePassword)
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showReTypePassword, setShowReTypePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [reTypePassword, setReTypePassword] = useState('')
  const [error, setError] = useState('')
  const [token, setToken] = useState<string | null>(null)

  const router = useRouter()

  const [changePasswordFn, { loading }] = useMutation(ResetPasswordQuery, {
    variables: { newPassword },
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
    onCompleted: () => {
      toast.success('Password updated successfully')
      setNewPassword('')
      setReTypePassword('')
      router.push('/login')
    },
    onError: (error) => {
      console.error('Error updating password:', error)
    },
  })

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
  }

  const handleForgetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword !== reTypePassword) {
      setError('Passwords do not match!')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (!validatePassword(newPassword)) {
      setError('Password must match the specified format (A,#,$,0-9)')
      return
    }

    try {
      await changePasswordFn()
    } catch (err) {
      console.error('Error during password reset:', err)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)

      const tokenFromUrl = url.searchParams.get('token')

      if (tokenFromUrl) {
        setToken(tokenFromUrl)
      }
    }
  }, [])
  return (
    <div
      className={`rounded-lg max-w-md w-full mt-4 md:mt-5 font-poppins overflow-hidden`}
    >
      <h1 className="text-2xl space-x-0 font-medium text-center">
        Reset Password
      </h1>

      <form
        className="mt-[4.563rem] px-3 md:px-0 overflow-hidden"
        onSubmit={handleForgetPassword}
      >
        {/* New Password Input */}
        <div className="relative bg-[#FFFFFF] overflow-hidden">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            name="newPassword"
            placeholder="Enter new password"
            className={`placeholder-[#7E7E7E] placeholder:text-base h-[3.75rem]  bg-transparent  border border-[#D9DFE3]  mb-2 rounded-md  !pl-[3rem] w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] ps-[50px]`}
          />
          <button
            type="button"
            className="absolute inset-y-0 -top-2 right-5 flex items-center px-2 "
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <h1 className="h-5 w-5 ">
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
              </h1>
            ) : (
              <h1 className="h-5 w-5">
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
              </h1>
            )}
          </button>
          <div className="absolute inset-y-0 left-4 flex items-center px-2">
            <Image
              className="w-[18px] h-[18px]"
              src={passwordIcon}
              alt="Password Icon"
              width={18}
              height={18}
            />
          </div>
        </div>

        {/* Retype Password Input */}
        <div className="relative bg-[#FFFFFF] overflow-hidden z-50">
          <input
            required
            type={showReTypePassword ? 'text' : 'password'}
            value={reTypePassword}
            onChange={(e) => setReTypePassword(e.target.value)}
            name="retypePassword"
            placeholder="Retype new password"
            className={`placeholder-[#7E7E7E] placeholder:text-base h-[3.75rem]  bg-transparent  border border-[#D9DFE3]  mb-2 rounded-md  !pl-[3rem] w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] ps-[50px]`}
          />
          <button
            type="button"
            className="absolute inset-y-0 -top-2 right-5 flex items-center px-2 "
            onClick={toggleReTypePasswordVisibility}
          >
            {showReTypePassword ? (
              <h1 className="h-5 w-5 ">
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
              </h1>
            ) : (
              <h1 className="h-5 w-5">
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
              </h1>
            )}
          </button>
          <div className="absolute inset-y-0 left-4 flex items-center px-2">
            <Image
              className="w-[18px] h-[18px]"
              src={passwordIcon}
              alt="Password Icon"
              width={18}
              height={18}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Change Password Button */}
        <button
          type="submit"
          className="w-full text-black text-[0.875rem] font-[600] bg-gradient-to-b from-[#F3C65D] to-[#E59F00]  py-[1.25rem] px-4 rounded mt-2 z-50"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
