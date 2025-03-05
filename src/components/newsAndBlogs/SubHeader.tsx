import { SubHeaderProps } from '@/interface/newsAndBlogs'
import React from 'react'

const SubHeader: React.FC<SubHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className="sub-header">
      <h1 className="text-lg font-semibold">{title}</h1>
      {subtitle && <p className={`text-sm text-gray-700 ${className}`}>{subtitle}</p>}
    </div>
  )
}

export default SubHeader
