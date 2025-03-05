'use client'

import { toast } from 'sonner'
import AllProjectsLocationPic from '../../../../assets/images/image.png'
import Image from 'next/image'
const VideoCard = () => {
  return (
    <div>
      <Image
        onClick={() => toast.info('This Video Feature will comming soon')}
        quality={100}
        src={AllProjectsLocationPic}
        alt="AllProjectsLocationMap"
      />
    </div>
  )
}

export default VideoCard
