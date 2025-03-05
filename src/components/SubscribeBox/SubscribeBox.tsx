import Image from 'next/image'
import Button from '../shared/Button'
import SectionWrapper from '../Wrappers/SectionWrapper'

const letterBoxIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="88.496"
      height="69.088"
      viewBox="0 0 88.496 69.088"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#f3c65d" />
          <stop offset="1" stopColor="#e59f00" />
        </linearGradient>
      </defs>
      <g
        id="Group_8338"
        data-name="Group 8338"
        transform="translate(-0.799 -0.635)"
      >
        <circle
          id="Ellipse_441"
          data-name="Ellipse 441"
          cx="21.416"
          cy="21.416"
          r="21.416"
          transform="translate(46.463 26.891)"
          fill="url(#linear-gradient)"
        />
        <g id="user_duotone" transform="translate(0.799 0.635)">
          <path
            id="Path_15164"
            data-name="Path 15164"
            d="M4.8,46.961A18.161,18.161,0,0,1,22.961,28.8h20.35A18.161,18.161,0,0,1,61.473,46.961a8.356,8.356,0,0,1-6.883,8.406,133.119,133.119,0,0,1-21.454,1.769,133.118,133.118,0,0,1-21.454-1.769A8.356,8.356,0,0,1,4.8,46.961Z"
            transform="translate(12.832 0.732)"
            fill="none"
          />
          <g id="mail_outline">
            <path
              id="Path_15194"
              data-name="Path 15194"
              d="M26.112,5.4H49.394a104.478,104.478,0,0,1,12.715.444c3.43.461,6.317,1.448,8.611,3.741S74,14.767,74.462,18.2a104.54,104.54,0,0,1,.444,12.715v8.039a104.542,104.542,0,0,1-.444,12.715C74,55.1,73.014,57.984,70.72,60.278s-5.182,3.28-8.611,3.741a104.541,104.541,0,0,1-12.715.444H26.112A104.54,104.54,0,0,1,13.4,64.019c-3.43-.461-6.318-1.448-8.611-3.741S1.505,55.1,1.044,51.667A104.476,104.476,0,0,1,.6,38.951V30.912A104.474,104.474,0,0,1,1.044,18.2c.461-3.43,1.448-6.318,3.741-8.611S9.967,6.305,13.4,5.844A104.476,104.476,0,0,1,26.112,5.4ZM14.158,11.509c-2.8.376-4.277,1.064-5.331,2.118s-1.742,2.535-2.118,5.331a102.361,102.361,0,0,0-.393,12.163v7.621a102.364,102.364,0,0,0,.393,12.163c.376,2.8,1.064,4.277,2.118,5.331s2.535,1.742,5.331,2.118a102.419,102.419,0,0,0,12.163.393H49.184a102.422,102.422,0,0,0,12.163-.393c2.8-.376,4.277-1.064,5.331-2.118S68.421,53.7,68.8,50.905a102.422,102.422,0,0,0,.393-12.163V31.121A102.419,102.419,0,0,0,68.8,18.958c-.376-2.8-1.064-4.277-2.118-5.331s-2.535-1.742-5.331-2.118a102.364,102.364,0,0,0-12.163-.393H26.321A102.361,102.361,0,0,0,14.158,11.509Z"
              transform="translate(-0.6 -5.4)"
              fill="#fdf8ed"
              fillRule="evenodd"
            />
            <path
              id="Path_15195"
              data-name="Path 15195"
              d="M8.28,16.273a2.858,2.858,0,0,1,3.963-.793l10.181,6.787c3.125,2.084,5.282,3.517,7.082,4.453a8.517,8.517,0,0,0,4.015,1.214,8.517,8.517,0,0,0,4.015-1.214c1.8-.936,3.957-2.369,7.082-4.453L54.8,15.48a2.858,2.858,0,0,1,3.17,4.756L47.657,27.111a88.257,88.257,0,0,1-7.483,4.68,14.115,14.115,0,0,1-6.653,1.86,14.115,14.115,0,0,1-6.653-1.86,88.223,88.223,0,0,1-7.483-4.68L9.073,20.236A2.858,2.858,0,0,1,8.28,16.273Z"
              transform="translate(3.631 0.242)"
              fill="#fdf8ed"
              fillRule="evenodd"
            />
          </g>
        </g>
      </g>
    </svg>
  </>
)

const SubscribeBox = () => {
  return (
    <SectionWrapper>
      <div className="bg-secondary border-2 border-[#C8D2D9] rounded-lg p-6 w-full  flex flex-col lg:flex-row items-center  md:space-y-0">
        {/* Icon and Text */}
        <div className="flex basis-1/2 items-center space-x-4">
          {/* Icon */}
          <span className="md:flex hidden">{letterBoxIcon}</span>
          {/* Text */}
          <div className="flex flex-col gap-y-2 md:justify-start justify-center">
            <h2 className="lg:text-2xl text-xl text-white md:text-left text-center">
              Stay Updated with Our Latest Projects.
            </h2>
            <p className=" text-sm lg:text-base text-white md:text-left text-center">
              Subscribe Now to Receive Updates Directly to Your Inbox
            </p>
          </div>
        </div>
        {/*  */}
        <div className="relative basis-1/2 w-full md:mt-0 mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full  md:h-[4rem] h-[3rem] border-[5px] border-[#C8D2D9] md:px-6 px-4  pr-[6rem] rounded-md focus:outline-none 
            ps-[2.125rem]"
          />
          <div className="absolute  right-3 top-[8px]">
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default SubscribeBox
