'use client'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select'
import options from './const.data'

const FilterInputBox = () => {
  return (
    <div className="pb-4 z-50">
      <Select options={options} />
    </div>
  )
}

export default FilterInputBox
