import { ReactNode } from 'react'

const JobTittle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className={`font-oswald  font-normal text-[1.25rem] text-[#000000`}>
      {children}
    </h1>
  )
}

export default JobTittle
