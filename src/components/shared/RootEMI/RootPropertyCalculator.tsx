// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import { motion } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import { FaRegCircle } from 'react-icons/fa'
// import { TiArrowSortedDown } from 'react-icons/ti'

// type FormValues = {
//   project: string
//   flatSize: string
//   pricePerSFT: number
//   installments: number
//   downPayment: number
// }

// const RootPropertyCalculator = ({
//   handleProjectSearch,
//   projects,
//   selectedProject,
//   totalAmount,
//   downPayment,
//   setDownPayment,
//   installments,
//   setInstallments,
//   downPaymentInTk,
//   setDownPaymentInTk,
//   dueAmount,
//   monthlyInstallmentsInAmount,
//   selectedFlat,
//   handleProjectSelection,
//   isOpenProjects,
//   setIsOpenProjects,
//   handleFlatSearch,
//   isOpenFlatSize,
//   setIsOpenFlatSize,
//   filteredFlat,
//   handleFlatSelection,
//   pricePerSQFT,
//   unitDetails
// }: any) => {
//   // ** HANDLE PRICE PER SFT SLIDER CHANGE (DISABLED)
//   const handlePricePerSQFTSliderChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     // Slider change will not update pricePerSQFT when disabled
//     // console.log('Slider value change ignored as it is disabled.')
//   }

//   //   // ** FUNCTION For Getting Clicked value

//   const handleSelection = (data: string) => {
//     if (data === 'project') {
//       setIsOpenProjects((prevState: any) => {
//         if (!prevState) setIsOpenFlatSize(false) // Close flatSize if opening projects
//         return !prevState
//       })
//     }

//     if (data === 'flatSize') {
//       setIsOpenFlatSize((prevState: any) => {
//         if (!prevState) setIsOpenProjects(false) // Close projects if opening flatSize
//         return !prevState
//       })
//     }
//   }

//   // ** HANDLE INSTALLMENTS

//   const handleInstallmentsSliderChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setInstallments(Number(e.target.value))
//     setValue('installments', Number(e.target.value))
//   }

//   // Handle slider change to dynamically update downPayment and downPaymentInTk
//   const handleDownPaymentSliderChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const percentage = Number(e.target.value)
//     setDownPayment(percentage)

//     // Calculate the down payment in Tk as a percentage of totalAmount
//     const calculatedDownPaymentInTk = (totalAmount! * percentage) / 100
//     setDownPaymentInTk(calculatedDownPaymentInTk)
//   }

//   //** SUBMIT THE DATA */
//   const onSubmit = async (data: FormValues) => {
//     console.log('FORMDATA', data)
//   }

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       project: '',
//       flatSize: '',
//       pricePerSFT: 10000,
//       installments: 10,
//       downPayment: 20,
//     },

//     mode: 'onSubmit', // This ensures validation happens on form submit
//     reValidateMode: 'onChange',
//   })


//   console.log('filteredFlat', filteredFlat);

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         noValidate
//         className="w-full max-w-screen mx-auto rounded-lg"
//       >
//         <div className="flex flex-col col-span-2 my-4">
//           {/* select project */}

//           <div className="relative w-full">
//             <label
//               htmlFor="project-search"
//               className="block mb-2 text-sm font-medium"
//             >
//               Select a project
//             </label>
//             <div
//               className="cursor-pointer flex items-center justify-between border rounded-md py-2 px-4 h-12"
//               onClick={() => handleSelection('project')}
//             >
//               <div>{selectedProject}</div>
//               <div>
//                 <TiArrowSortedDown className="text-[#9A9CA3] font-bold" />
//               </div>
//             </div>

//             <div className="relative w-full z-50">
//               {isOpenProjects && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute w-full bg-white shadow-2xl rounded-md mt-2 max-h-auto overflow-auto p-6"
//                 >
//                   <h3 className="text-[#65635F] mb-2">Select a project</h3>

//                   <div className="relative mb-2">
//                     <input
//                       type="text"
//                       autoComplete="off"
//                       className="block w-full p-4 py-2 ps-4 text-sm text-[#063354] placeholder-[#063354] border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-0 focus:border-gray-300"
//                       placeholder="Search here"
//                       onChange={handleProjectSearch}
//                       required
//                     />
//                     <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
//                       <svg
//                         className="w-4 h-4 text-gray-500"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           strokeWidth="2"
//                           d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                         />
//                       </svg>
//                     </div>
//                   </div>

