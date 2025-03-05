import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  bathroomSvg,
  bedroomSvg,
  flatSizeSvg,
  locationSvg,
  ProjectCardRightArrowSvg,
} from '@/assets/svg'
import * as motion from 'framer-motion/client'
import { FaCodeCompare } from 'react-icons/fa6'
import { FaRegBookmark } from 'react-icons/fa'
import { Project } from '@/interface/BestProjects'

// Update this interface to reflect that a single project is being passed
interface RenderProjectCardsProps {
  project: Project // Change from projects: Project[] to project: Project
}

const RenderProjectCards: React.FC<RenderProjectCardsProps> = ({ project }) => {
  return (
    <motion.div
      key={project.id} // Ensure to add a key for each mapped item
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and positioned lower
      whileInView={{ opacity: 1, y: 0 }} // Animate to full opacity and move up to y=0 when in view
      viewport={{ once: true }} // Ensures the animation happens only once when in view
      transition={{ duration: 0.7, ease: 'easeOut' }} // Adjust duration for smooth effect
    >
      <div className="border rounded-md mx-2">
        <div className="relative">
          <div className="absolute bottom-10 right-6 flex space-x-2">
            <button className="text-[16px] bg-white border border-gray-300 rounded-full p-2.5 w-[40px] h-[40px] text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-white hover:border-white hover:bg-[#e6a208] hover:text-[#063354] hover:border-[#063354]">
              <FaCodeCompare />
            </button>

            <button className="text-[16px] bg-white border border-gray-300 rounded-full p-2.5 w-[40px] h-[40px] text-center flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-white hover:border-white hover:bg-[#e6a208] hover:text-[#063354] hover:border-[#063354]">
              <FaRegBookmark />
            </button>
          </div>
          <div className="md:p-3 p-1">
            <Image
              // src={project.thumbnailImage} // Handle potential undefined path
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project?.thumbnailImage}`}
              alt="building pic"
              className="object-fill lg:h-[356px] rounded-xl"
              width={500} // Add width and height for Next.js Image
              height={400} // Add height for Next.js Image
              style={{ borderRadius: '4px' }}
            />
          </div>
        </div>
        <div className="md:px-4 p-2">
          <h1 className="font-bold line-clamp-1 text-xl">
            {project.projectTitle}
          </h1>
          <div className="w-full flex justify-center py-2">
            <div className="flex gap-1 sm:gap-5 w-full justify-between items-center bg-white rounded-md py-2 sm:py-3">
              <div className="px-2  cursor-pointer">
                <span className="flex font-bold text-sm items-center gap-1">
                  {bedroomSvg} <span>05</span>
                </span>
                <span className="text-sm">Bedroom</span>
              </div>
              <div className="px-2 border-l-[2px] border-gray-300 cursor-pointer">
                <span className="flex font-bold text-sm items-center gap-1">
                  {bathroomSvg} <span>05</span>
                </span>
                <span className="text-sm">Bathroom</span>
              </div>
              <div className="px-2 border-l-[2px] border-gray-300 cursor-pointer">
                <span className="flex font-bold text-sm items-center gap-1">
                  {flatSizeSvg} <span>05</span>
                </span>
                <span className="text-sm">Flat size up to</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[3rem] w-full md:w-auto">
          <button className="w-full ps-7 px-4 py-1 md:text-[12px] text-sm flex cursor-pointer items-center border-t border-b-0 rounded-b-none focus:outline-none">
            <span className="mr-1">{locationSvg}</span>
            {project.projectLocation.address}
          </button>
          <Link href={`/projects/${project.id}`}>
            <button className="bg-[#063354] h-full group-hover:scale-125 text-white px-10 py-1 cursor-pointer transition group rounded-br-md">
              <span className="mt-1 my-auto shadow-lg rounded-md transition-transform duration-300 ease-in-out transform hover:scale-150 hover:shadow-xl active:scale-95">
                {ProjectCardRightArrowSvg}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default RenderProjectCards
