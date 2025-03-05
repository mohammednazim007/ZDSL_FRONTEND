/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable curly */
/* eslint-disable no-underscore-dangle */

'use client'

// external imports
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
// internal imports
import Container from '@/components/shared/Container'
import LottiePlay from '@/components/shared/LottiePlay'
import { ProjectStatus } from '@/interface/fullScreenMenu'
import Link from 'next/link'

import videoThumbnail from '../../assets/menu/video-thumbnail.png'

// import social icons
import facebook from '../../assets/social/facebook.svg'
import instagram from '../../assets/social/instagram.svg'
import linkedin from '../../assets/social/linkedin.svg'
import twitter from '../../assets/social/twitter.svg'
import youtube from '../../assets/social/youtube.svg'

import arrow from '../../assets/projects/arrow.svg'

// import our projects
import { getCookie } from '@/libs/tokenUtils'
import { useRouter } from 'next/navigation'
import plusIcon from '../../assets/icon/13.svg'
import ourCompanyProfile from '../../assets/our-company/our-company-profile.svg'
import { useGetHeadersQuery } from '@/services/header.service'
import Loader from './Loder'
import { gql, useQuery } from '@apollo/client'
import Modal from './Modal'
import ReactPlayer from 'react-player'

import { useGetBestProjectsQuery } from '@/services/bestProject.service'
import useGraphQLFetchCareerQuery from '@/hooks/useGraphQLFetchCareerQuery'
import { IJob } from '@/interface/career'
import getLimitedHtml from './getLimitedHTML/getLimitedHtml'
interface NavbarProps {
  handleManu: () => void // Define that handleManu is a function that returns void
  item?: any
}

const GET_ALL_BEST_VIDEOS = gql`
  query Query {
    getAllBestVideos {
      success
      message
      data {
        id
        heroTitle
        visibility
        isDeleted
        testimonials {
          testimonial {
            _id
            VideoTitle
            VideoUrl
            publishDate
            thumbnailImage
            videoType
            isDeleted
          }
          visibility
        }
      }
    }
  }
`

// GraphQL Query
const BLOGS_QUERY = gql`
  query Query {
    getAllLatestNewsAndBlogs {
      success
      message
      data {
        id
        heroTitle
        visibility
        testimonials {
          testimonial {
            _id
            blogTitle
            focusKeyword
            featuredImage
            publishDate
            user {
              userName
            }
            description
            slug
            publishDate
            tag
            blogType
          }
          visibility
        }
      }
    }
  }
`

// company profile
const GET_COMPANY_PROFILE = gql`
  query GetAbout {
    getAbout {
      success
      message
      data {
        CompanySections {
          title
          description
          icon
          companyProfileUrl
          videoUrl
          videoTitle
          videoDescription
          tramlineImage
        }
        isDeleted
      }
    }
  }
`

// career fields
const careerFields = [
  `   _id
      jobTitle
      jobLocation
      employmentStatus
      salary
      experience
      gender
      age
      applicationDeadline
      publishDate
      aboutJob
      jobCategory
      jobTags
      jobResponsibilities
      additionalRequirements
      compensationAndOtherBenefits
      educationalRequirements
      workPlace
      isDeleted
      status

`,
]

