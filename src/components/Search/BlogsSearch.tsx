// /* eslint-disable curly */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { blogsQuery } from '@/constants/blogs/blogsQuery'
// import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
// import { IBlog } from '@/interface/newsAndBlogs'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useEffect } from 'react'
// import Loader from '../shared/Loder'
// import highlightMatch from '../shared/highlightMatchText/highlightMatch'

// interface TBlogsSearchProps {
//   search: string
// }

// const BlogsSearch = ({ search }: TBlogsSearchProps) => {
//   const { performQuery, loading, error, fetchedData } =
//     useGraphQLFetchQuery<IBlog[]>()

//   useEffect(() => {
//     if (search) {
//       // Only fetch data if search is not empty
//       const fetchBlogs = async () => {
//         try {
//           await performQuery('blogs', blogsQuery, {
//             search: { value: search, type: 'String' },
//           })
//         } catch (err) {
//           console.error('Error fetching data:', err)
//         }
//       }

//       fetchBlogs()
//     }
//   }, [search])

//   // Display message when search is empty
//   if (!search) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <h2 className="text-lg">Start searching for blogs...</h2>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <Loader />
//       </div>
//     )
//   }

//   if (error || !fetchedData || fetchedData?.length === 0) {
//     return (
//       <div className="w-full h-full flex justify-center items-center">
//         <h2 className="text-lg">No Blogs Found!</h2>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-3 w-full bg-white border p-3 rounded-md">
//       <div>
//         <p>Results found in blogs, events ({fetchedData.length})</p>
//         <p className="flex gap-1 font-semibold font-poppins mt-1">
//           <span className="text-primary">News</span>
//           <span>, Blogs, &</span>
//           <span>Events</span>
//         </p>
//       </div>
//       {fetchedData.map((blog) => (
//         <Link
//           href={`https://michiley.com/news-and-blogs/details/${blog._id}`}
//           target="_blank"
//           key={blog._id}
//           className="w-full border-t flex justify-start items-start gap-3 pt-3"
//         >
//           <div className="w-1/5 md:w-[15%]">
//             <Image
//               src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${blog.metaImage}`}
//               alt={blog.blogTitle}
//               width={140}
//               height={100}
//               className="object-cover w-full h-16 lg:h-20 rounded"
//             />
//           </div>
//           <div className="flex-grow flex flex-col items-start justify-center gap-1">
//             <h2 className="text-gray-500 font-poppins text-sm lg:text-base">
//               {blog.blogType || 'News'}
//             </h2>
//             {/* Title */}
//             <h2 className="text-lg font-semibold font-poppins">
//               {highlightMatch(blog.blogTitle, search)}
//             </h2>
//           </div>
//         </Link>
//       ))}
//     </div>
//   )
// }

// export default BlogsSearch

/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import { blogsQuery } from '@/constants/blogs/blogsQuery'
import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
import { IBlog } from '@/interface/newsAndBlogs'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Loader from '../shared/Loder'
import highlightMatch from '../shared/highlightMatchText/highlightMatch'

interface TBlogsSearchProps {
  search: string
}

const BlogsSearch = ({ search }: TBlogsSearchProps) => {
  const { performQuery, loading, error, fetchedData } =
    useGraphQLFetchQuery<IBlog[]>()

  useEffect(() => {
    if (search) {
      // Only fetch data if search is not empty
      const fetchBlogs = async () => {
        try {
          await performQuery('blogs', blogsQuery, {
            search: { value: search, type: 'String' },
          })
        } catch (err) {
          console.error('Error fetching data:', err)
        }
      }

      fetchBlogs()
    }
  }, [search])

  // Display message when search is empty
  if (!search) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-lg">Start searching for blogs...</h2>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  if (error || !fetchedData || fetchedData?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-lg">No Blogs Found!</h2>
      </div>
    )
  }

  // Count the frequency of project types
  const projectTypeCounts = fetchedData?.reduce(
    (acc, project) => {
      // Ensure projectType exists and is a string
      const typeKey = project?.blogType?.trim().toLowerCase() || 'unknown'
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
    fetchedData?.find(
      (project) =>
        project?.blogType?.trim()?.toLowerCase() === maxProjectTypeKey
    )?.blogType || ''

  return (
    <div className="flex flex-col gap-3 w-full bg-white border p-3 rounded-md">
      <div>
        <p>Results found in blogs, events ({fetchedData.length})</p>
        <p className="flex gap-1 font-semibold font-poppins mt-1">
          <span
            style={{
              color:
                maxProjectType.toLowerCase() === 'real_estate'
                  ? '#E59F00'
                  : undefined,
            }}
          >
            Blogs, &
          </span>
          <span
            style={{
              color:
                maxProjectType.toLowerCase() === 'news' ? '#E59F00' : undefined,
            }}
          >
            News
          </span>
          <span
            style={{
              color:
                maxProjectType.toLowerCase() === 'others'
                  ? '#E59F00'
                  : undefined,
            }}
          >
            Others
          </span>
        </p>
      </div>
      {fetchedData.map((blog) => (
        <Link
          href={`${process.env.NEXT_BASE_DATA_FATCHING}/news-and-blogs/details/${blog._id}`}
          target="_blank"
          key={blog._id}
          className="w-full border-t flex justify-start items-start gap-3 pt-3"
        >
          <div className="w-1/5 md:w-[15%]">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${blog.metaImage}`}
              alt={blog.blogTitle}
              width={140}
              height={100}
              className="object-cover w-full h-16 lg:h-20 rounded"
            />
          </div>
          <div className="flex-grow flex flex-col items-start justify-center gap-1">
            <h2 className="text-gray-500 font-poppins text-sm lg:text-base">
              {blog.blogType || 'News'}
            </h2>
            {/* Title */}
            <h2 className="text-lg font-semibold font-poppins">
              {highlightMatch(blog.blogTitle, search)}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BlogsSearch
