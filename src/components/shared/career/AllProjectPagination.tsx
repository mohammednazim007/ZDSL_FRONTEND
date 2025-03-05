'use client'
import { useState } from 'react'

const pageSize = 3 // Define the number of items per page
const dummyData = {
  totalCount: 45, // Total count of posts (for pagination calculation)
  posts: Array.from({ length: 45 }, (v, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    content: `Content for post ${i + 1}.`,
  })),
}

const paginationRightArray = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 9.999 9.746"
    >
      <path
        id="Icon_awesome-arrow-right"
        data-name="Icon awesome-arrow-right"
        d="M4.251,3.3l.5-.5a.533.533,0,0,1,.757,0L9.842,7.141a.533.533,0,0,1,0,.757L5.5,12.236a.533.533,0,0,1-.757,0l-.5-.5a.536.536,0,0,1,.009-.765L6.95,8.413H.536A.534.534,0,0,1,0,7.877V7.163a.534.534,0,0,1,.536-.536H6.95L4.26,4.066A.532.532,0,0,1,4.251,3.3Z"
        transform="translate(0 -2.647)"
      />
    </svg>
  </>
)

const AllProjectPagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(dummyData.totalCount / pageSize)

  const getPageNumbers = () => {
    const pages = []
    // const totalShownPages = 3; // Including the ellipses and current page

    if (totalPages <= 2) for (let i = 1; i <= totalPages; i++) pages.push(i)
    else if (currentPage <= 3) pages.push(1, 2, 3, '...', totalPages)
    else if (currentPage > 3 && currentPage < totalPages - 2)
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      )
    else
      pages.push(
        1,
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      )

    return pages
  }

  // const startIndex = (currentPage - 1) * pageSize;
  // const selectedPosts = dummyData.posts.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ fontFamily: 'Poppins' }} className=" font-semibold">
      <div className="flex  justify-end items-center space-x-1 sm:space-x-2">
        {/* Left Arrow Button */}
        <button
          className={`border sm:h-10 w-6 h-6 sm:w-10 flex justify-center items-center rotate-180 ${
            currentPage <= 1 ? 'bg-gray-200' : ''
          } sm:px-3 px-2 py-1 text-black rounded`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          {paginationRightArray} {/* SVG for left arrow */}
        </button>

        {/* Page Number Buttons */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`sm:px-4 px-2 py-1 font-sans sm:py-2 sm:h-10 w-6 h-6 sm:w-10 flex justify-center items-center border text-black ${
              currentPage === page
                ? 'bg-[#F3C65D] text-white'
                : 'bg-white text-black'
            } rounded`}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        {/* Right Arrow Button */}
        <button
          className={`border sm:h-10 w-6 h-6 sm:w-10 flex justify-center items-center ${
            currentPage === totalPages ? 'bg-gray-200' : ''
          } sm:px-3 px-2 py-1 sm:py-2 bg-white text-black rounded`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {paginationRightArray} {/* SVG for right arrow */}
        </button>
      </div>
    </div>
  )
}

export default AllProjectPagination

// import { useState } from 'react';

// const pageSize = 10;
// const dummyData = {
//   totalCount: 45, // Adjust as necessary
//   posts: Array.from({ length: 45 }, (v, i) => ({
//     id: i + 1,
//     title: `Post ${i + 1}`,
//     content: `Content for post ${i + 1}.`
//   }))
// };

// const Posts = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(dummyData.totalCount / pageSize);

//   const startIndex = (currentPage - 1) * pageSize;
//   const selectedPosts = dummyData.posts.slice(startIndex, startIndex + pageSize);

//   const getPageNumbers = () => {
//     let pages = [];
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages = [1, 2, 3, 4, '...', totalPages];
//       } else if (currentPage > 3 && currentPage < totalPages - 2) {
//         pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
//       } else {
//         pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
//       }
//     }
//     return pages;
//   };

//   return (
//     <div>
//       {selectedPosts.map(({ id, title, content }) => (
//         <div key={id} className="p-4 shadow rounded-lg">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <p>{content}</p>
//         </div>
//       ))}
//       <div className="flex justify-end items-center space-x-2 mt-4">
//         {currentPage > 1 && (
//           <button
//             className="px-4 py-2 bg-gray-200 text-black rounded"
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             {'<'}
//           </button>
//         )}
//         {getPageNumbers().map((page, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
//             onClick={() => setCurrentPage(page)}
//             disabled={page === '...'}
//           >
//             {page}
//           </button>
//         ))}
//         {currentPage < totalPages && (
//           <button
//             className="px-4 py-2 bg-gray-200 text-black rounded"
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             {'>'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Posts;

// import { useState } from 'react';

// const pageSize = 10; // Define how many items you want per page

// const Posts = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Simulate fetching data for the current page
//   const startIndex = (currentPage - 1) * pageSize;
//   const selectedPosts = dummyData.posts.slice(startIndex, startIndex + pageSize);
//   const totalPages = Math.ceil(dummyData.totalCount / pageSize);

//   return (
//     <div>
//       {selectedPosts.map(({ id, title, content }) => (
//         <div key={id} className="p-4 shadow rounded-lg">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <p>{content}</p>
//         </div>
//       ))}
//       <div className="flex justify-center space-x-2 mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Posts;

// Dami template for real server

// import { useQuery, gql } from '@apollo/client';
// import { useState } from 'react';

// const GET_POSTS = gql`
//   query GetPosts($page: Int!, $pageSize: Int!) {
//     posts(page: $page, pageSize: $pageSize) {
//       totalCount
//       posts {
//         id
//         title
//         content
//       }
//     }
//   }
// `;

// const pageSize = 10; // Define how many items you want per page

// const AllProjectsPagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const { data, loading, error } = useQuery(GET_POSTS, {
//     variables: { page: currentPage, pageSize },
//   });

//   if (loading) return <p className='text-center'>Loading...</p>;
//   if (error) return <p>Error gjh</p>;

//   const totalPages = Math.ceil(data.posts.totalCount / pageSize);

//   return (
//     <div>
//       {data.posts.posts.map(({ id, title }) => (
//         <div key={id} className="p-4 shadow rounded-lg">
//           <h2 className="text-xl font-bold">{title}</h2>
//         </div>
//       ))}
//       <div className="flex justify-center space-x-2 mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded`}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProjectsPagination;
