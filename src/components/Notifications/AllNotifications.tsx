/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import avaterPhoto from '@/assets/icons/Notification/photoAvater.png'
import Image from 'next/image'
import dateIcon from '@/assets/icons/carrer/jobPostDate.svg'
import Link from 'next/link'
import SupportActionBox from '../shared/SupportActionBox/SupportActionBox'
import { timeAgo } from '@/helpers'
import useGraphQLCustomMutation from '@/hooks/useGraphQLCustomMutation'

// Define the mutation
const MARK_NOTIFICATION_AS_READ = `
  mutation MarkNotificationAsRead($notificationId: ID!) {
    markNotificationAsRead(notificationId: $notificationId) {
      success
      message
    }
  }
`

const AllNotifications = ({
  notifications,
  notificationMeta,
  userNotifications,
  role,
}: any) => {
  const { executeMutation, loading } = useGraphQLCustomMutation<{
    markNotificationAsRead: { success: boolean; message: string }
  }>(`${process.env.NEXT_PUBLIC_BASE_URL}`)

  // Handle click to mark notification as read
  const handleNotificationClick = async (
    notificationId: string,
    targetId: string
  ) => {
    if (!notificationId) {
      console.error('Notification ID is missing')
      return
    }

    if (typeof window !== 'undefined') {
      // Open the link in a new tab
      window.open(`${process.env.NEXT_BASE_DATA_FATCHING}/projects/${targetId}`, '_blank')
    }

    try {
      if (role === 'user') {
        const response = await executeMutation(MARK_NOTIFICATION_AS_READ, {
          notificationId,
        })

        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  return (
    <div className="md:mx-[-7.6%] sm:mx-0 lg:mx-0 mb-20">
      <h1 className="font-oswald font-normal text-[1.625rem] mt-[1.796rem]">
        Today
      </h1>

      {notifications?.map((tap: any, index: number) => {
        return (
          <section
            key={tap.id || index}
            // onClick={() => !loading && handleNotificationClick(tap.id)}
            className={`md:flex md:justify-between border-[2px] ${userNotifications
              .map((notification: { id: any }) => notification.id)
              .includes(tap.id)
              ? 'bg-white'
              : 'bg-gray-200'
              } border-[#D9DFE3] py-2 rounded-[5px] min-h-[7.75rem] h-full p-5 gap-4 mt-4 mb-10 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            <div className="flex sm:gap-[1.563rem] justify-center items-center">
              <div className="2xl:w-[5.313rem] 2xl:h-[5.313rem] xl:w-[12.313rem] xl:h-[5.7rem] lg:w-[14.313rem] lg:h-[5.7rem] md:w-[19.313rem] md:h-[6.7rem] sm:w-[25.313rem] sm:h-[7.7rem] overflow-hidden">
                <img
                  className="rounded-[100px] sm:block hidden w-full"
                  src={
                    tap.image
                      ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${tap?.image}`
                      : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                  }
                  alt="Notification"
                />
              </div>
              <div className="py-2">
                <h2 className="font-medium mb-[0.438rem] md:text-[14.58px] lg:text-base text-[18px] sm:text-base">
                  [Alert icon] {tap?.body}
                </h2>
                <p className="2xl:w-[61.375rem] xl:w-[85%] lg:w-[98%] xl:text-base lg:text-[14px] md:text-[12px] sm:text-[14px] text-justify">
                  {tap?.message}
                </p>
              </div>
            </div>

            <div className="flex md:flex-col md:justify-center items-center justify-end gap-5 md:gap-0">
              <div className="flex justify-center font-medium items-center md:gap-[0.35rem] sm:gap-0 gap-1 2xl:mb-[25px] xl:mb-[20px] lg:mb-[14px] md:mb-[15px] py-3 md:py-0">
                <Image
                  className="w-[17px] h-[17px] mb-[1px] mt-1 sm:mt-0"
                  src={dateIcon}
                  alt="Date Icon"
                />
                <h2 className="2xl:text-[14px] xl:text-[14px] md:text-[14px]">
                  {timeAgo(tap.createdAt)}
                </h2>
              </div>
              <div>
                <div
                  className="border-[#063354] border text-[15px] md:text-[14px] text-[#E9AA1A] bg-[#FFFFFF] rounded-[100px] lg:py-[0.469rem] lg:px-[1.524rem] md:py-[0.369rem] md:px-[1.524rem] py-[0.369rem] px-[1.524rem] inline-flex gap-[0.673rem]"
                  // href={`${process.env.NEXT_BASE_DATA_FATCHING}/projects/${tap.targetId}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  onClick={() =>
                    !loading && handleNotificationClick(tap.id, tap.targetId)
                  }
                >
                  View
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M8 5l7 7-7 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default AllNotifications
