/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import rightArrowBack from '@/assets/icons/rightArrowBack.gif'
import { getAllProjectsQuery, tabsData } from '@/constants/Projects/ProjectData'
import useGraphQLFetchQueryTemp from '@/hooks/useGraphQLFetchQueryTemp'
import { Project } from '@/interface/Projects'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Container from '../shared/Container'
import DynamicTabs from '../shared/DynamicTabs/DynamicTabs'
import Loader from '../shared/Loder'
import SmallProjectCard from '../shared/SmallProjectCard/SmallProjectCard'
import SuspenseLoader from '../shared/SuspenseLoader'
import LocationFilter from './LocationFilter'
import PropertyFilter from './PropertyFilter'
import SearchFilter from './SearchFilter'
import SelectProjectZone from '../shared/SelectProjectZone/SelectProjectZone'
import useGraphQLFetchQueryTempNew from '@/hooks/useGraphQLFetchQueryTempNew'

const AllProjects = () => {
  const searchParams = useSearchParams()
  const projectStatus = searchParams?.get('project_status') || 'All'
  const [status, setStatus] = useState(projectStatus)
  const [fitlerLocation, setFilterLocation] = useState<string>('')
  const [page, setPage] = useState(1) // Infinite scroll page number
  const [projects, setProjects] = useState<Project[]>([]) // Accumulated projects
  const [hasMore, setHasMore] = useState(true) // Check for more data
  const [selectedZone, setSelectedZone] = useState<string | undefined>(
    undefined
  )

  const handleSelectedZone = (zone: string) => {
    setSelectedZone(zone) // Update the state
    setPage(1) // Reset to the first page
    setProjects([]) // Clear the previous projects
    setHasMore(true) // Allow fetching new data
  }

  const limit = 5 // Number of items per page
  // const { performQuery, loading, fetchedData } =
  //   useGraphQLFetchQueryTemp<Project[]>()
  const { performQuery, loading, fetchedData } =
    useGraphQLFetchQueryTempNew<Project[]>()
  const router = useRouter()

  const observer = useRef<IntersectionObserver | null>(null)

  // Fetch projects function
  const fetchProjects = async () => {
    if (!hasMore || loading) return // Prevent fetching if no more data or loading

    try {
      const variables: Record<string, any> = {
        page: page,
        limit: limit,
        isClosed: true,
      }

      if (status !== 'All' && status !== 'all') {
        variables.projectStatus =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      }
      // Include project zone filtering
      console.log(selectedZone)
      if (selectedZone && selectedZone !== '') {
        variables.projectZone = selectedZone // Pass selected zone to the query
      }

      await performQuery('getProjects', getAllProjectsQuery, variables)
    } catch (err) {
      console.error('Error fetching data:', err)
    }
  }

  // Update the projects list with fetched data
  useEffect(() => {
    if (fetchedData && fetchedData.length > 0) {
      setProjects((prevProjects) => {
        const newProjects = fetchedData.filter(
          (newProject) =>
            !prevProjects.some((project) => project._id === newProject._id)
        )
        return [...prevProjects, ...newProjects]
      })
      setHasMore(fetchedData.length === limit) // Check if more data exists
    } else {
      setHasMore(false) // No more data available
    }
  }, [fetchedData])

  useEffect(() => {
    fetchProjects()
  }, [status, page, fitlerLocation, selectedZone]) // Add selectedZone here

  // Handle tab change
  const handleTabChange = (newStatus: string) => {
    setStatus(newStatus)
    setPage(1) // Reset page to 1
    setProjects([]) // Clear current projects
    setHasMore(true) // Reset hasMore
  }

  // Last card observer callback
  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return // Skip if loading
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1) // Load more data
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Container>
        <div className="pt-28 lg:pt-36">
          {/* back arrow button */}
          <div className="flex items-center gap-2 justify-start  md:hidden">
            <Image
              src={rightArrowBack}
              alt="back arrow"
              width={40}
              height={40}
              onClick={() => router.back()}
            />

            <span className="font-bold">Our Projects</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
            {/* 1. title */}
            <div className="lg:w-[25%] hidden lg:block text-wrap">
              <div className="sub-header font-semibold text-center lg:text-left z-10">
                <h1 className="text-lg">All Projects</h1>
                <p className="text-sm text-black">
                  Find a comfortable apartment for your life
                </p>
              </div>
            </div>
            {/* 2. tabs */}
            <div className="-mt-8 sm:-mt-10 lg:mt-0 w-full lg:w-[50%] xl:flex justify-center items-center font-semibold">
              <DynamicTabs tabs={tabsData} onTabChange={handleTabChange} />
            </div>
            {/* search location and filter */}
            <div className="w-full lg:w-[25%] flex sm:col-span-3 justify-evenly items-center gap-x-1 md:gap-5 xl:gap-[1vw] font-semibold">
              {/* search */}
              <div className="md:hidden w-[100%]">
                <SearchFilter />
              </div>
              {/* <div className="w-[50%]">
                <LocationFilter setFilterLocation={setFilterLocation} />
              </div> */}
              <div className="w-[50%]">
                <SelectProjectZone
                  getSelected={handleSelectedZone}
                  selected={selectedZone}
                  className="border-gray-400"
                />
              </div>
              <div className="w-[50%] lg:w-[30%]">
                <PropertyFilter />
              </div>
            </div>
          </div>
        </div>

        {loading && page === 1 ? (
          <div className="h-[80vh] pb-20 flex justify-center items-center">
            <Loader />
          </div>
        ) : projects && projects.length ? (
          <div className="grid grid-cols-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3  pb-20">
            {projects.map((project, index) => (
              <div
                key={project._id}
                ref={index === projects.length - 1 ? lastCardRef : null} // Assign ref to the last project
              >
                <SmallProjectCard
                  key={project?._id}
                  project={project}
                  setReloadData={setPage} // Trigger reload when necessary
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[80vh] pb-20 flex justify-center items-center">
            <h2 className="font-semibold text-center text-xl">
              No Projects Found
            </h2>
          </div>
        )}

        {/* Infinite scroll loading indicator */}
        {loading && page > 1 && (
          <div className="pb-10 flex justify-center items-center">
            <Loader />
          </div>
        )}

        {/* No more data message */}
        {!hasMore && (
          <div className="text-center text-gray-500 my-6">
            {/* <p>No more projects to display</p> */}
          </div>
        )}
      </Container>
    </Suspense>
  )
}

export default AllProjects
