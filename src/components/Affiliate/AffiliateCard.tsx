import Image from 'next/image'
import { FC } from 'react'
import { AffiliateWithCardProps } from '@/interface/Affiliate'
import affiliate from '@/data/affiliate'

const AffiliateCard = ({ slider }: { slider: any }) => {
  return (
    <div className="h-full py-5 mx-auto px-2 flex items-center justify-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${slider.mediaFile}`}
        width={300}
        height={300}
        alt={'buidingpic'}
        className="object-contain transform border shadow transition-transform duration-300  border hover:scale-105 w-full h-28  rounded-md px-1"
      />
    </div>
  )
}

export default AffiliateCard
