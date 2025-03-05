/* eslint-disable import/no-extraneous-dependencies */
'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

// Define the types for the props
interface ResponsiveModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  open,
  onClose,
  children,
}) => {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0 // Default to 0 for SSR
  )

  // Update `width` state on window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth)
      }

      // Set initial width on mount
      setWidth(window.innerWidth)

      // Add resize listener
      window.addEventListener('resize', handleResize)

      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  // Determine modal width based on breakpoints
  const getModalWidth = () => {
    if (width < 768) {
      return '90%' // Mobile
    } else if (width < 1024) {
      return '50%' // Tablet
    } else {
      return '40%' // Desktop
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={false}
      center
      closeOnOverlayClick={true}
      styles={{
        modal: {
          borderRadius: '10px',
          padding: '1px',
          width: getModalWidth(),
        },
      }}
    >
      {children}
    </Modal>
  )
}

export default ResponsiveModal
