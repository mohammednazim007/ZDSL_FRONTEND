'use client'
import Image from 'next/image'
import React from 'react'
import backArrow from '@/assets/icon/backArrow.svg'
import { useRouter } from 'next/navigation'

const BackButton = ({ title }: { title: string }) => {
  const router = useRouter()
  return (
    <div className="flex items-center gap-3 mt-[-2rem] md:mt-[0rem] mb-2 md:hidden">
      <Image
        onClick={() => router.back()}
        src={backArrow}
        alt="my properties"
        width={20}
        height={20}
        className="border rounded-full p-2 w-[35px] h-[35px] border-gray-400 "
      />
      <h1 className="text-xl font-medium text-nowrap whitespace-nowrap">
        {title}{' '}
      </h1>
    </div>
  )
}

export default BackButton
