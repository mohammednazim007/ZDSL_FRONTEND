// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable curly */
// import { locationSvg } from '@/constants'
// import { Project } from '@/interface/Projects'
// import { useGetAllProjectsQuery } from '@/services/user/project.service'
// import Image from 'next/image'
// import Link from 'next/link'
// import Loader from '../shared/Loder'

// interface TProjectsSearchProps {
//   search: string
// }

// const ProjectsSearch = ({ search }: TProjectsSearchProps) => {
//   // Only fetch if a search term exists
//   const { data: projectQueryRes, isLoading } = useGetAllProjectsQuery(
//     { search },
//     { skip: !search } // Skip query if search is empty
//   )

//   // Initial state: no search input
//   if (!search) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <h2 className="text-lg">Start searching for projects...</h2>
//       </div>
//     )
//   }

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <Loader />
//       </div>
//     )
//   }

//   const projects: Project[] = projectQueryRes?.data?.getProjects?.projects || []
//   const metaData: { total: number } = projectQueryRes?.data?.getProjects
//     ?.meta || { total: 0 }

//   // No projects found
//   if (projects.length === 0) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <h2 className="text-lg">No Projects Found!</h2>
//       </div>
//     )
//   }
//   console.log('projects', projects)
//   console.log('metaData', metaData)

//   // Render projects
//   return (
//     <div className="flex flex-col gap-3 w-full bg-white border p-3 rounded-md">
//       <div>
//         <p>Results found in projects ({metaData.total})</p>
//         <p className="flex gap-1 font-semibold font-poppins mt-1">
//           <span className="text-primary">Residential</span>
//           <span>&</span>
//           <span>Commercial Projects</span>
//         </p>
//       </div>
//       {projects.map((project) => (
//         <Link
//           href={`${process.env.NEXT_BASE_DATA_FATCHING}/projects/${project._id}`}
//           target="_blank"
//           key={project._id}
//           className="w-full border-t flex justify-start items-center gap-3 pt-3"
//         >
//           <div className="w-1/5 md:w-[15%]">
//             <Image
//               src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project.thumbnailImage}`}
//               alt={project.projectTitle}
//               width={140}
//               height={100}
//               className="object-cover w-full h-16 lg:h-20 rounded"
//             />
//           </div>
//           <div className="flex-grow flex flex-col items-start justify-center gap-1">
//             <h2 className="text-gray-500 font-poppins text-xs lg:text-base">
//               {project.projectType}
//             </h2>
//             <h2 className="text-lg font-semibold font-poppins">
//               {project.projectTitle}
//             </h2>
//             <div className="w-full flex items-center gap-2 text-xs lg:text-sm">
//               <p>{locationSvg}</p>
//               <p>{project.projectLocation?.address}</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }

// export default ProjectsSearch

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable curly */
import { locationSvg } from '@/constants'
import { Project } from '@/interface/Projects'
import { useGetAllProjectsQuery } from '@/services/user/project.service'
import Image from 'next/image'
import Link from 'next/link'
import Loader from '../shared/Loder'
import highlightMatch from '../shared/highlightMatchText/highlightMatch'

interface TProjectsSearchProps {
  search: string
}

const ProjectsSearch = ({ search }: TProjectsSearchProps) => {
  // Only fetch if a search term exists
  const { data: projectQueryRes, isLoading } = useGetAllProjectsQuery(
    { search },
    { skip: !search } // Skip query if search is empty
  )

  // Initial state: no search input
  if (!search) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-lg">Start searching for projects...</h2>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  const projects: Project[] = projectQueryRes?.data?.getProjects?.projects || []
  const metaData: { total: number } = projectQueryRes?.data?.getProjects
    ?.meta || { total: 0 }

  // Count the frequency of project types
  const projectTypeCounts = projects?.reduce(
    (acc, project) => {
      // Ensure projectType exists and is a string
      const typeKey = project?.projectType?.trim().toLowerCase() || 'unknown'
      acc[typeKey] = (acc[typeKey] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Determine the most frequent project type
  const maxProjectTypeKey = Object.keys(projectTypeCounts).reduce(
    (a, b) => (projectTypeCounts[a] > projectTypeCounts[b] ? a : b),
    ''
  )

  // Find the original case for the most frequent project type
  const maxProjectType =
    projects?.find(
      (project) =>
        project?.projectType?.trim()?.toLowerCase() === maxProjectTypeKey
    )?.projectType || ''

  // No projects found
  if (projects.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-lg">No Projects Found!</h2>
      </div>
    )
  }

  // Render projects
  return (
    <div className="flex flex-col gap-3 w-full bg-white border p-3 rounded-md">
      <div>
        <p>Results found in projects ({metaData.total})</p>
        <p className="flex gap-1 font-semibold font-poppins mt-1">
          <span
            style={{
              color:
                maxProjectType.toLowerCase() === 'residential'
                  ? '#E59F00'
                  : undefined,
            }}
          >
            Residential
          </span>
          <span>&</span>
          <span
            style={{
              color:
                maxProjectType.toLowerCase() === 'commercial'
                  ? '#E59F00'
                  : undefined,
            }}
          >
            Commercial Projects
          </span>
        </p>
      </div>
      {projects.map((project) => (
        <Link
          href={`${process.env.NEXT_BASE_DATA_FATCHING}/projects/${project._id}`}
          target="_blank"
          key={project._id}
          className="w-full border-t flex justify-start items-center gap-3 pt-3"
        >
          <div className="w-1/5 md:w-[15%]">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project.thumbnailImage}`}
              alt={project.projectTitle}
              width={140}
              height={100}
              className="object-cover w-full h-16 lg:h-20 rounded"
            />
          </div>
          <div className="flex-grow flex flex-col items-start justify-center gap-1">
            <h2 className="text-gray-500 font-poppins text-xs lg:text-base">
              {project.projectType}
            </h2>
            <h2 className="text-lg font-semibold font-poppins">
              {highlightMatch(project.projectTitle, search)}
            </h2>
            <div className="w-full flex items-center gap-2 text-xs lg:text-sm">
              <p>{locationSvg}</p>
              <p>{project.projectLocation?.address}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProjectsSearch
