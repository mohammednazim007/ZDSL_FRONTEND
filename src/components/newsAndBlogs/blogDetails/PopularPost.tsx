/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { formatTimestamp } from '@/helpers'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import arrowIcon from '../../../assets/icons/arrow2.png'
import rightSectionImg from '../../../assets/newsAndBlogs/right_section.png'
import profileImage from '../../../assets/newsAndBlogs/uer.png'

interface PopularPostProps {
  post: any
}

const PopularPost: React.FC<PopularPostProps> = ({ post }) => {
  // console.log('popular post', post?.featuredImage)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" overflow-hidden"
    >
      {/* Full-width image */}
      <div className="w-full">
        <Image
          width={1000}
          height={1000}
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${post?.featuredImage}`}
          alt="Affordable Housing Project"
          className="object-cover w-full h-48 md:h-64 rounded-lg"
        />
      </div>

      {/* Content under the image */}
      <div className="py-4">
        <div className="text-sm text-gray-500 mb-1">
          <span>Real Estate News</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#E6A206] text-sm">
            {formatTimestamp(Number(post?.publishDate))}
          </span>
          <div className="flex items-center space-x-2 ">
            <Image
              src={
                post?.user?.userDetails?.profilePic
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${post?.user?.userDetails?.profilePic}`
                  : profileImage.src
              }
              alt="Author Profile Image"
              width={30}
              height={30}
              className="rounded-full object-cover w-[30px] h-[30px]"
            />
            <span className="text-sm">By {post?.user?.userName}</span>
          </div>
        </div>

        <h3 className="font-semibold text-[20px] text-[#063354] mt-2">
          {post?.blogTitle}
        </h3>

        <a
          href={`/news-and-blogs/details/${post?._id}`}
          className="text-[#063354] text-[16px] mt-3 hover:underline flex items-center gap-2"
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
    </motion.div>
  )
}

export default PopularPost
