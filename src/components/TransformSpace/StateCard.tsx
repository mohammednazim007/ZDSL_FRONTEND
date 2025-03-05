// 'use client'
// import * as motion from 'framer-motion/client'

// import React, { useEffect, useRef, useState } from 'react'
// import CountUp from 'react-countup'

// const splitValue = (value: number | undefined, unit: string | undefined) => {
//   return { number: value || 0, suffix: unit || '' }
// }

// const StateCard: React.FC<{
//   stats: { value: number; unit: string; description: string }[]
// }> = ({ stats }) => {
//   const [hasCounted, setHasCounted] = useState(false)
//   const cardRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasCounted) setHasCounted(true)
//       },
//       { threshold: 0.5 }
//     )

//     if (cardRef.current) observer.observe(cardRef.current)

//     return () => {
//       if (cardRef.current) observer.unobserve(cardRef.current)
//     }
//   }, [hasCounted])

//   return (
//     // <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 container mx-auto">
//     //   {stats.map((stat, index) => {
//     //     const { number, suffix } = splitValue(stat.value, stat.unit)
//     //     return (
//     //       <motion.div
//     //         key={index}
//     //         initial={{ opacity: 0, y: 50 }}
//     //         whileInView={{ opacity: 1, y: 0 }}
//     //         viewport={{ once: true }}
//     //         transition={{ duration: 0.7, ease: 'easeOut' }}
//     //         className="transform drop-shadow w-full md:p-10 p-4 z-10 transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center bg-[#063354] text-white text-center rounded-md shadow"
//     //       >
//     //         <div className="flex items-center gap-1" ref={cardRef}>
//     //           {hasCounted ? (
//     //             <div className="text-2xl md:text-4xl font-poppins text-white font-bold">
//     //               <CountUp
//     //                 start={0}
//     //                 end={number}
//     //                 duration={2.5}
//     //                 separator=","
//     //               />
//     //             </div>
//     //           ) : (
//     //             number
//     //           )}
//     //           <p className="md:text-2xl text-base">{suffix}</p>
//     //         </div>
//     //         <p className="mt-1 inline-block sm:text-[10px] lg:text-[16px]">
//     //           {stat.description}
//     //         </p>
//     //       </motion.div>
//     //     )
//     //   })}
//     // </div>

//     <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 container mx-auto">
//       {stats.map((stat, index) => {
//         const { number, suffix } = splitValue(stat.value, stat.unit)
//         return (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, ease: 'easeOut' }}
//             className="transform drop-shadow w-full md:p-10 p-4 z-10 transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center bg-[#063354] text-white text-center rounded-md shadow"
//           >
//             <div className="flex items-center gap-1" ref={cardRef}>
//               {hasCounted ? (
//                 <div className="text-2xl md:text-4xl font-poppins text-white font-bold">
//                   <CountUp
//                     start={0}
//                     end={number}
//                     duration={2.5}
//                     separator=","
//                   />
//                 </div>
//               ) : (
//                 number
//               )}
//               <p className="md:text-2xl text-base">{suffix}</p>
//             </div>
//             <p className="mt-1 inline-block !text-[16px] lg:text-[16px]">
//               {stat.description}
//             </p>
//           </motion.div>
//         )
//       })}
//     </div>
//   )
// }

// export default StateCard
'use client'
import * as motion from 'framer-motion/client'

import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

const splitValue = (value: number | undefined, unit: string | undefined) => {
  return { number: value || 0, suffix: unit || '' }
}

const StateCard: React.FC<{
  stats: { value: number; unit: string; description: string }[]
}> = ({ stats }) => {
  const [hasCounted, setHasCounted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) setHasCounted(true)
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) observer.observe(cardRef.current)

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [hasCounted])

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 container mx-auto">
      {stats.map((stat, index) => {
        const { number, suffix } = splitValue(stat.value, stat.unit)
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="transform drop-shadow w-full md:p-10 p-6 z-10 transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center bg-[#063354] text-white text-center rounded-md shadow"
          >
            <div className="flex items-center gap-1" ref={cardRef}>
              {hasCounted ? (
                <div className="text-2xl md:text-4xl font-poppins text-white font-bold">
                  <CountUp
                    start={0}
                    end={number}
                    duration={2.5}
                    separator=","
                  />
                </div>
              ) : (
                number
              )}
              <p className="md:text-2xl text-base">{suffix}</p>
            </div>
            <p className="mt-1 md:text-md text-xs">{stat.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default StateCard
