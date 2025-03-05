/* eslint-disable @typescript-eslint/no-explicit-any */

import JobTittle from './JobTittle'

const JobResponsibilities = ({ jobDetails }: any) => {
  return (
    <>
      {jobDetails?.jobResponsibilities && <div className="mt-[2.625rem]">
        <JobTittle>Job Responsibilities</JobTittle>
        <div className="mt-[1.875rem]">
          {jobDetails?.jobResponsibilities!.map((rp: any, idx: any) => {
            return (
              <div
                key={idx}
                className="flex   mb-2 ml-2 md:ml-[2rem] md:gap-x-[1.875rem] gap-x-2"
              >
                <div
                  className="min-h-4 min-w-4 h-4 w-4 mt-1 rounded-full"
                  style={{
                    background:
                      'linear-gradient(180deg, #F3C65D 0%, #E59F00 100%)',
                  }}
                ></div>

                <p
                  className={`font-poppins   font-normal text-base w-full ${idx % 2 === 0
                      ? 'min-h-[2.7rem] mb-[14px] '
                      : idx + 1 === jobDetails?.jobResponsibilities!.length
                        ? 'mb-0'
                        : 'mb-[14px]'
                    }`}
                >
                  {rp}
                </p>
              </div>
            )
          })}
        </div>
      </div>}

    </>

  )
}

export default JobResponsibilities
