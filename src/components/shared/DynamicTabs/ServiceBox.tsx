'use client'

import React from 'react'

interface ServiceBoxProps {
  title: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  isActive?: boolean
  activeColor?: string
  className?: string
  titleColor?: string
  shadow?: string
  onClick?: () => void
  isVisible?: boolean
}

const ServiceBox: React.FC<ServiceBoxProps> = ({
  title,
  width = '100%',
  height = '7.375rem',
  maxWidth = '24.625rem',
  maxHeight = '7.375rem',
  isActive = false,
  activeColor = 'bg-red-600',
  className = '',
  titleColor = 'text-black',
  shadow = 'shadow-lg',
  onClick, // Add onClick here
  isVisible,
}) => {
  return (
    <button
      type="button"
      className={`${isVisible ? '' : 'hidden'}
        border text-center border-custom-border cursor-pointer flex justify-center items-center flex-col bg-white py-5
        ${shadow} 
        text-[1.5rem] ${isActive ? `${activeColor} !scale-105` : 'bg-white'} ${className}
        transition-all duration-200 ease-in-out transform hover:shadow-xl hover:scale-105
      `}
      style={{
        width,
        height,
        maxWidth,
        maxHeight,
      }}
      onClick={onClick} // Apply onClick here
    >
      <div>
        <h3 className={`text-2xl px-2 font-oswald  ${titleColor}`}>{title}</h3>
      </div>
    </button>
  )
}

export default ServiceBox
