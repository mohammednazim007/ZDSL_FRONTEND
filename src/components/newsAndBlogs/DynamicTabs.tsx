'use client'

import { ContentNavigatorProps } from '@/interface/newsAndBlogs'
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
    <div className="w-full max-w-lg mx-auto">
      <div className="grid rounded-md md:grid-cols-4 mt-5 grid-cols-2 border-[1.5px] border-gray-300">
        {tabs.map((tab, index) => {
          const isActive = tab.path.includes(`project_status=${projectStatus}`)

          // Set border-radius based on index and isActive
          const borderRadiusClasses = `
            ${isActive && index === 0 ? 'rounded-l-md' : ''} 
            ${isActive && index === tabs.length - 1 ? 'rounded-r-md' : ''}
          `

          return (
            <div
              key={index}
              onClick={() => handleTabClick(tab.path)}
              className={`w-full cursor-pointer`}
            >
              <span
                className={`block p-2 whitespace-nowrap border text-sm ${borderRadiusClasses} hover:text-[#E6A206] hover:border-[#E6A206] transition-all duration-500 px-5 w-full text-center md:w-full md:inline-block ${
                  isActive ? 'border-[#E6A206] text-[#E6A206]' : 'bg-gray-50'
                }`}
              >
                {tab.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
