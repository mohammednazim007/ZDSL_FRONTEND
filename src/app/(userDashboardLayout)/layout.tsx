/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import BottomNav from '@/components/shared/BottomNav/BottomNavbar'
import Container from '@/components/shared/Container'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/UserDashboard/Sidebar'
import { logOut } from '@/libs/redux/features/auth/authSlice'
import { setUser } from '@/libs/redux/features/user/userSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import { getCookie } from '@/libs/tokenUtils'
import { useGetMeQuery } from '@/services/user/user.services'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const DashboardLayOut = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: me, isLoading, isError } = useGetMeQuery(undefined)
  const token = getCookie('zdsl_accessToken')

  useEffect(() => {
    if (!token) {
      dispatch(logOut())
    }
  }, [token])

  if (!isLoading && !isError && me?.data?.getMe?.success) {
    const payload = me?.data?.getMe?.data || { user: null, profile: null }
    dispatch(setUser(payload))
  }

  return (
    <div className="min-h-screen bg-[#f8fcff] pt-10 mt-20">
      <Container className="!px-0">
        <Navbar />
        <div className="lg:flex justify-between w-full">
          <div className="sticky top-5 lg:block hidden">
            <Sidebar />
          </div>
          <div className="bg-[#f8fcff] px-5 w-full md:pt-3 pb-20">
            {children}
          </div>
        </div>
      </Container>
      <div className="lg:hidden block">
        <BottomNav />
      </div>
    </div>
  )
}

export default DashboardLayOut
