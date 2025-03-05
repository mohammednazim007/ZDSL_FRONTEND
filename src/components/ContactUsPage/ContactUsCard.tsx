'use client'

import Image from 'next/image'
import FacbookSvg from '@/assets/contact-us/FacbookSvg.svg'
import LinkdinSvg from '@/assets/contact-us/LinkdinSvg.svg'
import EmailSvg from '@/assets/contact-us/EmailSvg.svg'
import CallSvg from '@/assets/icons/carrer/call.svg'
import whatAppSvg from '@/assets/contact-us/whatsapp.svg'
import { FC } from 'react'
import { hexToRGB } from '@/utils/helpers'

interface SocialLinks {
  facebook: string
  linkedin: string
  email: string
  whatsapp: string
}

interface PersonData {
  name: string
  title: string
  phone: string
  profileImage: string
  socialLinks: SocialLinks
}

interface ContactUsCardProps {
  contactData: PersonData
  borderColor?: string
}

const ContactUsCard: FC<ContactUsCardProps> = ({
  contactData,
  borderColor = '#E6A206',
}) => {
  const { name, title, phone, profileImage, socialLinks } = contactData

  return (
    <div
      style={{
        borderColor: hexToRGB(borderColor, 0.4),
      }}
      className="border-[3px] border-opacity-25 bg-secondary_color bg-opacity-25 
      w-full md:max-w-[24.5rem] flex flex-col items-center justify-center  rounded-lg  
      p-6 "
    >
      {/* Profile Image */}
      <span className="hidden">{profileImage}</span>
      <div className="flex    w-full justify-start  gap-[10px]">
        <div className="w-[4.375rem]  h-[4.375rem] flex justify-center items-center  rounded-full overflow-hidden mb-4">
          <Image
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
            width={80}
            height={80}
          />
        </div>
        <div className="h-max ">
          <h2 className={`font-poppins text-base font-medium `}>{name}</h2>
          <p className={`font-poppins text-[14px] text-[#FF7A85] `}>{title}</p>
          <a
            href={`tel:${phone}`}
            className="flex items-center space-x-2 text-gray-600"
          >
            <Image
              src={CallSvg}
              width={100}
              height={100}
              alt={'WhatsApp Logo'}
              className="h-[0.875rem] w-[0.875rem]"
            />
            <span>{phone}</span>
          </a>
        </div>
      </div>

      <div className="flex gap-3  w-full ">
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <Image
            src={FacbookSvg}
            alt="Profile"
            className="w-full max-w-[1.875rem] max-h-[1.875rem] h-full object-cover"
            width={80}
            height={80}
          />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600"
        >
          <Image
            src={LinkdinSvg}
            alt="Profile"
            className="w-full max-w-[1.875rem] max-h-[1.875rem] h-full object-cover"
            width={80}
            height={80}
          />
        </a>
        <a
          href={`mailto:${socialLinks.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700"
        >
          <Image
            src={EmailSvg}
            alt="Profile"
            className="w-full  max-w-[1.875rem] max-h-[1.875rem] h-full object-cover"
            width={80}
            height={80}
          />
        </a>
        <a
          href={socialLinks.whatsapp}
          style={{
            background:
              'transparent linear-gradient(180deg, #006565 0%, #00A8A8 100%) 0% 0% no-repeat padding-box',
          }}
          target="_blank"
          rel="noopener noreferrer"
          className={` font-poppins  w-[7.375rem] h-[1.875rem] font-normal flex items-center justify-center text-[14px]   text-white px-3 py-1 rounded-full `}
        >
          <Image
            src={whatAppSvg}
            alt="Profile"
            className="w-full max-w-[0.787rem] max-h-[0.787rem] h-full object-cover"
            width={80}
            height={80}
          />
          &nbsp;Whatsapp
        </a>
      </div>
    </div>
  )
}

export default ContactUsCard
