'use client'
import Container from '../shared/Container'
import NotificationsHeader from './NotificationsHeader'
import Loader from '../shared/Loder'
import AllNotifications from './AllNotifications'
import { useEffect, useState } from 'react'
import useGraphQLNotificationsQuery from '@/hooks/useGraphQLNotificationsQuery'

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
          role
          myNotifications {
            id
          }
        }
      }
    }
  }
`

const NotificationFunctionality = () => {
  const [userNotifications, setUserNotifications] = useState<
    { id: string; isRead: boolean; seenTime: string | null }[]
  >([])
  const [generalNotifications, setGeneralNotifications] = useState<
    Notification[]
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
      setGeneralNotifications(generalData.getAllNotifications.data)
      setNotificationMeta(generalData.getAllNotifications.meta)
    }
  }, [generalData])

  if (userLoading || generalLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }
  if (userError || generalError) return <div>Something went wrong!</div>
  return (
    <div>
      <Container>
        <NotificationsHeader />
        <AllNotifications
          notifications={generalNotifications}
          notificationMeta={notificationMeta}
          userNotifications={userNotifications}
          role={userData?.getMe.data.user}
        />
      </Container>
    </div>
  )
}

export default NotificationFunctionality
