/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { MdKeyboardArrowDown } from 'react-icons/md'

const codes = ['+880', '+990', '+660', '+980']

const ContactForm = () => {
  const [openNumberCode, setOpenNumberCode] = useState<boolean>(false)
  const [numberCode, setNumberCode] = useState<string>('+880')

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    const form = event.target
    const contactData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phoneNumber: `${numberCode} ${form.phoneNumber.value}`,
      email: form.email.value,
      coverLetter: form.coverLetter.value,
    }
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      body: JSON.stringify({
        to: 'altaj1019@gmail.com',
        subject: 'Hello from ZDSL',
        body: `This is a test email sent from ZDSL.
        firstName:${contactData.firstName}
        lastName:${contactData.lastName}
        phoneNumber:${contactData.phoneNumber}
        email:${contactData.email}
        
        coverLetter:
        ${contactData.coverLetter}
        `,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Email sent successfully!')
    } else {
      toast.success('Failed to send email')
    }
  }

  return (
    <section>
      <h1 className={`font-oswald  font-semibold text-[1.5rem] `}>
        Contact Form
      </h1>
      <div className="flex mt-[1.25rem] p-7 border-[4px] border-opacity-40 rounded-md border-[#009898] justify-center items-center ">
        <div className=" w-full ">
          {/* header */}

          {/* form start */}
          <form
            onSubmit={handleFormSubmit}
            className={` grid grid-cols-2 gap-y-[1.25rem] gap-x-[1.25rem] md:gap-x-[1.25rem]  `}
          >
            {/* first name */}
            <div className="bg-[#FFFFFF] col-span-2 md:col-span-1">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className={`placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent  
                border border-[#D9DFE3]  mb-2 rounded-md  p-3 ps-[30px] 
               h-[3.125rem]  max-h-[3.125rem] w-[100%]  sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] `}
              />
            </div>

            {/* last name */}
            <div className="bg-[#FFFFFF] col-span-2 md:col-span-1">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className={`placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent border border-[#D9DFE3] mb-2 rounded-md p-3 ps-[30px] 
                h-[3.125rem] max-h-[3.125rem] w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]`}
              />
            </div>

            {/* phone number */}
            <div
              className="col-span-2 md:col-span-1 flex items-center 
                border border-[#D9DFE3] bg-white rounded-md h-[3.125rem]  max-h-[3.125rem] focus:border-[#E59F00] duration-200"
            >
              <div className="w-[20%] h-full relative">
                <button
                  className={`relative h-full w-full text-base flex justify-center items-center ps-1 cursor-pointer hover:bg-gray-100 duration-300 rounded-l-md`}
                  onClick={() => {
                    setOpenNumberCode((prev) => !prev)
                  }}
                >
                  <span>{numberCode}</span>
                  <MdKeyboardArrowDown className="size-5" />
                </button>
                <AnimatePresence>
                  {openNumberCode && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full absolute left-0 top-full bg-white shadow-lg rounded-md rounded-t-none border border-t-none"
                    >
                      <div className="w-full flex flex-col justify-center items-center">
                        {codes?.map((item) => (
                          <button
                            key={item}
                            className={`w-full py-2 ${item === numberCode ? 'bg-gray-100' : 'bg-transparent hover:bg-gray-100'} duration-300 cursor-pointer`}
                            onClick={() => {
                              setNumberCode(item)
                              setOpenNumberCode(false)
                            }}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                className="w-[80%] h-full placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent !border-transparent rounded-none rounded-r-md p-3 sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]"
              />
            </div>

            {/* Email */}
            <div className="bg-[#FFFFFF] col-span-2 md:col-span-1">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="ashik@zdslbd.com"
                className={`placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent  
                border border-[#D9DFE3]  mb-2 rounded-md h-[3.125rem]  max-h-[3.125rem] p-3 ps-[30px] 
                w-full  sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] `}
              />
            </div>

            {/* Cover Letter * */}
            <div className="bg-[#FFFFFF] col-span-2">
              <textarea
                name="coverLetter"
                id="coverLetter"
                placeholder="Write a cover letter"
                className={`placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent  
                border border-[#D9DFE3] rounded-md h-[9.375rem] max-h-[9.375rem] p-3
                w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] `}
              />
            </div>
            {/* Terms & Privacy Policy */}
            <div className="col-span-2">
              <p className="text-sm">
                By clicking the apply now button, you are accepting ZDSL&apos;s
                <span className="text-[#008B8B] underline ">
                  Terms & Privacy Policy
                </span>
              </p>
            </div>
            {/* apply now button */}
            <div className="cursor-pointer col-span-2 flex items-center justify-center md:justify-end ">
              <button
                style={{
                  backgroundImage:
                    'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
                }}
                className={`md:text-base w-[14.125rem] text-[0.88rem] md:px-[1.938rem] px-7 md:py-[1.125rem] 
            py-[12px]  bottom-2  font-[600] rounded-md text-[#063354]`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
