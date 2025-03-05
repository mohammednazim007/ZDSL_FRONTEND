/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image'
import gmailIcon from '../../../../assets/auth/gmail.svg'
import facebookIcon from '../../../../assets/auth/facebook.svg'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useGoogleLogin } from '@/hooks/auth/google/useGLogin'
import { useSearchParams } from 'next/navigation'
import useEnsureFacebookUser from '@/hooks/auth/fb/useFbLogin'

const SocialLogins = () => {
  const { handleCallback, loginWithGoogle, data, error, loading } =
    useGoogleLogin()
  const searchParams = useSearchParams()
  const code = searchParams?.get('code') ?? null
  const { statusMessage, fbLogin, handleFbLogin } = useEnsureFacebookUser()

  const handleFbLoginClick = () => {
    handleFbLogin()
    fbLogin()
  }

  useEffect(() => {
    if (code) {
      handleCallback(code)
    }
  }, [code])

  return (
    <div className=" my-5 flex flex-col space-y-5">
      <div className={`font-poppins`}>
        {/* social login title */}
        <div className=" flex items-center justify-between">
          <span className=" border-b-[1.5px] w-1/6 md:w-1/4 border-[#BFCBD3]"></span>
          <p className="md:text-sm text-[14px] md:text-center  ">
            or login with email or facebook
          </p>
          <span className=" border-b-[1.5px] w-1/6 md:w-1/4 border-[#BFCBD3]"></span>
        </div>
      </div>

      {/* google fb login icon */}
      <div className=" flex items-center justify-center space-x-4 ">
        <button
          onClick={() =>
            // signIn('google')
            loginWithGoogle()
          }
          className="flex items-center px-5 py-[0.625rem] border-[1.5px] border-[#BFCBD3] rounded-md shadow-sm "
        >
          <Image src={gmailIcon} alt="Gmail" className="w-5 h-5 mr-2" />
          <span className="text-[0.88rem]">Gmail</span>
        </button>
        <button
          onClick={() => handleFbLoginClick()}
          className="flex items-center px-5 py-[0.625rem] border-[1.5px] border-[#BFCBD3] rounded-md shadow-sm "
        >
          <Image src={facebookIcon} alt="Facebook" className="w-5 h-5 mr-2" />
          <span className="text-[0.88rem]">Facebook</span>
        </button>
      </div>
    </div>
  )
}

export default SocialLogins
