/* eslint-disable @typescript-eslint/no-explicit-any */
import JobTittle from './JobTittle'

const JobContext = ({ jobDetails }: any) => {
  return (
    <>
      <div className="md:mt-[1.875rem] mt-[1.6rem]">
        <JobTittle>Job Context</JobTittle>

        <p
          className={`font-poppins   font-normal text-base min-h-[6.438rem] mt-[0.875rem] px-2 md:px-0`}
          dangerouslySetInnerHTML={{ __html: jobDetails?.aboutJob }}
        ></p>
      </div>
    </>
  )
}

export default JobContext
