// /* eslint-disable curly */
// 'use client'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { useCallback, useState } from 'react'
// import { RiExpandUpDownFill } from 'react-icons/ri'

// interface XTableProps {
//   rows: Array<Record<string, string | React.ReactNode>> // Allow strings or JSX elements
//   heads: string[]
//   totalPages: number
//   currentPage: number
//   loading: boolean
// }

// export default function XTable({
//   rows,
//   heads,
//   totalPages,
//   currentPage,
//   loading,
// }: XTableProps) {
//   const [active, setActive] = useState<number>(currentPage)
//   const [selectedRows, setSelectedRows] = useState<string[]>([])
//   const [isAllSelected, setIsAllSelected] = useState<boolean>(false)

//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const pathname = usePathname()

//   const createQueryString = useCallback(
//     (name: string, value: string | number) => {
//       const params = new URLSearchParams(searchParams.toString())
//       params.set(name, value.toString())

//       return params.toString()
//     },
//     [searchParams]
//   )

//   const getItemProps = (index: number) => ({
//     variant: active === index ? 'filled' : 'text',
//     color: 'gray',
//     onClick: () => {
//       setActive(index)
//       router.push(pathname + '?' + createQueryString('page', index))
//     },
//     className: 'rounded-primary',
//     size: 'md',
//   })

//   return (
//     <div className=" w-full overflow-auto">
//       <table
//         className="w-full min-w-max table-auto rounded-md text-left border-separate relative"
//         style={{ borderSpacing: '0 10px' }}
//       >
//         <thead>
//           <tr className="bg-white border">
//             {heads.map((head, idx) => (
//               <th
//                 key={head}
//                 className="px-4 py-3  text-sm font-medium text-gray-700"
//               >
//                 <div className="flex items-center gap-2">
//                   {head}
//                   <RiExpandUpDownFill />
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="">
//           {rows?.map((obj, index) => {
//             const isLast = index === rows.length - 1
//             const rowClasses = `px-4 py-1.5 text-sm max-w-[150px] truncate ${
//               isLast ? 'rounded-b-lg' : ''
//             }`

//             const bgColorClass =
//               'bg-white border border-gray-200 !border transition-all'

//             return (
//               <tr
//                 key={index}
//                 className={`${bgColorClass} ${loading ? 'opacity-40' : ''}`}
//               >
//                 {Object.keys(obj).map((key, idx) => (
//                   <td key={idx} className={rowClasses}>
//                     {obj[key]}
//                   </td>
//                 ))}
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </div>
//   )
// }
