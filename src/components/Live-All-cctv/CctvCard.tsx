'use client'
import Image from 'next/image'
import cctvimage from '@/assets/cctv/dame-cctv.png'
import { GoScreenFull } from 'react-icons/go'
import { BiCctv } from 'react-icons/bi'

interface CctvCardProps {
  src?: string; // Optional prop
}

const CctvCard: React.FC<CctvCardProps> = ({ src }) => {
  // CCTV video handler
  const handleVideoFn = () => {
    console.log('cctv');
  };

  return (
    <div className=' '>
      {/* image cctv player */}
      <div className="relative">
        {/* Example: Embed an iframe if `src` exists */}
        {src ? (
          <iframe
            className=' object-cover w-full'
            src={src}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No video source available</p> // Fallback message if src is undefined
        )}

        {/* cctv title room */}
        <div className="absolute top-1 right-1 flex items-end justify-end gap-1 bg-white p-2 text-[18px] rounded-full text-xs">
          <BiCctv className="w-[17px] h-[17px] text-orange-300" />
          <span>Living room</span>
        </div>

        <button
          onClick={handleVideoFn}
          className="absolute bottom-1 right-1 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full text-xs text-black"
        >
          <GoScreenFull />
        </button>
      </div>
    </div>
  );
};

export default CctvCard;
