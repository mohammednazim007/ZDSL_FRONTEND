/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ResponsiveModal from '@/components/shared/responsive-modal/ResponsiveModal'
import { AnimatePresence, motion } from 'framer-motion'
import React, { Suspense, useRef, useState } from 'react'
import { BsPrinter, BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineCloudDownload, MdOutlineRemoveRedEye } from 'react-icons/md'
import ViewModalBooking from './ViewModalBooking'
import dynamic from 'next/dynamic'
// import DownloadModalBooking from './DownloadModalBooking'
const DownloadModalBooking = dynamic(() => import('./DownloadModalBooking'), {
  ssr: false,
})
const ThreeDotIconBooking = ({ item }: { item: any }) => {
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
  //   if (!item) {
  //     console.error('Item is undefined')
  //     return <div>Error: Item not provided</div>
  //   }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <button
          className="p-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          onClick={() => setOpenOptions((prev) => !prev)}
        >
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>
        <AnimatePresence>
          {openOptions && (
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                // w-[175px] absolute right-0  top-full bg-red-700 shadow-lg rounded-lg border px-5 py-3 z-50
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
            </div>
          )}
        </AnimatePresence>
        {/* ViewModal */}
        <ResponsiveModal open={openViewModal} onClose={onCloseModal}>
          <ViewModalBooking
            item={item}
            onClose={onCloseModal}
          ></ViewModalBooking>
        </ResponsiveModal>

        {/* PDFViewer */}
        <ResponsiveModal open={openDownloadModal} onClose={onCloseModal}>
          <DownloadModalBooking item={item}></DownloadModalBooking>
        </ResponsiveModal>

        {/* printRef */}
        <div ref={printRef} style={{ display: 'none' }}>
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
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default ThreeDotIconBooking
