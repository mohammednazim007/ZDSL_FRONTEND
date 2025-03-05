import Image from 'next/image'
import React from 'react'

interface SubHeaderWithLogoProps {
  title: string
  subtitle: string
  logo?: JSX.Element // SVG as a React component
}

const SubHeaderWithLogo: React.FC<SubHeaderWithLogoProps> = ({
  title,
  subtitle,
  logo,
}) => {
  return (
    <div className=" rounded-lg">
      <div className="flex items-center gap-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${logo}`}
          alt="logo"
          width={35}
          height={35}
        />
        <h2
          className="md:text-5xl text-4xl font-bold text-gray-800"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
      </div>
      <div>
        <p className={`font-poppins text-sm text-black mt-5`}>{subtitle}</p>
      </div>
    </div>
  )
}

// Default Logo as an SVG (this can be replaced with any SVG you have)
const DefaultLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="md:w-10 md:h-10 text-yellow-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-8a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export default SubHeaderWithLogo
