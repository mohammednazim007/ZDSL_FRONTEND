/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ResponsiveModal from '@/components/shared/responsive-modal/ResponsiveModal'
import { AnimatePresence, motion } from 'framer-motion'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { BsPrinter, BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineCloudDownload, MdOutlineRemoveRedEye } from 'react-icons/md'
import dynamic from 'next/dynamic'
import ViewModal from './ViewModal'

const DownloadModal = dynamic(() => import('./DownloadModal'), { ssr: false })

const ThreeDotIcon = ({ item }: { item: any }) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openDownloadModal, setOpenDownloadModal] = useState(false)

  const printRef = useRef<HTMLDivElement | null>(null)
  const onCloseModal = () => {
    setOpenViewModal(false)
    setOpenDownloadModal(false)
  }
  const handlePrint = (id: string) => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(
          '<html><head><title>Print</title></head><body>'
        )
        printWindow.document.write(printRef.current.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const trClassName =
    'px-4 py-1.5 text-sm max-w-[150px] truncate border-y border-[#dbdbdb62] cursor-pointer capitalize'
  const thClassName =
    'font-medium text-gray-700 px-4 py-4 text-sm max-w-[150px] truncate border-y border-[#dbdbdb62] cursor-pointer'
  if (!item) {
    console.error('Item is undefined')
    return <div>Error: Item not provided</div>
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        <button
          className="p-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          onClick={() => setOpenOptions((prev) => !prev)}
        >
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>
        <AnimatePresence>
          {openOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bg-white shadow-lg rounded-lg border p-2 z-50 right-4"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <button
                  onClick={() => setOpenViewModal(true)}
                  className="w-full rounded-md flex justify-start items-center gap-3 hover:bg-[#F8E7C0] duration-300 p-3"
                >
                  <MdOutlineRemoveRedEye className="size-5" />
                  <p className="text-sm">View</p>
                </button>
                <button
                  onClick={() => setOpenDownloadModal(true)}
                  className="w-full rounded-md flex justify-start items-center gap-3 hover:bg-[#F8E7C0] duration-300 p-3"
                >
                  <MdOutlineCloudDownload className="size-5" />
                  <p className="text-sm">Download</p>
                </button>
                <button
                  onClick={() => handlePrint(item?._id)}
                  className="w-full rounded-md flex justify-start items-center gap-3 hover:bg-[#F8E7C0] duration-300 p-3"
                >
                  <BsPrinter className="size-5" />
                  <p className="text-sm">Print</p>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ViewModal */}
        <ResponsiveModal open={openViewModal} onClose={onCloseModal}>
          <ViewModal item={item} onClose={onCloseModal}></ViewModal>
        </ResponsiveModal>

        {/* PDFViewer */}
        <ResponsiveModal open={openDownloadModal} onClose={onCloseModal}>
          {item ? (
            <DownloadModal item={item}></DownloadModal>
          ) : (
            <p>Loading item...</p>
          )}
        </ResponsiveModal>

        {/* printRef */}
        <div ref={printRef} style={{ display: 'none' }}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="relative w-full h-full bg-white rounded-lg overflow-auto p-5">
            <h1 className="text-lg ">{item?.projectId?.projectTitle}</h1>
            <div className="flex flex-col mx-auto max-w-6xl mt-6">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg">
                    <table
                      className="w-full min-w-max table-auto rounded-md text-left border-separate relative"
                      style={{ borderSpacing: '0 10px' }}
                    >
                      <thead>
                        <tr className="bg-white border ">
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
                          (item: any) => (
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
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default ThreeDotIcon
