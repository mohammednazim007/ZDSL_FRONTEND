/* eslint-disable @typescript-eslint/no-explicit-any */
import JobTittle from './JobTittle'

const CompensationAndOtherBenefits = ({ jobDetails }: any) => {
  return (
    <>
      {
        jobDetails?.compensationAndOtherBenefits &&
        <><JobTittle>Compensation & Other Benefits</JobTittle><div className="mt-[1.625rem]">
          {jobDetails?.compensationAndOtherBenefits!.map(
            (benefit: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex  mb-[15px] ml-2 md:ml-[2rem] md:gap-x-[1.875rem] gap-x-2 "
                >
                  <div
                    className="min-h-4 min-w-4 h-4 w-4 mt-1 rounded-full"
                    style={{
                      background: 'linear-gradient(180deg, #F3C65D 0%, #E59F00 100%)',
                    }}
                  ></div>

                  <p className={`font-poppins font-normal text-base w-full `}>
                    {benefit}
                  </p>
                </div>
              )
            }
          )}
        </div></>
      }

    </>
  )
}

export default CompensationAndOtherBenefits
