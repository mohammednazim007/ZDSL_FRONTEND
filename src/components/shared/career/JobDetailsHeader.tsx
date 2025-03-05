/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import dateIcon from '../../../assets/icons/carrer/jobPostDate.svg'
import employmentStatusIcon from '../../../assets/icons/carrer/employmentStatus.svg'
import experienceIcon from '../../../assets/icons/carrer/jobDetailsExperience.svg'
import jobLocationIcon from '../../../assets/icons/carrer/jobPlace.svg'
import jobPostDateIcon from '../../../assets/icons/carrer/jobPostDate.svg'
import salaryIcon from '../../../assets/icons/carrer/salary.svg'
import genderIcon from '../../../assets/icons/carrer/gender.svg'
import Image from 'next/image'


const JobDetailsHeader = ({ jobDetails }: any) => {
  return (
    <>
      {/* tittle and apply now button */}
      <div className="md:mt-[4.75rem] mt-[2rem] flex justify-between items-center md:0">
        <h1
          className={`lg:text-[2.5rem] md:text-[2rem]  text-[1.1rem] font-oswald  font-normal`}
        >
          {jobDetails?.jobTitle}
        </h1>
        <div className="cursor-pointer ">
          <Link
            style={{
              backgroundImage:
                'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
              fontWeight: '500',
            }}
            href={`/career/${jobDetails?._id}/apply`}
            className={`font-poppins md:text-[1.125rem] bt-poppins text-[0.938rem] md:px-[2.5rem] px-6 md:py-[0.75rem] 
            py-[10px] right-3 top-2 bottom-2  text-bold rounded-md text-[#063354]`}
          >
            Apply now
          </Link>
        </div>
      </div>

      {/* job stasistics */}
      <div
        className={` border-[2px]  grid lg:grid-cols-3 xl:grid-cols-4  md:grid-cols-2 grid-cols-1 gap-y-[.55rem] lg:gap-y-[0.882rem] 
          items-center py-[1.09rem] lg:px-[1.25rem] px-[.4rem] border-[#D9DFE3] rounded-[5px]  text-base mt-[2.063rem]`}
      >
        {/* Publish on */}
        <p className="inline-flex gap-x-[0.536rem]  ">
          <Image src={jobPostDateIcon} alt=""></Image>
          <span
            className={` font-bold font-poppins text-[.9rem] 2xl:text-base`}
          >
            Publish on:
          </span>{' '}
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.publishDate}
          </span>
        </p>

        {/* Employment Status */}
        <p className="inline-flex gap-x-[0.536rem] ">
          <Image src={employmentStatusIcon} alt=""></Image>
          <span
            className={`font-poppins font-bold text-[#000000] text-[.9rem] 2xl:text-base`}
          >
            Employment Status:
          </span>
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.employmentStatus}
          </span>
        </p>

        {/* Experience */}

        <p className="inline-flex gap-x-[0.536rem]">
          <Image src={experienceIcon} alt=""></Image>
          <span
            className={` font-bold text-[#000000] font-poppins text-[.9rem] 2xl:text-base`}
          >
            Experience:
          </span>{' '}
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.experience}
          </span>
        </p>
        {/* Age: */}
        <p className="inline-flex gap-x-[0.536rem]">
          <Image src={dateIcon} alt=""></Image>
          <span
            className={` font-bold text-[#000000] font-poppins text-[.9rem] 2xl:text-base`}
          >
            Age:
          </span>{' '}
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.age}
          </span>
        </p>
        {/* Job Location */}
        <p className="inline-flex gap-x-[0.536rem]">
          <Image className="" src={jobLocationIcon} alt=""></Image>
          <span
            className={` font-bold text-[#000000] font-poppins text-[.9rem] 2xl:text-base`}
          >
            Job Location:
          </span>{' '}
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.jobLocation}
          </span>
        </p>
        {/* Salary */}
        <p className="inline-flex gap-x-[0.536rem]">
          <Image src={salaryIcon} alt=""></Image>
          <span
            className={` font-bold text-[#000000] font-poppins text-[.9rem] 2xl:text-base`}
          >
            Salary:
          </span>{' '}
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.salary}
          </span>
        </p>
        {/* Gender */}
        <p className="inline-flex gap-x-[0.536rem]">
          <Image src={genderIcon} alt=""></Image>
          <span
            className={` font-bold text-[#000000] font-poppins text-[.9rem] 2xl:text-base`}
          >
            Gender:
          </span>{' '}
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.gender}
          </span>
        </p>
        {/* Application Deadline */}
        <p className="inline-flex gap-x-[0.536rem]">
          <Image src={jobPostDateIcon} alt=""></Image>
          <span
            className={` font-bold text-[#000000] font-poppins text-[.9rem] 2xl:text-base`}
          >
            Application Deadline:
          </span>
          <span
            className={`font-poppins font-normal text-[.9rem] 2xl:text-base`}
          >
            {jobDetails?.applicationDeadline}
          </span>
        </p>
      </div>
    </>
  )
}

export default JobDetailsHeader
