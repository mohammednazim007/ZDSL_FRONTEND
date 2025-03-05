/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import dateIcon from '../../../assets/icons/carrer/jobPostDate.svg'
import locationIcon from '../../../assets/icons/carrer/jobPlace.svg'
import experienceIcon from '../../../assets/icons/carrer/jobExperience.svg'
import Link from 'next/link'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { dummyCareerData } from '@/constants/career/career.const'
import Image from 'next/image'
import CareerHeaderBgImage from '../../../assets/career/career-header-bg.png'
import AllProjectPagination from './AllProjectPagination'
import { IJobProps } from '@/interface/career'
import { useState } from 'react'
import { IMeta } from '@/interface/Projects'
import { paginationRightArray } from '@/assets/svg'

const JobCards = ({
  jobs,
  totalJobs,
  jobsPerPage,
  paginate,
  currentPage,
  setCurrentPage,
  totalPages,
  getPageNumbers,
}: IJobProps) => {
  // console.log('jobCards', jobs)
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col gap-4 mt-8">
          <h1 className="hidden md:block text-[1.125rem] text-[#000000] mb-[1.875rem] font-semibold">
            All Jobs
          </h1>

          {jobs?.length ? (
            jobs?.map((job, idx) => {
              return (
                <section key={idx} className="relative">
                  <div className="md:bg-white bg-[#EBF7FF] rounded-md md:border-[1px] border-[2px] md:px-16 p-4 md:py-[30px] md:border-[#D9DFE3] border-[#707070] relative z-10">
                    <div
                      className={`flex justify-between  font-poppins  text-[20px]`}
                    >
                      <h1 className="font-semibold">{job?.jobTitle}</h1>

                      <div className="flex justify-center items-center md:gap-2 gap-[3px]">
                        <Image
                          className="w-[17px] h-[17px] mb-[1px]"
                          src={dateIcon}
                          alt=""
                        />
                        <h2 className="text-[14px] font-semibold md:font-medium md:text-[17px]">
                          {/* {job.} */}
                          {/* {job.publishDate} */}
                          {job?.publishDate}
                        </h2>
                      </div>
                    </div>

                    <p
                      className="md:mt-[0.938rem] mt-1 text-[16.5px] md:whitespace-normal whitespace-nowrap overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: job?.aboutJob }}
                    />

                    <div className="flex justify-between items-center md:mt-[30px] mt-4 pb-3 gap-2 md:gap-5 lg:gap-0">
                      <div className="flex md:gap-4 gap-1">
                        <div className="border-[2px] md:rounded-[5px] rounded-full flex gap-2 md:border-[#008585] border-[#063354] px-4 py-2 bg-white">
                          <Image src={locationIcon} alt="" />
                          <p className="md:font-normal font-semibold md:text-base text-[12px] line-clamp-1">
                            {job?.jobLocation}
                          </p>
                        </div>

                        <div className="hidden border-[2px] md:inline-flex gap-2 rounded-[5px] border-[#E6A206]  px-4 py-2">
                          <Image src={experienceIcon} alt="" />
                          <p className="md:text-base text-[10px]">
                            {job?.experience}
                          </p>
                        </div>
                      </div>

                      <div className="cursor-pointer bg-red-50 flex justify-center items-center text-center">
                        <Link
                          style={{
                            backgroundImage:
                              'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
                            fontWeight: '500',
                          }}
                          href={`/career/${job?._id}`}
                          className={`font-poppins md:text-[18px] inline-flex justify-center font-medium text-[12px] 
                          md:px-[1.875rem]  md:py-[0.75rem] py-[6px] sm:py-2 sm:px-5 px-4 md:rounded-md rounded-full md:text-[#063354] text-white`}
                        >
                          Apply{' '}
                          <span className="ml-1.5 hidden md:block"> now</span>
                          <span className="flex items-center justify-center sm:hidden">
                            <RiArrowRightUpLine className="text-white font-bold text-[20px]" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )
            })
          ) : (
            <p>No jobs found.</p>
          )}

          <div className="hidden md:flex justify-end gap-[1.875rem] text-base md:mt-[3.125rem] my-[2rem]">
            <div className={`flex items-center font-poppins font-normal`}>
              Total -{' '}
              <h6 className={`font-medium px-1`}>{dummyCareerData.length}</h6>{' '}
              leads
            </div>

            {/* Pagination Component */}
            <div style={{ fontFamily: 'Poppins' }} className=" font-semibold">
              <div className="flex  justify-end items-center space-x-1 sm:space-x-2">
                <button
                  className={`border cursor-pointer sm:h-10 w-6 h-6 sm:w-10 flex justify-center items-center rotate-180 ${
                    currentPage <= 1 ? 'bg-gray-200' : ''
                  } sm:px-3 px-2 py-1 text-black rounded`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  {paginationRightArray}
                </button>

                {getPageNumbers().map((page: any, index: any) => (
                  <button
                    key={index}
                    className={`sm:px-4 px-2 py-1 font-sans sm:py-2 sm:h-10 w-6 h-6 sm:w-10 flex justify-center items-center border text-black ${
                      currentPage === page
                        ? 'bg-[#F3C65D] text-white'
                        : 'bg-white text-black'
                    } rounded`}
                    onClick={() =>
                      typeof page === 'number' && setCurrentPage(page)
                    }
                    disabled={page === '...'}
                  >
                    {page}
                  </button>
                ))}

                {/* Right Arrow Button */}
                <button
                  className={`border cursor-pointer sm:h-10 w-6 h-6 sm:w-10 flex justify-center items-center ${
                    currentPage === totalPages ? 'bg-gray-200' : ''
                  } sm:px-3 px-2 py-1 sm:py-2 bg-white text-black rounded`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {paginationRightArray}
                </button>
              </div>
            </div>
          </div>

          <div className="block md:hidden mt-20">
            <div
              className="fixed bottom-2 left-1/2 transform -translate-x-1/2 min-w-72 h-96" // Adjust size as necessary
              style={{
                backgroundImage: `url(${CareerHeaderBgImage.src})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: 0.4, // Adjust opacity if needed
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default JobCards
