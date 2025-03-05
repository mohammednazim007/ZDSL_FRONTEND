/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import logo from '@/assets/logo.webp'
import cross from '@/assets/navbar/cross.svg'
import menus from '@/assets/navbar/menus.svg'
import { FeatureSvg, notifications } from '@/assets/svg'
import { setComparedProjectsNumber } from '@/libs/redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Menubar from './Menubar'
import SearchBar from './SearchBar'
import { useGetHeadersQuery } from '@/services/header.service'
import Loader from './Loder'
import { usePathname, useRouter } from 'next/navigation'
import useGraphQLNotificationsQuery from '@/hooks/useGraphQLNotificationsQuery'
import { getCookie } from '@/libs/tokenUtils'
import toast from 'react-hot-toast'

const NOTIFICATIONS_QUERY = `
  query GetAllNotifications($order: SortOrder, $sort: String, $page: Int, $limit: Int) {
    getAllNotifications(order: $order, sort: $sort, page: $page, limit: $limit) {
      success
      message
      data {
        id
        message
        body
        image
        targetId
        createdAt
      }
      meta {
        page
        limit
        total
        totalPage
      }
    }
  }
`

const GET_ME_QUERY = `
  query GetMe {
    getMe {
      success
      message
      data {
        user {

          myNotifications {
            id
          }
        }
      }
    }
  }
`

const Navbar = () => {
  const pathname = usePathname() // Current path
  console.log('pathname dd', pathname)

  // api call
  const { data, error, isLoading } = useGetHeadersQuery({})
  const dynamicHeaderData = data?.data?.getHeader[0]?.data

  const authToken = getCookie('zdsl_accessToken')
  const router = useRouter()

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isManu, setManu] = useState(false)
  const comparedProjects = useAppSelector(
    (state) => state.user?.comparedProjects
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('projectIds') || '[]')
    dispatch(setComparedProjectsNumber(storedIds.length))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20)
        setPrevScrollPos(currentScrollPos)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [prevScrollPos])
  const toggleMenubar = () => {
    setManu(!isManu)
  }
  // Router instance

  const handleRouteChange = () => {
    // Close your menu here
    setManu(false)
  }

  useEffect(() => {
    handleRouteChange() // Call when the path changes
  }, [pathname]) // Listen for changes in pathname

  const handleLogoClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/' // Force full-page reload
    }
  }

  // Notification===========>
  const [userNotifications, setUserNotifications] = useState<
    { id: string; isRead: boolean; seenTime: string | null }[]
  >([])
  const [notificationMeta, setNotificationMeta] = useState<{
    page: number
    limit: number
    total: number
    totalPage: number
  }>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  })

  // Fetch logged-in user data
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGraphQLNotificationsQuery<{
    getMe: {
      success: boolean
      message: string
      data: {
        user: {
          id: string
          userName: string
          email: string
          role: string
          isDeleted: boolean
          status: string
          socialAuthId: string
          myNotifications: {
            id: string
            isRead: boolean
            seenTime: string | null
          }[]
        }
      }
    }
  }>(GET_ME_QUERY)

  // Fetch general notifications
  const {
    data: generalData,
    loading: generalLoading,
    error: generalError,
  } = useGraphQLNotificationsQuery<{
    getAllNotifications: {
      data: Notification[]
      meta: { page: number; limit: number; total: number; totalPage: number }
    }
  }>(NOTIFICATIONS_QUERY, {
    order: 'desc',
    sort: 'createdAt',
    page: notificationMeta.page,
    limit: notificationMeta.limit,
  })

  // Update user-specific notifications
  useEffect(() => {
    if (userData?.getMe?.success && userData.getMe.data?.user) {
      setUserNotifications(userData.getMe.data.user.myNotifications)
    }
  }, [userData])

  // Update general notifications
  useEffect(() => {
    if (generalData?.getAllNotifications?.data) {
      setNotificationMeta(generalData.getAllNotifications.meta)
    }
  }, [generalData])

  if (isLoading) {
    return <Loader />
  }
  if (error) return <div>Something went wrong</div>

  return (
    <nav
      className={`!z-[999] ${prevScrollPos === 0 ? `${pathname === '/' && 'md:bg-transparent border-b-[0px] border-transparent'} bg-white` : 'bg-white '} fixed p-2 transition-all rounded-none left-0 right-0 duration-100 border-b-[1px] border-[#f1c152] ${visible ? 'top-0' : '-top-24'
        } ${isManu && '!bg-white !top-0 !duration-100'}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <button
          className="md:hidden flex justify-center items-center rounded-md bg-white border p-1"
          onClick={toggleMenubar}
        >
          <Image
            src={isManu ? cross : menus}
            alt="menu"
            width={30}
            height={30}
            className="group-hover:scale-90 transform duration-100"
          />
        </button>
        <div
          className="md:w-56 w-32"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <Image
            src={
              dynamicHeaderData?.headerLogo
                ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${dynamicHeaderData.headerLogo}`
                : logo
            }
            alt="logo"
            width={400}
            height={300}
          />
        </div>
        <div className="md:hidden flex items-center gap-2 ">
          <Link href="/compare-properties">
            <button className="relative rounded-md bg-white  w-[2rem] h-[2rem] flex justify-center items-center">
              <span className="group-hover:scale-90 transform duration-100">
                {FeatureSvg}
              </span>
              {comparedProjects ? (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-[20px] h-[21px] flex items-center justify-center rounded-full text-[12px] font-medium bg-[#FF7A85] text-white">
                  {comparedProjects}
                </div>
              ) : (
                ''
              )}
            </button>
          </Link>
          <SearchBar />
        </div>
        <div
          className="hidden w-full md:flex items-center gap-5 md:w-auto"
          id="navbar-multi-level"
        >
          <SearchBar />

          <Link href="/compare-properties" onClick={() => setManu(false)}>
            <button className="relative rounded-md bg-white border w-[3.125rem] h-[3.125rem] flex justify-center items-center group">
              <span className="group-hover:scale-90 transition-all duration-100 ease-out">
                {FeatureSvg}
              </span>
              {comparedProjects ? (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-[20px] h-[21px] flex items-center justify-center rounded-full text-[12px] font-medium bg-[#FF7A85] text-white">
                  {comparedProjects}
                </div>
              ) : (
                ''
              )}
            </button>
          </Link>

          <div
            onClick={() => {
              if (!authToken) {
                return toast.error('Please login to see notification')
              }
              setManu(false)
              router.push('/notifications')
            }}
          >
            <button className="relative rounded-md bg-white border w-[3.125rem] h-[3.125rem] flex justify-center items-center group">
              <span className="group-hover:scale-90 transform transition-all duration-100 ease-out">
                {notifications}
              </span>
              <div className="absolute top-0 right-0 -mt-2 -mr-2 w-[20px] h-[21px] flex items-center justify-center rounded-full text-[12px] font-medium bg-[#FF7A85] text-white">
                {Math.max(0, notificationMeta.total - userNotifications.length)}
              </div>
            </button>
          </div>

          <button
            onClick={toggleMenubar}
            className="flex justify-center items-center rounded-md bg-white border w-[3.125rem] h-[3.125rem] group"
          >
            <Image
              src={isManu ? cross : menus}
              alt="menu"
              width={35.78}
              height={24.14}
              className="group-hover:scale-90 transform duration-100 ease-out"
            />
          </button>
        </div>
      </div>
      <Menubar isOpen={isManu} handleClose={toggleMenubar} />
    </nav>
  )
}

export default Navbar
