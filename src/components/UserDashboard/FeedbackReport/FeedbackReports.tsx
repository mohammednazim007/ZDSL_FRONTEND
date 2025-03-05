/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import FeedbackForm from './FeedBackForm'
import ReportForm from './ReportForm'

const FeedbackReports = () => {
  const [filterData, setFilterData] = useState('feedback')

  return (
    <div>
      <div className="flex justify-between items-center  mb-10">
        <h1 className="text-xl font-medium">
          {filterData === 'feedback' ? 'Feedback' : 'Report'}
        </h1>

        <div className="p-1 border rounded-md flex justify-between items-center ">
          <button
            onClick={() => setFilterData('feedback')}
            className={`${filterData === 'feedback' && 'bg-[#B2DADA]'} px-3 py-1 rounded-md text-sm`}
          >
            Feedback
          </button>
          <button
            onClick={() => setFilterData('report')}
            className={`${filterData === 'report' && 'bg-[#B2DADA]'} px-3 py-1 rounded-md text-sm`}
          >
            Report
          </button>
        </div>
      </div>

      {filterData === 'feedback' ? <FeedbackForm /> : <ReportForm />}
    </div>
  )
}

export default FeedbackReports
