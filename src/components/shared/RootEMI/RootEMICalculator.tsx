/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { LoanPeriod } from '@/interface/emi'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegCircle } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'

type FormValues = {
  totalPrice: number
  downPayment: number
  loanPeriod: string
}

const RootEMICalculator = ({
  filteredFlat,
  clickedProjectId,
  totalAmount,
  dueAmount,
  installments,
  downPaymentInTk,
  setDownPaymentInTk,
  downPayment,
  setDownPayment,
  handleDownPaymentSliderChange,
  monthlyInstallmentsInAmount,
  pricePerSQFT,
  selectedFlat,
  selectedUnitId
}: any) => {
  const router = useRouter()
  const [isOpenLoan, setIsOpenLoan] = useState(false)
  const [filteredLoan, setFilteredLoan] = useState(LoanPeriod)
  const [selectLoan, setSelectLoan] = useState('')
  const [loanError, setLoanError] = useState('')

  // ** Handle Loan Search
  const handleLoanSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setFilteredLoan(
      LoanPeriod.filter((loan) => loan.loanPeriod.toLowerCase().includes(query))
    )
  }

  // ** Handle selection of a Loan period
  const handleLoanSelection = (loan: string) => {
    setSelectLoan(loan)
    setLoanError('') // Clear error on selection
    setValue('loanPeriod', loan)
    setIsOpenLoan(false) // Close the dropdown
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      totalPrice: totalAmount,
      downPayment: 20,
      loanPeriod: '',
    },
  })

  // ** Form submission
  const onSubmit = (data: FormValues) => {
    if (!selectLoan) {
      setLoanError('Loan period is required')
      return
    }

    console.log('Submitted Values:', {
      flatSize: selectedFlat,
      pricePerSft: pricePerSQFT,
      installments: installments,
      downPayment: downPayment,
      totalAmount: totalAmount,
      downPaymentInTk: downPaymentInTk,
      loanPeriod: selectLoan,
    })

    // Serialize the formData as query params
    if (clickedProjectId && selectedFlat && totalAmount) {
      const queryString = `projectId=${encodeURIComponent(
        clickedProjectId
      )}&unitId=${encodeURIComponent(
        selectedUnitId
      )}&projectTotalPrice=${encodeURIComponent(
        totalAmount
      )}&loanPeriod=${encodeURIComponent(selectLoan)}`
      router.push(`/all-bank?${queryString}`)
    } else {
      alert('Please fill all fields.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-screen mx-auto rounded-lg"
    >
      <div className="grid md:grid-cols-2 gap-4 my-4">
        {/* Total Property Price */}
        <div className="relative w-full py-1">
          <label
            htmlFor="totalPrice"
            className="block mb-2 text-sm font-medium"
          >
            Total Property Price
          </label>
          <input
            {...register('totalPrice', {
              required: 'Total Price is required',
            })}
            disabled
            type="number"
            autoComplete="off"
            className={`block w-full p-4 h-12 cursor-not-allowed text-sm rounded ${
              errors.totalPrice ? 'border-red-500' : ''
            }`}
            placeholder="Total Property Price"
            required
          />
          {errors.totalPrice && (
            <span className="text-red-500 text-sm">
              {errors.totalPrice.message}
            </span>
          )}
        </div>

        {/* Down Payment */}
        <div className="relative w-full py-1">
          <label
            htmlFor="downPayment"
            className="block mb-2 text-sm font-medium"
          >
            Down Payment
          </label>
          <div className="relative cursor-pointer w-full p-2 h-12 text-sm text-left ps-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {downPaymentInTk}
            <div
              className="px-8 py-3 bg-gray-300 rounded-r-md
                    absolute top-0 right-0 w-[20%] h-full text-nowrap flex justify-center items-center"
            >
              {downPayment} %
            </div>
          </div>
          <div className="relative w-40 -mt-4 ml-8">
            <span className="">
              <FaRegCircle className="text-[#063354] text-[12px] font-bold mt-[9px] bg-white" />
            </span>
            <div className="-mt-5 ml-2.5 relative w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={downPayment}
                onChange={handleDownPaymentSliderChange}
                className=" h-2 rounded-lg border-2 border-[#063354] appearance-none cursor-pointer dark:bg-gray-700 bg-[#063354]"
              />
            </div>
          </div>
        </div>

        {/* Loan Period */}
        <div className="relative w-full">
          <label
            htmlFor="loanPeriod"
            className="block mb-2 text-sm font-medium"
          >
            Loan Period
          </label>
          <div
            className="cursor-pointer flex items-center justify-between border rounded py-2 px-4 h-12"
            onClick={() => setIsOpenLoan((prevState) => !prevState)}
          >
            <div>{selectLoan || 'Select Loan Period'}</div>
            <div>
              <TiArrowSortedDown className="text-[#9A9CA3] font-bold" />
            </div>
          </div>
          {loanError && (
            <span className="text-red-500 text-sm">{loanError}</span>
          )}
          <div className="relative w-full z-50">
            {isOpenLoan && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full -left-8 mx-8 bg-white shadow-2xl rounded-md mt-2 max-h-auto overflow-auto p-6"
              >
                <h3 className="text-[#65635F] mb-2">Select a Loan Period</h3>
                <div className="relative mb-2">
                  <input
                    type="text"
                    autoComplete="off"
                    className="block w-full p-4 py-2 ps-4 text-sm text-[#063354] placeholder-[#063354] border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-0 focus:border-gray-300"
                    placeholder="Search here"
                    onChange={handleLoanSearch}
                  />
                </div>
                <div>
                  <ul>
                    {filteredLoan.map((loan) => (
                      <li
                        key={loan.id}
                        className="list-none py-2 ps-4 text-[#063354] hover:bg-[#fdf4df] hover:rounded duration-300 cursor-pointer hover:text-black"
                        onClick={() => handleLoanSelection(loan.loanPeriod)}
                      >
                        {loan.loanPeriod}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end">
        <button
          style={{
            background:
              'linear-gradient(90deg, rgba(243, 198, 93, 1) 0%, rgba(229, 159, 0, 1) 100%)',
          }}
          type="submit"
          className="bg-[#F3C65D] text-black font-medium p-4 rounded-md mt-4 cursor-pointer hover:shadow-md"
        >
          Apply For Loan
        </button>
      </div>
    </form>
  )
}

export default RootEMICalculator
