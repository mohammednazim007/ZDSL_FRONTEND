/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { gql } from '@apollo/client'
import { appoloClientServer } from '@/libs/appoloClient/AppoloClientServer'
import { jwtDecode } from 'jwt-decode'
import { setCookie } from '@/libs/tokenUtils'
import { useDispatch } from 'react-redux'
import { setUser } from '@/libs/redux/features/auth/authSlice'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${process.env.NEXT_PUBLIC_ORIGIN}&client_id=839715849549-vop0nmc5kfcnv9qse2prcblncrqk51jn.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/adwords%20openid`

interface GoogleLoginResponse {
  success: boolean
  message: string
  accessToken: string
}

// eslint-disable-next-line import/prefer-default-export
export const useGoogleLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<GoogleLoginResponse | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()

  const loginWithGoogle = () => {
    if (typeof window !== 'undefined') {
      // Redirect to Google's OAuth URL
      window.location.href = GOOGLE_AUTH_URL
    } else {
      console.error(
        'Window is undefined. This function must run in a browser environment.'
      )
    }
  }

  const handleCallback = async (code: string) => {
    try {
      setLoading(true)
      setError(null)

      const mutation = gql`
        mutation GoogleLogin {
          googleLogin {
            success
            message
            accessToken
          }
        }
      `

      const response = await appoloClientServer.mutate({
        mutation,
        context: {
          headers: {
            'x-authorization-key': code, // Send the code as header
          },
        },
      })

      const token = response.data?.googleLogin?.accessToken

      if (token) {
        const userDecode: any = jwtDecode(token)
        const id = userDecode?.userID
        const user = { id, role: userDecode?.role }

        setCookie('zdsl_accessToken', token)
        setCookie('zdsl_user', JSON.stringify(user))
        dispatch(setUser({ user, token }))

        toast.success('Login successful!')
        router.push('/')
      } else toast.error('Login failed')

      setData(response.data.googleLogin)
    } catch (err: unknown) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { loginWithGoogle, handleCallback, loading, error, data }
}
