/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import arrow from '@/assets/news_blogs/arrow.png'
import buildingPic from '@/assets/news_blogs/building.png'
import profileDemi from '@/assets/news_blogs/profileDemi.jpg'
import { gql, useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ResponsiveType } from 'react-multi-carousel'
import Loader from '../shared/Loder'
import MultiCarousel from '../shared/MultiCarousel'
import SectionWrapper from '../Wrappers/SectionWrapper'

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.15,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.15,
  },
}

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
              userDetails {
                profilePic
              }
            }
            description
            slug
            publishDate
          }
          visibility
        }
      }
    }
  }
`

const LatestNewsAndBlogs = () => {
  const { loading, data, error } = useQuery(BLOGS_QUERY)

  if (error) {
    console.error('Error fetching data:', error)
    return <div>Error loading blogs.</div>
  }

  const fetchedBlogs =
    data?.getAllLatestNewsAndBlogs?.data?.[0]?.testimonials
      ?.filter((item: any) => item.visibility) // Filter visible blogs
      ?.map((item: any) => item.testimonial) || []

  console.log('Latest News & Blogs', fetchedBlogs)

  return (
    <section className="bg-[#DEE4E8] ">
      <SectionWrapper>
        <div className="flex justify-between items-center md:mb-0 mb-4">
          <h1 className="md:text-4xl text-2xl text-black md:font-medium flex md:justify-start justify-center md:w-auto w-full">
            Latest News & Blogs
          </h1>
          <Link href={'/news-and-blogs'}>
            <button className="bg-white md:flex hidden py-2 px-3 border text-sm text-[#063354] rounded-md">
              Check All
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="h-[30vh] pb-20 flex justify-center items-center">
            <Loader />
          </div>
        ) : fetchedBlogs.length ? (
          <MultiCarousel
            responsiveMobileDevicePathLink={'/news-and-blogs'}
            responsiveMobileDeviceTitle="Check All"
            animationSecond={2000}
            rightArrowId="LeatestNews$BlogsRightArrow"
            leftArrowId="LeatestNews$BlogsLeftArrow"
            responsive={responsive}
          >
            {fetchedBlogs.map((blog: any) => (
              <motion.div
                key={blog?._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="p-1.5 pb-0 me-4 border bg-white rounded-md">
                  <Image
                    src={
                      blog?.featuredImage
                        ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${blog?.featuredImage}`
                        : buildingPic
                    }
                    alt={blog?.blogTitle}
                    width={1000}
                    height={1000}
                    quality={100}
                    className="w-[512px] h-[304px] md:h-[394px] object-cover mb-2 rounded-md -px-2"
                  />
                  <div className="w-full mx-auto px-2 rounded-lg ">
                    <div className="flex items-center cursor-pointer justify-between">
                      <div className="flex gap-2 items-center">
                        <Image
                          className="w-[30px] h-[30px] rounded-full object-cover"
                          src={
                            `${process.env.NEXT_PUBLIC_MEDIA_URL}/${blog?.user?.userDetails?.profilePic}` ||
                            profileDemi
                          }
                          alt="Profile"
                          width={30}
                          height={30}
                        />
                        <p className="font-poppins md:text-base text-sm">
                          {blog?.user?.userName}
                        </p>
                      </div>
                      <p className="md:text-sm text-xs drop-shadow text-[#E6A206] font-poppins">
                        {new Date(Number(blog?.publishDate))?.toDateString()}
                      </p>
                    </div>

                    <h2 className="font-oswald md:text-2xl text-xl  text-[#063354] pt-4 pb-1 line-clamp-2 md:line-clamp-2 md:mb-4 ">
                      {blog?.blogTitle}
                    </h2>

                    <p
                      className="line-clamp-2 md:line-clamp-1 lg:line-clamp-2 font-poppins text-base text-black font-medium mb-4 hidden md:block"
                      dangerouslySetInnerHTML={{ __html: blog?.description }}
                    ></p>

                    <div className="flex font-oswald mb-8 text-[1.25rem] mt-5 justify-between items-center">
                      <span className="text-[#8198A8] underline text-[20px] capitalize md:text-base text-xs">
                        {blog?.focusKeyword}
                      </span>
                      <Link
                        href={`/news-and-blogs/details/${blog?._id}`}
                        className="text-[#063354] gap-2 font-semibold flex justify-center items-center"
                      >
                        Read post
                        <Image
                          src={arrow}
                          alt="arrow"
                          width={100}
                          height={100}
                          className="mt-1 w-[1.5063rem] h-[1.5063rem]"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </MultiCarousel>
        ) : (
          <div className="h-[30vh] pb-20 flex justify-center items-center">
            <h2 className="font-semibold text-center text-xl">
              No Blogs Found
            </h2>
          </div>
        )}
      </SectionWrapper>
    </section>
  )
}

export default LatestNewsAndBlogs
