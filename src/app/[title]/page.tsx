'use client'
import { gql, useQuery } from '@apollo/client'
import { usePathname } from 'next/navigation'
import HomeWrapper from '@/components/Wrappers/HomeWrapper'
import RootFooter from '@/components/shared/Footer/RootFooter'
import BottomNav from '@/components/shared/BottomNav/BottomNavbar'
import Head from 'next/head'
import Loader from '@/components/shared/Loder'

const GET_PAGE = gql`
  query GetNewPages($link: String) {
    getNewPages(link: $link) {
      success
      message
      data {
        id
        title
        link
        contain
        metaTitle
        metaDescription
        keywords
        metaImage
        isActive
        isDeleted
      }
    }
  }
`

const CustomPage = () => {
  const pathName = usePathname()
  const { data, loading, error } = useQuery(GET_PAGE, {
    variables: {
      link: `${process.env.NEXT_BASE_DATA_FATCHING}/${pathName}`,
    },
  })

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    )
  if (error) return <div>Error loading page: {error.message}</div>

  const pageData = data?.getNewPages?.data[0]

  if (!pageData || !pageData.isActive || pageData.isDeleted) {
    return <div>No content available for this page.</div>
  }

  return (
    <>
      <Head>
        <title>{pageData.metaTitle || 'Default Title'}</title>
        <meta
          name="description"
          content={pageData.metaDescription || 'Default Description'}
        />
        <meta name="keywords" content={pageData.keywords?.join(', ') || ''} />
        <meta
          property="og:image"
          content={`https://your-image-cdn.com/${pageData.metaImage}`}
        />
      </Head>
      <HomeWrapper>
        <main className="overflow-x-hidden pt-32">
          <div className=" mx-auto container lg:w-[60%] md:w-[70%] w-[80%]">
            {' '}
            <div className="text-center text-3xl font-bold mb-8">
              <h1
                className=" text-[#000000] font-Oswald capitalize"
                dangerouslySetInnerHTML={{
                  __html: pageData.title || 'Custom Page',
                }}
              />
              {/* <p
                            className="font-poppins text-sm text-center max-w-[80%] mx-auto mt-5 font-normal capitalize"
                            dangerouslySetInnerHTML={{
                                __html: pageData.metaDescription || 'No Description Available!',
                            }}
                        /> */}
            </div>
            <div
              className="page-content px-4"
              dangerouslySetInnerHTML={{
                __html: pageData.contain || 'No Data Availalable!',
              }}
            />
          </div>
          <RootFooter />
          <div className="md:hidden block z-[999]">
            <BottomNav />
          </div>
        </main>
      </HomeWrapper>
    </>
  )
}

export default CustomPage
