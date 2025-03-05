import notificationBellIcon from '@/assets/icons/Notification/notificationBell.svg'
import Image from 'next/image'
import Link from 'next/link' 
const NotificationsHeader = () => {
  return (
    <section className="flex flex-col justify-center items-center pt-[11.125rem]">
      <div className="flex gap-[1.283rem] justify-center items-center">
        <Image
          className="h-[3.063] w-[2.438rem] mt-2"
          src={notificationBellIcon}
          alt=""
        ></Image>
        <h1 className={`font-oswald  font-normal text-[2.5rem]`}>
          Notifications
        </h1>
      </div>
      <p className="md:w-[45.313rem] w-full mt-[1.266rem] text-[1.125rem] px-4 md:px-0 min-h-[6.688rem]">
        <span className="md:ml-[20px] ml-0">Our</span> notification page has got
        you covered. Stay informed about the latest trends, regulations, and
        news that could impact your real estate business. Don&apos;t{' '}
        <span className="md:ml-[20px] ml-0">miss</span> out on important updates
        -
        <Link href={'#'} className="underline text-[#2868F8]">
          subscribe to our notification page today.
        </Link>
      </p>
    </section>
  )
}

export default NotificationsHeader
