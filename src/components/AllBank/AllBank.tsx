'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import Container from '../shared/Container'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bank } from '@/constants/bank/bank.const'
import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
import { BankQuery } from '@/constants/bank/bankQuery'
import Loader from '../shared/Loder'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
const BankModal = dynamic(() => import('./BankModal'), { ssr: false })
const BankModalForm = dynamic(() => import('./BankModalForm'), { ssr: false })
import StandardBank from '@/assets/all-bank/standard-bank.png'

interface IBank {
  _id: string
  bankName: string
  logo: string
  maxLoanAmount: string
  interestRate: string
  period: string
  isDeleted: boolean
  isActive: boolean
}

const AllBank = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  // Get the query parameters using searchParams?.get('key')
  const projectId = searchParams?.get('projectId')
  const unitId = searchParams?.get('unitId')
  const projectTotalPrice = searchParams?.get('projectTotalPrice')
  const loanPeriod = searchParams?.get('loanPeriod')
  const loanAmount = searchParams?.get('loanAmount')

  useEffect(() => {
    // Redirect to home if projectId or unitId is missing
    if (!projectId || !unitId) {
      router.push('/')
    }
  }, [projectId, unitId, router])

  const { performQuery, loading, error, fetchedData } =
    useGraphQLFetchQuery<IBank[]>()

  useEffect(() => {
    const fetchBanks = async () => {
      if (loading) return // Prevent fetching if already in progress

      try {
        await performQuery('getAllBanks', BankQuery)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchBanks()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState<Bank>()

  const handleOpenModal = (bank: any) => {
    setSelectedBank(bank) // Set the clicked bank data
    setIsModalOpen(true)
  }

  const handleCloseModal = () => setIsModalOpen(false)

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Container>
        <section className="pt-36 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fetchedData?.map((bank) => {
              return (
                <div
                  key={bank._id}
                  className="border border-[#F8E7C0] p-6 bg-[#ffffff] rounded"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Image
                        //  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${bank?.logo}`}

                        src={
                          bank?.logo
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${bank.logo}`
                            : `${StandardBank}`
                        }
                        height={100}
                        width={100}
                        alt={`${bank?.logo}_image`}
                      />
                    </div>
                    <div>
                      <h3 className="text-[#E9AA1A] font-semibold font-[family-name:var(--font-poppins)]">
                        Special Offer
                      </h3>
                    </div>
                  </div>
                  <h1 className="text-xl font-bold text-black my-3 font-[family-name:var(--font-poppins)]">
                    {bank.bankName}
                  </h1>
                  <div className="flex items-center justify-center">
                    <div className="w-[50%] font-semibold font-[family-name:var(--font-poppins)] text-black">
                      <ul>
                        <li className="font-semibold">Max Loan Amount:</li>
                        <li>Interest Rate:</li>
                        <li>Period:</li>
                      </ul>
                    </div>
                    <div className="w-[50%] font-medium font-[family-name:var(--font-poppins)] text-gray-700">
                      <ul>
                        <li>{bank.maxLoanAmount}</li>
                        <li>{bank.interestRate}</li>
                        <li>{bank.period}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 my-4">
                    <button>
                      <Link
                        href={'#'}
                        className="underline font-[family-name:var(--font-poppins)]"
                      >
                        More Details
                      </Link>
                    </button>
                    <button
                      style={{
                        backgroundImage:
                          'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
                      }}
                      className="relative font-semibold text-center w-44 rounded-md h-[3rem] text-base"
                      onClick={() => handleOpenModal(bank)} // Open modal with bank data
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </Container>

      {isModalOpen && (
        <BankModal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedBank && (
            <div className="">
              <div className="mx-auto text-center">
                <h2 className="font-semibold text-xl font-[family-name:var(--font-poppins)]">
                  Apply For Loan
                </h2>
                <p className="font-[family-name:var(--font-poppins)]">
                  Just leave your details and our advisor will call you. We will
                  discuss possibilities and send a personal offer. You can
                  cancel your appointment any time please leave your details.
                </p>
              </div>
              <div className="mb-4">
                <Image
                  //  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedBank?.logo}`}
                  src={
                    selectedBank?.logo
                      ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedBank.logo}`
                      : `${StandardBank}`
                  }
                  height={100}
                  width={100}
                  alt={`${selectedBank?.bankName}_image`}
                />
              </div>
              <h1 className="text-xl font-bold text-black my-3 font-[family-name:var(--font-poppins)]">
                {selectedBank.bankName}
              </h1>
              <div className="flex items-center justify-around font-[family-name:var(--font-poppins)]">
                <div className="w-[50%] font-semibold font-poppins text-black">
                  <ul>
                    <li className="font-semibold">Max Loan Amount:</li>
                    <li>Interest Rate:</li>
                    <li>Period:</li>
                  </ul>
                </div>
                <div className="w-[50%] font-medium font-poppins text-gray-700">
                  <ul>
                    <li>{selectedBank.maxLoanAmount}</li>
                    <li>{selectedBank.interestRate}</li>
                    <li>{selectedBank.period}</li>
                  </ul>
                </div>
              </div>

              <BankModalForm
                loanPeriod={loanPeriod}
                projectTotalPrice={projectTotalPrice}
                projectId={projectId}
                unitId={unitId}
                selectedBank={selectedBank}
              />
            </div>
          )}
        </BankModal>
      )}
    </div>
  )
}

export default AllBank