//                   <div>
//                     <ul className="h-60 overflow-y-auto">
//                       {projects?.map((pr: any) => {
//                         return (
//                           <li
//                             key={pr._id}
//                             className="list-none py-2 ps-4 text-[#063354] hover:bg-[#fdf4df] hover:rounded duration-300 cursor-pointer hover:text-black"
//                             onClick={() =>
//                               handleProjectSelection(pr?._id, pr?.projectTitle)
//                             }
//                           >
//                             {pr?.projectTitle}
//                           </li>
//                         )
//                       })}
//                     </ul>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           {/* Select Flat Size (SQFT) */}
//           <div className="relative w-full">
//             <label
//               htmlFor="project-search"
//               className="block mb-2 text-sm font-medium"
//             >
//               Select Flat Size (SQFT)
//             </label>
//             <div
//               className="cursor-pointer flex items-center justify-between border rounded-md py-2 px-4 h-12"
//               // onClick={() => handleSelection('flatSize')}
//               onClick={() => {
//                 if (selectedProject) {
//                   handleSelection('flatSize')
//                 } else {
//                   console.log(
//                     'Button is disabled because selectedProject is empty.'
//                   )
//                 }
//               }}
//             >
//               <div>{selectedFlat}</div>
//               <div>
//                 <TiArrowSortedDown className="text-[#9A9CA3] font-bold" />
//               </div>
//             </div>
//             <div className="py-2">
//               {!selectedProject && (
//                 <span className="text-red-500 text-sm">
//                   Choose Project First!
//                 </span>
//               )}
//             </div>

//             <div className="relative w-full z-50">
//               {isOpenFlatSize && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute w-full -left-8  mx-8 bg-white shadow-2xl rounded-md mt-2 max-h-auto overflow-auto p-6"
//                 >
//                   <h3 className="text-[#65635F] mb-2">Select a size</h3>

//                   <div className="relative mb-2">
//                     <input
//                       type="text"
//                       autoComplete="off"
//                       className={`block w-full p-4 py-2 ps-4 text-sm text-[#063354] placeholder-[#063354] border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-0 focus:border-gray-300 ${!selectedProject ? 'cursor-not-allowed bg-gray-200' : ''
//                         }`}
//                       placeholder="Search here"
//                       onChange={handleFlatSearch}
//                       required
//                       disabled={!selectedProject}
//                     />
//                     <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
//                       <svg
//                         className="w-4 h-4 text-gray-500"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 20"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           strokeWidth="2"
//                           d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                         />
//                       </svg>
//                     </div>
//                   </div>

//                   <div>
//                     <ul className="h-60 overflow-y-auto">
//                       {filteredFlat?.map((unit: any) => {
//                         // console.log('unit', unit)
//                         return (
//                           <li
//                             key={unit.id}
//                             className="list-none py-2 ps-4 text-[#063354] hover:bg-[#fdf4df] hover:rounded duration-300 cursor-pointer hover:text-black"
//                             onClick={() =>
//                               handleFlatSelection(unit.flatSize, unit.id)
//                             }
//                           >
//                             {unit.flatSize}
//                           </li>
//                         )
//                       })}
//                     </ul>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           {/* Enter Price Per SFT */}

//           <div className="relative w-full">
//             <label
//               htmlFor="project-search"
//               className="block mb-2 text-sm font-medium"
//             >
//               Enter Price Per SFT
//             </label>
//             <div className="cursor-pointer w-full p-2 text-sm text-left ps-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-12">
//               {pricePerSQFT}
//             </div>
//             <div className="relative w-40 -mt-4 ml-8">
//               <span className="">
//                 <FaRegCircle className="text-[#063354] text-[12px] font-bold mt-[9px] bg-white" />
//               </span>
//               <div className="-mt-5 ml-2.5">
//                 <input
//                   type="range"
//                   min="1000"
//                   max="20000"
//                   value={pricePerSQFT}
//                   onChange={handlePricePerSQFTSliderChange}
//                   className="h-2 rounded-lg border-2 border-[#063354] appearance-none cursor-not-allowed dark:bg-gray-700 bg-[#063354]"
//                   disabled
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Number of monthly installments (max-30) */}

