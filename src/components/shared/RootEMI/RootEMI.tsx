// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import emi_calculator_icon from '../../../assets/emi/emi_calculator.svg'
// import property_bill_icon from '../../../assets/emi/property_bill.svg'
// import Container from '../Container'

// import { getCookie } from '@/libs/tokenUtils'
// import { getUnitShortDetailsQuery } from '@/constants/Projects/ProjectData'
// import NeedAssistance from '../EMI/NeedAssistance'
// import RootPropertyCalculator from './RootPropertyCalculator'
// import RootEMICalculator from './RootEMICalculator'
// import { useGetAllProjectsForFilterQuery } from '@/services/user/project.service'
// import Loader from '../Loder'


// interface UnitDetail {
//   id: string
//   flatSize: string
//   pricePerSft: number
// }

// interface UnitDetailsResponse {
//   data: UnitDetail[]
//   message: string
// }

// const RootEMI = () => {
//   // ** HANDLING TABS
//   const [activeTab, setActiveTab] = useState('tab1')

//   const handleTabChange = (tab: any) => {
//     setActiveTab(tab)
//   }

//   // ** Total Amount
//   const [totalAmount, setTotalAmount] = useState<number>(0)
//   // ** down payment in %
//   const [downPayment, setDownPayment] = useState<number>(0)
//   // ** down payment in Tk
//   const [downPaymentInTk, setDownPaymentInTk] = useState<number>(0)
//   // ** Installments
//   const [installments, setInstallments] = useState<number>(0)
//   // ** due amount
//   const [dueAmount, setDueAmount] = useState<number>()
//   // ** monthly installments in amount
//   const [monthlyInstallmentsInAmount, setMonthlyInstallmentsInAmount] =
//     useState<number>()
//   //** Select Flat, Which flat SQFT is selected */
//   const [selectedFlat, setSelectedFlat] = useState('')
//   const [selectedUnitId, setSelectedUnitId] = useState('')
//   // ** price per sqft
//   const [pricePerSQFT, setPricePerSQFT] = useState<number>()
//   // ** selected project
//   const [selectedProject, setSelectedProject] = useState('')
//   // ** Unit API
//   const [unitDetails, setUnitDetails] = useState<UnitDetailsResponse | null>(
//     null
//   )
//   const [filteredFlat, setFilteredFlat] = useState<UnitDetail[]>([])

//   // state to hold clicked projectId
//   const [clickedProjectId, setClickedProjectId] = useState<string>('')
//   // State to hold the search query
//   const [query, setQuery] = useState('')
//   // Fetching data from the API using the hook
//   const { data, error, isLoading, isError } = useGetAllProjectsForFilterQuery({
//     limit: 1000,
//     search: query,
//   })

//   // // ** API FOR Unit Details
//   useEffect(() => {
//     const accessToken = getCookie('zdsl_accessToken')

//     const headers: Record<string, any> = {
//       'Content-Type': 'application/json',
//     }

