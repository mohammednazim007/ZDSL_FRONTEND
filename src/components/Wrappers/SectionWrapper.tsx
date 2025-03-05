import React, { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode // Specify that children can be any valid React node
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => {
  return (
    <section className="container mx-auto px-2 md:py-20 py-10">
      {children}
    </section>
  )
}

export default SectionWrapper
