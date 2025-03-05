'use client'
/* eslint-disable curly */
import ManageTeamBanner from '@/components/ManageMentTeam/ManageTeamBanner'
import SingleMemberCard from '@/components/ManageMentTeam/SingleMemberCard'
import Loader from '@/components/shared/Loder'
import { TManagementTeam } from '@/interface/team/managementTeam'
import { useGetAllManagementTeamQuery } from '@/services/user/project.service'

const ManageMentPage = () => {
  const { data: team, isLoading } = useGetAllManagementTeamQuery(undefined)

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  const managementMembers: TManagementTeam[] = team?.data?.teams?.data || []
  console.log('managementMembers', managementMembers)

  return (
    <>
      <ManageTeamBanner />
      <div className="flex flex-col">
        {managementMembers?.map((member, index) => (
          <SingleMemberCard
            key={member?._id}
            index={index}
            memberInfo={member}
          />
        ))}
      </div>
    </>
  )
}

export default ManageMentPage
