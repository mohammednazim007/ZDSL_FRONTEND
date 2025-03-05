/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { ContentNavigatorProps } from '@/interface/Projects'
import { useSearchParams, useRouter } from 'next/navigation'

export default function DynamicTabs({
  tabs,
  onTabChange,
}: ContentNavigatorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the current project status from the query params
  const projectStatus = searchParams?.get('project_status') || 'all'

  const handleTabClick = (path: string) => {
    // Extract the project_status from the path
    const status = new URLSearchParams(path.split('?')[1]).get('project_status')

    // Notify the parent component of the status change
    if (status) onTabChange(status.charAt(0).toUpperCase() + status.slice(1))

    // Navigate to the new path
    router.push(path)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-1 md:px-4 mt-10 sm:mt-10 md:mt-14 lg:mt-0">
      <div className="flex justify-center items-center">
        <div className="grid sm:grid-cols-4 grid-cols-4 lg:gap-3 gap-2 rounded-md sm:border border-gray-300">
          {tabs.map((tab) => {
            // Check if the current tab is active by comparing the path with the projectStatus
            const isActive = tab.path.includes(
              `project_status=${projectStatus}`
            )

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={`cursor-pointer block py-2 gap-x-1 text-sm md:px-5 mx-1 w-full text-center 
                  md:w-auto md:inline-block hover:border-b-[2px] hover:border-[#E6A206] 
                  ${isActive ? 'border-b-[2px] border-[#E6A206] text-[#E6A206]' : 'border-b-[2px] sm:border-none'}`}
              >
                <span className="hover:text-[#E6A206] text-nowrap">
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
