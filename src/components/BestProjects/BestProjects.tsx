// /* eslint-disable jsx-a11y/no-static-element-interactions */
// 'use client'

// import { CompletedSvg, OngoingSvg, UpcomingSvg } from '@/assets/svg'
// import { useState, useEffect, useRef } from 'react'
// import { ResponsiveType } from 'react-multi-carousel'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useQuery } from '@apollo/client'
// import ProjectCard from '../Projects/ProjectCard'
// import MultiCarousel from '../shared/MultiCarousel'
// import SectionWrapper from '../Wrappers/SectionWrapper'
// import { GET_BEST_PROJECT_URL } from './best_projectQuery'
// import { bestProjectType } from './best_projectType'
// import Loader from '../shared/Loder'

// // Define the type for the MultiCarousel ref
// interface CarouselRefType {
//   goToSlide: (slideIndex: number) => void
// }

// const responsive: ResponsiveType = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3.15,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 640 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 640, min: 0 },
//     items: 1.15,
//   },
// }

// const tabList = ['Completed', 'Ongoing', 'Upcoming']

// const BestProjects = () => {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const carouselInstance = useRef<CarouselRefType | null>(null)

//   // Read the active tab from the query string or default to "Completed"
//   const [activeTab, setActiveTab] = useState(
//     searchParams.get('filter') || 'Completed'
//   )
//   const [resetCarouselKey, setResetCarouselKey] = useState(0) // Key to force re-render carousel

//   const {
//     data: bestProjectData,
//     loading: bestProjectLoading,
//     error: bestProjectError,
//   } = useQuery(GET_BEST_PROJECT_URL, {
//     variables: { isBestProject: true, projectStatus: activeTab },
//   })

//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab)
//     setResetCarouselKey((prevKey) => prevKey + 1) // Update key to force re-render
//     updateURL(tab)
//   }

//   const updateURL = (tab: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     console.log('params', params)

//     params.set('filter', tab)
//     router.push(`?${params.toString()}`, { scroll: false }) // Update URL without full page reload
//   }

//   useEffect(() => {
//     // When the query changes, update the active tab
//     const currentFilter = searchParams.get('filter') || 'Completed'
//     setActiveTab(currentFilter)
//   }, [searchParams])

//   const getIcon = (tab: string) => {
//     if (tab.toLowerCase().includes('ongoing')) return OngoingSvg
//     if (tab.toLowerCase().includes('completed')) return CompletedSvg
//     if (tab.toLowerCase().includes('upcoming')) return UpcomingSvg
//     return null
//   }

//   const bestProject = bestProjectData?.getProjects?.projects || []

//   // if (bestProjectLoading) return <Loader />
//   if (bestProjectError) return <p>Error: {bestProjectError.message}</p>

//   return (
//     <>
//       <SectionWrapper>
//         <section>
//           <div className="flex flex-row flex-wrap gap-x-4 md:gap-0 gap-4 md:justify-between justify-center items-center w-full">
//             <h1 className="md:text-[40px] text-xl font-medium">
//               Our best projects
//             </h1>
//             <div className="flex border-b-[2px] relative border-b-gray-400 md:gap-x-8">
//               {tabList.map((tab, index) => (
//                 <div
//                   key={index}
//                   className={`relative px-4 -mb-0.5 gap-2 items-center h-full flex py-6 cursor-pointer transition-all duration-600 ease-in-out ${
//                     activeTab === tab
//                       ? 'border-b-[3px] border-secondary'
//                       : 'border-b-transparent border-b-[3px] border-b-gray-300'
//                   }`}
//                   onClick={() => handleTabClick(tab)}
//                 >
//                   <span className="h-4">{getIcon(tab)}</span>
//                   <h2 className="text-[#000000] text-[15px] md:text-[24px] font-semibold font-Oswald">
//                     {tab}
//                   </h2>
//                   {index !== tabList.length - 1 && (
//                     <div className="w-[2px] bg-gray-300 right-0 bottom-5 h-8 absolute" />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <Link href="/projects?project_status=all">
//               <button className="bg-white hidden sm:block py-2 px-3 border text-base !font-normal text-[#063354] rounded-md">
//                 View all Projects
//               </button>
//             </Link>
//           </div>
//           {bestProjectLoading ? (
//             <Loader />
//           ) : (
//             <div>
//               {bestProject.length > 0 ? (
//                 <MultiCarousel
//                   key={resetCarouselKey} // Force carousel to reset on key change
//                   responsiveMobileDevicePathLink="/projects"
//                   responsiveMobileDeviceTitle="View All Projects"
//                   rightArrowId="bestProjectRightArrow"
//                   leftArrowId="BestProjectLeftArrow"
//                   responsive={responsive}
//                   carouselInstance={carouselInstance}
//                 >
//                   {bestProject.map((project: bestProjectType) => (
//                     <ProjectCard
//                       key={project?._id}
//                       project={project}
//                       setReloadData={() => {}}
//                     />
//                   ))}
//                 </MultiCarousel>
//               ) : (
//                 <p>No projects available for the selected tab.</p>
//               )}
//             </div>
//           )}
//         </section>
//       </SectionWrapper>
//     </>
//   )
// }

