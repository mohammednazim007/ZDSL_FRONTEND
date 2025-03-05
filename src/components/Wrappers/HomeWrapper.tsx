/* eslint-disable import/no-extraneous-dependencies */
'use client'
import React, { ReactNode, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface NavbarWrapperProps {
  children: ReactNode // Specify that children can be any valid React node
}

const HomeWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  // Initialize AOS in the useEffect hook
  useEffect(() => {
    AOS.init({
      duration: 1000, // You can customize the duration of the animations
      once: true, // Whether animation should happen only once
    })
  }, [])
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
export default HomeWrapper
