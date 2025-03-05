/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import EMIFunctionalPage from '@/components/shared/EMI/EMIFunctionalPage'
import {
  getProjectDetailsQuery,
  getUnitDetailsQuery,
} from '@/constants/Projects/ProjectData'
import type {
  ProjectDetails,
  Unit,
  UnitDetails,
  UnitResponse,
} from '@/interface/ProjectDetails'
import { setComparedProjectsNumber } from '@/libs/redux/features/user/userSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import { getCookie } from '@/libs/tokenUtils'
import { gql, useMutation, useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiBookmark } from 'react-icons/bi'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { GoShareAndroid } from 'react-icons/go'
import { IoDownloadOutline, IoLogoWhatsapp } from 'react-icons/io5'
import { MdOutlineMail } from 'react-icons/md'
import compare from '../../../assets/icon/compare.png'
import homeImg from '../../../assets/icon/home.png'
import location from '../../../assets/icon/location.png'
import img1 from '../../../assets/icon/ongoing.png'
import area from '../../../assets/projects/area.png'
import bathroom from '../../../assets/projects/bathroom.png'
import bedroom from '../../../assets/projects/bedroom.png'
import belcony from '../../../assets/projects/belcony.png'
import building from '../../../assets/projects/building.png'
import car from '../../../assets/projects/car.png'
import facing from '../../../assets/projects/facing.png'
import flatSize from '../../../assets/projects/flat-size.png'
import Container from '../../shared/Container'
import ImageCard from './ImageCard'
import NearbyFacilities from './NearbyFacilities'
import ProjectProgress from './ProjectProgress'
import PropertyFeaturesCard from './PropertyFeaturesCard'
import UnitDescription from './UnitDescription'
import dynamic from 'next/dynamic'
import { useGetAllVirtualToursQuery } from '@/services/virtualTour.service'
import Loader from '@/components/shared/Loder'
import LottiePlay from '@/components/shared/LottiePlay'
import { FaCodeCompare } from 'react-icons/fa6'
// import LottiePlay from '../shared/LottiePlay'
const VirtualTourLink = dynamic(() => import('./360View'), { ssr: false })
import bg_image from '@/assets/projects/building_image.png'
import { p } from 'framer-motion/client'

const GET_MY_WISHLIST = gql`
  query GetMyWishList {
    getMyWishList {
      data {
        projects {
          _id
        }
      }
    }
  }
`

const UPDATE_MY_WISHLIST = gql`
  mutation UpdateMyWishList($input: UpdateWishListInput!) {
    updateMyWishList(input: $input) {
      data {
        user
        projects
      }
      message
      success
    }
  }
`

