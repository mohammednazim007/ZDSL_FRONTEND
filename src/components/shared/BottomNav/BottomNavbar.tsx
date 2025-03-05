'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiCctv } from 'react-icons/bi'
import { FiHome } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { RiNotificationLine } from 'react-icons/ri'
import { TbBuildingCommunity } from 'react-icons/tb'

interface NavItemProps {
  icon: JSX.Element // Specify the type for the icon prop
  label: string
  active: boolean
  onClick: () => void
}

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home')
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/${tab}`)
  }

  useEffect(() => {
    // Update active tab when the route changes
    // setActiveTab(pathname.substring(1))
    setActiveTab(pathname ?? 'home')
  }, [pathname])

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200 z-[999]">
      <div className="flex justify-around">
        <NavItem
          icon={<FiHome className="w-5 h-5" />}
          label="Home"
          active={activeTab === '/'}
          onClick={() => handleTabChange('/')}
        />
        <NavItem
          icon={<TbBuildingCommunity className="w-5 h-5" />}
          label="Projects"
          active={activeTab === '/projects'}
          onClick={() => handleTabChange('projects')}
        />
        <NavItem
          icon={<BiCctv className="w-5 h-5" />}
          label="CCTV"
          active={activeTab === '/'}
          onClick={() => handleTabChange('/')}
        />
        <NavItem
          icon={<RiNotificationLine className="w-5 h-5" />}
          label="Updates"
          active={activeTab === '/notifications'}
          onClick={() => handleTabChange('notifications')}
        />
        <NavItem
          icon={<FaUserCircle className="w-5 h-5" />}
          label="Account"
          active={activeTab === '/account-dashboard'}
          onClick={() => handleTabChange('account-dashboard')}
        />
      </div>
    </nav>
  )
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer w-[20%] py-2 ${
        active ? ' bg-[#FBF2DF]' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`${active && 'text-yellow-500'} text-xs mt-1 text-[0.6rem]`}
      >
        {label}
      </span>{' '}
      {/* Updated size here */}
    </div>
  )
}

export default BottomNav