function OurCompany({ handleManu, item }: NavbarProps) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [file, setFile] = useState('')
  const [readMore, setReadMore] = useState<boolean>(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const { data, loading, error } = useQuery(GET_COMPANY_PROFILE)
  const ourCompanyInfo = data?.getAbout?.data[0]?.CompanySections[0]

  const companyDescription = ourCompanyInfo?.description || ''

  const handleCloseModal = () => {
    setModalOpen(false)
    setPlaying(false)
  }

  const handlePlay = () => {
    setPlaying(true)
    setFile(ourCompanyInfo?.videoUrl)
    setModalOpen(true)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkOverflow = () => {
        if (contentRef.current) {
          setIsOverflowing(
            contentRef.current.scrollHeight > contentRef.current.clientHeight
          )
        }
      }

      checkOverflow()
      window.addEventListener('resize', checkOverflow)

      return () => {
        window.removeEventListener('resize', checkOverflow)
      }
    }
  }, [ourCompanyInfo?.description])

  if (loading) {
    return <Loader />
  }

  return (
    <section className="h-full grid grid-cols-12">
      {/* our projects */}
      <div className="lg:col-span-4 col-span-12 h-full flex flex-col gap-y-4 pr-4 border-r border-gray-100">
        <p className="col-span-12 text-base font-semibold">Our Company</p>

        <div className="flex flex-col gap-y-2">
          {item?.subHeaders?.map((project: any) => {
            // console.log('our company', project);
            return (
              <Link
                key={project._id}
                onClick={() => handleManu()}
                href={project.url}
                className="bg-[#F8FAFB] p-2.5 rounded group flex gap-x-2 items-center"
              >
                <span className="p-2 bg-white flex justify-center items-center w-fit rounded group-hover:scale-105 transition-transform duration-300 ease-out">
                  {project.icon && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project.icon}`}
                      alt={project.label}
                      height={22}
                      width={22}
                      className=""
                    />
                  )}
                </span>

                <span className="text-sm font-medium font-[family-name:var(--font-poppins)] group-hover:ml-0.5 transition-all duration-300 ease-out">
                  {project.label}
                </span>
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-y-1 cursor-pointer mt-auto">
          <div
            className="relative rounded after:absolute after:content[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-black/30 after:rounded"
            onClick={handlePlay}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${ourCompanyInfo?.tramlineImage}`}
              alt="video thumbnail"
              height={183}
              width={324}
              className="w-full rounded"
            />

            <LottiePlay
              path="/animate-play.json"
              height={65}
              width={65}
              style={{
                position: 'absolute',
                width: '65px',
                height: '65px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                cursor: 'pointer',
              }}
            />

            <span className="absolute bottom-2 right-2 h-fit w-fit rounded text-xs bg-secondary text-white px-1.5 py-1">
              02:50
            </span>
          </div>

          <p className="font-semibold">{ourCompanyInfo?.videoTitle}</p>
          <p className="text-xs">{ourCompanyInfo?.videoDescription}</p>
        </div>
      </div>

      {/* our company profile */}
      <div className="lg:col-span-8 md:col-span-7 hidden h-full md:flex flex-col gap-y-4 px-4 border-l border-gray-100">
        <div className="flex items-center gap-x-2 col-span-12  ">
          <div>
            {ourCompanyInfo?.icon ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${ourCompanyInfo?.icon}`}
                alt="company profile"
                height={200}
                width={200}
                className="w-8 h-8"
              />
            ) : (
              <Image
                src={ourCompanyProfile}
                alt="company profile"
                height={200}
                width={200}
                className="w-8 h-8"
              />
            )}
          </div>

          <div>
            {ourCompanyInfo?.title && (
              <div dangerouslySetInnerHTML={{ __html: ourCompanyInfo.title }} />
            )}
          </div>
        </div>

        {/*  description */}
        <div className="flex flex-col gap-y-4 h-full">
          <article className="text-sm flex flex-col gap-y-4">
            {ourCompanyInfo?.description && (
              <p
                ref={contentRef}
                dangerouslySetInnerHTML={{
                  __html: readMore
                    ? companyDescription
                    : getLimitedHtml(companyDescription, 200),
                }}
                className={`transition-all duration-500 ${readMore ? 'max-h-none' : 'max-h-[500px] overflow-hidden'}`}
              />
            )}
            <div>
              {companyDescription?.length >= 1200 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="text-[#E9B338] cursor-pointer font-semibold border-b border-[#063354] mt-2 font-oswald text-sm select-none"
                >
                  {!readMore ? 'Read More' : 'See Less'}
                </button>
              )}
            </div>
          </article>

          <article className="mt-auto  flex lg:flex-row md:flex-col lg:items-center gap-4 justify-between">
            <div className="flex flex-col gap-y-0.5">
              <p className="font-semibold text-sm">Need Assistance?</p>
              <p className="text-xs">
                Contact our experts for personalized <br /> support and
                guidance.
              </p>
            </div>

            <Link
              href="/contact-us?source=menu_nav"
              className="font-[family-name:var(--font-poppins)] border py-2 px-8 rounded text-sm hover:bg-primary hover:border-primary transition-colors w-fit h-fit"
              onClick={() => handleManu()}
            >
              Talk to sales
            </Link>
          </article>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative w-full h-96">
          <ReactPlayer
            url={file || 'https://youtu.be/IjlYXtI2-GU?si=CT6xM42X_xyT6m3w'}
            playing={playing}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </section>
  )
}

function OurProjects({ handleManu, item }: NavbarProps) {
  const router = useRouter()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const popupRef = useRef<HTMLDivElement | null>(null)

  // Using the custom hook to fetch data
  const {
    data,
    error,
    isLoading: bestProjectLoading,
  } = useGetBestProjectsQuery({ isBestProject: true })

  const {
    data: videos,
    loading: videoLoading,
    error: videoError,
  } = useQuery(GET_ALL_BEST_VIDEOS)
  const featuredProjects = data?.data?.getProjects?.projects?.slice(0, 5)
  const featuredVideos = videos?.getAllBestVideos?.data[0]?.testimonials?.slice(
    0,
    2
  )

  // console.log('featuredVideos', videos?.getAllBestVideos?.data[0]?.testimonials);

  const getStatusClass = (status: ProjectStatus) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-gradient-to-r from-[#E59F00] to-[#F2B800] text-white rounded'
      case 'Upcoming':
        return 'bg-gradient-to-r from-[#063354] to-[#1E4E6B] text-white rounded'
      case 'Completed':
        return 'bg-gradient-to-r from-[#008585] to-[#00A99D] text-white rounded'
      default:
        return 'bg-gradient-to-r from-[#5D5F61] to-[#2D3033] text-white rounded'
    }
  }

  const handleLottieClick = (url: string) => {
    setVideoUrl(url)
    setIsModalOpen(true)
    setPlaying(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPlaying(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node))
        setIsPopupOpen(false)
    }

    if (isPopupOpen) document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopupOpen])

  // const handleClick = async (projectId: string) => {
  //   if (typeof window !== "undefined") {
  //     await router.push(`/projects/${projectId}`);
  //     // window.location.reload(); // Force reload after navigation completes
  //   }
  // };

  if (bestProjectLoading || videoLoading) {
    return <Loader />
  }
  return (
    <section className="h-full grid grid-cols-12">
      {/* our projects */}
      <div className="lg:col-span-4 col-span-12 h-full flex flex-col gap-y-4 pr-4 border-r border-gray-100">
        <p className="col-span-12 text-base font-semibold">{item?.title}</p>

        <div className="flex flex-col gap-y-2">
          {item?.subHeaders?.map((project: any) => {
            // console.log('project', project);
            return (
              <Link
                key={project._id}
                onClick={() => handleManu()}
                href={project.url}
                className="bg-[#F8FAFB] p-2.5 rounded group flex gap-x-2 items-center"
              >
                <span className="p-2 bg-white flex justify-center items-center w-fit rounded group-hover:scale-105 transition-transform duration-300 ease-out">
                  {project?.icon && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project?.icon}`}
                      alt={project.label}
                      height={22}
                      width={22}
                      className=""
                    />
                  )}
                </span>

                <span className="text-sm font-medium font-[family-name:var(--font-poppins)] group-hover:ml-0.5 transition-all duration-300 ease-out">
                  {project?.label}
                </span>
              </Link>
            )
          })}
        </div>

        <article className="mt-auto flex flex-col gap-y-6 pb-4">
          <div className="flex flex-col gap-y-0.5">
            <p className="font-semibold text-sm">Need Assistance?</p>
            <p className="text-xs">
              Contact our experts for personalized support and guidance.
            </p>
          </div>

          <Link
            href="/contact-us?source=menu_nav"
            className="font-[family-name:var(--font-poppins)] border py-2 px-8 rounded text-sm hover:bg-primary hover:border-primary transition-colors w-fit"
            onClick={handleManu}
          >
            Talk to sales
          </Link>
        </article>
      </div>

      {/* features projects */}
      <div className="lg:col-span-4 md:col-span-7 h-full hidden lg:flex flex-col gap-y-4 px-4 lg:border-x border-l border-gray-100">
        <p className="col-span-12 text-base font-semibold">Featured Projects</p>

        <div className="flex flex-col gap-y-4">
          {featuredProjects?.map((project: any, index: any) => {
            const isLastProject = index === featuredProjects.length - 1
            const borderClass = !isLastProject
              ? 'pb-4 border-b border-gray-200'
              : ''

            // console.log('featuredProjects ==>', project);

            return (
              <>
                <Link
                  href={`/projects/${project?._id}`}
                  replace
                  key={project?._id}
                >
                  <div
                    className={`flex gap-x-2 cursor-pointer group ${borderClass} font-[family-name:var(--font-poppins)]`}
                  >
                    <div className="relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project?.thumbnailImage}`}
                        alt={project?.projectTitle}
                        height={78}
                        width={78}
                        className="group-hover:scale-105 transition-transform"
                      />
                      <span
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-sm py-0.5 px-1 w-fit h-fit flex justify-center items-center text-[9px] font-medium ${getStatusClass(project.projectStatus)}`}
                      >
                        {project.projectStatus}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-0.5 w-full">
                      <p className="text-xs font-semibold">
                        {project?.projectTitle}
                      </p>
                      <p className="text-xs text-[#008585]">
                        {project?.projectLocation?.address}
                      </p>
                      <p className="text-[12px] mt-0.5 text-[#008585] flex justify-between items-center gap-x-2">
                        {new Date(
                          Number(project?.expectedStartDate)
                        ).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}

                        <span className="h-4 w-4 flex justify-center items-center bg-gradient-to-r from-[#ffb84de1] to-[#e9c706] p-1 rounded-full ml-auto">
                          <Image
                            src={arrow}
                            alt={'arrow'}
                            height={8}
                            width={10}
                            className=""
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )
          })}
        </div>
      </div>

      {/* featured videos */}
      <div className="lg:col-span-4 hidden h-full lg:flex flex-col gap-y-4 px-4 border-x border-gray-100">
        <p className="col-span-12 text-base font-semibold flex gap-x-2 items-center">
          Featured Videos{' '}
          <span className="text-red-500 bg-red-200/50 px-2 py-1 rounded-full text-xs">
            New
          </span>
        </p>

        <div className="flex flex-col gap-y-4">
          {featuredVideos?.map((project: any, index: any) => {
            return (
              <div
                key={index}
                className={`flex flex-col gap-y-1 cursor-pointer group ${index !== featuredVideos.length - 1
                    ? 'pb-4 border-b border-gray-200'
                    : ''
                  }`}
              >
                <div
                  className="relative rounded after:absolute after:content[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-black/30 after:rounded"
                  onClick={() =>
                    handleLottieClick(project?.testimonial?.VideoUrl)
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project?.testimonial?.thumbnailImage}`}
                    alt={project.testimonial?.VideoTitle}
                    height={183}
                    width={324}
                    className="w-full rounded"
                  />

                  <LottiePlay
                    path="/animate-play.json"
                    height={65}
                    width={65}
                    style={{
                      position: 'absolute',
                      width: '65px',
                      height: '65px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                      cursor: 'pointer',
                    }}
                  />

                  <span className="absolute bottom-2 right-2 h-fit w-fit rounded text-xs bg-secondary text-white px-1.5 py-1">
                    02:50
                  </span>
                </div>

                <p className="text-sm font-semibold">
                  {project?.testimonial?.VideoTitle}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative w-full h-[20rem] md:h-[27rem] ">
          <ReactPlayer
            url={videoUrl}
            playing={playing}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </section>
  )
}

function BlogsAndVideos({ handleManu, item }: NavbarProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const popupRef = useRef<HTMLDivElement | null>(null)

  const {
    data: videos,
    loading: videoLoading,
    error: videoError,
  } = useQuery(GET_ALL_BEST_VIDEOS)
  const { data, loading, error } = useQuery(BLOGS_QUERY)
  const topVideos = videos?.getAllBestVideos?.data[0]?.testimonials?.slice(0, 2)
  const newsAndBlogs =
    data?.getAllLatestNewsAndBlogs?.data[0]?.testimonials?.slice(0, 5)

  const getTagClass = (blogType: string) => {
    const lowerCaseBlogType = blogType.toLowerCase()

    if (lowerCaseBlogType.includes('blog')) {
      return 'bg-gradient-to-r from-[#efbb44] to-[#f7d266] text-white' // Blog or blog-related gradient
    } else if (lowerCaseBlogType.includes('event')) {
      return 'bg-gradient-to-r from-[#008585] to-[#4da3b3] text-white' // Event-related gradient
    } else if (
      lowerCaseBlogType.includes('real_state') ||
      lowerCaseBlogType.includes('real state') ||
      lowerCaseBlogType.includes('real') ||
      lowerCaseBlogType.includes('react_state')
    ) {
      return 'bg-gradient-to-r from-[#efba41] to-[#ffdb6c] text-white' // Real estate related gradient
    } else if (lowerCaseBlogType.includes('others')) {
      return 'bg-gradient-to-r from-[#48bb78] to-[#38a169] text-white' // Others category gradient
    } else {
      return 'bg-gradient-to-r from-[#0073e6] to-[#00bcd4] text-white' // Default gradient if no matches
    }
  }

  const handleLottieClick = (url: string) => {
    setVideoUrl(url)
    setIsModalOpen(true)
    setPlaying(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setPlaying(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node))
        setIsPopupOpen(false)
    }

    if (isPopupOpen) document.addEventListener('mousedown', handleClickOutside)
    else document.removeEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopupOpen])

  if (videoLoading || loading) {
    return <Loader />
  }
  return (
    <section className="h-full grid grid-cols-12">
      {/* blog, event & videos */}
      <div className="lg:col-span-4 col-span-12 h-full flex flex-col gap-y-4 pr-4 border-r border-gray-100">
        <p className="col-span-12 text-base font-semibold">{item?.title}</p>

        <div className="flex flex-col gap-y-2">
          {item?.subHeaders?.map((project: any) => {
            return (
              <Link
                key={project._id}
                onClick={() => handleManu()}
                href={project.url}
                className="bg-[#F8FAFB] p-2.5 rounded group flex gap-x-2 items-center"
              >
                <span className="p-2 bg-white flex justify-center items-center w-fit rounded group-hover:scale-105 transition-transform duration-300 ease-out">
                  {project?.icon && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project.icon}`}
                      alt={project.label}
                      height={22}
                      width={22}
                      className=""
                    />
                  )}
                </span>

                <span className="text-sm font-medium font-[family-name:var(--font-poppins)] group-hover:ml-0.5 transition-all duration-300 ease-out">
                  {project.label}
                </span>
              </Link>
            )
          })}
        </div>

        <article className="mt-auto flex flex-col gap-y-6 pb-4">
          <div className="flex flex-col gap-y-0.5">
            <p className="font-semibold text-sm">Need Assistance?</p>
            <p className="text-xs">
              Contact our experts for personalized support and guidance.
            </p>
          </div>

          <Link
            href="/contact-us?source=menu_nav"
            className="font-[family-name:var(--font-poppins)] border py-2 px-8 rounded text-sm hover:bg-primary hover:border-primary transition-colors w-fit"
            onClick={handleManu}
          >
            Talk to sales
          </Link>
        </article>
      </div>

      {/* blog & events */}
      <div className="lg:col-span-4 md:col-span-7 h-full hidden lg:flex flex-col gap-y-4 px-4 lg:border-x border-l border-gray-100">
        <p className="col-span-12 text-base font-semibold flex gap-x-2 items-center">
          Blog & Events{' '}
          <span className="text-red-500 bg-red-200/50 px-2 py-1 rounded-full text-xs">
            New
          </span>
        </p>

        <div className="flex flex-col gap-y-4">
          {newsAndBlogs?.map((blog: any, index: any) => {
            const isLastProject = index === newsAndBlogs.length - 1
            const borderClass = !isLastProject
              ? 'pb-4 border-b border-gray-200'
              : ''

            // console.log('single blog', blog?.testimonial?.blogType);
            return (
              <>
                <Link
                  key={index}
                  href={`/news-and-blogs/details/${blog?.testimonial?._id}`}
                >
                  <div
                    key={blog?.testimonial?._id}
                    className={`flex gap-x-2 cursor-pointer group ${borderClass}`}
                  >
                    <span>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${blog?.testimonial?.featuredImage}`}
                        alt={blog?.testimonial?.blogTitle}
                        height={78}
                        width={78}
                        className="group-hover:scale-105 transition-transform"
                      />
                    </span>
                    <div className="flex flex-col gap-y-0.5 w-full">
                      <p className="text-xs font-medium font-[family-name:var(--font-poppins)]">
                        {blog?.testimonial?.blogTitle}
                      </p>

                      <p className="text-[12px] mt-0.5 text-[#008585] flex justify-between items-center gap-x-2 font-[family-name:var(--font-poppins)]">
                        {new Date(
                          Number(blog?.testimonial?.publishDate)
                        ).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}

                        {blog?.testimonial?.blogType && (
                          <span
                            className={`text-[10px] rounded py-0.5 px-1 ${getTagClass(blog?.testimonial?.blogType)}`}
                          >
                            <span className="font-[family-name:var(--font-poppins)]">
                              {blog?.testimonial?.blogType}
                            </span>
                          </span>
                        )}

                        <span className="h-4 w-4 flex justify-center items-center bg-gradient-to-r from-[#ffb84de1] to-[#e9c706] p-1 rounded-full ml-auto">
                          <Image
                            src={arrow}
                            alt={'arrow'}
                            height={8}
                            width={10}
                            className=""
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )
          })}
        </div>
      </div>

      {/* top videos */}
      <div className="lg:col-span-4 hidden h-full lg:flex flex-col gap-y-4 px-4 border-x border-gray-100">
        <p className="col-span-12 text-base font-semibold flex gap-x-2 items-center">
          Top Videos{' '}
          <span className="text-red-500 bg-red-200/50 px-2 py-1 rounded-full text-xs">
            New
          </span>
        </p>

        <div className="flex flex-col gap-y-4">
          {topVideos?.map((project: any, index: any) => {
            return (
              <div
                key={index}
                className={`flex flex-col gap-y-1 cursor-pointer group ${index !== topVideos.length - 1
                    ? 'pb-4 border-b border-gray-200'
                    : ''
                  }`}
              >
                <div
                  className="relative rounded after:absolute after:content[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-black/30 after:rounded"
                  onClick={() =>
                    handleLottieClick(project?.testimonial?.VideoUrl)
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${project?.testimonial?.thumbnailImage}`}
                    alt={project?.testimonial?.VideoTitle}
                    height={183}
                    width={324}
                    className="w-full rounded"
                  />

                  <LottiePlay
                    path="/animate-play.json"
                    height={65}
                    width={65}
                    style={{
                      position: 'absolute',
                      width: '65px',
                      height: '65px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                      cursor: 'pointer',
                    }}
                  />

                  <span className="absolute bottom-2 right-2 h-fit w-fit rounded text-xs bg-secondary text-white px-1.5 py-1">
                    02:50
                  </span>
                </div>

                <p className="text-sm font-semibold">
                  {project?.testimonial?.VideoTitle}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="relative w-full h-[20rem] md:h-[27rem] ">
          <ReactPlayer
            url={videoUrl}
            playing={playing}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </section>
  )
}

// for mobile responsive
function MenuItems({ items, menu, handleManu }: any) {
  // console.log('MenuItems items', items);
  // console.log('menu', menu);
  return (
    <>
      {items?.map((item: any, itemIndex: number) => {
        // Normalize the strings for comparison
        const normalizedMenu = menu.replace(/[-\s]/g, '').toLowerCase()
        const normalizedTitle = item?.title.replace(/[-\s]/g, '').toLowerCase()

        const isTrue = normalizedTitle.includes(normalizedMenu)

        // console.log('single menu item', item);

        // Conditional rendering of subHeaders
        return (
          isTrue &&
          item?.subHeaders?.map((sub: any, subIndex: number) => (
            <motion.div
              key={subIndex}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={sub?.url}
                onClick={handleManu}
                role="menuitem"
                className="flex flex-row items-center gap-x-2 relative bg-gray-100 py-2 px-4 m-2 rounded md:hidden"
                aria-current={
                  menu === item?.title?.toLowerCase()?.replace(/\s+/g, '-')
                }
                tabIndex={0}
              >
                <div className="flex items-center gap-x-2">
                  {sub?.icon && (
                    <span className="p-2 border bg-white rounded-full group-hover:scale-110 transition-transform lg:block">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${sub?.icon}`}
                        alt={sub?.label}
                        height={20}
                        width={20}
                        className=""
                      />
                    </span>
                  )}
                  <article className="flex-1 flex flex-col gap-y-0.5">
                    <p className="font-semibold text-sm font-[family-name:var(--font-poppins)]">
                      {sub?.label}
                    </p>
                  </article>
                </div>
              </Link>
            </motion.div>
          ))
        )
      })}
    </>
  )
}

