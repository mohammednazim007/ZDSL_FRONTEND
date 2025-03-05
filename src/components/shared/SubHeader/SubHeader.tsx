import React from 'react'

interface SubHeaderProps {
  title: string
  subtitle?: string
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="sub-header">
      <h1 className="text-lg font-semibold">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  )
}

export default SubHeader
