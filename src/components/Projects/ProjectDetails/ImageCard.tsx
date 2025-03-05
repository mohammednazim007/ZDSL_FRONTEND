'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface ImageObject {
  path: string
}

const ImageCard = ({ images }: { images: ImageObject[] }) => {
  // console.log('images', images);
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const scrollLeft = () => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollBy({
        left: -350, // Adjust the scroll amount as needed
        behavior: 'smooth', // Enable smooth scrolling
      })
  }

  const scrollRight = () => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollBy({
        left: 350, // Adjust the scroll amount as needed
        behavior: 'smooth', // Enable smooth scrolling
      })
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-y-2.5">
      <div
        ref={scrollContainerRef}
        className="flex gap-x-2 overflow-x-auto whitespace-nowrap rounded scrollbar-hide"
      >
        {images?.map((img, key) => (
          <div key={key} className="flex-shrink-0 relative">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${img.path}`}
              alt={`Project image ${key + 1}`}
              height={530}
              width={300}
              className="h-52 w-full object-cover rounded min-w-[300px]" // Ensure min-width
            />

            <button
              type="button"
              className="absolute bottom-2 right-2 bg-white p-2 rounded"
              onClick={() => openLightbox(key)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center gap-x-2">
        <button onClick={scrollLeft} className="flex border p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button onClick={scrollRight} className="flex border p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images?.map((src: ImageObject) => ({
          src: `${process.env.NEXT_PUBLIC_MEDIA_URL}/${src.path}`,
        }))}
        index={currentIndex}
      />
    </div>
  )
}

export default ImageCard