// export default BestProjects

/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'

import { CompletedSvg, OngoingSvg, UpcomingSvg } from '@/assets/svg'
import { useState, useEffect, useRef, useMemo } from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import ProjectCard from '../Projects/ProjectCard'
import MultiCarousel from '../shared/MultiCarousel'
import SectionWrapper from '../Wrappers/SectionWrapper'
import { GET_BEST_PROJECT_URL } from './best_projectQuery'
import { bestProjectType } from './best_projectType'
import Loader from '../shared/Loder'

// Define the type for the MultiCarousel ref
interface CarouselRefType {
  goToSlide: (slideIndex: number) => void
}

// Static carousel responsiveness settings
const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.15,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.15,
  },
}

// Tabs for filtering projects
const tabList = ['Completed', 'Ongoing', 'Upcoming']

const BestProjects = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const carouselInstance = useRef<CarouselRefType | null>(null)

  // Read the active tab from the query string or default to "Completed"
  const initialTab = useMemo(
    () => searchParams?.get('filter') || 'Completed',
    [searchParams]
  )
  const [activeTab, setActiveTab] = useState(initialTab)
  const [resetCarouselKey, setResetCarouselKey] = useState(0)

  const { data, loading, error } = useQuery(GET_BEST_PROJECT_URL, {
    variables: { isBestProject: true, projectStatus: activeTab },
  })

  const handleTabClick = (tab: string) => {
    if (tab !== activeTab) {
      setActiveTab(tab)
      setResetCarouselKey((prevKey) => prevKey + 1) // Trigger carousel reset
      updateURL(tab)
    }
  }

  const updateURL = (tab: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set('filter', tab)
    router.push(`?${params.toString()}`, { scroll: false }) // Update URL without full reload
  }

  // Memoize icon fetching to avoid unnecessary recomputations
  const getIcon = useMemo(() => {
    const iconMap: Record<string, JSX.Element> = {
      ongoing: OngoingSvg,
      completed: CompletedSvg,
      upcoming: UpcomingSvg,
    }
    return (tab: string) => iconMap[tab.toLowerCase()] || null
  }, [])

  // Memoize projects data to prevent unnecessary re-renders
  const bestProject = useMemo(() => data?.getProjects?.projects || [], [data])

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  if (error) return <p>Error: {error.message}</p>

  return (
    <SectionWrapper>
      <section>
        <div className="flex flex-row flex-wrap gap-x-4 md:gap-0 gap-4 md:justify-between justify-center items-center w-full">
          <h1 className="md:text-[40px] text-xl font-medium">
            Our best projects
          </h1>
          <div className="flex border-b-[2px] relative border-b-gray-400 md:gap-x-8">
            {tabList.map((tab, index) => (
              <div
                key={index}
                className={`relative px-4 -mb-0.5 gap-2 items-center h-full flex py-6 cursor-pointer transition-all duration-600 ease-in-out ${
                  activeTab === tab
                    ? 'border-b-[3px] border-secondary'
                    : 'border-b-transparent border-b-[3px] border-b-gray-300'
                }`}
                onClick={() => handleTabClick(tab)}
              >
                <span className="h-4">{getIcon(tab)}</span>
                <h2 className="text-[#000000] text-[15px] md:text-[24px] font-semibold font-Oswald">
                  {tab}
                </h2>
                {index !== tabList.length - 1 && (
                  <div className="w-[2px] bg-gray-300 right-0 md:-right-4 bottom-4 md:bottom-5 h-8 absolute" />
                )}
              </div>
            ))}
          </div>
          <Link href="/projects?project_status=all">
            <button className="bg-white hidden sm:block py-2 px-3 border text-base !font-normal text-[#063354] rounded-md">
              View all Projects
            </button>
          </Link>
        </div>

        {/* Carousel */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {bestProject.length > 0 ? (
              <MultiCarousel
                key={resetCarouselKey} // Force carousel reset on key change
                responsiveMobileDevicePathLink="/projects"
                responsiveMobileDeviceTitle="View All Projects"
                rightArrowId="bestProjectRightArrow"
                leftArrowId="BestProjectLeftArrow"
                responsive={responsive}
                carouselInstance={carouselInstance}
              >
                {bestProject.map((project: bestProjectType) => (
                  <ProjectCard
                    key={project?._id}
                    project={project}
                    setReloadData={() => {}}
                  />
                ))}
              </MultiCarousel>
            ) : (
              <p>No projects available for the selected tab.</p>
            )}
          </div>
        )}
      </section>
    </SectionWrapper>
  )
}

export default BestProjects