function FullScreenMenu({ handleManu }: NavbarProps) {
  // api call
  const { data, error, isLoading } = useGetHeadersQuery({})
  // ** API CALL
  const {
    performQuery,
    fetchedData,
    loading,
    error: CareerError,
  } = useGraphQLFetchCareerQuery<IJob[]>()
  const dynamicHeaderData = data?.data?.getHeader[0]?.data
  const items = data?.data?.getHeader[0]?.data?.sections
  const social = data?.data?.getHeader[0]?.data?.socialMedia

  const [menu, setMenu] = useState<string>('')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  //   console.log('HEADER SECTIONS ++>>', data?.data?.getHeader);
  // console.log('length of item', items[0]);

  //** CAREER API CALL HERE */

  useEffect(() => {
    const fetchCareer = async () => {
      // if (!hasMore) return // No more data to fetch

      try {
        // Perform the query to fetch data
        await performQuery('Query', 'careers', careerFields, {
          isSingleData: { value: false, type: 'boolean' },
        })
      } catch (err) {
        console.error('Error fetching career data:', err)
      }
    }

    fetchCareer()
  }, [])

  const totalCareer = fetchedData?.length
  // console.log('totalCareer', fetchedData);

  useEffect(() => {
    const accessToken = getCookie('zdsl_accessToken')
    if (accessToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  const router = useRouter()

  // new
  // Set the first menu item as active when data is available
  useEffect(() => {
    if (items.length > 0) {
      const firstItemTitle = items[0]?.title
        ?.toLowerCase()
        ?.replace(/\s+/g, '-')
      setMenu(firstItemTitle)
      setExpandedItem(firstItemTitle)
    }
  }, [items]) // Depend on 'items' to ensure it runs after data fetch

  // old code, do not delet it
  const toggleItem = (title: string) => {
    const normalizedTitle = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    if (normalizedTitle === menu) return
    setMenu(normalizedTitle)
    setExpandedItem((prev) =>
      prev === normalizedTitle ? null : normalizedTitle
    )
    // Toggle the selected item based on the current selection
    //  setSelectedItem((prev) =>
    //   prev && prev.title === item.title ? null : item
    // );
  }

  // new
  // const toggleItem = (title: string) => {
  //   console.log('title', title);
  //   const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');
  //   if (normalizedTitle === menu) return;
  //   setMenu(normalizedTitle);
  //   setExpandedItem((prev) => (prev === normalizedTitle ? null : normalizedTitle));
  // };

  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <div>Something went wrong</div>
  }
  return (
    <section className="h-full w-full flex flex-col">
      {/* items */}
      <div className="h-full w-full bg-[#F8FAFB] overflow-y-auto">
        <Container className="h-full !px-3 lg:px-0  !lg:pr-2 py-2">
          <div className="h-full w-full flex flex-col gap-y-2">
            <p className="text-lg font-semibold pt-4">Menus</p>

            <div className=" w-full grid grid-cols-12 gap-2">
              <div className="lg:col-span-3 md:col-span-4 col-span-12 h-full flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-2" role="menu">
                  {items?.map((item: any) => {
                    // console.log('title', item?.title);
                    const isExpanded =
                      expandedItem ===
                      item?.title?.toLowerCase()?.replace(/\s+/g, '-')

                    const isCareer =
                      item?.title?.toLowerCase().includes('career') ||
                      item?.title?.toLowerCase()?.includes('careers')

                    return (
                      <div
                        key={item._id}
                        role="menuitem"
                        className={`p-4 group hover:bg-white transition-colors rounded cursor-pointer
        ${menu === item?.title?.toLowerCase()?.replace(/\s+/g, '-') ? 'bg-white' : ''}
      `}
                        onClick={() => {
                          toggleItem(item?.title)
                          if (item?.url) {
                            router.push(item?.url)
                            handleManu()
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ')
                            toggleItem(item?.title)
                        }}
                        aria-current={
                          menu ===
                          item?.title?.toLowerCase()?.replace(/\s+/g, '-')
                        }
                        tabIndex={0}
                      >
                        <div
                          className={`flex flex-row items-center gap-x-2 relative`}
                        >
                          <span className="p-2 border bg-white rounded-full group-hover:scale-105 transition-transform duration-300 ease-out lg:block">
                            {item?.icon && (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${item?.icon}`}
                                alt={item?.title}
                                height={20}
                                width={20}
                                className=""
                              />
                            )}
                          </span>
                          <article className=" flex-1 flex flex-col gap-y-0.5 mb-2 group-hover:ml-0.5 transition-all duration-300 ease-out ">
                            <p className="font-semibold text-sm relative">
                              {item?.title}
                              {isCareer && (
                                <span className="absolute top-0 right-[100px] -mt-2 -mr-2 w-[20px] h-[21px] flex items-center justify-center rounded-full text-[12px] font-medium bg-[#FF7A85] text-white">
                                  {totalCareer}
                                </span>
                              )}
                            </p>

                            <p className="text-xs">{item.description}</p>
                          </article>

                          {!item.url && (
                            <>
                              {!isExpanded ? (
                                <span className="ml-auto md:hidden">
                                  <Image
                                    src={plusIcon}
                                    alt={item?.title}
                                    height={10}
                                    width={10}
                                    className=""
                                  />
                                </span>
                              ) : (
                                <span className="ml-auto text-xl text-gray-500 md:hidden">
                                  -
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        {isExpanded &&
                          item?.title?.toLowerCase()?.replace(/\s+/g, '-') ===
                          'our-project' && (
                            <MenuItems items={items} menu={menu} />
                          )}
                        {isExpanded &&
                          item?.title?.toLowerCase()?.replace(/\s+/g, '-') ===
                          'our-company' && (
                            <MenuItems items={items} menu={menu} />
                          )}
                        {isExpanded &&
                          item?.title?.toLowerCase()?.replace(/\s+/g, '-') ===
                          'blogs-and-video' && (
                            <MenuItems items={items} menu={menu} />
                          )}
                      </div>
                    )
                  })}
                </div>

                {/* Authentication buttons */}
                <div className=" flex gap-[15px]">
                  {isLoggedIn ? (
                    <Link
                      href="/dashboard/user/my-properties"
                      onClick={handleManu}
                    >
                      <button className="bg-gradient-to-b from-[#F3C65D] to-[#E59F00] w-[140px] lg:w-[150.09px] h-[45px] lg:h-[50px] rounded-[5px] font-[family-name:var(--font-poppins)] text-sm">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" onClick={handleManu}>
                        <button
                          // style={{ border: "0.5px solid #D9DFE3", background: "#FFFFFF" }}
                          className="w-[140px] lg:w-[150.09px] h-[45px] lg:h-[50px] rounded-[5px] text-[16px] font-poppins bg-[#FFFFFF] border-[.5px] hover:bg-gradient-to-b hover:from-[#F3C65D] hover:to-[#E59F00] hover:border-none font-[family-name:var(--font-poppins)] text-sm"
                        >
                          Login
                        </button>
                      </Link>

                      <Link href="/register" onClick={handleManu}>
                        <button className="bg-gradient-to-b from-[#F3C65D] to-[#E59F00] w-[140px] lg:w-[150.09px] h-[45px] lg:h-[50px] rounded-[5px] font-[family-name:var(--font-poppins)] text-sm">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Content section */}
              <div className="lg:col-span-9 md:col-span-8 col-span-12 h-full p-4 bg-white rounded hidden md:block">
                {items?.map((item: any) => {
                  const isExpanded =
                    expandedItem ===
                    item?.title?.toLowerCase()?.replace(/\s+/g, '-')
                  return (
                    isExpanded && (
                      <motion.div
                        key={item._id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '100%', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {menu === 'our-project' && (
                          <OurProjects
                            item={item}
                            handleManu={function (): void {
                              // Define that handleManu is a function that returns void
                              throw new Error('Function not implemented.')
                            }}
                          />
                        )}

                        {menu === 'our-project' && (
                          <MenuItems
                            items={items}
                            menu={menu}
                            handleManu={handleManu}
                          />
                        )}
                        {menu === 'our-company' && (
                          <OurCompany
                            item={item}
                            handleManu={function (): void {
                              // Define that handleManu is a function that returns void
                              throw new Error('Function not implemented.')
                            }}
                          />
                        )}
                        {menu === 'blogs-and-video' && (
                          <BlogsAndVideos
                            item={item}
                            handleManu={function (): void {
                              // Define that handleManu is a function that returns void
                              throw new Error('Function not implemented.')
                            }}
                          />
                        )}
                      </motion.div>
                    )
                  )
                })}
              </div>
            </div>

            {/* follow us */}
            <article className="flex flex-col gap-y-1 py-2 pb-20 md:pb-5">
              <p className="text-sm font-medium">Follow Us —</p>
              <div className="flex gap-x-0.5">
                {/* facebook */}
                {social?.facebook && (
                  <Link
                    href={social?.facebook}
                    className="group"
                    role="button"
                    tabIndex={0}
                  >
                    <Image
                      src={facebook}
                      alt={'facebook'}
                      height={40}
                      width={40}
                      className="group-hover:scale-110 hover:animate-pulse transition-transform"
                    />
                  </Link>
                )}
                {/* twitter*/}
                {social?.twitter && (
                  <Link
                    href={social?.twitter}
                    className="group"
                    role="button"
                    tabIndex={0}
                  >
                    <Image
                      src={twitter}
                      alt={'twitter'}
                      height={40}
                      width={40}
                      className="group-hover:scale-110 hover:animate-pulse transition-transform"
                    />
                  </Link>
                )}
                {/* linkedIn */}
                {social?.linkedin && (
                  <Link
                    href={social?.linkedin}
                    className="group"
                    role="button"
                    tabIndex={0}
                  >
                    <Image
                      src={linkedin}
                      alt={'linkedin'}
                      height={40}
                      width={40}
                      className="group-hover:scale-110 hover:animate-pulse transition-transform"
                    />
                  </Link>
                )}
                {/* instagram */}
                {social?.instagram && (
                  <Link
                    href={social?.instagram}
                    className="group"
                    role="button"
                    tabIndex={0}
                  >
                    <Image
                      src={instagram}
                      alt={'instagram'}
                      height={40}
                      width={40}
                      className="group-hover:scale-110 hover:animate-pulse transition-transform"
                    />
                  </Link>
                )}
                {/* youtube */}
                {social?.youtube && (
                  <Link
                    href={social.youtube}
                    className="group"
                    role="button"
                    tabIndex={0}
                  >
                    <Image
                      src={youtube}
                      alt={'youtube'}
                      height={40}
                      width={40}
                      className="group-hover:scale-110 hover:animate-pulse transition-transform"
                    />
                  </Link>
                )}
              </div>
            </article>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default FullScreenMenu
