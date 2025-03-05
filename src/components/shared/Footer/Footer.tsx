/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import './Footer.css'
import { useQuery, gql } from '@apollo/client'
import SocialMediaLinks from './SocialMediaLinks'
import PhoneNumberList from './PhoneNumberList'
import FooterLinkSection from './FooterLinkSection'
import { appleSvgIcon, googlePlayIcon } from '@/assets/svg'

const GET_FOOTER = gql`
  query Query {
    getFooter {
      success
      message
      data {
        id
        logoUrl
        about
        sections {
          title
          links {
            label
            url
          }
        }
        address
        phoneNumbers {
          value
        }
        googlePlay
        appleStore
        socialMedia {
          facebook
          linkedin
          twitter
          youtube
          instagram
        }
        copyrightText
      }
    }
  }
`

const Footer = () => {
  const { data, loading, error } = useQuery(GET_FOOTER)

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const footerData = data?.getFooter?.data[0]
  if (!footerData) return null

  const {
    logoUrl,
    about,
    sections,
    address,
    phoneNumbers,
    googlePlay,
    appleStore,
    socialMedia,
    copyrightText,
  } = footerData

  return (
    <>
      <footer className="bg-[#063354] lg:px-primary-padding text-white">
        <div className="container mx-auto px-4 pt-[5.5rem]">
          <div className="grid grid-cols-3 md:gap-y-0 gap-y-8 lg:grid-cols-6 mb-[5.125rem]">
            {/* brand image */}
            <div className="w-full col-span-3 md:col-span-2 mb-[2.5rem] md:w-max ">
              <div className="flex items-center space-x-3 mb-4 md:justify-normal justify-center">
                <Link href={'/'}>
                  <Image
                    width={250}
                    height={250}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${logoUrl}`}
                    alt="zdsl-logo"
                    className="-mt-2 w-[14.813rem] bg-transparent"
                  />
                </Link>
              </div>
              <p className="text-justify text-base mt-4 md:text-lg   md:text-left md:w-[18rem]">
                {about}
              </p>
            </div>

            {/* routing list */}
            {sections.map((section: any) => (
              <FooterLinkSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}

            {/* app logo & brand image */}
            <div className="md:col-span-1 col-span-3 flex flex-col gap-y-2 items-center w-full">
              <div className="w-full flex items-center justify-between md:flex-col gap-x-1">
                <h4 className="font-oswald font-normal text-[15px] md:text-[1.625rem] md:mb-[3rem]">
                  Download Our App
                </h4>
                <div className="md:space-y-2 flex flex-row md:flex-col items-center justify-center gap-x-1">
                  <Link
                    className="flex w-[6rem] h-[2.25rem] md:h-[3.25rem] items-center justify-center gap-1 md:gap-3 md:py-2 px-2 md:px-4 md:w-[11rem] bg-white text-black rounded-md "
                    href={googlePlay}
                  >
                    {googlePlayIcon}
                    <span className="text-[10px] md:text-[1.1rem] font-[family-name:var(--font-poppins)] text-nowrap inline-block">
                      Google Play
                    </span>
                  </Link>
                  <Link
                    className="flex w-[6rem] h-[2.25rem] md:h-[3.25rem] items-center justify-center gap-1 md:gap-3 md:py-2 px-2 md:px-4 md:w-[11rem] bg-white text-black rounded-md"
                    href={appleStore}
                  >
                    {appleSvgIcon}
                    <span className="text-[10px] md:text-[1.1rem] font-[family-name:var(--font-poppins)] text-nowrap inline-block">
                      Apple Store
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="gap-[-5px] flex md:w-max w-full md:justify-normal justify-center mt-[-1.50rem] md:mt-[0rem]">
            <SocialMediaLinks socialMedia={socialMedia} />
          </div>

          <div className="w-full xl:-mt-[5.3rem] flex-col-reverse lg:flex-row justify-center text-white flex items-center pe-4 py-2">
            <div>
              <div
                style={{ width: '17rem' }}
                className="rounded-md bg-[#BFCBD3] mx-auto border-[1.6px] border-[#BFCBD3]"
              ></div>
              <div className="text-center my-5 text-[1.125rem]">
                <p className="justify-center items-center flex gap-2">
                  <span className="md:text-base text-xs w-fit">{address}</span>
                </p>
                <PhoneNumberList phoneNumbers={phoneNumbers} />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="text-center pt-3 pb-4 text-[1.125rem] bg-white text-black md:mb-0 mb-12 md:text-base text-sm">
        {copyrightText}
      </div>
    </>
  )
}

export default Footer
