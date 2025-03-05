/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllPhotoGalleryQuery } from '@/services/photoGallery.service'
import React from 'react'
import Loader from '../shared/Loder'
import Image from 'next/image'
import { motion } from 'framer-motion'

const PhotoGalleryMain = () => {
  const { data, isLoading } = useGetAllPhotoGalleryQuery({})
  const images = data?.data?.getPhotoGallery?.data

  if (isLoading) return <Loader />

  return (
    <div className="container mx-auto px-2 pt-10 bg-white pb-8 md:pb-12 md:hidden">
      <h1 className="text-center text-[2.3rem] font-bold mb-5">
        Our Photo Gallery
      </h1>
      <div className="space-y-4">
        {/* Row 1: Two images */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-2"
        >
          {images
            ?.slice(0, 2)
            ?.map((image: any) => (
              <Image
                width={1000}
                height={1000}
                key={image?._id}
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image?.fileName}`}
                alt={image?.mediaType}
                className="w-full h-[100%] object-cover rounded-md"
              />
            ))}
        </motion.div>

        {/* Row 2: Five images */}
        <div className="grid grid-cols-2 gap-2">
          {/* === left image === */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-2"
          >
            {images
              ?.slice(2, 6)
              ?.map((image: any) => (
                <Image
                  width={1000}
                  height={1000}
                  key={image?._id}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image?.fileName}`}
                  alt={image?.alt}
                  className="w-full h-[7rem] md:h-[11rem] object-cover rounded-md"
                />
              ))}
          </motion.div>
          {/* === right image === */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid grid-cols-1 "
          >
            {images
              ?.slice(6, 7)
              ?.map((image: any) => (
                <Image
                  width={1000}
                  height={1000}
                  key={image?._id}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image?.fileName}`}
                  alt={image?.alt}
                  className="w-full h-full object-cover rounded-md"
                />
              ))}
          </motion.div>
        </div>

        {/* Row 3: Three images */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-4 gap-2"
        >
          {images
            ?.slice(7, 11)
            ?.map((image: any) => (
              <Image
                width={1000}
                height={1000}
                key={image?._id}
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image?.fileName}`}
                alt={image?.alt}
                className="w-full h-[10rem] md:h-[14rem] object-cover rounded-md"
              />
            ))}
        </motion.div>

        {/* Row 4: Two large images */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-4"
        >
          {images
            ?.slice(11, 13)
            ?.map((image: any) => (
              <Image
                width={1000}
                height={1000}
                key={image?._id}
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${image?.fileName}`}
                alt={image?.alt}
                className="w-full h-[100%] object-cover rounded-md"
              />
            ))}
        </motion.div>
      </div>
    </div>
  )
}

export default PhotoGalleryMain
