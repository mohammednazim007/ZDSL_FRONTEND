'use client'
import OurVisionBanner from '@/components/OurVision/OurVisionBanner'
import OurVisionSection from '@/components/OurVision/OurVisionSection'
import { useQuery } from '@apollo/client'
import { missionQuery, MSTypes } from './misionQuery'
import { TitleType } from './types'

const OurVisionPage = () => {
  const { data, loading, error } = useQuery(missionQuery)

  const missionData = data?.getVisionMissionValues?.data[0]
  const heading = missionData?.heading
  const headingDescription = missionData?.HeadingDescription
  const icon = missionData?.icon
  const mSection = missionData?.MSection

  // generate array title
  const arrayTitle = mSection?.map((vision: TitleType, index: number) => ({
    title: vision.title,
    id: `${index}`,
  }))

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error?.message}</p>

  return (
    <>
      <OurVisionBanner
        heading={heading}
        headingDescription={headingDescription}
        icon={icon}
        arrayTitle={arrayTitle}
      />

      {mSection.length > 0 &&
        mSection?.map((vision: MSTypes, index: number) => (
          <OurVisionSection key={index} visionData={vision} index={index} />
        ))}
    </>
  )
}

export default OurVisionPage
