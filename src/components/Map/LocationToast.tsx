/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'

const Loader: React.FC = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-[50vh] ">
      <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-5 w-5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-5 w-5 bg-primary rounded-full animate-bounce"></div>
    </div>
  )
}

const LocationToast = () => {
  const [active, setActive] = useState<boolean>(true)

  const GeoLocation = useMemo(
    () =>
      dynamic(() => import('./GeoLocation'), {
        loading: () => <Loader />,
        ssr: false,
      }),
    []
  )

  return (
    <div className="border z-30 rounded-md relative">
      <GeoLocation />
      {active && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/10 z-[999] text-7xl flex justify-center items-center rounded text-white"
          onClick={() => setActive(false)}
        ></div>
      )}
    </div>
  )
}

export default LocationToast
