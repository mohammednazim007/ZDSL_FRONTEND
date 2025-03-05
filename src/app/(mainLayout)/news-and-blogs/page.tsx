/* eslint-disable react-hooks/exhaustive-deps */
'use client'

/* eslint-disable curly */
import NewsCard from '@/components/newsAndBlogs/blogDetails/NewsCard'
import DynamicTabs from '@/components/newsAndBlogs/DynamicTabs'
import FilterSection from '@/components/newsAndBlogs/Filter'
import SubHeader from '@/components/newsAndBlogs/SubHeader'
import Loader from '@/components/shared/Loder'
import SuspenseLoader from '@/components/shared/SuspenseLoader'
import { blogsQuery } from '@/constants/blogs/blogsQuery'
import useGraphQLFetchQuery from '@/hooks/useGraphQLFetchQuery'
import { IBlog, Tab } from '@/interface/newsAndBlogs'
import type { NextPage } from 'next'
import { Key, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import dummyImage from '../../../assets/newsAndBlogs/site.png'

import useFetchCategories from '@/hooks/useFetchCategories'

// Tab data for DynamicTabs
const tabsData: Tab[] = [
  {
    label: 'All Post',
    path: '/news-and-blogs?project_status=all',
    isActive: true,
  },
  {
    label: 'Real Estate',
    path: '/news-and-blogs?project_status=real_estate',
    isActive: false,
  },
  {
    label: 'News',
    path: '/news-and-blogs?project_status=news',
    isActive: false,
  },
  {
    label: 'Others',
    path: '/news-and-blogs?project_status=others',
    isActive: false,
  },
]

const NewsAndBlogs: NextPage = () => {
  const { performQuery, loading, error, fetchedData } =
    useGraphQLFetchQuery<IBlog[]>()
  const { performCategoryQuery, categories } = useFetchCategories()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const limit = 5 // Load 5 items per fetch
  const [status, setStatus] = useState<string>('all')
  const [category, setCategory] = useState<string>('')
  const [includeCategory, setIncludeCategory] = useState<boolean>(true)
  const [allFetchedData, setAllFetchedData] = useState<IBlog[]>([])

  const observer = useRef<IntersectionObserver | null>(null)

  const handleTabChange = (newStatus: string) => {
    setStatus(newStatus.toLocaleLowerCase())
    setPage(1) // Reset to first page on tab change
    setHasMore(true) // Reset the hasMore flag
    setAllFetchedData([]) // Clear previously fetched data
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setStatus(params.get('project_status') || '')
    }
  }, [])

  // Fetch blog data when the component mounts or page/filters change
  useEffect(() => {
    const fetchBlogs = async () => {
      // if (!hasMore || loading) return // No more data to fetch or already loading
      try {
        const parameters = {
          page: { value: page, type: 'Int' },
          limit: { value: limit, type: 'Int' },
          ...(status !== 'all' &&
            status !== '' && {
            blogType: { value: status, type: 'String' },
          }),
          // Add category to parameters if available in filterOptions
          ...(category &&
            includeCategory && {
            category: { value: [category], type: '[String]' },
          }),
        }

        // Perform the query
        await performQuery('blogs', blogsQuery, parameters)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchBlogs()
  }, [page, status, category, includeCategory])

  useEffect(() => {
    const getchBlogCategory = async () => {
      try {
        await performCategoryQuery('blog')
      } catch (e) {
        console.error(error)
      }
    }
    getchBlogCategory()
  }, [])

  // Update allFetchedData when fetchedData changes
  // useEffect(() => {
  //   if (fetchedData && fetchedData.length > 0) {
  //     setAllFetchedData((prev) => {
  //       const newFetchedData = fetchedData.filter(
  //         (newArticle) =>
  //           !prev.some((article) => article._id === newArticle._id)
  //       )
  //       return [...prev, ...newFetchedData]
  //     })

  //     setHasMore(fetchedData.length === limit)
  //   }
  // }, [fetchedData])

  // Callback for observing the last card
  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return // If loading, don't observe
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1) // Load more data
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="pt-24 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <SubHeader
                title="News & Blogs"
                subtitle="Find latest news and info"
              />
              <div className="flex flex-col md:flex-row md:items-end gap-2 w-full md:w-auto">
                <div className="flex-1">
                  <DynamicTabs tabs={tabsData} onTabChange={handleTabChange} />
                </div>
                <div className="lg:mt-[18px] mt-5 z-10">
                  <FilterSection
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    setIncludeCategory={setIncludeCategory}
                    includeCategory={includeCategory}
                  />
                </div>
              </div>
            </div>
          </div>

          {loading && page === 1 && <Loader />}
          {error && <p>Error: {error}</p>}

          {/* Display fetched blog data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {fetchedData &&
              fetchedData?.map(
                (article: IBlog, index: Key | null | undefined) => {
                  // console.log('article', article);
                  return (
                    <div
                      key={index}
                    // ref={index === fetchedData.length - 1 ? lastCardRef : null}
                    >
                      <NewsCard
                        image={
                          article.featuredImage
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${article?.featuredImage}`
                            : dummyImage?.src
                        }
                        title={article?.blogTitle}
                        description={article?.description}
                        date={article?.publishDate}
                        author={article?.user}
                        link={`/news-and-blogs/details/${article?._id}`}
                      />
                    </div>
                  )
                }
              )}
          </div>

          {/* Infinite scroll animation */}
          {loading && page > 1 && (
            <div className="flex justify-center items-center my-6">
              <Loader /> {/* Display spinner while fetching */}
            </div>
          )}

          {!hasMore && (
            <div className="text-center text-gray-500 mt-6">
              {/* <p>No more posts to display</p> */}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default NewsAndBlogs
