/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
type OurVisionBannerType = {
  heading: string
  headingDescription: string
  icon: string
  arrayTitle: any
}

export default function OurVisionBanner({
  heading,
  headingDescription,
  icon,
  arrayTitle,
}: OurVisionBannerType) {
  return (
    <div className="md:py-8 p-3 bg-[#FBFBFB] md:bg-contain bg-cover bg-no-repeat bg-bottom border border-transparent md:bg-[url('/building-bg.jpg')] ">
      <div className="w-full flex flex-col justify-center items-center pt-20 md:pt-32 bg-white md:bg-transparent">
        <div className="flex flex-col gap-y-5 justify-center items-center">
          <article className="flex flex-col gap-y-6 items-center md:px-0 px-4 py-10 md:py-12">
            <div className="flex items-center justify-center flex-wrap md:gap-4 gap-2">
              <div className="h-10 w-10">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${icon}`}
                  alt="Company Profile"
                  width={100}
                  height={100}
                  className="h-10 w-10"
                />
              </div>
              <h1
                className=" text-black"
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            </div>
            <p className="font-poppins text-sm text-center md:w-[80%] md:text-base px-4 mx-2 md:mx-0 py-4 md:py-14">
              {headingDescription || ''}
            </p>
          </article>

          {/* mission vision button */}
          <div className="grid grid-cols-3 md:gap-4 lg:px-0 mt-[-2rem] md:mt-0">
            {arrayTitle?.map((facility: any) => (
              <h5
                key={facility?.id}
                className={`w-full text-nowrap border rounded bg-white shadow cursor-pointer p-2 md:px-8 py-2 md:py-4 scale-75 md:scale-100`}
                onClick={() => {
                  const targetElement = document.querySelector(
                    `#section-${facility?.id}`
                  )
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: `${facility.title}`, // Use modified HTML
                }}
              ></h5>
            ))}
          </div>
        </div>
        <div className="hidden md:flex justify-center flex-col items-center gap-y-4 mt-24">
          <h1 className="uppercase font-bold text-[35px] text-[#093656] letter-spacing-wider">
            Explore
          </h1>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              const targetElement = document.querySelector('#experienced')
              if (targetElement)
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
            }}
          >
            <span className="animate-pulse mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="30%"
                height="30%"
                viewBox="0 0 72.141 72.142"
                preserveAspectRatio="xMidYMid meet"
                className="outline-scale-animation mx-auto "
              >
                <defs>
                  <filter
                    id="Path_15552"
                    x="0"
                    y="0"
                    width="72.141"
                    height="72.142"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dy="3" in="SourceAlpha" />
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood flood-opacity="0.161" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                  <linearGradient
                    id="linear-gradient"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0" stop-color="#f3c65d" />
                    <stop offset="1" stop-color="#e59f00" />
                  </linearGradient>
                  <filter
                    id="Path_15162"
                    x="8.028"
                    y="7.824"
                    width="56.493"
                    height="56.494"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dy="3" in="SourceAlpha" />
                    <feGaussianBlur stdDeviation="3" result="blur-2" />
                    <feFlood flood-opacity="0.161" />
                    <feComposite operator="in" in2="blur-2" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>
                <g
                  id="Group_9179"
                  data-name="Group 9179"
                  transform="translate(-911.454 -984)"
                >
                  <g
                    transform="matrix(1, 0, 0, 1, 911.45, 984)"
                    filter="url(#Path_15552)"
                  >
                    <path
                      id="Path_15552-2"
                      data-name="Path 15552"
                      d="M33.667,51.541a10.7,10.7,0,0,1-6.6,2.6,10.7,10.7,0,0,1-6.6-2.6,78.91,78.91,0,0,1-7.027-6.553L9.154,40.695A78.917,78.917,0,0,1,2.6,33.667a10.7,10.7,0,0,1-2.6-6.6,10.7,10.7,0,0,1,2.6-6.6,78.9,78.9,0,0,1,6.553-7.027l4.293-4.293A78.905,78.905,0,0,1,20.474,2.6a10.7,10.7,0,0,1,6.6-2.6,10.7,10.7,0,0,1,6.6,2.6,78.913,78.913,0,0,1,7.027,6.553l4.293,4.293a78.912,78.912,0,0,1,6.553,7.027,10.7,10.7,0,0,1,2.6,6.6,10.7,10.7,0,0,1-2.6,6.6,78.927,78.927,0,0,1-6.553,7.027l-4.293,4.293A78.882,78.882,0,0,1,33.667,51.541Z"
                      transform="translate(9 6)"
                      fill-rule="evenodd"
                      opacity="0.31"
                    />
                  </g>
                  <g
                    transform="matrix(1, 0, 0, 1, 911.45, 984)"
                    filter="url(#Path_15162)"
                  >
                    <path
                      id="Path_15162-2"
                      data-name="Path 15162"
                      d="M23.937,36.644a7.606,7.606,0,0,1-4.69,1.849,7.606,7.606,0,0,1-4.69-1.849,56.1,56.1,0,0,1-5-4.659L6.508,28.933a56.109,56.109,0,0,1-4.659-5A7.606,7.606,0,0,1,0,19.247a7.606,7.606,0,0,1,1.849-4.69,56.1,56.1,0,0,1,4.659-5L9.56,6.508a56.1,56.1,0,0,1,5-4.659A7.606,7.606,0,0,1,19.247,0a7.605,7.605,0,0,1,4.69,1.849,56.106,56.106,0,0,1,5,4.659L31.985,9.56a56.1,56.1,0,0,1,4.659,5,7.606,7.606,0,0,1,1.849,4.69,7.606,7.606,0,0,1-1.849,4.69,56.116,56.116,0,0,1-4.659,5l-3.052,3.052A56.085,56.085,0,0,1,23.937,36.644Z"
                      transform="translate(17.03 13.82)"
                      fill-rule="evenodd"
                      fill="url(#linear-gradient)"
                    />
                  </g>
                  <path
                    id="Path_15163"
                    data-name="Path 15163"
                    d="M7.673,0A1.534,1.534,0,0,1,9.207,1.535V12.561l3.519-3.518a1.535,1.535,0,1,1,2.17,2.17L8.758,17.351a1.535,1.535,0,0,1-2.17,0L.449,11.213a1.534,1.534,0,1,1,2.17-2.17l3.519,3.519V1.535A1.535,1.535,0,0,1,7.673,0Z"
                    transform="translate(939.852 1008.17)"
                    fill-rule="evenodd"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