//     if (accessToken) headers['Authorization'] = accessToken
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify({
//         query: getUnitShortDetailsQuery,
//         variables: {
//           projectId: clickedProjectId,
//         },
//       }),
//     })
//       .then((response) => response.json())
//       .then(( data ) => {
//         // console.log('unit details', data?.data?.getAllUnitDetailsByProject?.data);
//         setUnitDetails(data?.data?.getAllUnitDetailsByProject?.data)
//       })
//   }, [clickedProjectId])


//   // console.log('clickedProjectId', clickedProjectId);

//   console.log('unitDetails', unitDetails);



//   // Calculate the due amount with discount logic
//   useEffect(() => {
//     let calculatedDueAmount = totalAmount - downPaymentInTk
//     // Apply a discount if the user chooses 1-5 installments
//     if (installments >= 1 && installments <= 5) {
//       calculatedDueAmount -= 5000
//     }
//     setDueAmount(Math.max(calculatedDueAmount, 0)) // Ensures no negative dueAmount
//   }, [totalAmount, downPaymentInTk, installments])

//   // Calculate down payment in Tk as a percentage of totalAmount
//   useEffect(() => {
//     if (totalAmount && downPayment) {
//       const calculatedDownPaymentInTk = Math.round(
//         (totalAmount * downPayment) / 100
//       )
//       setDownPaymentInTk(calculatedDownPaymentInTk)
//     }
//   }, [totalAmount, downPayment])

//   // Calculate down payment percentage based on downPaymentInTk and totalAmount
//   useEffect(() => {
//     if (totalAmount && downPaymentInTk) {
//       const calculatedDownPayment = Math.round(
//         (downPaymentInTk / totalAmount) * 100
//       )
//       setDownPayment(calculatedDownPayment)
//     }
//   }, [totalAmount, downPaymentInTk])

//   // Calculate the monthly installment amount
//   useEffect(() => {
//     if (dueAmount && installments > 0) {
//       const monthlyPayment = dueAmount / installments
//       setMonthlyInstallmentsInAmount(Math.round(monthlyPayment))
//     } else {
//       setMonthlyInstallmentsInAmount(0)
//     }
//   }, [dueAmount, installments])

//   // ** Handle Down payment slider change
//   const handleDownPaymentSliderChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const percentage = Number(e.target.value)
//     setDownPayment(percentage)
//     // Calculate the down payment in Tk as a percentage of totalAmount
//     const calculatedDownPaymentInTk = (totalAmount! * percentage) / 100
//     setDownPaymentInTk(calculatedDownPaymentInTk)
//   }

//   // ** Handle Installment Slider Chnage
//   const handleInstallmentsSliderChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setInstallments(Number(e.target.value))
//     // setValue('installments', Number(e.target.value))
//   }

//   // ** HANDLE PROJECTS STATES
//   const [isOpenProjects, setIsOpenProjects] = useState(false)
//   // ** Handle project Search
//   const handleProjectSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value.toLowerCase()
//     setQuery(query)
//   }

//   // ** Handle selection of a project
//   const handleProjectSelection = (_id: string, projectName: string) => {
//     // console.log('project selected', _id, projectName);
//     setSelectedProject(projectName)
//     setClickedProjectId(_id)
//     setIsOpenProjects(false) // Close the dropdown
//   }

//   // **HANDLE FLAT SIZE STATES **
//   const [isOpenFlatSize, setIsOpenFlatSize] = useState(false)

//   // const handleFlatSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const query = event.target.value.toLowerCase()
//   //   console.log('query', query, unitDetails);

//   //   if (unitDetails) {
//   //     if (query) {
//   //       // Filter based on the query
//   //       const filteredArray = unitDetails?.filter((unit: any) =>
//   //         unit.flatSize?.toLowerCase().includes(query)
//   //       )
//   //       console.log('filteredArray', filteredArray);
//   //       setFilteredFlat(filteredArray) // Set filtered results
//   //     } else {
//   //       // Reset to full list if the query is empty
//   //       setFilteredFlat(unitDetails)
//   //     }
//   //   }
//   // }

//   // useEffect(() => {
//   //   console.log('unitDetails 203', unitDetails);
//   //   // Check if unitDetails has data to set the initial list
//   //   if (unitDetails) {
//   //     if (unitDetails?.data?.length > 0) {
//   //       setFilteredFlat(unitDetails.data)
//   //     }
//   //   }
//   // }, [unitDetails])

//   // const handleFlatSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const query = event.target.value.toLowerCase().trim(); // Trim spaces and convert to lowercase
//   //   console.log('query:', query, unitDetails);
  
//   //   if (unitDetails) {
//   //     if (query) {
//   //       // Filter based on the query
//   //       const filteredArray = unitDetails.filter((unit: any) => {
//   //         return (
//   //           unit.flatSize?.toLowerCase().includes(query) || // Match flatSize
//   //           unit.unitName?.toLowerCase().includes(query) || // Match unitName
//   //           unit.floorNo?.toString().toLowerCase().includes(query) || // Match floorNo (if it's numeric, convert to string)
//   //           unit.unitPrefix?.toLowerCase().includes(query) || // Match unitPrefix
//   //           unit.unitSuffix?.toLowerCase().includes(query) || // Match unitSuffix
//   //           unit.pricePerSft?.toString().toLowerCase().includes(query) // Match pricePerSft
//   //         );
//   //       });
//   //       console.log('filteredArray:', filteredArray);
//   //       setFilteredFlat(filteredArray); // Set filtered results
//   //     } else {
//   //       // Reset to full list if the query is empty
//   //       setFilteredFlat(unitDetails);
//   //     }
//   //   }
//   // };
  
//   // useEffect(() => {
//   //   console.log('unitDetails:', unitDetails);
//   //   // Initialize the filtered list with the full data if available
//   //   if (unitDetails) {
//   //     setFilteredFlat(unitDetails);
//   //   }
//   // }, [unitDetails]);
  

//   // Handle selection of a flat and update pricePerSQFT
//   const handleFlatSelection = (flatSize: string, unitId: string) => {
//     const selectedFlat = unitDetails?.data.find(
//       (unit: any) => unit.flatSize === flatSize
//     )
//     console.log('selectedFlat', selectedFlat);
//     if (selectedFlat) {
//       setSelectedFlat(flatSize)
//       setSelectedUnitId(unitId)
//       setPricePerSQFT(selectedFlat.pricePerSft)

//       // Extract number from flatSize string (e.g., "5800 sft" -> 5800)
//       const flatSizeNumber = parseFloat(flatSize)
//       const calculatedTotalAmount = flatSizeNumber * selectedFlat.pricePerSft
//       setTotalAmount(calculatedTotalAmount)
//       setIsOpenFlatSize(false)
//     }
//   }

//   if (isLoading) {
//     return <Loader />
//   }

//   return (
//     <>
//       <Container>
//         <div className={`py-28`}>
//           <div className=" mx-auto md:w-[800px]">
//             <div className="md:grid grid-cols-6 gap-6">
//               <div className="flex flex-col col-span-6">
//                 <div className="flex">
//                   <div
//                     className={`relative flex bg-white md:rounded-lg transition p-1 mb-4 md:border-none border-b-2 border-gray-300 rounded-none
//              `}
//                   >
//                     {activeTab === 'tab1' && (
//                       <div
//                         style={{ bottom: '-2px' }}
//                         className="absolute left-0 w-1/2 h-[2px] rounded bg-[#E59F00] shadow md:hidden"
//                       />
//                     )}
//                     {activeTab === 'tab2' && (
//                       <div
//                         style={{ bottom: '-2px' }}
//                         className="absolute right-0 w-1/2 h-[2px] rounded bg-[#E59F00] shadow md:hidden"
//                       />
//                     )}

//                     <nav
//                       className="flex gap-x-1 p-1 md:border md:border-gray-300 md:rounded-md rounded-none"
//                       aria-label="Tabs"
//                       role="tablist"
//                       aria-orientation="horizontal"
//                     >
//                       <button
//                         type="button"
//                         className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md focus:outline-none transition ${
//                           activeTab === 'tab1'
//                             ? 'md:bg-[#f8e7c0] bg-white font-semibold duration-500'
//                             : 'bg-transparent text-gray-700 hover:text-gray-400 duration-300'
//                         }`}
//                         id="segment-item-1"
//                         aria-selected={activeTab === 'tab1'}
//                         role="tab"
//                         onClick={() => handleTabChange('tab1')}
//                       >
//                         <Image
//                           src={property_bill_icon.src}
//                           alt="Property Bill Icon"
//                           width={20}
//                           height={20}
//                         />
//                         Property Calculator
//                       </button>

//                       <button
//                         type="button"
//                         className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md focus:outline-none transition ${
//                           activeTab === 'tab2'
//                             ? 'md:bg-[#f8e7c0] bg-white font-semibold duration-500'
//                             : 'bg-transparent text-gray-700 hover:text-gray-400 duration-300'
//                         }`}
//                         id="segment-item-2"
//                         aria-selected={activeTab === 'tab2'}
//                         role="tab"
//                         onClick={() => handleTabChange('tab2')}
//                       >
//                         <Image
//                           src={emi_calculator_icon.src}
//                           alt="EMI Calculator Icon"
//                           width={20}
//                           height={20}
//                         />
//                         EMI Calculator
//                       </button>
//                     </nav>
//                   </div>
//                 </div>

//                 {activeTab === 'tab1' && (
//                   <>
//                     <RootPropertyCalculator
//                       // projects
//                       isOpenProjects={isOpenProjects}
//                       setIsOpenProjects={setIsOpenProjects}
//                       handleProjectSelection={handleProjectSelection}
//                       handleProjectSearch={handleProjectSearch}
//                       selectedProject={selectedProject}
//                       setSelectedProject={setSelectedProject}
//                       projects={data?.data?.getProjects?.projects}
//                       unitDetails={unitDetails}
//                       // flats
//                       handleFlatSearch={handleFlatSearch}
//                       isOpenFlatSize={isOpenFlatSize}
//                       setIsOpenFlatSize={setIsOpenFlatSize}
//                       filteredFlat={filteredFlat}
//                       setFilteredFlat={setFilteredFlat}
//                       handleFlatSelection={handleFlatSelection}
//                       // amount
//                       totalAmount={totalAmount}
//                       setTotalAmount={setTotalAmount}
//                       // down payment
//                       downPayment={downPayment}
//                       setDownPayment={setDownPayment}
//                       // installmenst
//                       installments={installments}
//                       setInstallments={setInstallments}
//                       // down payment in tk
//                       downPaymentInTk={downPaymentInTk}
//                       setDownPaymentInTk={setDownPaymentInTk}
//                       // due amount
//                       dueAmount={dueAmount}
//                       setDueAmount={setDueAmount}
//                       // monthly installments in amount
//                       monthlyInstallmentsInAmount={monthlyInstallmentsInAmount}
//                       setMonthlyInstallmentsInAmount={
//                         setMonthlyInstallmentsInAmount
//                       }
//                       // selecting flat sqft
//                       selectedFlat={selectedFlat}
//                       setSelectedFlat={setSelectedFlat}
//                       // slider change for down payment
//                       handleDownPaymentSliderChange={
//                         handleDownPaymentSliderChange
//                       }
//                       // price per sqft
//                       pricePerSQFT={pricePerSQFT}
//                       setPricePerSQFT={setPricePerSQFT}
//                       handleInstallmentsSliderChange={
//                         handleInstallmentsSliderChange
//                       }
//                     />
//                     <div className="hidden md:block">
//                       <NeedAssistance />
//                     </div>
//                   </>
//                 )}
//                 {activeTab === 'tab2' && (
//                   <>
//                     <RootEMICalculator
//                       clickedProjectId={clickedProjectId}
//                       // down payment in tk
//                       downPaymentInTk={downPaymentInTk}
//                       setDownPaymentInTk={setDownPaymentInTk}
//                       // down payment
//                       downPayment={downPayment}
//                       setDownPayment={setDownPayment}
//                       // total amount
//                       totalAmount={totalAmount}
//                       // due amount
//                       dueAmount={dueAmount}
//                       // installmenst
//                       installments={installments}
//                       monthlyInstallmentsInAmount={monthlyInstallmentsInAmount}
//                       // slider change for down payment
//                       handleDownPaymentSliderChange={
//                         handleDownPaymentSliderChange
//                       }
//                       // price per sqft
//                       selectedFlat={selectedFlat}
//                       selectedUnitId={selectedUnitId}
//                       pricePerSQFT={pricePerSQFT}
//                     />

//                     <NeedAssistance />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   )
// }

// export default RootEMI
