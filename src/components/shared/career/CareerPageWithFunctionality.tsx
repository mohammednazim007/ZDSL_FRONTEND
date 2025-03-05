/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import CareerHeader from './CareerHeader'
import JobCards from './JobCards'
import { dummyCareerData } from '@/constants/career/career.const'
import { IJob } from '@/interface/career'
import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
import { IMeta } from '@/interface/Projects'
import useGraphQLFetchQueryTemp from '@/hooks/useGraphQLFetchQueryTemp'
import useGraphQLFetchCareerQuery from '@/hooks/useGraphQLFetchCareerQuery'
import Loader from '../Loder'

const careerFields = [
  `   _id
      jobTitle
      jobLocation
      employmentStatus
      salary
      experience
      gender
      age
      applicationDeadline
      publishDate
      aboutJob
      jobCategory
      jobTags
      jobResponsibilities
      additionalRequirements
      compensationAndOtherBenefits
      educationalRequirements
      workPlace
      isDeleted
      status

`,
]



const CareerPageWithFunctionality = () => {
  // ** API CALL
  const { performQuery, fetchedData, loading, error } =
    useGraphQLFetchCareerQuery<IJob[]>()

  // console.log('fetchedData', fetchedData)

  const [meta, setMeta] = useState<IMeta>({
    total: 10,
    limit: 0,
    page: 0,
    totalPages: null,
  })
  const [jobs, setJobs] = useState<IJob[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage, setJobsPerPage] = useState(5) // Customize as needed
  const totalPages = Math.ceil(meta.total / jobsPerPage)

  const getPageNumbers = () => {
    const pages = []
    // const totalShownPages = 3; // Including the ellipses and current page

    if (totalPages <= 2) for (let i = 1; i <= totalPages; i++) pages.push(i)
    else if (currentPage <= 3) pages.push(1, 2, 3, '...', totalPages)
    else if (currentPage > 3 && currentPage < totalPages - 2)
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      )
    else
      pages.push(
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      )

    return pages
  }

  //** CAREER API CALL HERE */

  useEffect(() => {
    const fetchCareer = async () => {
      // if (!hasMore) return // No more data to fetch

      try {
        // Perform the query to fetch data
        await performQuery('Query', 'careers', careerFields, {
          isSingleData: { value: false, type: 'boolean' },
        })
      } catch (err) {
        console.error('Error fetching career data:', err)
      }
    }

    fetchCareer()
  }, [])

  // Update jobs whenever fetchedData changes
  useEffect(() => {
    if (fetchedData) setJobs(fetchedData) // Set fetchedData to jobs
  }, [fetchedData])

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = jobs
    .filter(
      (job) =>
        job?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.aboutJob?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstJob, indexOfLastJob)

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Handle search change in CareerHeader
  const handleSearchChange = (term: any) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to the first page on new search
  }

  // console.log('fetchedData', fetchedData)

  if(loading){
    return <Loader/>
  }

  return (
    <>
      {/* Career Header with search box */}
      <CareerHeader onSearch={handleSearchChange} />
      {/* ALL JOBS */}
      <JobCards
        jobs={currentJobs}
        totalPages={totalPages}
        // handlePageChange={handlePageChange}
        totalJobs={jobs?.length}
        jobsPerPage={jobsPerPage}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getPageNumbers={getPageNumbers}
      />
    </>
  )
}

export default CareerPageWithFunctionality
