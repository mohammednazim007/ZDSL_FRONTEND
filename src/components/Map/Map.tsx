import React, { useState } from 'react'
import SectionWrapper from '../Wrappers/SectionWrapper'
import LocationToast from './LocationToast'

const Map = () => {
  return (
    <section className="bg-gray-50">
      <SectionWrapper>
        <h1 className="md:text-5xl text-3xl  text-center md:pb-10 pb-6">
          All Projects Location
        </h1>
        <LocationToast />
      </SectionWrapper>
    </section>
  )
}

export default Map
