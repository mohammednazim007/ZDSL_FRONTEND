// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { useCallback, useState } from 'react'
import ResponsiveModal from '../shared/responsive-modal/ResponsiveModal'
import Image from 'next/image'
import { bangladeshBounds, customMarkerIcon } from './map.constance'
import { gql, useQuery } from '@apollo/client'
import avatarProfile from '@/assets/image/avatarProfile.png'
import Loader from '../shared/Loder'
import Link from 'next/link'
import { TCoordinate } from './type'
import { GeoLocationQuery, PROJECT_DETAILS_QUERY } from './geo.query'

const GeoLocation = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [projectId, setProjectId] = useState<string>('')
  const { data } = useQuery(GeoLocationQuery)
  const {
    data: projectDetails,
    loading,
    error,
  } = useQuery(PROJECT_DETAILS_QUERY, {
    variables: { getProjectByIdId: projectId },
    skip: !projectId, // Skip the query if projectId is empty
  })

  // handle open modal
  const onCloseModal = () => setOpen(false)

  // Handler for marker click event
  const handleMarkerClick = useCallback((id: string) => {
    setProjectId(id) // for testing '674a98f9dbe658fc14b58826'
    setOpen(true)
  }, [])

  // coordinate array
  const allCoordinates = data?.getProjects?.projects
  const coordinateArray = allCoordinates?.filter(
    (coordinate: TCoordinate) =>
      coordinate?.projectLocation?.coordinate !== null
  )
  const singleProject = projectDetails?.getProjectById

  return (
    <div>
      <MapContainer
        center={[23.8103, 90.4125]} // Center on Bangladesh
        zoom={5}
        minZoom={7}
        maxZoom={9}
        maxBounds={bangladeshBounds}
        maxBoundsViscosity={1.0} // Keeps the map from dragging out of bounds
        scrollWheelZoom={true} // Allow zooming
        dragging={true} // Allow dragging but restricted to bounds
        style={{ height: '700px' }}
        className="w-full rounded-md overflow-hidden"
        data-aos="fade-up"
      >
        {/* Use a lighter, faded map style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {coordinateArray?.length > 0 &&
          coordinateArray?.map((marker: TCoordinate) => (
            <Marker
              key={marker?._id}
              position={marker?.projectLocation?.coordinate}
              icon={customMarkerIcon}
              eventHandlers={{
                click: () => handleMarkerClick(marker?._id), // Add click event handler here
              }}
            >
              {/* <Popup>{marker.popup}</Popup> */}
            </Marker>
          ))}
      </MapContainer>

      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <ResponsiveModal open={open} onClose={onCloseModal}>
          <div className="p-2">
            <div className="w-full md:h-[15rem] overflow-hidden rounded-md mb-2">
              <Image
                width={1000}
                height={1000}
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${singleProject?.thumbnailImage}`}
                alt="property"
                quality={100}
                className="rounded-md object-bottom ring-2"
              />
            </div>

            <div className="bg-orange-100 rounded-md p-5 pb-3 ">
              <div className="text-left flex flex-col ">
                <div className="flex flex-col gap-y-0.5 mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 my-0 uppercase">
                    {singleProject?.projectType || ''}
                  </h2>
                  <p className="text-gray-700 !my-0">
                    {singleProject?.projectLocation?.address}
                  </p>
                </div>
                {/* manager details */}
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 my-0 uppercase mb-1">
                    Sales Manager:
                  </h2>
                  <div className=" md:flex items-center gap-6 ">
                    {singleProject?.salesManager?.map(
                      (manager: any, index: number) => (
                        <div key={index}>
                          <div className="flex items-center space-x-2 md:space-x-3 space-y-1">
                            <Image
                              src={
                                `${process.env.NEXT_PUBLIC_MEDIA_URL}/${manager?.userDetails?.profilePic}` ||
                                avatarProfile
                              }
                              alt={manager?.name?.firstName}
                              width={50}
                              height={50}
                              className="rounded-full w-8 h-8 ring-1"
                            />
                            <span className="uppercase">
                              {manager?.userDetails?.name?.firstName}{' '}
                              {manager?.userDetails?.name?.lastName}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                {/* project details */}
                <div className="flex flex-col gap-y-1">
                  <h2 className="text-lg font-semibold text-gray-900 my-0 uppercase">
                    Project Location
                  </h2>

                  <ul className="text-gray-800">
                    <li>
                      <span className="font-semibold">Address:</span>{' '}
                      {singleProject?.projectLocation?.address}
                    </li>
                    <li>
                      <span className="font-semibold">City:</span>{' '}
                      {singleProject?.projectLocation?.city}
                    </li>
                    <li>
                      <span className="font-semibold">Land Area:</span>{' '}
                      {singleProject?.landArea}
                    </li>
                    <li>
                      <span className="font-semibold">Project zoon:</span>{' '}
                      {singleProject?.projectLocation?.projectZone}
                    </li>
                    <li>
                      <span className="font-semibold">Size of Units:</span>{' '}
                      {singleProject?.flatSize} sft
                    </li>
                  </ul>
                </div>
              </div>
              {/* button */}
              <Link
                href={`/projects/${projectId}`}
                className="w-full md:w-[30%] text-center py-1 mt-4 px-4 rounded-md bg-[#063354] hover:text-[#063354] hover:bg-[#EAB308] text-white block"
              >
                More details
              </Link>
            </div>
          </div>
        </ResponsiveModal>
      )}
    </div>
  )
}

export default GeoLocation

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import { MapContainer, Marker, TileLayer } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import { useCallback, useState } from 'react'
// import ResponsiveModal from '../shared/responsive-modal/ResponsiveModal'
// import Image from 'next/image'
// import { bangladeshBounds, customMarkerIcon } from './map.constance'
// import { gql, useQuery } from '@apollo/client'
// import avatarProfile from '@/assets/image/avatarProfile.png'
// import Loader from '../shared/Loder'
// import Link from 'next/link'
// import { TCoordinate } from './type'
// import { GeoLocationQuery, PROJECT_DETAILS_QUERY } from './geo.query'

// const GeoLocation = () => {
//   const [open, setOpen] = useState<boolean>(false)
//   const [projectId, setProjectId] = useState<string>('')
//   const { data } = useQuery(GeoLocationQuery)
//   const {
//     data: projectDetails,
//     loading,
//     error,
//   } = useQuery(PROJECT_DETAILS_QUERY, {
//     variables: { getProjectByIdId: projectId },
//     skip: !projectId, // Skip the query if projectId is empty
//   })

//   // handle open modal
//   const onCloseModal = () => setOpen(false)

//   // Handler for marker click event
//   const handleMarkerClick = useCallback((id: string) => {
//     setProjectId(id) // for testing '674a98f9dbe658fc14b58826'
//     setOpen(true)
//   }, [])

//   // coordinate array
//   const allCoordinates = data?.getProjects?.projects
//   const coordinateArray = allCoordinates?.filter(
//     (coordinate: TCoordinate) =>
//       coordinate?.projectLocation?.coordinate !== null
//   )
//   const singleProject = projectDetails?.getProjectById

//   return (
//     <div>
//       <MapContainer
//         center={[23.8103, 90.4125]} // Center on Bangladesh
//         zoom={12}
//         minZoom={7}
//         maxZoom={18}
//         maxBounds={bangladeshBounds}
//         maxBoundsViscosity={1.0} // Keeps the map from dragging out of bounds
//         scrollWheelZoom={true} // Allow zooming
//         dragging={true} // Allow dragging but restricted to bounds
//         style={{ height: '700px' }}
//         className="w-full rounded-md overflow-hidden"
//         data-aos="fade-up"
//       >
//         {/* Google Maps styled tile layer */}
//         <TileLayer
//           attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
//           url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
//           subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
//         />
//         {coordinateArray?.length > 0 &&
//           coordinateArray?.map((marker: TCoordinate) => (
//             <Marker
//               key={marker?._id}
//               position={marker?.projectLocation?.coordinate}
//               icon={customMarkerIcon}
//               eventHandlers={{
//                 click: () => handleMarkerClick(marker?._id), // Add click event handler here
//               }}
//             >
//               {/* <Popup>{marker.popup}</Popup> */}
//             </Marker>
//           ))}
//       </MapContainer>

//       {loading ? (
//         <div className="flex items-center justify-center w-full h-full">
//           <Loader />
//         </div>
//       ) : (
//         <ResponsiveModal open={open} onClose={onCloseModal}>
//           <div className="p-2">
//             <div className="w-full md:h-[15rem] overflow-hidden rounded-md mb-2">
//               <Image
//                 width={1000}
//                 height={1000}
//                 src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${singleProject?.thumbnailImage}`}
//                 alt="property"
//                 quality={100}
//                 className="rounded-md object-bottom ring-2"
//               />
//             </div>

