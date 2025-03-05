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

const ViewModalBooking = ({
  item,
  onClose,
}: {
  item: any
  onClose: () => void
}) => {
  console.log(item, 'ViewModalBooking')
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
          className="relative w-[100vw] h-[80vh] md:w-[60vw] md:h-[80vh]"
        >
          <div className="relative w-full h-full bg-white rounded-lg overflow-auto p-5">
            <h1 className="text-xl font-semibold">
              {item?.projectId?.projectTitle}
            </h1>
            {/* Modal Content */}

            <div className="p-4  max-h-[70vh]">
              <p className="text-sm text-gray-500 mb-4">
                <strong>Agreement Date:</strong>{' '}
                {new Date(Number(item.agreementDate)).toLocaleDateString()}
              </p>
              <div className="divide-y divide-gray-200">
                {item?.agreementTemplates?.pages?.map(
                  (page: any, index: React.Key | null | undefined) => (
                    <div key={index} className="py-4">
                      <h3 className="text-lg font-medium mb-2">
                        {page.pageTitle}
                      </h3>
                      <h4 className="text-md font-semibold text-gray-700 mb-2">
                        {page.content.header}
                      </h4>
                      <p className="text-gray-700">{page.content.body}</p>
                    </div>
                  )
                )}
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

export default ViewModalBooking
