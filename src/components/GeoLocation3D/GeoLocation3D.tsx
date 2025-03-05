/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { useCallback, useEffect, useState } from 'react'
import ResponsiveModal from '../shared/responsive-modal/ResponsiveModal'
import Image from 'next/image'
import { bangladeshBounds, customMarkerIcon } from './map_3d.constance'
import { gql, useQuery } from '@apollo/client'
import avatarProfile from '@/assets/image/avatarProfile.png'
import Loader from '../shared/Loder'
import Link from 'next/link'
import { TCoordinate } from './mapType'
import { GeoLocationQuery, PROJECT_DETAILS_QUERY } from './query_map'
import { motion } from 'framer-motion'

const GeoLocation3D = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(true)
  const [projectId, setProjectId] = useState<string>('')
  const [isHovered, setIsHovered] = useState<boolean>(false) // Track hover state

  const { data } = useQuery(GeoLocationQuery)
  const { data: projectDetails, loading } = useQuery(PROJECT_DETAILS_QUERY, {
    variables: { getProjectByIdId: projectId },
    skip: !projectId,
  })

  const onCloseModal = () => setOpen(false)

  const handleMarkerClick = useCallback((id: string) => {
    setProjectId(id)
    setOpen(true)
  }, [])

  const allCoordinates = data?.getProjects?.projects
  const coordinateArray = allCoordinates?.filter(
    (coordinate: TCoordinate) =>
      coordinate?.projectLocation?.coordinate !== null
  )

  const singleProject = projectDetails?.getProjectById

  // Custom component to control zoom behavior
  const ZoomControlHandler = () => {
    const map = useMap()

    const handleWheel = (event: WheelEvent) => {
      if (isHovered && event.ctrlKey) {
        event.preventDefault() // Prevent page zoom
        if (event.deltaY > 0) {
          map.zoomOut()
        } else {
          map.zoomIn()
        }
      }
    }

    useEffect(() => {
      window.addEventListener('wheel', handleWheel, { passive: false })
      return () => window.removeEventListener('wheel', handleWheel)
    }, [isHovered])

    return null
  }

  return (
    <div className="w-full max-w-[1920px] h-[50vh] md:h-[720px] mb-[80px] md:mb-[120px] mx-auto p-4 bg-white">
      <h1 className="md:text-5xl text-3xl text-center md:pb-10 pb-6">
        All Projects Location
      </h1>
      <div className="relative group w-full h-full">
        <div
          className="w-full h-full"
          onMouseEnter={() => setIsHovered(true)} // Hover starts
          onMouseLeave={() => setIsHovered(false)} // Hover ends
        >
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={7}
            minZoom={8}
            maxZoom={18}
            maxBounds={bangladeshBounds}
            scrollWheelZoom={false} // Disable default scroll zoom
            className="w-full h-full rounded-lg shadow-lg z-0"
            data-aos="fade-up"
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">Carto</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {coordinateArray?.map((marker: TCoordinate) => (
              <Marker
                key={marker?._id}
                position={marker?.projectLocation?.coordinate}
                icon={customMarkerIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(marker?._id),
                }}
              />
            ))}
            <ZoomControlHandler />
          </MapContainer>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <ResponsiveModal open={open} onClose={onCloseModal}>
            <div className="p-4 space-y-4">
              <div className="w-full h-56 overflow-hidden rounded-md">
                <Image
                  width={1000}
                  height={1000}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${singleProject?.thumbnailImage}`}
                  alt="property"
                  quality={100}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="bg-orange-100 rounded-md p-4 space-y-3">
                <h2 className="uppercase font-semibold text-lg">
                  {singleProject?.projectType || ''}
                </h2>
                <p>{singleProject?.projectLocation?.address}</p>

                <h3 className="font-semibold text-base">Sales Manager:</h3>
                <div className="flex flex-wrap gap-4">
                  {singleProject?.salesManager?.map(
                    (manager: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <Image
                          src={
                            `${process.env.NEXT_PUBLIC_MEDIA_URL}/${manager?.userDetails?.profilePic}` ||
                            avatarProfile
                          }
                          alt={manager?.name?.firstName}
                          width={40}
                          height={40}
                          className="rounded-full border w-10 h-10"
                        />
                        <span className="uppercase font-medium">
                          {manager?.userDetails?.name?.firstName}{' '}
                          {manager?.userDetails?.name?.lastName}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <h3 className="font-semibold text-base">Project Details:</h3>
                <ul className="space-y-1">
                  <li>
                    <strong>Address:</strong>{' '}
                    {singleProject?.projectLocation?.address}
                  </li>
                  <li>
                    <strong>City:</strong>{' '}
                    {singleProject?.projectLocation?.city}
                  </li>
                  <li>
                    <strong>Land Area:</strong> {singleProject?.landArea}
                  </li>
                  <li>
                    <strong>Size of Units:</strong> {singleProject?.flatSize}{' '}
                    sft
                  </li>
                </ul>

                <Link
                  href={`/projects/${projectId}`}
                  className="block text-center bg-[#073354] hover:text-[#073354] hover:bg-[#EAB308] text-white py-2 transition-all rounded-md uppercase font-medium"
                >
                  More Details
                </Link>
              </div>
            </div>
          </ResponsiveModal>
        )}

        {active && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/15 z-50 flex justify-center items-center text-[#eaae23] top-0 left-0 w-full h-full"
            onClick={() => setActive(false)}
          >
            <motion.span
              transition={{ duration: 0.5 }}
              className="hidden group-hover:flex md:text-xl font-semibold bg-slate-700 rounded-sm p-1 px-2"
            >
              click & ctrl + scroll to zoom
            </motion.span>
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default GeoLocation3D
