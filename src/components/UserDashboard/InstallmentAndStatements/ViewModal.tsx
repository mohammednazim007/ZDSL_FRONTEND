/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
interface Installment {
  amount: number // Example field
  dueDate: string // Example field
}
 
interface ItemType {
  projectId: any
  installmentSetup: {
    installments: Installment[]
  }
}

interface ViewModalProps {
  item: ItemType
  onClose: () => void
}
const ViewModal: React.FC<ViewModalProps> = ({ item, onClose }) => {
  console.log(item)
  const trClassName =
    'px-4 py-1.5 text-sm max-w-[150px] truncate border-y border-[#dbdbdb62] cursor-pointer capitalize'

  const thClassName =
    'font-medium text-gray-700 px-4 py-4 text-sm max-w-[150px] truncate border-y border-[#dbdbdb62] cursor-pointer'
  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="relative w-[90vw] h-[80vh] md:w-[60vw] md:h-[80vh]"
        >
          <div className="relative w-full h-full bg-white rounded-lg overflow-auto p-5">
            <h1 className="text-lg ">{item?.projectId?.projectTitle}</h1>
            {/* Modal Content */}

            <div className="flex flex-col mx-auto max-w-6xl mt-6">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg">
                    <table
                      className="w-full min-w-max table-auto rounded-md text-left border-separate relative"
                      style={{ borderSpacing: '0 10px' }}
                    >
                      <thead>
                        <tr className="bg-white border">
                          <th className={thClassName}>
                            <div className="flex items-center gap-2">Name</div>
                          </th>
                          <th className={thClassName}>
                            <div className="flex items-center gap-2">
                              Amount
                            </div>
                          </th>
                          <th
                            className={`${thClassName} border- rounded-tr-md rounded-b-md`}
                          >
                            <div className="flex items-center gap-2">
                              Due Payment
                            </div>
                          </th>
                          <th
                            className={`${thClassName} border-r rounded-tr-md rounded-br-md`}
                          >
                            <div className="flex items-center gap-2">
                              Deadline
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-white">
                        {item?.installmentSetup?.installments.map(
                          (item: any, index: any) => (
                            <tr
                              key={item._id}
                              className="bg-white hover:bg-[#dddddd41] duration-200 transition-all"
                            >
                              <td className={trClassName}>{item?.name}</td>
                              <td className={trClassName}>{item?.amount}</td>
                              <td className={trClassName}>
                                {item?.duePayment}
                              </td>
                              <td className={trClassName}>
                                {new Date(
                                  parseInt(item.deadline)
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-1 right-1 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ViewModal
