/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { LoanPeriod } from '@/interface/emi'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegCircle } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'

type FormValues = {
  totalPrice: number
  downPayment: number
  loanPeriod: string
  interestRate: number
  downPaymentInTk: number
}

//!==============================================================================================>>>

const EMICalculator = ({
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
  selectFlat
}: any) => {
  //**HANDLE FLAT SIZE STATES */
  const [isOpenLoan, setIsOpenLoan] = useState(false)
  const [filteredLoan, setFilteredLoan] = useState(LoanPeriod)
  const [selectLoan, setSelectLoan] = useState('')

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
    setValue('loanPeriod', loan)
    setIsOpenLoan(false) // Close the dropdown
  }

  // ** FUNCTION For Getting Clicked value
  const handleSelection = (data: any) => {
    if (data === 'loan') setIsOpenLoan((prevState) => !prevState)
  }


  //** SUBMIT THE DATA */
    // ** SUBMIT THE DATA
    const onSubmit = async (data: FormValues) => {
      console.log('Submitted Values:', {
        flatSize: selectFlat,
        pricePerSft: pricePerSQFT,
        installments: installments,
        downPayment: downPayment,
        totalAmount: totalAmount,
        downPaymentInTk: downPaymentInTk,
        loanPeriod: selectLoan
      })
    }
  

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      totalPrice: totalAmount,
      downPayment: 20,
      loanPeriod: '',
      // interestRate: 10,
    },
    mode: 'onSubmit', // This ensures validation happens on form submit
    reValidateMode: 'onChange',
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-screen mx-auto rounded-lg "
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
              className={`block w-full p-4 h-12 cursor-not-allowed text-sm rounded ${errors.totalPrice ? 'border-red-500' : ''}`}
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
            {errors.downPayment && (
              <span className="text-red-500 text-sm">
                {errors.downPayment.message}
              </span>
            )}
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
              onClick={() => handleSelection('loan')}
            >
              <div>{selectLoan}</div>
              <div>
                <TiArrowSortedDown className="text-[#9A9CA3] font-bold" />
              </div>
            </div>
            {errors.loanPeriod && (
              <span className="text-red-500 text-sm">
                {errors.loanPeriod.message}
              </span>
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
                      required
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
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

          {/* Interest Rate (%) */}
          {/* <div className="relative w-full">
            <label
              htmlFor="interestRate"
              className="block mb-2 text-sm font-medium"
            >
              Interest Rate (%)
            </label>
            <div className="cursor-pointer w-full p-2 h-12 text-sm text-left ps-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {interestRate}
            </div>
            <div className="relative w-40 -mt-4 ml-8">
              <span className="">
                <FaRegCircle className="text-[#063354] text-[12px] font-bold mt-[9px] bg-white" />
              </span>
              <div className="-mt-5 ml-2.5">
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  value={interestRate}
                  onChange={handleInterestRateSliderChange}
                  className=" h-2 rounded-lg border-2 border-[#063354] appearance-none cursor-pointer dark:bg-gray-700 bg-[#063354]"
                />
              </div>
            </div>
            {errors.interestRate && (
              <span className="text-red-500 text-sm">
                {errors.interestRate.message}
              </span>
            )}
          </div> */}
        </div>

        <div className="flex flex-col col-span-4 mt-8">
          <div className="bg-[#ecf4f4] px-4 py-6 border-2 rounded border-[#0085857A]">
            <div className="md:flex items-center justify-between gap-4">
              <div className="ps-6 border-gray-300 md:text-start text-center mb-4">
                <p>Total Price (BDT)</p>
                <h1 className="font-bold text-3xl">{isNaN(totalAmount) ? 0 : totalAmount}</h1>
              </div>

              <div className="hidden md:block h-20 border-l-4 border-[#7CBFBF] text-3xl rounded"></div>

              <div className="pe-4 md:text-start text-center">
                <h3>
                  Total Due:{' '}
                  <span className="font-semibold text-md">{isNaN(dueAmount) ? 0 : dueAmount}</span> BDT
                </h3>
                <p>Monthly Installment (BDT)</p>
                <h1 className="font-bold text-xl">{isNaN(monthlyInstallmentsInAmount) ? 0 : monthlyInstallmentsInAmount}</h1>
              </div>
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
    </>
  )
}

export default EMICalculator
