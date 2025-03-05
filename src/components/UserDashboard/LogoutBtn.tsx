'use client'
import { logOut } from '@/libs/redux/features/auth/authSlice'
import { clearComparedProjects } from '@/libs/redux/features/user/userSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import { getCookie, removeCookie } from '@/libs/tokenUtils'
import { useRouter } from 'next/navigation'
import { TbLogout2 } from 'react-icons/tb'

const LogoutBtn = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    if (getCookie('zdsl_accessToken')) {
      localStorage.removeItem('projectIds')
      dispatch(clearComparedProjects())
    }
    removeCookie('zdsl_accessToken')
    removeCookie('zdsl_user')

    dispatch(logOut())
    // router.push('/login')
   if( typeof window !== "undefined") {
     window.open("/login","_self")
   }
  }

  return (
    <button
      className="border border-[#FF7A85] w-full flex justify-center items-center cursor-pointer gap-2 hover:gap-3  py-2 rounded-md mt-20 duration-300"
      onClick={handleLogout}
    >
      <TbLogout2 className="size-3 group-hover:size-4 duration-300" />
      <p className="text-sm">Log Out</p>
    </button>
  )
}

export default LogoutBtn
