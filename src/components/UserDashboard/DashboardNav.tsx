'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FaAngleDown } from 'react-icons/fa6'
import { FaChevronUp } from 'react-icons/fa'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { CiLogout } from 'react-icons/ci'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store'

const dropdownVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
}

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.2 },
}

const DashboardNav = ({ route }: { user: object; route: string }) => {
  const [isProfileOpen, setProfileOpen] = useState<boolean>(false)
  // const { user, token } = useSelector((state: RootState) => state.auth);

  // console.log({user, token}, "===============user token dashboard nav=============")

  return (
    <div className="w-full border-b py-4 px-5 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-medium">{route}</h2>
        <div className="flex items-center space-x-5">
          {/* Notification */}
          <div className="relative">
            <motion.div
              className="p-2 rounded-full bg-common relative cursor-pointer"
              whileHover={hoverEffect}
            >
              <IoIosNotificationsOutline className="text-3xl" />
              <span className="absolute top-2 right-2 text-[8px] w-4 h-4 rounded-full bg-[#ff2e90] font-semibold text-white flex justify-center items-center">
                12
              </span>
            </motion.div>
          </div>
          {/* Website */}
          <motion.div
            className="p-[10.5px] w-15 h-15 rounded-full bg-common cursor-pointer"
            whileHover={hoverEffect}
          >
            <Image src={'/web.svg'} width={25} height={50} alt="web" />
          </motion.div>
          {/* Profile Dropdown */}
          <div
            className="flex items-center justify-between space-x-4 hover:cursor-pointer"
            onClick={() => setProfileOpen(!isProfileOpen)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-11 h-11 rounded-full bg-cover bg-center"
                style={{ backgroundImage: 'url("/profile.jpg")' }}
              ></div>

              <div>
                <h3 className="text-base font-medium">Md Ashik</h3>
                <p className="text-sm">Assistant Manager</p>
              </div>
            </div>
            <div>{isProfileOpen ? <FaChevronUp /> : <FaAngleDown />}</div>
          </div>

          {/* Profile Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                className="origin-top-right absolute right-0 top-14 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-3 px-4 z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
                initial="closed"
                animate="open"
                exit="closed"
                variants={dropdownVariants}
              >
                <div className="py-1" role="none">
                  <Link href="/profile" passHref>
                    <motion.p
                      className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-[#dee4e8]"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                      whileHover={hoverEffect}
                    >
                      <BsPerson className="w-5 h-5 mr-3" />
                      View profile
                    </motion.p>
                  </Link>
                  <Link href="/account-settings" passHref>
                    <motion.p
                      className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-[#dee4e8]"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                      whileHover={hoverEffect}
                    >
                      <IoSettingsOutline className="w-5 h-5 mr-3" />
                      Account settings
                    </motion.p>
                  </Link>
                  <Link href="/logout" passHref>
                    <motion.p
                      className="text-gray-700 flex items-center px-4 py-2 text-sm hover:bg-[#dee4e8]"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-2"
                      whileHover={hoverEffect}
                    >
                      <CiLogout className="w-5 h-5 mr-3" />
                      Log out
                    </motion.p>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default DashboardNav
