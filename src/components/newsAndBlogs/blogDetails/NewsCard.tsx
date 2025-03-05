/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import profileImage from '@/assets/newsAndBlogs/uer.png'
import { formatTimestamp } from '@/helpers'
import Image from 'next/image'
import React from 'react'
import arrowIcon from '../../../assets/icons/arrow2.png'

type NewsCardProps = {
  image: string
  title: string
  description: string
  date: string
  author: any
  link: string
}

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  description,
  date,
  author, // _id
  link,
}) => {
  return (
    <div
      style={{ border: '2px solid #d9dfe3' }}
      className="bg-white rounded-lg p-[.4rem] overflow-hidden w-full mx-auto md:mx-0 h-full"
    >
      <div className="relative w-full aspect-[1000/500] overflow-hidden">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg transform transition-transform duration-300 ease-in-out hover:scale-110 z-0"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
          <div className="flex w-full justify-between items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image
                src={
                  author?.userDetails?.profilePic
                    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${author?.userDetails?.profilePic}`
                    : profileImage
                }
                alt="Author Profile Image"
                width={30}
                height={30}
                className="rounded-full object-cover w-[30px] h-[30px]"
              />
              <span className="underline text-sm">{author?.userName}</span>
            </div>

            <span className="text-[#E6A206] ">
              {formatTimestamp(Number(date))}
            </span>
          </div>
        </div>
        <h2 className="md:text-3xl text-xl font-semibold text-[#063354] my-5 line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{
          __html: description
        }}></p>

        <div className="flex items-center justify-between">
          <p className="text-[#8198A8] underline text-[14px]">
            Real-Estate News
          </p>
          <a
            href={link}
            className="text-blue-500 hover:underline text-sm font-medium flex items-center gap-2"
          >
            Read post
            <Image
              src={arrowIcon}
              height={25}
              width={25}
              className="mt-1"
              alt={''}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
