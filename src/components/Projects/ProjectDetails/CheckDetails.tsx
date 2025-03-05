/* eslint-disable @typescript-eslint/no-explicit-any */
import formatTimestampToDate from '@/utils/formatTimestampToDate'
import Image from 'next/image'
import React from 'react'
interface Task {
  actualCompleteDate: null | string
  createdAt: string
  id: string
  project: string
  status: 'Done' | 'Ongoing' | 'Hold'
  targetedCompleteDate: string
  updatedAt: string
  workLoadShare: number
  workTitle: string
}
type ModalProps = {
  isVisible: boolean
  onClose: () => void
  data: Task[]
  details: any
  modalRef: any
}

type TimelineItem = {
  sl: number
  title: string
  targetDate: string
  actualDate: string
  status: string
}

const formatDate = (timestamp: any) => {
  const date = new Date(Number(timestamp))
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const CheckDetails: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  data,
  details,
  modalRef,
}) => {
  if (!isVisible) return null

  // console.log('modal data', data);
  // const totalWorkLoadShare = data?.reduce((sum: any, item: any) => {
  //   return sum + (item.workLoadShare || 0);  // Add workLoadShare, ensuring it defaults to 0 if undefined
  // }, 0);

  // const progressPercentage = Math.min(totalWorkLoadShare, 100);
  // console.log('totalWorkLoadShare', totalWorkLoadShare);
  // console.log('progressPercentage', progressPercentage);

  // const progressData = data?.data?.getProjectTimelines?.data || [];

  // Sum the workLoadShare values for only completed projects
  const totalWorkLoadShare = data?.reduce((sum: any, item: any) => {
    if (
      item.status === 'Complete' ||
      item.status === 'Completed' ||
      item.status === 'Done' ||
      item.status === 'done'
    ) {
      return sum + (item.workLoadShare || 0) // Add workLoadShare, ensuring it defaults to 0 if undefined
    }
    return sum // If status is not "Complete", don't add workLoadShare
  }, 0)

  // Calculate the progress percentage (ensuring it doesn't exceed 100)
  const progressPercentage = Math.min(totalWorkLoadShare, 100)

  // console.log('Total Work Load Share for Completed Projects:', totalWorkLoadShare);
  // console.log('Progress Percentage:', progressPercentage);
  // // console.log('Progress Data:', progressData);
  // console.log('data', data);

  return (
    <div className="fixed --font-poppins inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 pt-12">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-hide pb-8"
      >
        <div className="flex justify-between items-center px-3 md:px-5">
          <div className=" flex gap-x-3 items-center py-8">
            <h2 className="text-xl font-semibold --font-oswald">
              Construction & Handover Timeline
            </h2>
            <Image src="/timeline.png" width={70} height={70} alt="timeline" />
          </div>
          <div className="">
            <button
              className="text-gray-500 hover:text-gray-700 text-3xl relative -top-12 -right-4  p-3 z-10"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
        </div>
        <div className=" px-3 md:px-8 w-full">
          <div className="p-2 md:p-10 border-2 md:border-3  border-[#009898] rounded-md w-full overflow-x-scroll">
            <div className="flex justify-between items-center mb-4 w-full gap-x-2">
              <p className=" text-base ">
                <span className="block text-xl font-bold ">
                  {' '}
                  {formatDate(details?.expectedHandoverDate)}
                </span>
                Project Handover
              </p>
              <div className="">
                <p className="font-semibold">
                  <span className="">Completed {totalWorkLoadShare}%</span>
                </p>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${progressPercentage}%`, // Dynamically set the width
                      background:
                        'linear-gradient(180deg, #006565 0%, #00A8A8 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">SL</th>
                  <th className="border border-gray-200 px-4 py-2">Title</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Targeted Date
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Actual Date
                  </th>
                  <th className="border border-gray-200 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any, index: any) => {
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="border border-gray-200 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item?.workTitle}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {formatTimestampToDate(item?.targetedCompleteDate)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item?.actualCompleteDate
                          ? formatTimestampToDate(item?.actualCompleteDate)
                          : '-/-/-'}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <span
                          className={`${
                            item?.status === 'Done'
                              ? 'text-[#008585]'
                              : item?.status === 'Ongoing'
                                ? 'text-[#E6A206]'
                                : item?.status === 'Hold'
                                  ? 'text-[#65635F]'
                                  : 'text-[#7E7E7E]'
                          } font-medium`}
                        >
                          {item?.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckDetails
