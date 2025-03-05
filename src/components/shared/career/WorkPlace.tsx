/* eslint-disable @typescript-eslint/no-explicit-any */

import JobTittle from './JobTittle'
const WorkPlace = ({ jobDetails }: any) => {
  return (
    <>
      <JobTittle>Work Place</JobTittle>
      <div className="mt-[1.625rem]">
        <div className="flex  ml-2 md:ml-[2rem] md:gap-x-[1.875rem] gap-x-2 ">
          <div
            className="min-h-4 min-w-4 h-4 w-4 mt-1 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #F3C65D 0%, #E59F00 100%)',
            }}
          ></div>

          <h5 className={`font-poppins font-normal text-base w-full `}>
            {jobDetails?.workPlace}
          </h5>
        </div>
      </div>
    </>
  )
}

export default WorkPlace