export default function ProjectDetails() {
  const params = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const pid = params?.id
  const [isPlaying, setIsPlaying] = useState(false)
  const {
    data: virtualTourData,
    error: virtualTourError,
    isLoading: virtualTourLoading,
  } = useGetAllVirtualToursQuery({
    projectId: pid,
    page: 1, // Optional pagination
    limit: 10, // Optional pagination
  })
  const [details, setDetails] = useState<ProjectDetails>({
    videoUrl: '',
    projectTitle: '',
    projectType: '',
    projectStatus: '',
    category: {
      categoryName: '',
    },
    salesManager: [''],
    projectLocation: {
      address: '',
    },
    aboutProject: '',
    description: '',
    isCctvAccess: false,
    projectFeatures: [
      {
        _id: '',
        name: '',
        isActive: false,
      },
    ],
    images: [{ path: '' }],
    googleMapIframeCode: '',
    balconyNo: 0,
    basementNo: 0,
    bedroomNo: 0,
    bathroomNo: 0,
    buildingStoried: 'B+G+8',
    flatSize: '',
    carParkingSlot: 0,
    unitNo: 0,
    floorNo: 0,
    landArea: '',
    projectFacing: '',
    nearbyFacilities: [],
    virtualTourLink: [
      {
        path: '',
        caption: '',
      },
    ],
    projectBrochure: '',
  })
  // console.log(details, 'line 138')
  const [unitDetails, setUnitDetails] = useState<UnitDetails>([
    {
      id: '',
      unitName: '',
      flatSize: '',
      pricePerSft: '',
    },
  ])
  const [unitId, setUnitId] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data: wishlistData, refetch } = useQuery(GET_MY_WISHLIST)
  const [updateWishlist, { loading: updatingWishlist }] =
    useMutation(UPDATE_MY_WISHLIST)

  const [isInWishlist, setIsInWishlist] = useState(false)
  // State for comparison
  const [isAddedToCompare, setIsAddedToCompare] = useState(false)

  // Check if the project is already in the comparison list
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('projectIds') || '[]')
    setIsAddedToCompare(storedIds.includes(pid))
  }, [pid])

  // Handle Compare Button Click
  const toggleCompare = useCallback(() => {
    setIsAddedToCompare((prev) => !prev)

    let storedIds = JSON.parse(localStorage.getItem('projectIds') || '[]')
    if (isAddedToCompare) {
      // Remove from compare
      storedIds = storedIds.filter((id: string) => id !== pid)
    } else {
      // Add to compare
      storedIds = [...storedIds, pid]
    }
    dispatch(setComparedProjectsNumber(storedIds?.length || 0))

    localStorage.setItem('projectIds', JSON.stringify(storedIds))
    toast.success(
      isAddedToCompare
        ? 'Project removed from comparison!'
        : 'Project added to comparison!'
    )
  }, [isAddedToCompare, pid])

  // Check if the project is already in the wishlist
  useEffect(() => {
    if (wishlistData?.getMyWishList?.data?.projects) {
      const wishlistProjectIds = wishlistData.getMyWishList.data.projects.map(
        (project: { _id: string }) => project._id
      )
      setIsInWishlist(wishlistProjectIds.includes(pid))
    }
  }, [wishlistData, pid])

  // Handle Wishlist Update
  const handleWishlistToggle = async () => {
    const input = {
      projects: [
        {
          id: pid,
          needsDelete: isInWishlist, // Remove if already in wishlist, add if not
        },
      ],
    }

    try {
      await updateWishlist({ variables: { input } })
      toast.success(
        `Project ${isInWishlist ? 'removed from' : 'added to'} wishlist!`
      )
      refetch() // Refetch wishlist data to update the UI
    } catch (error) {
      console.error('Error updating wishlist:', error)
      toast.error('Failed to update wishlist. Please try again.')
    }
  }

  useEffect(() => {
    const accessToken = getCookie('zdsl_accessToken')

    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
    }

    if (accessToken) headers['Authorization'] = accessToken

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: getProjectDetailsQuery,
        variables: {
          getProjectByIdId: pid,
        },
      }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // console.log({ pid, data }, 'PROJECT_IN_DEPTH_DATA')

        setDetails(data?.getProjectById)
      })
  }, [pid])

  useEffect(() => {
    const accessToken = getCookie('zdsl_accessToken')

    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
    }

    if (accessToken) headers['Authorization'] = accessToken
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: getUnitDetailsQuery,
        variables: {
          projectId: pid,
        },
      }),
    })
      .then((response) => response.json())

      .then(({ data }) => {
        setUnitDetails(data?.getAllUnitDetailsByProject?.data)
      })
  }, [pid])

  console.log('unprocesUnit', unitDetails)

  // const floorsData = processUnits(unitDetails)

  // console.log('process unit floorsData', floorsData)

  const handleOpenModal = (unitId: string) => {
    // console.log(unitId, '======unit')
    setUnitId(unitId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const salesManager = details?.salesManager

  // console.log('virtualTourLink', virtualTourData?.data?.getAllVirtualTour);
  // console.log('salesManager', salesManager);
  // console.log('unprocessed unitDetails', unitDetails);

  // console.log('details', details);
  
  
  
  //! static data yet

  // sharing projects
  const handleShare = (pid: any) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const url = `${process.env.NEXT_BASE_DATA_FATCHING}/projects/${pid}`
      const description = 'This is a great project. I found it interesting.'

      // Facebook Share URL
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(description)}`

      const shareWindowWidth = 800
      const shareWindowHeight = 500
      const windowFeatures = `width=${shareWindowWidth},height=${shareWindowHeight},top=${(window.innerHeight - shareWindowHeight) / 2},left=${(window.innerWidth - shareWindowWidth) / 2}`

      window.open(facebookShareUrl, 'Facebook', windowFeatures)
    } else {
      console.error('window or document is not defined')
    }
  }

  const convertYouTubeUrl = (url: string): string => {
    if (!url) {
      console.error('YouTube URL is missing!')
      return ''
    }
    try {
      const urlObj = new URL(url)

      // Check if it's a YouTube shortened URL (youtu.be)
      if (urlObj.hostname === 'youtu.be') {
        const videoId = urlObj.pathname.substring(1) // Get the video ID from the path
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`
      }

      // For regular YouTube URLs
      const videoId = urlObj.searchParams.get('v')
      if (!videoId) {
        console.error('Invalid YouTube URL: Missing video ID')
        return ''
      }

      // Extract the timestamp (if available)
      const startTime = urlObj.searchParams.get('t')?.replace('s', '') || '0'

      // Return the embed URL with the start time and autoplay
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}`
    } catch (error) {
      console.error('Error parsing YouTube URL:', error)
      return ''
    }
  }

  // =======================================================  Unit Details function =====================================

  const generateUnitHeaders = (details: any) => {
    // Ensure "Floor No" is always present
    const unitHeader = ['Floor No'];
  
    // Dynamically add unit headers based on details.unitNo
    if (details.unitNo && typeof details.unitNo === 'number') {
      for (let i = 1; i <= details.unitNo; i++) {
        unitHeader.push(`Unite ${String.fromCharCode(64 + i)}`); // Convert 1 -> A, 2 -> B, etc.
      }
    }
  
    return unitHeader;
  };
  
  const unitHeaders = generateUnitHeaders(details)



  const floorsData = unitDetails.reduce(
    (acc, unit) => {
      const { floorNo, unitName, flatSize, id } = unit;
  
      // Ensure floorNo exists and is a valid number
      if (!floorNo) {
        console.error('Missing floorNo for unit:', unit);
        return acc;
      }
  
      const parsedFloorNo = parseInt(floorNo, 10);
      if (isNaN(parsedFloorNo)) {
        console.error('Invalid floorNo value:', floorNo);
        return acc;
      }
  
      // Convert floorNo to the required format
      let displayFloorNo;
      if (parsedFloorNo < 0) {
        displayFloorNo = `B${Math.abs(parsedFloorNo)}`; // Negative floorNo as B1, B2, etc.
      } else if (parsedFloorNo === 0) {
        displayFloorNo = 'G'; // Floor 0 as G
      } else {
        displayFloorNo = parsedFloorNo.toString(); // Positive floorNo remains the same
      }
  
      // Find the existing floor
      let floor = acc.find((f) => f.floor === displayFloorNo);
  
      // If the floor does not exist, create it
      if (!floor) {
        floor = { floor: displayFloorNo, units: [] };
        acc.push(floor);
      }
  
      // Add the unit to the floor's units array
      floor.units.push({
        name: unitName,
        size: flatSize,
        id,
      });
  
      return acc;
    },
    [] as {
      floor: string;
      units: { name: string; size: string; id: string }[];
    }[]
  );
  
  // Ensure the "G" (Ground Floor) is always included
  if (!floorsData.some((floor) => floor.floor === 'G')) {
    floorsData.push({ floor: 'G', units: [] });
  }
  
  // Sort floors by their numeric value
  floorsData.sort((a, b) => {
    const parseFloor = (floor: string) => {
      if (floor === 'G') return 0; // G is treated as 0
      if (floor.startsWith('B')) return -parseInt(floor.slice(1), 10); // B1, B2, etc., as -1, -2, etc.
      return parseInt(floor, 10); // Positive numbers
    };
  
    return parseFloor(a.floor) - parseFloor(b.floor);
  });



  // console.log('details?.nearbyFacilities', details?.nearbyFacilities)
  // console.log('details?.projectBrochure', details?.projectBrochure)

  const extractIframeSrc = (iframeString: any) => {
    const match = iframeString.match(/src="([^"]+)"/) // Regular expression to extract the value of the src attribute
    return match ? match[1] : null // Return the URL or null if not found
  }
  if (virtualTourLoading) {
    return <Loader />
  }

  return (
    <>
      <Container>
        <div className="flex flex-col mt-10 lg:mt-[90px] pt-10 gap-y-6 mb-8">
          {/* gallery */}
          <div className="rounded">
            <ImageCard images={details?.images} />
          </div>

          {/* content */}
          <div className="flex flex-col gap-y-8">
            {/* project's header part */}
            <div className="flex lg:flex-row flex-col justify-between items-start">
              <div className="flex flex-col gap-y-2 lg:w-[55%] order-2 lg:order-1 flex-1 mt-5 lg:mt-0">
                <h2 className="font-oswald  lg:text-4xl sm:text-3xl text-xl font-bold text-[#063354]">
                  {details?.projectTitle}
                </h2>
                <div className="flex gap-x-4">
                  {details?.category?.categoryName ? (
                    <div className="flex items-center justify-center gap-1">
                      <Image
                        width={18}
                        height={21}
                        src={homeImg}
                        className="h-[21px] w-[18px]"
                        alt="image"
                      />
                      <h1 className="font-medium font-[family-name:var(--font-poppins)] text-[#000000ce]">
                        {details?.category?.categoryName}
                      </h1>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="flex items-center justify-center gap-1">
                    <Image
                      width={18}
                      height={21}
                      className="h-[21px] w-[18px]"
                      src={location}
                      alt="image"
                    />
                    <h1 className="font-medium font-[family-name:var(--font-poppins)] text-[#000000ce]">
                      {details?.projectLocation?.address}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="lg:w-[45%] lg:flex justify-end lg:order-2 order-1 flex-1">
                <div className="flex items-center lg:gap-x-3 gap-x-2">
                  <div className="bg-[#F8E7C0] rounded-full flex items-center gap-2 lg:px-4 px-3 lg:h-12 h-9 cursor-not-allowed">
                    <Image
                      src={img1}
                      height={21}
                      width={21}
                      className="lg:h-[21px] lg:w-[21px] h-[18px] w-[18px]"
                      alt="image"
                    />
                    <p className="font-semibold sm:text-sm text-xs">
                      {details?.projectStatus || 'Ongoing'}
                    </p>
                  </div>

                  {details?.isCctvAccess && (
                    <div className="border-[3px] border-[#ff7a85] rounded-full flex items-center gap-2 lg:px-4 px-3 lg:h-12 h-9 cursor-pointer">
                      <div className="lg:h-4 lg:w-4 h-3 w-3 bg-[#ff7a85] rounded-full" />
                      <Link href={`/projects/project-cctv/${params?.id}`}>
                        <p className="font-semibold sm:text-sm text-xs">
                          Live CC TV
                        </p>
                      </Link>
                    </div>
                  )}

                  {/* compare button */}
                  <div className="flex items-center lg:gap-x-3 gap-x-2">
                    <button
                      type="button"
                      onClick={toggleCompare}
                      className={`border lg:w-12 lg:h-12 h-9 w-9 flex items-center justify-center rounded-full ${isAddedToCompare
                        ? 'bg-yellow-500 text-white'
                        : 'group transition-all'
                        }`}
                    >
                      <FaCodeCompare
                        size={23}
                        className="h-5 w-5 transition-transform ease-in-out duration-100 group-hover:scale-90"
                      />
                    </button>
                  </div>

                  {/* wishlist */}
                  <div className="flex items-center lg:gap-x-3 gap-x-2">
                    <button
                      type="button"
                      className={`border lg:w-12 lg:h-12 h-9 w-9 flex items-center justify-center rounded-full ${isInWishlist ? 'bg-yellow-500 text-white' : 'group'
                        } transition-all`}
                      onClick={handleWishlistToggle}
                      disabled={updatingWishlist}
                    >
                      <BiBookmark
                        size={23}
                        className="h-5 w-5 transition-transform ease-in-out duration-100 group-hover:scale-90"
                      />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="border lg:w-12 lg:h-12 h-9 w-9 flex items-center justify-center rounded-full group transition-all"
                    onClick={() => handleShare(pid)}
                  >
                    <GoShareAndroid
                      size={23}
                      className="h-5 w-5 transition-transform ease-in-out duration-100 group-hover:scale-90"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* projects progress component for desktop === */}
            <div className="lg:hidden block">
              <ProjectProgress projectId={pid ?? ''} details={details} />
            </div>

            {/* dual column content */}
            <div className="lg:grid grid-cols-12 gap-16">
              <div className="col-span-8">
                <div className="flex flex-col gap-y-12">
                  {/* facilities & about */}
                  <div className="flex flex-col gap-y-6">
                    {/* === facilities */}
                    <div className="flex gap-4 items-center flex-wrap">
                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src="https://i.ibb.co.com/wKx4LZn/Group-10624.png"
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.buildingStoried || 0}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">
                          Building Storied
                        </p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={bedroom}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.bedroomNo || 0}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">Bedroom</p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={bathroom}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.bathroomNo || 0}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">
                          Bathroom
                        </p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={belcony}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.balconyNo || 0}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">Balcony</p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={facing}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {' '}
                            {details?.projectFacing || 'West'}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">Facing</p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={car}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.carParkingSlot || 0}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">
                          Car Parking
                        </p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={flatSize}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.flatSize || ''}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">
                          Flat Size (SQFT)
                        </p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={building}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.unitNo || 0}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">
                          Building Unite
                        </p>
                      </div>

                      <div className="border border-[#D9DFE3] p-4 bg-white rounded-md">
                        <div className="flex items-center gap-x-2">
                          <Image
                            height={26}
                            width={30}
                            src={area}
                            className="h-[26px] w-[30px] object-contain"
                            alt=""
                          />
                          <h2 className="font-bold text-[#042727] font-[family-name:var(--font-poppins)]">
                            {details?.landArea || ''}
                          </h2>
                        </div>
                        <p className="text-sm mt-0.5 text-[#000000]">
                          Project Land Area in Katha
                        </p>
                      </div>
                    </div>

                    {/* === about apartment */}
                    <div className="flex flex-col gap-y-4">
                      <h1 className="font-semibold font-[family-name:var(--font-poppins)] text-md text-[#042727]">
                        About the Apartment
                      </h1>
                      <p
                        className="text-sm text-justify text-[#042727]"
                        dangerouslySetInnerHTML={{
                          __html: details?.aboutProject,
                        }}
                      />

                      <p className="text-sm text-justify text-[#042727] ">
                        {details?.description}
                      </p>
                    </div>
                  </div>

                  {/* === project unit */}
                  <div className="flex flex-col gap-y-4">
                    <h1 className="font-oswald font-bold text-2xl">
                      Project Unit Details
                    </h1>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center border-separate border-spacing-3">
                        <thead>
                          <tr className="border text-sm text-left">
                            {unitHeaders?.map((header, index) => (
                              <th
                                key={index}
                                className="px-4 py-3 bg-[#F8E7C0] rounded-md font-medium whitespace-nowrap"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {floorsData?.map(({ floor, units }) => (
                            <tr
                              key={floor}
                              className="border-b border-gray-200 text-sm"
                            >
                              <td className="px-4 py-2 border bg-white rounded-md font-normal">
                                {floor}
                              </td>
                              {units?.map((unit: any, index: any) => (
                                <td
                                  key={index}
                                  className="px-4 py-2.5 border bg-white border-[#DEE4E8] rounded-md font-normal text-sm"
                                >
                                  {unit ? (
                                    <div className="flex justify-between items-center gap-x-2">
                                      <span className="whitespace-nowrap">
                                        {unit.name} ({unit.size}sqft)
                                      </span>
                                      <button
                                        type="button"
                                        className="px-4 py-1.5 rounded-md text-xs font-semibold text-black"
                                        style={{
                                          background:
                                            'linear-gradient(180deg, #F3C65D 0%, #E59F00 100%)',
                                        }}
                                        onClick={() => handleOpenModal(unit.id)}
                                      >
                                        View
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="p-3" /> // Empty placeholder for missing units
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* === Property Features */}
                  {details?.projectFeatures?.length > 0 && (
                    <div className="flex flex-col gap-y-4">
                      <h1 className="font-oswald font-semibold text-2xl">
                        Property Features
                      </h1>
                      <div className="grid grid-cols-3 gap-4">
                        {details.projectFeatures.map((feature) => (
                          <PropertyFeaturesCard
                            key={feature._id}
                            name={feature.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* === project video */}
                  {details?.videoUrl ? (
                    <div className="flex flex-col gap-y-4">
                      <h1 className="font-oswald  font-bold text-2xl">
                        Project Video
                      </h1>

                      <div className="p-2 bg-white border rounded">
                        {isPlaying ? (
                          <iframe
                            className="w-full md:h-[600px] h-[350px] rounded"
                            src={convertYouTubeUrl(details?.videoUrl || '')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay; encrypted-media; fullscreen"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            className="relative w-full md:h-[600px] h-[350px] object-center"
                            style={{
                              backgroundImage:
                                'url(https://images.unsplash.com/photo-1638454795595-0a0abf68614d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            <button
                              onClick={() => {
                                if (details?.videoUrl) {
                                  setIsPlaying(true)
                                } else {
                                  console.error('No video URL found!')
                                }
                              }}
                              className="absolute inset-0 flex items-center justify-center p-4 rounded-full"
                              style={{ background: 'rgba(0, 0, 0, 0)' }}
                            >
                              <LottiePlay
                                path="/animate-play.json"
                                height={150}
                                width={150}
                                style={{
                                  position: 'absolute',
                                  width: '105px',
                                  height: '105px',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  zIndex: 1,
                                  cursor: 'pointer',
                                }}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {/* 360 video Tour Link */}
                  {virtualTourData.length && (
                    <div>
                      <h1 className="text-2xl font-bold mb-4">360° View</h1>

                      <div className="mb-8">
                        {/* <VirtualTourLink
                     virtualTourLink={virtualTourData?.data?.getAllVirtualTour}
                    /> */}
                      </div>
                    </div>
                  )
                  }

                  {/* map view */}
                  {details?.googleMapIframeCode ? (
                    <div className="flex flex-col gap-y-4">
                      <h1 className="font-oswald  font-bold text-2xl">
                        Get Directions
                      </h1>
                      <div className="p-2 bg-white border rounded">
                        <iframe
                          title="Google maps directions"
                          //"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187886806!2d90.33728806344861!3d23.780975728279113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1728012682217!5m2!1sen!2sbd"
                          src={extractIframeSrc(details?.googleMapIframeCode)}
                          className="w-full md:h-[600px] h-[350px] rounded"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {/* nearby facilities */}
                  {details?.nearbyFacilities && (
                    <NearbyFacilities facilities={details?.nearbyFacilities} />
                  )}

                  {/* ad brochure */}
                  {details?.projectBrochure && (
                    <div
                      className="bg-[#063354] px-6 py-8 flex flex-col md:flex-row gap-x-8 rounded-md bg-no-repeat bg-right-bottom "
                      style={{
                        backgroundImage: `url(${bg_image?.src})`,
                        backgroundSize: '200px',
                      }}
                    >
                      <h2 className="text-white text-xl font-medium">
                        Download Project Brochure
                      </h2>

                      <button
                        type="button"
                        className="bg-[#f1c152] flex items-center justify-center gap-x-2 py-2 px-3 rounded-md max-w-[45%] md:max-w-[20%] mt-3 md:mt-0"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            const brochureLink = details?.projectBrochure // Drive link
                            if (brochureLink) {
                              window.open(brochureLink, '_blank') // Opens link in new tab
                            } else {
                              toast.error('Brochure link is unavailable')
                            }
                          }
                        }}
                      >
                        <IoDownloadOutline className="w-6 h-6" />
                        Download
                      </button>
                    </div>
                  )}

                  {/* EMI page functionality */}
                  <div className="border border-[#D9DFE3] rounded ">
                    <EMIFunctionalPage unitDetails={unitDetails} />
                  </div>
                </div>
              </div>

              <div className="col-span-4 mt-10 lg:mt-0">
                <div className="flex flex-col gap-y-8">
                  {/* projects progress component for mobile */}
                  <div className="lg:block hidden">
                    <ProjectProgress projectId={pid ?? ''} details={details} />
                  </div>
                  <div
                    className="p-8 border-4 rounded-lg shadow-md w-full border-[#E6A206]/50 bg-[#E6A206]/20 bg-no-repeat bg-right-top"
                    style={{
                      backgroundImage: "url('/icon/booking.png')",
                      backgroundSize: '200px',
                    }}
                  >
                    <div className="text-lg font-bold">Book a Visit</div>
                    <div className="text-gray-500 mb-4">
                      Choose a time that works for you.
                    </div>
                    {/* <Link href={'/book-a-visit'} className="mt-4"> */}
                    <Link
                      href={`/projects/booking-calender/${pid}`}
                      className="mt-4"
                    >
                      <button
                        className="px-4 py-2 bg-white text-[#E6A206] border border-[#E6A206]/50 rounded-full hover:bg-[#E6A206] hover:text-white transition duration-300 text-sm"
                      // onClick={() => toast('Coming Soon on Next Update 🎉')}
                      >
                        October, 2024
                      </button>
                    </Link>
                  </div>

                  {/* queries */}
                  <div className="p-8 border-4 rounded-lg shadow-md border-[#009898]/50">
                    <h2 className="font-oswald  text-2xl font-bold mb-6">
                      Ask about the property
                    </h2>
                    <form
                      className="space-y-4"
                      onSubmit={() => toast('Coming Soon on Next Update 🎉')}
                    >
                      <input
                        type="text"
                        placeholder="First Name"
                        className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                      <div className="flex space-x-2">
                        <select className="text-sm w-24 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400">
                          <option value="+880">+880</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                      <input
                        type="text"
                        placeholder="Subject"
                        className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                      <p className="text-xs text-gray-500 mt-4">
                        By clicking the submit button, you are accepting ZDSL’s{' '}
                        <a href="#" className="text-teal-500 underline">
                          Terms & Privacy Policy
                        </a>
                      </p>
                      <button
                        type="submit"
                        className="text-sm flex ml-auto w-fit px-4 py-2.5 bg-yellow-500 rounded hover:bg-yellow-600 transition duration-300"
                      >
                        Submit
                      </button>
                    </form>
                  </div>

                  {/* === contact with experts */}
                  <div className="">
                    <h2 className="font-oswald  text-2xl font-bold mb-6">
                      Contact with Experts
                    </h2>

                    <div className="flex flex-col gap-y-4">
                      {salesManager?.map((expert: any, index: any) => {
                        // console.log('expert', expert);
                        const contactInfo = expert?.userDetails?.contactInfo
                        const firstName = expert?.userDetails?.name?.firstName
                        const middleName = expert?.userDetails?.name?.middleName
                        const lastName = expert?.userDetails?.name?.lastName
                        const profession = expert?.userDetails?.profession
                        // console.log('contactInfo', contactInfo);
                        return (
                          <div
                            key={index}
                            className="p-4 border-4 border-[#009898]/50 rounded-lg shadow-sm bg-no-repeat bg-right-top"
                          // style={{
                          //   backgroundImage: "url('/icon/user.png')",
                          //   backgroundSize: '100px',
                          // }}
                          >
                            <div className="flex flex-col gap-y-2">
                              <div className="flex gap-x-2">
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${expert?.userDetails?.profilePic}`}
                                  height={70}
                                  width={70}
                                  alt={expert?.name}
                                  className="w-[70px] h-[70px] rounded-full object-cover mb-4"
                                />

                                <div className="flex flex-col">
                                  <h2 className="text-lg font-semibold">
                                    {firstName} {middleName} {lastName}
                                  </h2>
                                  <p className="text-sm text-red-500">
                                    {profession}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-2 flex items-center">
                                    📞{' '}
                                    <a
                                      href={`tel:${contactInfo?.phoneNo}`}
                                      className="ml-2"
                                    >
                                      {contactInfo?.phoneNo}
                                    </a>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="h-6 w-6 border rounded-full p-1 flex justify-center items-center">
                                  <FaFacebookF className="text-sm" />
                                </div>
                                <div className="h-6 w-6 border rounded-full p-1 flex justify-center items-center">
                                  <FaLinkedinIn className="text-sm" />
                                </div>
                                <div className="h-6 w-6 border rounded-full p-1 flex justify-center items-center">
                                  <MdOutlineMail className="text-sm" />
                                </div>
                                <div
                                  className="flex justify-center items-center gap-1 text-white rounded-full px-3 py-1 cursor-pointer"
                                  style={{
                                    background:
                                      'linear-gradient(180deg, #006565 0%, #00A8A8 100%)',
                                  }}
                                >
                                  <IoLogoWhatsapp className="" />
                                  <p className="text-xs">Whatsapp</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {isModalOpen && (
        <UnitDescription
          id={unitId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
