'use client'

import { FC } from 'react'

interface MiniHeaderWithDescProps {
  header: string
  description: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

const MiniHeaderWithDesc: FC<MiniHeaderWithDescProps> = ({
  header,
  description,
  as: Tag = 'h1',
  className = '',
}) => {
  return (
    <div className={`px-3 md:px-0 ${className}`}>
      <Tag className="font-oswald  font-medium text-[1.625rem] text-black">
        {header}
      </Tag>
      <p className="font-poppins text-base text-[#7E7E7E] mt-[2px]">
        {description}
      </p>
    </div>
  )
}

export default MiniHeaderWithDesc
