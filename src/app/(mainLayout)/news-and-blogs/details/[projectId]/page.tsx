/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client'

import topImage from '@/assets/newsAndBlogs/main.png'
import profileImage from '@/assets/newsAndBlogs/uer.png'
import CommentsForm from '@/components/newsAndBlogs/blogDetails/CommentsForm'
import PopularPost from '@/components/newsAndBlogs/blogDetails/PopularPost'
import ReplyForm from '@/components/newsAndBlogs/blogDetails/ReplyForm'
import ShowComments from '@/components/newsAndBlogs/blogDetails/ShowComments'
import ProjectCard from '@/components/Projects/ProjectCard'
import Loader from '@/components/shared/Loder'
import ResponsiveModal from '@/components/shared/responsive-modal/ResponsiveModal'
import SmallProjectCard from '@/components/shared/SmallProjectCard/SmallProjectCard'
import { cardData } from '@/data/Blogs'
import { formatTimestamp } from '@/helpers'
import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
import { IBlog } from '@/interface/newsAndBlogs'
import formatDateStamp from '@/utils/formatDateStamp'
import { gql, useMutation, useQuery } from '@apollo/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Key, useEffect, useState } from 'react'

// old code
// const fields = [
//   '_id',
//   'blogTitle',
//   'description',
//   'tag',
//   'slug',
//   'titleText',
//   'publishDate',
//   'focusKeyword',
//   'metaImage',
//   'featuredImage',
//   'blogType',
//   'featuredImage',
//   'seoMetaTitle',
//   'seoMetaDescription',
//   'permalink',
//   'isDeleted',
//   'isPopular',
//   'status',
//   'projects { projectIds { _id projectTitle bathroomNo bedroomNo flatSize projectTitle projectLocation { address } thumbnailImage } position }',
//   'views',
//   'category',
//   'comments { id postId firstName lastName phone email content createdAt }',
//   'descriptionModel { title image }',
//   'user { id userName email role isDeleted status socialAuthId userDetails {profilePic} }',
//   'popularBlogs { _id blogTitle publishDate featuredImage user { id userName email role isDeleted status socialAuthId userDetails {profilePic} }  }',
// ]

const fields = [
  '_id',
  'publishDate',
  'seoMetaDescription',
  'seoMetaTitle',
  'slug',
  'status',
  'tag',
  'views',
  'permalink',
  'blogTitle',
  'blogType',
  'category',
  'description',
  'featuredImage',
  'focusKeyword',
  'metaImage',
  'user { userName userDetails { profilePic } }',
  'popularBlogs { _id blogTitle publishDate featuredImage user { id userName email role isDeleted status socialAuthId userDetails {profilePic} }  }',
  'projects { position projectIds {_id thumbnailImage projectTitle bathroomNo bedroomNo flatSize projectLocation { address } } }',
  'comments { id firstName lastName phone email content createdAt replies { id firstName lastName phone email content createdAt } }',
]

