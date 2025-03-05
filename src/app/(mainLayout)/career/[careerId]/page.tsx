'use client'
import AdditionalRequirements from '@/components/shared/career/AdditionalRequirements'
import CompensationAndOtherBenefits from '@/components/shared/career/CompensationAndOtherBenefits'
import EducationalRequirements from '@/components/shared/career/EducationalRequirements'
import JobContext from '@/components/shared/career/JobContext'
import JobDetailsHeader from '@/components/shared/career/JobDetailsHeader'
import JobResponsibilities from '@/components/shared/career/JobResponsibilities'
import WorkPlace from '@/components/shared/career/WorkPlace'
import ZdslContactDetails from '@/components/shared/career/ZdslContactDetails'
import Container from '@/components/shared/Container'
import Loader from '@/components/shared/Loder'
import useGraphQLFetchCareerQuery from '@/hooks/useGraphQLFetchCareerQuery'
import { IJob } from '@/interface/career'
import { useEffect } from 'react'

const careerSingleFields = [
  `
      _id
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

//!============================================================>>>
const SingleJobDetailsPage = ({ params }: { params: { careerId: string } }) => {
  const { careerId } = params

  const { performQuery, fetchedData, loading, error } =
    useGraphQLFetchCareerQuery<IJob[]>()

  //** CAREER API CALL HERE */

  useEffect(() => {
    const fetchSingleCareer = async () => {
      // if (!hasMore) return // No more data to fetch

      try {
        // Perform the query to fetch data
        await performQuery('Career', 'career', careerSingleFields, {
          careerId: { value: careerId, type: 'ID!' },
          isSingleData: { value: true, type: 'boolean' },
        })
      } catch (err) {
        console.error('Error fetching career data:', err)
      }
    }

    fetchSingleCareer()
  }, [])

  const jobDetails = fetchedData

  // console.log('single fetchedData', fetchedData)
  // console.log('single jobDetails', jobDetails)

  if (loading) return <Loader />

  if (error) return <p>Error...</p>

  return (
    <div className="bg-[#fbfbfb]">
      <Container>
        <div className="py-14">
          <JobDetailsHeader jobDetails={jobDetails} />
          <JobContext jobDetails={jobDetails} />
          <JobResponsibilities jobDetails={jobDetails} />
          <AdditionalRequirements jobDetails={jobDetails} />
          <CompensationAndOtherBenefits jobDetails={jobDetails} />
          <EducationalRequirements jobDetails={jobDetails} />
          <WorkPlace jobDetails={jobDetails} />
          <ZdslContactDetails jobDetails={jobDetails} />
        </div>
      </Container>
    </div>
  )
}

export default SingleJobDetailsPage
