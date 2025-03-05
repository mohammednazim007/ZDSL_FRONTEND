'use client'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar'
import BottomNav from '@/components/shared/BottomNav/BottomNavbar'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/libs/redux/hooks'
import { useGetMeQuery } from '@/services/user/user.services'
import { getCookie } from '@/libs/tokenUtils'
import { useEffect } from 'react'
import { logOut } from '@/libs/redux/features/auth/authSlice'
import { setUser } from '@/libs/redux/features/user/userSlice'
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: me, isLoading, isError } = useGetMeQuery(undefined)
  const token = getCookie('zdsl_accessToken')

  useEffect(() => {
    if (!token) {
      dispatch(logOut())
    }
  }, [token, dispatch, router])

  if (!isLoading && !isError && me?.data?.getMe?.success) {
    const payload = me?.data?.getMe?.data || { user: null, profile: null }
    dispatch(setUser(payload))
  }

  return (
    <div className={`font-poppins font-normal w-full bg-[#fbfbfb]`}>
      <Navbar />
      <div>{children}</div>
      {/* <Toaster /> */}
      <Footer />
      <div className="md:hidden block">
        <BottomNav />
      </div>
    </div>
  )
}

export default MainLayout