const BLOG_COUNT_QUERY = gql`
  mutation IncrementBlogViewCount($blogId: ID!) {
    incrementBlogViewCount(blogId: $blogId) {
      success
      message
      data
    }
  }
`
export default function BlogDetails({
  params,
}: {
  params: { projectId: string }
}) {
  const [open, setOpen] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState('')
  // handle open modal
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  const [reloadData, setReloadData] = useState<number>(0)
  const { performQuery, loading, error, fetchedData } =
    useGraphQLFetchQuery<IBlog>()
  const [
    BLOG_COUNT_QUERY_FN,
    { loading: blogCountLoading, error: blogCountError, data: blogCountData },
  ] = useMutation(BLOG_COUNT_QUERY)

  useEffect(() => {
    performQuery('getSingleBlog', fields, {
      blogId: { value: params.projectId, type: 'ID!' },
    })

    // increment blog view count
    BLOG_COUNT_QUERY_FN({
      variables: {
        blogId: params.projectId,
      },
    })
  }, [params.projectId])

  if (loading || blogCountLoading) return <Loader />
  if (error) return <p>Error: {error}</p>

  console.log('single blog data ', fetchedData)
  console.log('params id ', params)

  // const comments = fetchedData?.comments || []
  // console.log('comments', comments);

  return (
    <div className="bg-[#F8FCFF]">
      <div className="container mx-auto p-4 py-7 md:py-12 lg:flex gap-8 mt-20">
        {/* Main Blog Section */}
        <div className="lg:w-2/3 relative">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden relative h-[200px] md:h-[500px] rounded-lg"
          >
            <Image
              src={
                fetchedData?.featuredImage
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${fetchedData?.featuredImage}`
                  : topImage
              }
              alt="Blog Image"
              layout="responsive"
              width={1200}
              height={500}
              className="w-full h-full rounded-lg"
            />
            {/* Blog Tag for mobile device */}
            <div className="absolute bg-[#FBF2DF] rounded-sm top-[10.5rem] w-fit left-0 right-0  py-2 px-3 z-50 md:hidden">
              {fetchedData?.tag?.[0] || 'Real Estate'}
            </div>

            {/* Blog Info */}
            <div className="absolute bottom-0 w-fit left-0 right-0 bg-white p-4 z-10 hidden md:block">
              <div className="md:flex flex-wrap items-center text-sm text-black gap-x-8 ">
                <span className="underline hidden md:block">
                  {fetchedData?.tag?.[0] || 'Real Estate'}
                </span>

                {/* Profile Image and Author Name */}
                <div className="flex items-center space-x-2 my-3 md:my-0">
                  <Image
                    src={
                      fetchedData?.user?.userDetails?.profilePic
                        ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${fetchedData?.user?.userDetails?.profilePic}`
                        : profileImage
                    }
                    alt="Author Profile Image"
                    width={30}
                    height={30}
                    className="rounded-full object-cover w-[30px] h-[30px]"
                  />
                  <span className="underline">
                    By {fetchedData?.user?.userName}
                  </span>
                </div>

                <span className="text-[#E6A206] underline">
                  {fetchedData?.publishDate &&
                    formatTimestamp(Number(fetchedData.publishDate))}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Blog Title */}
          <div className="">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:text-3xl text-2xl font-bold mt-[30px]"
            >
              {fetchedData?.blogTitle}
            </motion.h1>

            {/*====== Profile Image and Author Name for mobile device ======*/}
            <div className="flex items-center justify-between gap-x-2 md:hidden">
              <div className="flex items-center space-x-2 my-3 md:my-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${fetchedData?.user?.userDetails?.profilePic}`}
                  alt="Author Profile Image"
                  width={300}
                  height={300}
                  className="rounded-full w-[40px] h-[40px]"
                />
                <span className="text-sm">
                  By {fetchedData?.user?.userName}
                </span>
              </div>

              <span className="text-sm">
                {fetchedData?.publishDate &&
                  formatDateStamp(Number(fetchedData.publishDate))}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-[32px] text-gray-700 leading-relaxed"
          >
            {/* {fetchedData?.description} this will be dangerHTML*/}
            <p
              className="text-sm text-justify"
              dangerouslySetInnerHTML={
                fetchedData?.description
                  ? { __html: fetchedData.description }
                  : undefined
              }
            />
          </motion.div>

          {/* Cards */}
          {(!fetchedData?.projects?.position ||
            fetchedData?.projects?.position === 'center' ||
            fetchedData?.projects?.position === 'top') && (
            <div className="grid lg:grid-cols-2 grid-cols-2 mb-6">
              {Array.isArray(fetchedData?.projects?.projectIds) &&
              fetchedData?.projects?.projectIds.length > 0 ? (
                fetchedData?.projects?.projectIds.map((card, index) => (
                  <SmallProjectCard
                    key={index}
                    project={card}
                    setReloadData={setReloadData}
                  />
                ))
              ) : (
                <p>No projects available.</p>
              )}
            </div>
          )}

          {/* List */}
          <div className="p-4">
            <div className="space-y-6">
              {fetchedData?.titleText?.map((_t, index) => (
                <div key={index} className="flex items-start">
                  <div className="min-w-[12px] min-h-[12px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-1.5 mr-3"></div>
                  <p className="text-gray-700">{_t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery================= //!dot dynamice  card data */}
          <div className="grid grid-cols-1 gap-11 mt-7">
            {/* fetchData?.descriptionModel?.map */}
            {/* {cardData.map((item) => (
            <motion.div
              key={item.id}
              className={`flex flex-col ${item.imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start  overflow-hidden`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={item.imgSrc.src}
                alt={`Image for ${item.title}`}
                className="w-full  rounded-lg md:w-1/2 h-full object-cover flex-1"
              />
              <div
                className={`p-4 ${item.imageOnLeft ? 'md:pr-0' : 'md:ps-0'} flex-1 md:pt-0`}
              >
                {item.description.map((text, index) => (
                  <p
                    key={index}
                    className="text-gray-900 text-justify mb-2 text-sm"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          ))} */}
          </div>

          {/* Cards at bottom */}
          {fetchedData?.projects?.position === 'bottom' && (
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-6">
              {Array.isArray(fetchedData?.projects?.projectIds) &&
              fetchedData?.projects?.projectIds.length > 0 ? (
                fetchedData?.projects?.projectIds.map((card, index) => (
                  <ProjectCard
                    key={index}
                    project={card}
                    setReloadData={setReloadData}
                  />
                ))
              ) : (
                <p>No projects available.</p>
              )}
            </div>
          )}

          {/* Show Comments and Replay Section */}
          <ShowComments
            comments={fetchedData?.comments}
            setIsModalOpen={setOpen}
            setSelectedCommentId={setSelectedCommentId}
            blogTitle={fetchedData?.blogTitle}
            blogUrl={`${process.env.NEXT_BASE_DATA_FATCHING}/news-and-blogs/details/${fetchedData?._id}`}
          />

          {/* comments area */}
          <CommentsForm postId={params.projectId} />
        </div>

        {/* Sidebar Section */}
        <div className="lg:w-1/3">
          <h2 className="font-semibold text-lg mb-4">Most Popular Post</h2>

          {/* Popular Posts */}
          {fetchedData?.popularBlogs.map(
            (post: any, index: Key | null | undefined) => (
              <div key={index}>
                <PopularPost post={post} />
              </div>
            )
          )}
        </div>
      </div>
      {open && (
        <ResponsiveModal open={open} onClose={onCloseModal}>
          <div>
            <ReplyForm commentId={selectedCommentId} setIsModalOpen={setOpen} />
          </div>
        </ResponsiveModal>
      )}
    </div>
  )
}
