import Image from 'next/image'
import bankLogo from '@/assets/ViewAllBanks/BankLogo.png'

export default function LoanForm() {
  return (
    <div className="flex items-center max-w-[42rem] mx-auto justify-center min-h-screen bg-gray-100 mt-20">
      <div className="bg-[#FBFBFB] shadow-md rounded-lg w-full px-5 xs:px-12 md:px-[4.563rem] py-10 relative">
        {/* Close button */}
        {/* <button className="absolute top-4 right-4 text-black font-bold hover:text-gray-600">
          X
        </button> */}

        {/* Form Heading */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Apply For Loan
        </h2>
        <p className="text-sm text-center mb-[.9rem] text-black">
          Just leave your details and our advisor will call you. We will discuss
          possibilities and send a personal offer. You can cancel your
          appointment at any time.
        </p>

        {/* Bank Information with Optimized Image */}
        <div className="max-w-[25.75rem]  mb-8 md:pb-[2.5rem] pt-[2.9rem]  w-full h-full max-h-[23rem]   rounded-lg  flex flex-col  justify-between">
          <div className="flex items-start  justify-between ">
            <div className="cursor-pointer">
              {/* Use next/image for optimized image */}
              <Image
                src={bankLogo}
                alt={` Logo`}
                width={128}
                height={40}
                className="w-[7.438rem] h-[2.875rem]"
              />
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-[1.25rem] font-bold">
              Standard Chartered Bank
            </h3>
            <div className="flex flex-col mt-[10px] space-y-2">
              <div className="flex min-w-full pb-1 ">
                <span className="font-semibold basis-1/2">
                  Max Loan Amount:
                </span>
                <span className="text-left basis-1/2">Up to BDT 2 crore</span>
              </div>
              <div className="flex min-w-full pb-1  ">
                <span className="font-semibold basis-1/2">Interest Rate:</span>
                <span className="text-left basis-1/2">Starting form 8.50%</span>
              </div>
              <div className="flex min-w-full pb-1">
                <span className="font-semibold basis-1/2">Period:</span>
                <span className="text-left basis-1/2">Starting form 8.50%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-10">
          <div className=" h-[3rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full h-full   px-4 py-2 border-[1px] border[#BFCBD3] rounded-md shadow-sm focus:outline-none focus:ring-[.5px] focus:ring-[#e59f00] focus:border-[#E59F00] sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div className=" h-[3rem]">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="mt-1 w-full h-full   px-4 py-2 border-[1px] border[#BFCBD3] rounded-md shadow-sm focus:outline-none focus:ring-[.3px] focus:ring-[#e59f00] focus:border-[#E59F00] sm:text-sm"
              placeholder="+880 177769020X"
            />
          </div>

          <div className=" h-[3rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full h-full  px-4 py-2 border-[1px] border[#BFCBD3] rounded-md shadow-sm focus:outline-none focus:ring-[.5px] focus:ring-[#e59f00] focus:border-[#E59F00] sm:text-sm"
              placeholder="example@gmail.com"
            />
          </div>

          <div className=" h-[5.875rem]">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              className="mt-1 w-full h-full  px-4 py-2 border-[1px] border[#BFCBD3] rounded-md shadow-sm focus:outline-none focus:ring-[.5px] focus:ring-[#e59f00] focus:border-[#E59F00] sm:text-sm"
              placeholder="Text..."
            ></textarea>
          </div>
          <div className="flex  justify-between items-center mt-5 md:mt-10 sm:mt-10 lg:mt-[2.75rem]">
            <button
              style={{
                backgroundImage:
                  'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
              }}
              className={`relative font-semibold  text-center w-full rounded-md h-[3rem] text-base"
               
            `}
            >
              Apply Now
            </button>
          </div>
          {/* <button
            type="submit"
            className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 transition ease-in-out"
          >
            Apply Now
          </button> */}
        </form>
      </div>
    </div>
  )
}