//           <div className="relative w-full">
//             <label
//               htmlFor="project-search"
//               className="block mb-2 text-sm font-medium"
//             >
//               Number of monthly installments (max-30)
//             </label>
//             <div className="cursor-pointer w-full p-2 text-sm text-left ps-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-12">
//               {installments}
//             </div>
//             <div className="relative w-40 -mt-4 ml-8">
//               <span className="">
//                 <FaRegCircle className="text-[#063354] text-[12px] font-bold mt-[9px] bg-white" />
//               </span>
//               <div className="-mt-5 ml-2.5">
//                 <input
//                   type="range"
//                   disabled={downPayment === 100 || !selectedProject} // Disable logic
//                   min="0"
//                   max="30"
//                   value={installments}
//                   onChange={handleInstallmentsSliderChange}
//                   className={`h-2 rounded-lg border-2 appearance-none cursor-pointer dark:bg-gray-700 
//           ${downPayment === 100 || !selectedProject
//                       ? 'cursor-not-allowed bg-gray-300' // Add visual feedback for disabled state
//                       : 'border-[#063354] bg-[#063354]'
//                     }`}
//                 />
//               </div>
//             </div>
//             <div className="py-2">
//               {!selectedProject && (
//                 <span className="text-red-500 text-sm">
//                   Choose Project First!
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Down Payment */}

//           <div className="relative w-full py-1">
//             <label
//               htmlFor="downPayment"
//               className="block mb-2 text-sm font-medium"
//             >
//               Down Payment
//             </label>
//             <div className="relative cursor-pointer w-full p-2 h-12 text-sm text-left ps-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//               {downPaymentInTk}

//               <div
//                 className="px-8 py-3 bg-gray-300 rounded-r-md
//                     absolute top-0 right-0 w-[20%] h-full text-nowrap flex justify-center items-center"
//               >
//                 {downPayment} %
//               </div>
//             </div>
//             <div className="relative w-40 -mt-4 ml-8">
//               <span className="">
//                 <FaRegCircle className="text-[#063354] text-[12px] font-bold mt-[9px] bg-white" />
//               </span>
//               <div className="-mt-5 ml-2.5 relative w-full">
//                 <input
//                   type="range"
//                   min="1"
//                   max="100"
//                   value={downPayment}
//                   onChange={handleDownPaymentSliderChange}
//                   className=" h-2 rounded-lg border-2 border-[#063354] appearance-none cursor-pointer dark:bg-gray-700 bg-[#063354]"
//                 />
//               </div>
//             </div>
//             {errors.downPayment && (
//               <span className="text-red-500 text-sm">
//                 {errors.downPayment.message}
//               </span>
//             )}
//           </div>
//         </div>
//       </form>
//       <div className="flex flex-col col-span-4 mt-8">
//         {installments > 5 ? (
//           <div className="border-2 border-[#FF2E905E] p-4 rounded mb-6">
//             <h1 className="text-[#000] text-xl font-semibold">
//               <span className="text-[#FF2E90] text-md">!</span>Alert
//             </h1>
//             <p className="mb-2 text-sm">
//               You have incurred a loss of{' '}
//               <span className="font-bold text-[#FF7A85]">5,000</span> BDT due to
//               extended installments. Consider reducing the number of
//               installments to avail of a discount
//             </p>
//           </div>
//         ) : (
//           ''
//         )}

//         <div className="bg-[#ecf4f4] px-4 py-6 border-2 rounded border-[#0085857A]">
//           <div className="md:flex items-center justify-between gap-4">
//             <div className="ps-6 border-gray-300 md:text-start text-center mb-4">
//               <p>Total Price (BDT)</p>
//               <h1 className="font-bold text-3xl">{totalAmount}</h1>
//             </div>

//             <div className="hidden md:block h-20 border-l-4 border-[#7CBFBF] text-3xl rounded"></div>

//             <div className="pe-4 md:text-start text-center">
//               <h3>
//                 Total Due:{' '}
//                 <span className="font-semibold text-md">{dueAmount}</span> BDT
//               </h3>
//               <p>Monthly Installment (BDT)</p>
//               <h1 className="font-bold text-xl">
//                 {monthlyInstallmentsInAmount}
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default RootPropertyCalculator
