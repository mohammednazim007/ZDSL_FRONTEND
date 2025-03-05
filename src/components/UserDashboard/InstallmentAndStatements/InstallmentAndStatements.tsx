/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'
import ThreeDotIcon from './ThreeDotIcon'
import Loader from '@/components/shared/Loder'
import { motion } from 'framer-motion'
import { TiArrowSortedDown } from 'react-icons/ti'

const GET_INSTALLMENTS_QUERY = gql`
  query GetAllInstallmentFromUser($project: ID) {
    getAllInstallmentFromUser(project: $project) {
      success
      message
      data {
        _id
        projectId {
          projectTitle
          _id
        }
        installmentSetup {
          installments {
            _id
            name
            amount
            deadline
            isPaid
            duePayment
          }
        }
        projectId {
          projectTitle
        }
      }

      meta {
        page
        limit
        total
        totalPage
      }
      totalPayableAmount
      totalPaidAmount
      totalDuePayment
      totalInstallmentPaid
      totalInstallmentDue
      nextInstallment {
        _id
        name
        amount
        deadline
        isPaid
        duePayment
      }
      missingExactTime {
        _id
        name
        amount
        deadline
        isPaid
        duePayment
      }
    }
  }
`

const InstallmentAndStatements = () => {
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const {
    data: installmentData,
    loading: installmentLoading,
    error: installmentError,
  } = useQuery(GET_INSTALLMENTS_QUERY, {})
  const [selectedProjectId, setSelectedProjectid] = useState<string>(
    installmentData?.getAllInstallmentFromUser?.data[0].projectId._id
  )

  const { data, loading, error } = useQuery(GET_INSTALLMENTS_QUERY, {
    skip: !selectedProjectId, // Skip the query if selectedProject is not set
    variables: { project: selectedProjectId },
  })
  console.log({ data })
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e?.target?.value)
  }

  function handleSelectProject(projectId: string, name: string) {
    setSelectedProject(name)
    setSelectedProjectid(projectId)
  }

  console.log('selectedProject', selectedProjectId)

  const handleSelectedProject = (value: string) => {
    if (!value) return // Prevent query if no valid project is selected
    setSelectedProject(value)
  }

  function toggleDropdown(): void {
    setOpenDropdown((prev) => !prev)
  }
  // if (!data || !data.projectQueryRes) return <p>No data found 123</p> // this is not fair
  //

  // console.log('installment data', data)

  console.log('data?.getAllInstallmentFromUser?.data?.', installmentData)
  function handleInputClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    // Prevent the dropdown from closing when clicking on the input
    e.stopPropagation()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="px-3 lg:px-0 space-y-5 lg:space-y-8 font-poppins">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <h1 className="text-xl font-medium">Installment & Statement</h1>
        <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[40%] text-base text-black flex justify-end items-center gap-3">
          <p className="text-nowrap">Select project</p>
          <div className="flex-grow relative">
            {/* <SelectProject getSelected={handleSelectedProject} /> */}
            {/* ________________________________________________________________ */}

            <div className="w-full flex justify-end items-center gap-3">
              <button className="flex-grow relative" onClick={toggleDropdown}>
                <div className="flex justify-between items-center px-2 h-[2.5rem] border rounded-md cursor-pointer">
                  <div className="w-full text-nowrap overflow-hidden">
                    {selectedProject || 'Select a project here'}
                  </div>
                  <div>
                    <TiArrowSortedDown className="text-[#9A9CA3] font-bold" />
                  </div>
                </div>
                <div className="relative w-full z-[9999]">
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-full bg-white shadow-2xl rounded-md mt-2 max-h-auto overflow-auto p-6"
                    >
                      <h3 className="text-black mb-2 font-osw tracking-wide">
                        Select a project
                      </h3>

                      <div className="relative mb-2">
                        <input
                          type="text"
                          placeholder="Search here"
                          className="block w-full p-4 py-2 ps-4 text-sm text-[#063354] placeholder-[#063354] border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-0 focus:border-gray-300"
                          value={searchTerm}
                          onChange={handleSearch}
                          onClick={handleInputClick}
                        />
                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <ul className="max-h-[30vh] overflow-x-hidden overflow-y-auto">
                          {installmentData?.getAllInstallmentFromUser?.data &&
                          installmentData?.getAllInstallmentFromUser?.data
                            .length > 0 ? (
                            installmentData?.getAllInstallmentFromUser?.data?.map(
                              (installment: any) => (
                                <li
                                  key={installment?._id}
                                  className="list-none py-2 ps-4 text-[#063354] hover:bg-[#fdf4df] hover:rounded duration-300 cursor-pointer hover:text-black"
                                  onClick={() =>
                                    handleSelectProject(
                                      installment?.projectId._id,
                                      installment?.projectId?.projectTitle
                                    )
                                  }
                                >
                                  <p className="line-clamp-2">
                                    {installment?.projectId?.projectTitle}
                                  </p>
                                </li>
                              )
                            )
                          ) : (
                            <div className="flex justify-center items-center">
                              <h3 className="text-base font-semibold">
                                No Projects Found
                              </h3>
                            </div>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </button>
            </div>

            {/* ____________--------------------------------------------------------- */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <div className="bg-white border border-[#D9DFE3] rounded-md px-[30px] py-[38px]">
          <p className="text-base text-left text-nowrap">
            Total Payable Amount:{' '}
            <span className="font-bold">
              {installmentData?.getAllInstallmentFromUser?.totalPayableAmount ||
                0}
            </span>
          </p>
          <p className="text-base text-left text-nowrap">
            Total Paid:{' '}
            <span className="font-bold text-[#008585]">
              {installmentData?.getAllInstallmentFromUser?.totalPaidAmount || 0}
            </span>
          </p>
        </div>
        <div className="bg-white border border-[#D9DFE3] rounded-md px-[30px] py-[38px]">
          <p className="text-base text-left text-nowrap">
            Total Payable Due:{' '}
            <span className="font-bold">
              {installmentData?.getAllInstallmentFromUser?.totalDuePayment || 0}
            </span>
          </p>
          <p className="text-base text-left text-nowrap">
            Deadline:{' '}
            <span className="font-bold text-[#FF7A85]">
              {new Date(
                installmentData?.getAllInstallmentFromUser?.nextInstallment.deadline
              ).toLocaleString() || '--/--/--'}
            </span>
          </p>
        </div>
        <div className="bg-white border border-[#D9DFE3] rounded-md px-[30px] py-[38px]">
          <p className="text-base text-left text-nowrap">
            Next Installment:{' '}
            <span className="font-bold">
              {installmentData?.getAllInstallmentFromUser?.nextInstallment
                ?.amount || 0}
            </span>
          </p>
          <p className="text-base text-left text-nowrap">
            Deadline:{' '}
            <span className="font-bold text-[#FF7A85]">
              {new Date(
                installmentData?.getAllInstallmentFromUser?.nextInstallment?.deadline
              ).toLocaleString() || '--/--/--'}
            </span>
          </p>
        </div>
      </div>

      <div className="w-full space-y-5 z-50">
        <p className="font-bold mt-2">Installment Details</p>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="w-full flex justify-start items-center flex-wrap gap-5 md:gap-10">
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#008585] size-3 rounded-full"></div>
              <p className="text-base text-nowrap">Installment Paid:</p>
              <p className="text-base font-bold">
                {data?.getAllInstallmentFromUser?.totalDuePayment
                  ?.totalInstallmentPaid || 0}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#FF7A85] size-3 rounded-full"></div>
              <p className="text-base text-nowrap">Installment Due:</p>
              <p className="text-base font-bold">
                {data?.getAllInstallmentFromUser?.totalDuePayment
                  ?.totalInstallmentDue || 0}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#F3C65D] size-3 rounded-full"></div>
              <p className="text-base text-nowrap">Installment Type:</p>
              <p className="text-base font-bold text-[#008585]">Monthly</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#063354] size-3 rounded-full"></div>
              <p className="text-base text-nowrap">Number of Installment:</p>
              <p className="text-base font-bold">
                {data?.getAllInstallmentFromUser?.data?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-auto w-full">
          <div className="align-middle overflow-x-auto w-full">
            <section className="w-full min-w-[700px] lg:min-w-[700px] relative overflow-x-auto scrollbar-hide rounded-lg text-sm h-svh">
              {/* Header Row */}
              <div className="w-full grid grid-cols-12 bg-white border rounded text-sm text-black p-5">
                <div className="col-span-1 font-bold">#MR No</div>
                <div className="col-span-5 text-[#008585]">Project Name</div>
                <div className="col-span-2 text-[#008585]">Date</div>
                <div className="col-span-1 text-[#008585]">Amount</div>
                <div className="col-span-2 text-[#008585]">Status</div>
                <div className="col-span-1 text-[#008585] text-right">
                  Options
                </div>
              </div>

              {/* Data Rows */}
              {data?.getAllInstallmentFromUser?.data?.map(
                (item: any, idx: number) => {
                  return (
                    <div
                      key={item._id}
                      className="w-full grid grid-cols-12 bg-white border rounded py-2 px-5 hover:bg-[#dddddd41] transition duration-200 mt-3 items-center"
                    >
                      <div className="col-span-1 font-bold text-black flex items-center">
                        # {idx + 1}
                      </div>
                      <div className="col-span-5 flex items-center capitalize">
                        {item?.installmentSetup?.installments?.[0]?.name ||
                          'No name available'}
                      </div>
                      <div className="col-span-2 flex items-center">
                        {item?.installmentSetup?.installments[0]?.deadline ||
                          'No Dealine available'}
                      </div>
                      <div className="col-span-1 font-bold text-black flex items-center">
                        {item?.installmentSetup?.installments[0]?.amount ||
                          'No AMount available'}
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="bg-[#10B26530] text-[#10B265] rounded-full px-4 py-1 text-center">
                          {item?.installmentSetup?.installments[0]?.isPaid
                            ? 'Paid'
                            : 'Due'}
                        </span>
                      </div>
                      <div className="col-span-1 text-right relative">
                        {item ? <ThreeDotIcon item={item} /> : ''}
                      </div>
                    </div>
                  )
                }
              )}
            </section>
          </div>
        </div>
      </div>
      <div className="flex justify-end -z-30 items-center">
        <button className="px-5 py-3 bg-gradient-to-b from-[#F3C65D] to-[#E59F00] text-black font-bold text-center text-sm rounded-md">
          All Installments
        </button>
      </div>
    </div>
  )
}

export default InstallmentAndStatements
