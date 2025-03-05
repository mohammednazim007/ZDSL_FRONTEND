import React from 'react'

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: `calc(100vh - 78px)` }}
    >
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-[#EAB308] animate-spin"></div>
      </div>
    </div>
  )
}

export default Loader
