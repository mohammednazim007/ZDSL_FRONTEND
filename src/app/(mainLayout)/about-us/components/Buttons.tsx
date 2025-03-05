import Container from '@/components/shared/Container'
import Link from 'next/link'
import React from 'react'

const Buttons = () => {
  const buttons = [
    {
      title: 'Our Vision',
      url: '/our-vision?source=about-us&project_type=upcoming',
    },
    {
      title: 'Our Mission',
      url: '/our-vision?source=about-us&project_type=upcoming',
    },
    {
      title: 'Our Values',
      url: '/our-vision?source=about-us&project_type=upcoming#core-values',
    },
  ]
  return (
    <div className=" bg-[#FBFBFB] py-20 md:py-32">
      <Container>
        <div className="flex col-span-3 justify-center items-center md:gap-x-8 gap-x-2">
          {buttons.map((button) => (
            <Link
              href={button.url}
              key={button.url}
              className="w-80 text-center border bg-white py-6 rounded-[5px] text-[20px] transition duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#F3C65D] hover:to-[#E59F00] text-[#063354] shadow-md"
            >
              {button?.title}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Buttons
