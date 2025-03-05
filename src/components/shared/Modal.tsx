import React, { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // to stop website scrolling when video is playing
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Stop scrolling
    } else {
      document.body.style.overflow = '' // Restore scrolling
    }

    return () => {
      document.body.style.overflow = '' // Cleanup
    }
  }, [isOpen])

  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        onClose()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed !h-screen !w-screen top-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-full max-w-[24rem] md:max-w-[48rem] bg-white rounded-lg mx-[0.3rem] p-1 md:p-2"
      >
        {/* <button className="absolute top-4 right-4" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button> */}

        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export default Modal
