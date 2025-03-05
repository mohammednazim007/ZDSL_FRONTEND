import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string // Add this line
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={`container mx-auto px-4 ${className || ''}`}>
      {children}
    </section>
  )
}

export default Container
