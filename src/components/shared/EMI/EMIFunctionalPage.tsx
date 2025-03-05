/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import emi_calculator_icon from '../../../assets/emi/emi_calculator.svg'
import property_bill_icon from '../../../assets/emi/property_bill.svg'
import Container from '../Container'
import EMICalculator from './EMICalculator'
import NeedAssistance from './NeedAssistance'
import PropertyCalculator from './PropertyCalculator'

//!====================================================================>>>

const EMIFunctionalPage = ({ unitDetails }: any) => {
  // ** HANDLING TABS
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabChange = (tab: any) => {
    setActiveTab(tab)
  }
  // for opening and closing the dropdown of flat size
  const [isOpenFlatSize, setIsOpenFlatSize] = useState(false)

  // ** Total Amount
  const [totalAmount, setTotalAmount] = useState<number>(0)
  // ** down payment in %
  const [downPayment, setDownPayment] = useState<number>(0)
  // ** down payment in Tk
  const [downPaymentInTk, setDownPaymentInTk] = useState<number>(0)
  // ** Installments
  const [installments, setInstallments] = useState<number>(0)
  // ** due amount
  const [dueAmount, setDueAmount] = useState<number>()
  // ** monthly installments in amount
  const [monthlyInstallmentsInAmount, setMonthlyInstallmentsInAmount] =
    useState<number>()
  //** Select Flat, Which flat SQFT is selected */
  const [selectFlat, setSelectedFlat] = useState('')
  // ** price per sqft
  const [pricePerSQFT, setPricePerSQFT] = useState<number>()

  // ** Handle Flat Selection
  const handleFlatSelection = (flatSize: string) => {
    // Extract numeric value from flatSize string and convert to number
    const numericFlatSize = Number(flatSize.replace(/\D/g, ''))
    setSelectedFlat(numericFlatSize as any)
    // setValue('flatSize', flatSize)
    setIsOpenFlatSize(false) // Close the dropdown

    // Find the selected flat in unitDetails
    const selectedFlatData = unitDetails.find(
      (unit: any) => unit.flatSize === flatSize
    )

    // If found, update pricePerSQFT based on the selected flat's pricePerSft
    if (selectedFlatData) {
      setPricePerSQFT(selectedFlatData.pricePerSft)
    }
  }

  // Calculate the due amount with discount logic
  useEffect(() => {
    let calculatedDueAmount = totalAmount - downPaymentInTk
    // Apply a discount if the user chooses 1-5 installments
    if (installments >= 1 && installments <= 5) {
      calculatedDueAmount -= 5000
    }
    setDueAmount(Math.max(calculatedDueAmount, 0)) // Ensures no negative dueAmount
  }, [totalAmount, downPaymentInTk, installments]) // totalAmount, downPaymentInTk, installments

  // Calculate down payment in Tk as a percentage of totalAmount
  useEffect(() => {
    if (totalAmount && downPayment) {
      const calculatedDownPaymentInTk = Math.round(
        (totalAmount * downPayment) / 100
      )
      setDownPaymentInTk(calculatedDownPaymentInTk)
    }
  }, [totalAmount, downPayment]) // totalAmount, downPayment

  // Calculate down payment percentage based on downPaymentInTk and totalAmount
  useEffect(() => {
    if (totalAmount && downPaymentInTk) {
      const calculatedDownPayment = Math.round(
        (downPaymentInTk / totalAmount) * 100
      )
      setDownPayment(calculatedDownPayment)
    }
  }, []) // totalAmount, downPaymentInTk

  useEffect(() => {
    if (dueAmount && installments > 0) {
      const monthlyPayment = dueAmount / installments
      setMonthlyInstallmentsInAmount(Math.round(monthlyPayment))
    } else {
      setMonthlyInstallmentsInAmount(0)
    }
  }, [dueAmount, installments]) // dueAmount, installments,

  // ** Handle Down payment slider change
  const handleDownPaymentSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const percentage = Number(e.target.value)
    setDownPayment(percentage)

    // Calculate the down payment in Tk as a percentage of totalAmount
    const calculatedDownPaymentInTk = (totalAmount! * percentage) / 100
    setDownPaymentInTk(calculatedDownPaymentInTk)
  }

  // ** Handle Installment Slider Chnage
  const handleInstallmentsSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstallments(Number(e.target.value))
    // setValue('installments', Number(e.target.value))
  }

  // console.log('totalAmount', totalAmount)
  // console.log('downPayment', downPayment)
  // console.log('downPaymentInTk', downPaymentInTk)
  // console.log('installments', installments)
  // console.log('dueAmount', dueAmount)
  // console.log('monthlyInstallmentsInAmount', monthlyInstallmentsInAmount)
  // console.log('selectFlat', selectFlat)

  return (
    <>
      <Container>
        <div className={'py-5'}>
          <div className=" mx-auto">
            <div className="md:grid grid-cols-6 gap-6">
              <div className="flex flex-col col-span-6">
                <div className="flex">
                  <div
                    className={`relative flex bg-white md:rounded-lg transition p-1 mb-4 md:border-none border-b-2 border-gray-300 rounded-none
             `}
                  >
                    {activeTab === 'tab1' && (
                      <div
                        style={{ bottom: '-2px' }}
                        className="absolute left-0 w-1/2 h-[2px] rounded bg-[#E59F00] shadow md:hidden"
                      />
                    )}
                    {activeTab === 'tab2' && (
                      <div
                        style={{ bottom: '-2px' }}
                        className="absolute right-0 w-1/2 h-[2px] rounded bg-[#E59F00] shadow md:hidden"
                      />
                    )}

                    <nav
                      className="flex gap-x-1 p-1 md:border md:border-gray-300 md:rounded-md rounded-none"
                      aria-label="Tabs"
                      role="tablist"
                      aria-orientation="horizontal"
                    >
                      <button
                        type="button"
                        className={`py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md focus:outline-none transition ${
                          activeTab === 'tab1'
                            ? 'md:bg-[#f8e7c0] bg-white font-semibold duration-500'
                            : 'bg-transparent text-gray-700 hover:text-gray-400 duration-300'
                        }`}
                        id="segment-item-1"
                        aria-selected={activeTab === 'tab1'}
                        role="tab"
                        onClick={() => handleTabChange('tab1')}
                      >
                        <Image
                          src={property_bill_icon.src}
                          alt="Property Bill Icon"
                          width={20}
                          height={20}
                        />
                        Property Calculator
                      </button>

                      <button
                        type="button"
                        className={`py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md focus:outline-none transition ${
                          activeTab === 'tab2'
                            ? 'md:bg-[#f8e7c0] bg-white font-semibold duration-500'
                            : 'bg-transparent text-gray-700 hover:text-gray-400 duration-300'
                        }`}
                        id="segment-item-2"
                        aria-selected={activeTab === 'tab2'}
                        role="tab"
                        onClick={() => handleTabChange('tab2')}
                      >
                        <Image
                          src={emi_calculator_icon.src}
                          alt="EMI Calculator Icon"
                          width={20}
                          height={20}
                        />
                        EMI Calculator
                      </button>
                    </nav>
                  </div>
                </div>

                {activeTab === 'tab1' && (
                  <>
                    <PropertyCalculator
                      unitDetails={unitDetails}
                      // amount
                      totalAmount={totalAmount}
                      setTotalAmount={setTotalAmount}
                      // down payment
                      downPayment={downPayment}
                      setDownPayment={setDownPayment}
                      // installmenst
                      installments={installments}
                      setInstallments={setInstallments}
                      // down payment in tk
                      downPaymentInTk={downPaymentInTk}
                      setDownPaymentInTk={setDownPaymentInTk}
                      // due amount
                      dueAmount={dueAmount}
                      setDueAmount={setDueAmount}
                      // monthly installments in amount
                      monthlyInstallmentsInAmount={monthlyInstallmentsInAmount}
                      setMonthlyInstallmentsInAmount={
                        setMonthlyInstallmentsInAmount
                      }
                      // selecting flat sqft
                      selectFlat={selectFlat}
                      setSelectedFlat={setSelectedFlat}
                      // slider change for down payment
                      handleDownPaymentSliderChange={
                        handleDownPaymentSliderChange
                      }
                      // price per sqft
                      pricePerSQFT={pricePerSQFT}
                      setPricePerSQFT={setPricePerSQFT}
                      // selection flat
                      handleFlatSelection={handleFlatSelection}
                      isOpenFlatSize={isOpenFlatSize}
                      setIsOpenFlatSize={setIsOpenFlatSize}
                      // installments slider
                      handleInstallmentsSliderChange={
                        handleInstallmentsSliderChange
                      }
                    />
                    <div className="hidden md:block">
                      <NeedAssistance />
                    </div>
                  </>
                )}
                {activeTab === 'tab2' && (
                  <>
                    <EMICalculator
                      // down payment in tk
                      downPaymentInTk={downPaymentInTk}
                      setDownPaymentInTk={setDownPaymentInTk}
                      // down payment
                      downPayment={downPayment}
                      setDownPayment={setDownPayment}
                      // total amount
                      totalAmount={totalAmount}
                      // due amount
                      dueAmount={dueAmount}
                      // installmenst
                      installments={installments}
                      monthlyInstallmentsInAmount={monthlyInstallmentsInAmount}
                      // slider change for down payment
                      handleDownPaymentSliderChange={
                        handleDownPaymentSliderChange
                      }
                      // price per sqft
                      selectFlat={selectFlat}
                      pricePerSQFT={pricePerSQFT}
                    />
                    <NeedAssistance />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default EMIFunctionalPage