//             <div className="bg-orange-100 rounded-md p-5 pb-3 ">
//               <div className="text-left flex flex-col ">
//                 <div className="flex flex-col gap-y-0.5 mb-2">
//                   <h2 className="text-lg font-semibold text-gray-900 my-0 uppercase">
//                     {singleProject?.projectType || ''}
//                   </h2>
//                   <p className="text-gray-700 !my-0">
//                     {singleProject?.projectLocation?.address}
//                   </p>
//                 </div>
//                 {/* manager details */}
//                 <div className="mb-2">
//                   <h2 className="text-lg font-semibold text-gray-900 my-0 uppercase mb-1">
//                     Sales Manager:
//                   </h2>
//                   <div className=" md:flex items-center gap-6 ">
//                     {singleProject?.salesManager?.map(
//                       (manager: any, index: number) => (
//                         <div key={index}>
//                           <div className="flex items-center space-x-2 md:space-x-3 space-y-1">
//                             <Image
//                               src={
//                                 `${process.env.NEXT_PUBLIC_MEDIA_URL}/${manager?.userDetails?.profilePic}` ||
//                                 avatarProfile
//                               }
//                               alt={manager?.name?.firstName}
//                               width={50}
//                               height={50}
//                               className="rounded-full w-8 h-8 ring-1"
//                             />
//                             <span className="uppercase">
//                               {manager?.userDetails?.name?.firstName}{' '}
//                               {manager?.userDetails?.name?.lastName}
//                             </span>
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//                 {/* project details */}
//                 <div className="flex flex-col gap-y-1">
//                   <h2 className="text-lg font-semibold text-gray-900 my-0 uppercase">
//                     Project Location
//                   </h2>

//                   <ul className="text-gray-800">
//                     <li>
//                       <span className="font-semibold">Address:</span>{' '}
//                       {singleProject?.projectLocation?.address}
//                     </li>
//                     <li>
//                       <span className="font-semibold">City:</span>{' '}
//                       {singleProject?.projectLocation?.city}
//                     </li>
//                     <li>
//                       <span className="font-semibold">Land Area:</span>{' '}
//                       {singleProject?.landArea}
//                     </li>
//                     <li>
//                       <span className="font-semibold">Project zoon:</span>{' '}
//                       {singleProject?.projectLocation?.projectZone}
//                     </li>
//                     <li>
//                       <span className="font-semibold">Size of Units:</span>{' '}
//                       {singleProject?.flatSize} sft
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               {/* button */}
//               <Link
//                 href={`/projects/${projectId}`}
//                 className="w-full md:w-[30%] text-center py-1 mt-4 px-4 rounded-md bg-[#063354] hover:text-[#063354] hover:bg-[#EAB308] text-white block"
//               >
//                 More details
//               </Link>
//             </div>
//           </div>
//         </ResponsiveModal>
//       )}
//     </div>
//   )
// }

// export default GeoLocation
