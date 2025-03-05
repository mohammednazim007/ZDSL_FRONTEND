/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ApplyThisJobForm from '@/components/shared/career/apply/ApplyThisJobForm'
import Container from '@/components/shared/Container'
import { getCookie } from '@/libs/tokenUtils'
import { toast } from 'sonner'

const ApplyForThisJobPage = () => {
  const router = useRouter()

  const params = useParams() as Record<string, string>
  const careerId = params['careerId'] // Assuming the dynamic part of the route is named `id`
  console.log('careerId', careerId)

  useEffect(() => {
    const accessToken = getCookie('zdsl_accessToken')
    if (!accessToken || !careerId) {
      toast.error('Please login first to apply for this job')
      router.push('/') // Redirect to the home page
    }
  }, [router])

  return (
    <>
      <Container>
        <div className="mx-auto md:w-[800px] mt-20">
          <h1 className="text-[30px] mb-4 hidden md:flex py-12 font-[family-name:var(--font-oswald)]">
            Apply for this Job
          </h1>
        </div>
      </Container>
      <ApplyThisJobForm jobId={careerId} />
    </>
  )
}

export default ApplyForThisJobPage
