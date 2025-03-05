// BankCard.tsx
import Image from 'next/image'
import React from 'react'
import BankLogo from '@/assets/ViewAllBanks/BankLogo.png'
import Link from 'next/link'

interface BankCardProps {
  bankName?: string
  maxLoanAmount?: string
  interestRate?: string
  period?: string
  specialOffer?: string
  path?: string
  // logoSrc: string;
}

const BankCard: React.FC<BankCardProps> = ({
  bankName = 'Standard Chartered Bank',
  maxLoanAmount = 'Up to BDT 2 crore',
  interestRate = 'Starting from 8.50%',
  period = 'Up to 25 years',
  specialOffer = 'Special Offers',
  path = '#',
  // logoSrc
}) => {
  return (
    <div className=" border-[#F8E7C0] px-[1rem] lg:px-[2.5rem] pb-[3rem] mt-20 pt-5  w-full h-full max-h-[23rem] bg-white border  rounded-lg  flex flex-col  justify-between">
      <div className="flex items-start  justify-between ">
        <div className="cursor-pointer">
          {/* Use next/image for optimized image */}
          <Image
            src={BankLogo}
            alt={`${bankName} Logo`}
            width={128}
            height={40}
            className="w-[7.438rem] h-[2.875rem]"
          />
        </div>
        <div className="text-[#E9AA1A] -mt-2 text-base font-bold">
          {specialOffer}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-[1.25rem] font-bold">{bankName}</h3>
        <div className="flex flex-col mt-[10px] space-y-2">
          <div className="flex min-w-full pb-1 ">
            <span className="font-semibold basis-1/2">Max Loan Amount:</span>
            <span className="text-left basis-1/2">{maxLoanAmount}</span>
          </div>
          <div className="flex min-w-full pb-1  ">
            <span className="font-semibold basis-1/2">Interest Rate:</span>
            <span className="text-left basis-1/2">{interestRate}</span>
          </div>
          <div className="flex min-w-full pb-1">
            <span className="font-semibold basis-1/2">Period:</span>
            <span className="text-left basis-1/2">{period}</span>
          </div>
        </div>
      </div>
      <div className="flex  justify-between items-center mt-10 sm:mt-10 lg:mt-[2.75rem]">
        <Link href={path}>
          <button className="text-black font-medium text-base underline">
            More Details
          </button>
        </Link>
        <button
          style={{
            backgroundImage:
              'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
          }}
          className={`relative font-semibold  text-center w-[8rem] lg:w-[11rem] max-w-[11rem] rounded-md h-[3.125rem] text-base"
               
            `}
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}

export default BankCard
