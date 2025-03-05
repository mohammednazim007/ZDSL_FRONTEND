'use client'

import Image from 'next/image'

interface SubheaderWithImageSvgProps {
  title: string
  subtitle: string
  logo?: string // Expecting a URL or image path
  alt?: string
}

const SubheaderWithImageSvg: React.FC<SubheaderWithImageSvgProps> = ({
  title,
  subtitle,
  logo,
  alt,
}) => {
  const defaultLogo = '/default-logo.png' // Path to a default image (this should be in your public folder)

  return (
    <div className="text-center">
      <div className="flex items-center w-max mx-auto gap-3   2xl:gap-6">
        {/* Render Image component for the logo */}
        <Image
          src={logo || defaultLogo}
          width={100}
          height={100}
          alt={alt || 'Default Logo'}
          className="xs:h-[2.7rem] h-[2.4rem] w-[2.4rem] xs:w-[2.75rem]"
        />
        <h2
          className={` font-oswald   text-[2rem]  xs:text-[2.5rem] font-medium text-gray-800`}
        >
          {title}
        </h2>
      </div>
      <div>
        <p className={` text-center text-base text-black mt-5 `}>{subtitle}</p>
      </div>
    </div>
  )
}

export default SubheaderWithImageSvg
