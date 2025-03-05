/* eslint-disable react-hooks/exhaustive-deps */
import {
  bathroomSvg,
  bedroomSvg,
  flatSizeSvg,
  locationSvg,
  ProjectCardRightArrowSvg,
} from '@/constants'
import { Project } from '@/interface/Projects'
import {
  setComparedProjectsNumber,
  setUser,
} from '@/libs/redux/features/user/userSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import { useGetMeQuery } from '@/services/user/user.services'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useCallback, useEffect, useState } from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import { FaCodeCompare } from 'react-icons/fa6'

const GET_WISHLIST = gql`
  query GetWishlist {
    getMyWishList {
      success
      message
      data {
        projects {
          _id
        }
      }
    }
  }
`

const ADD_TO_WISHLIST = gql`
  mutation Mutation($input: UpdateWishListInput!) {
    updateMyWishList(input: $input) {
      success
      message
      data {
        user
        projects
      }
    }
  }
`

// Component to display project card
const SmallProjectCard = ({
  project,
  setReloadData,
}: {
  project: Project
  setReloadData: (value: number) => void
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAddedToCompare, setIsAddedToCompare] = useState(false)
  const dispatch = useAppDispatch()
  const { data: me, isLoading, isError } = useGetMeQuery(undefined)
  const [user, setCurrentUser] = useState(null)

  console.log('id ', project)

  // Set up the mutation for updating the wishlist
  const [updateMyWishList] = useMutation(ADD_TO_WISHLIST, {
    onCompleted: (data) => {
      if (data.updateMyWishList.success) console.log(data)
      // toast.success(data.updateMyWishList.message, { id: 'wishlist' })
      else console.log(data)
      // toast.error(data.updateMyWishList.message, { id: 'wishlist' })
    },
    onError: (error) => {
      // toast.error(error.message, { id: 'wishlist' })
      console.log(error)
    },
  })

  useEffect(() => {
    if (!isLoading && !isError && me?.data?.getMe?.success) {
      const payload = me?.data?.getMe?.data || { user: null, profile: null }
      setCurrentUser(payload.user)
      dispatch(setUser(payload))
    }
  }, [isLoading, isError, me, dispatch])

  useEffect(() => {
    if (!user) setIsBookmarked(false) // Reset bookmark state if no user is logged in
  }, [user])

  const {
    data: wishlistData,
    error: wishlistError,
    refetch,
  } = useQuery(GET_WISHLIST, {
    skip: !user, // Skip if no user is logged in
    // interval
    pollInterval: 1000,
  })

  useEffect(() => {
    if (wishlistData?.getMyWishList?.data?.projects && user) {
      const wishlistIds = new Set(
        wishlistData.getMyWishList.data.projects.map(
          (p: { _id: string }) => p._id
        )
      )
      setIsBookmarked(wishlistIds.has(project._id))
      // toast.success(wishlistData.getMyWishList.message, { id: 'wishlist' })
      console.log(wishlistData)
    } else if (!user) setIsBookmarked(false) // If no user is logged in, reset bookmark state

    // if (wishlistError) toast.error(wishlistError.message, { id: 'wishlist' })
    if (wishlistError) console.log(wishlistError)
  }, [wishlistData, wishlistError, project._id, user])

  // Toggle bookmark state and execute wishlist mutation
  const toggleBookmark = useCallback(async () => {
    const variables = {
      input: {
        projects: [
          {
            id: project._id,
            needsDelete: isBookmarked,
          },
        ],
      },
    }

    await updateMyWishList({ variables })
    setIsBookmarked((prev) => !prev)
    refetch() // Refresh wishlist data only
  }, [isBookmarked, project._id, refetch, updateMyWishList])

  // Checking the item is added already to compare or not
  useEffect(() => {
    const storedIds: string[] = JSON.parse(
      localStorage.getItem('projectIds') || '[]'
    )
    if (storedIds.includes(project._id)) {
      setIsAddedToCompare(true)
    }
  }, [])

  const toggleCompare = useCallback(() => {
    setIsAddedToCompare((prev) => !prev)
    let storedIds = JSON.parse(localStorage.getItem('projectIds') || '[]')
    storedIds = isAddedToCompare
      ? storedIds.filter((id: string) => id !== project._id)
      : [...storedIds, project._id]
    localStorage.setItem('projectIds', JSON.stringify(storedIds))
    dispatch(setComparedProjectsNumber(storedIds?.length || 0))
  }, [isAddedToCompare, project._id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col justify-between"
    >
      <div className="pt-2.5 mx-1 mt-8 border rounded-md shadow-lg flex flex-col select-none">
        <div className="relative">
          <div className="absolute bottom-8 right-6 flex space-x-2">
            <BookmarkButton
              isBookmarked={isBookmarked}
              toggleBookmark={toggleBookmark}
            />

            <CompareButton
              isAddedToCompare={isAddedToCompare}
              toggleCompare={toggleCompare}
            />
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project.thumbnailImage}`}
            alt={project.projectTitle}
            width={500}
            height={300}
            className="object-cover w-full h-[9rem] md:h-72 mb-4 rounded px-2"
          />
        </div>
        <ProjectDetails project={project} />
        <ProjectLocation project={project} />
      </div>
    </motion.div>
  )
}

export const BookmarkButton = memo(
  ({
    isBookmarked,
    toggleBookmark,
  }: {
    isBookmarked: boolean
    toggleBookmark: () => void
  }) => (
    <button
      onClick={toggleBookmark}
      className={`flex items-center justify-center text-[16px] bg-white rounded-full p-2.5 w-[40px] h-[40px]  ${isBookmarked ? 'bg-yellow-500 text-white' : ' border-gray-300 bg-[#063354] hover:bg-yellow-500 hover:text-white'}`}
    >
      <FaRegBookmark />
    </button>
  )
)

export const CompareButton = memo(
  ({
    isAddedToCompare,
    toggleCompare,
  }: {
    isAddedToCompare: boolean
    toggleCompare: () => void
  }) => (
    <button
      onClick={toggleCompare}
      className={`flex items-center justify-center text-[16px] bg-white rounded-full p-2.5 w-[40px] h-[40px]  ${isAddedToCompare ? 'bg-yellow-500 text-white' : ' border-gray-300 bg-[#063354] hover:bg-yellow-500 hover:text-white'}`}
    >
      <FaCodeCompare />
    </button>
  )
)

const ProjectDetails = memo(({ project }: { project: Project }) => (
  <div className="flex-grow flex flex-col justify-between">
    <Link href={`/projects/${project._id}`}>
      <h2 className="text-[#000000] text-[15px] md:text-[24px] font-semibold font-Oswald line-clamp-1 px-2">
        {project.projectTitle || ''}
      </h2>
    </Link>
    <div className="w-full flex justify-center px-2 pt-2 my-5">
      <div className="flex gap-1 sm:gap-1 w-full justify-between items-center rounded-md py-2 sm:py-3">
        <Detail
          icon={bedroomSvg}
          label="Bedroom"
          value={project?.bedroomNo || 0}
        />
        <div className="h-full w-[1px] bg-gray-300" />
        <Detail
          icon={bathroomSvg}
          label="Bathroom"
          value={project?.bathroomNo || 0}
        />
        <div className="h-full w-[1px] bg-gray-300" />
        <Detail
          icon={flatSizeSvg}
          label="Flat size up to"
          value={`${project?.flatSize || 0}`}
        />
      </div>
    </div>
  </div>
))

const Detail = memo(
  ({
    icon,
    label,
    value,
  }: {
    icon: JSX.Element
    label: string
    value: string | number
  }) => (
    <div className="flex flex-col gap-1 border-gray-300 cursor-pointer md:text-base text-xs whitespace-nowrap line-clamp-1 mb-[-11px] md:mb-[0px] ">
      <span className="flex-row lg:flex items-center gap-x-3 font-normal ">
        <span className="h-1 w-1 md:h-3 md:w-3 sm:mr-[-11px] md:mr-[4px]">
          {icon}
        </span>
        <span className="flex flex-wrap text-wrap mt-[2px]">
          <p className="font-normal text-[14px] md:text-[15px]  text-wrap">
            {value}
          </p>

          {label?.toLowerCase() === 'flat size up to' && (
            <span>
              <span className="!text-[13px] font-normal bg-orange-100 px-1 lg:hidden">
                SFT
              </span>
              <span className="!text-[13px] font-normal bg-orange-100 px-1 hidden lg:flex">
                SQFT
              </span>
            </span>
          )}
        </span>
      </span>
      <span className="hidden lg:flex">{label}</span>
    </div>
  )
)

const ProjectLocation = memo(({ project }: { project: Project }) => {
  return (
    <div className="flex h-[2.2rem] md:h-[3rem] w-full ">
      <button className="w-full px-2 flex cursor-pointer items-center border-t-2 md:text-base">
        <span className="mr-1">{locationSvg}</span>
        <span className="text-[13px] md:text-[15px] text-left  line-clamp-1 md:line-clamp-2 font-normal">
          {project.projectLocation?.address}
        </span>
      </button>

      <Link href={`/projects/${project._id}`}>
        <button className="bg-[#063354] hover:bg-[#eab308] transition-all h-full text-white px-2 py-1 md:w-[90px]">
          <span className="inline-block transition transform hover:scale-125">
            {ProjectCardRightArrowSvg}
          </span>
        </button>
      </Link>
    </div>
  )
})

export default memo(SmallProjectCard)
