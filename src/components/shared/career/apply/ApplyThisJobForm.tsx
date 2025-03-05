/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ApplyPlayIcon } from '@/assets/svg'
import { getCookie } from '@/libs/tokenUtils'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import CareerHeaderBgImage from '../../../../assets/career/career-header-bg.png'
import uploadCV from '../../../../assets/icons/carrer/uploadCV.svg'
import Container from '../../Container'
import ApplyTermsAndCondition from './ApplyTerms&Condition'
import { applyJobMutation } from '@/constants/applyJob/applyJob.const'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type FormValues = {
  firstName: string
  lastName: string
  countryCode: string
  phoneNumber: string
  email: string
  coverLetter: string
  cv: string
}

const ApplyThisJobForm = ({ jobId }: any) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  const handleDivClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]) // Get the dropped file
      // console.log('File dropped:', e.dataTransfer.files[0]) // Log the dropped file
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      clearErrors('cv') // Clear error on file selection
    } else {
      setError('cv', { type: 'manual', message: 'CV is required' })
    }
  }

  const accessToken = getCookie('zdsl_accessToken')
  // console.log('accessToken', accessToken);
  if (!accessToken) {
    toast.error('Login again to update profile')
    return
  }
  const userDecode: any = jwtDecode(accessToken)
  // console.log('userDecode', userDecode);
  //** SUBMIT THE DATA */
  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      setError('cv', { type: 'manual', message: 'CV is required' })
      return
    }

    clearErrors('cv') // Clear any existing errors for the CV field

    if (selectedFile) {
      // first upload the image
      try {
        const formData = new FormData()
        formData.append('dp', selectedFile)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDIA_UPLOAD_URL}/jobApply`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) throw new Error('File upload failed')

        const imageResponse = await response.json()
        // console.log('imageResponse', imageResponse);
        // setUploadedFileUrl(data.fileUrl) // Assume response contains a `fileUrl` property
        // toast.success('File uploaded successfully')

        if (imageResponse.status === 200 && imageResponse.file) {
          const createJobApplyObj = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: `${data.countryCode}${data.phoneNumber}`,
            email: data.email,
            coverLater: data.coverLetter,
            uploadCV: imageResponse.file[0].path,
            jobId: jobId,
          }

          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${accessToken}`, // Use your auth token
            },
            body: JSON.stringify({
              query: applyJobMutation,
              variables: createJobApplyObj,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                const errorMessage = await response.text()
                throw new Error(
                  `API Error: ${response.status} - ${errorMessage}`
                )
              }
              return response.json()
            })
            .then((responseData) => {
              console.log('Response Data:', responseData)

              // Access specific fields (adjust according to your API's response structure)
              if (responseData.data.createJobApply.success) {
                console.log(
                  responseData.data.createJobApply.message,
                  'Success Message:'
                ) // Example field
                toast.success(
                  responseData.data.createJobApply.message ||
                  'Job Applied Done!'
                )
                router.push('/career')
              }
              if (responseData?.errors) {
                console.error('Error Messages:', responseData.errors[0].message)
                toast.error(
                  responseData.errors[0].message || 'Something went wrong!'
                )
              }
            })
            .catch((error) => {
              console.error('Error:', error.message)
              toast.error('Something went wrong!')
            })
        }
      } catch (error) {
        console.error('File upload error:', error)
        toast.error('Failed to upload file')
      }
    }

    // here need to create apply data mutation with file data, if file uploaded then the url string should go to backedn.
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      countryCode: '+880',
      phoneNumber: '',
      email: '',
      coverLetter: '',
      cv: '',
    },
    mode: 'onSubmit', // This ensures validation happens on form submit
    reValidateMode: 'onChange',
  })

  return (
    <>
      <div className="relative flex items-center justify-center h-28 w-full  bg-[#EBF7FF] mt-0 md:hidden mb-6">
        <div className="">
          <div
            className="absolute  right-0 top-0 w-32 h-28" // Adjust size as necessary
            style={{
              backgroundImage: `url(${CareerHeaderBgImage.src})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom right',
              opacity: 0.9, // Adjust opacity if needed
            }}
          />
        </div>
        <div className="relative z-10 ">
          <div className=" -ml-36">
            {/* {ApplyPlayIcon} */}
            <h4
              className={`font-[family-name:var(--font-poppins)] font-semibold text-[14px] flex`}
            >
              <span className="mr-2 mt-1">{ApplyPlayIcon}</span>
              Application Form
            </h4>
            <p
              className={`font-[family-name:var(--font-poppins)] text-[12px] font-semibold ml-5`}
            >
              Real State Project Manager
            </p>
          </div>
        </div>
      </div>

      <Container>
        <div className="mx-auto md:w-[800px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="w-full max-w-screen mx-auto rounded-lg mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative w-full py-1">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium"
                >
                  First Name <span className="!text-[#FF2E90]">*</span>
                </label>
                <input
                  {...register('firstName', {
                    required: 'First Name is required',
                  })}
                  type="text"
                  autoComplete="off"
                  className={`block w-full p-4 h-14 text-sm rounded ${errors.firstName ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter First Name"
                  required
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="relative w-full py-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium"
                >
                  Last Name <span className="!text-[#FF2E90]">*</span>
                </label>
                <input
                  {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  type="text"
                  autoComplete="off"
                  className={`block w-full p-4 h-14 text-sm rounded ${errors.lastName ? 'border-red-500' : ''
                    }`}
                  placeholder="Enter Last Name"
                  required
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              {/* Your Phone No */}

              <div className="relative w-full py-1">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium"
                >
                  Your Phone <span className="!text-[#FF2E90]">*</span>
                </label>

                <div className="flex items-center">
                  <div className="relative">
                    <select
                      {...register('countryCode', {
                        required: 'Country code is required',
                      })}
                      className="h-14 pl-4 pr-8 text-base bg-white border border-[#D9DFE3] border-r-0 rounded-l-md font-medium"
                      style={{ borderRight: 'none' }}
                      defaultValue="+880"
                    >
                      <option value="+880">+880</option>
                      <option value="+990">+990</option>
                      <option value="+660">+660</option>
                      <option value="+770">+770</option>
                    </select>
                  </div>

                  {/* Phone Number Input */}
                  <input
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                    })}
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="placeholder-[#9A9CA3] font-light bg-white border border-[#D9DFE3] h-14 pl-4 pr-3 w-full sm:text-sm focus:outline-none  focus:border-[#E59F00] rounded-r-md"
                  />
                </div>

                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="relative w-full py-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium"
                >
                  Email <span className="!text-[#FF2E90] ">*</span>
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  type="email"
                  autoComplete="off"
                  className={`block w-full p-4 h-14  text-sm rounded ${errors.email ? 'border-red-500' : ''
                    }`}
                  placeholder="Your Email"
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2  gap-4 mt-4">
              {/* Cover Letter * */}
              <div className=" col-span-2">
                <label
                  htmlFor="coverLetter"
                  className="block mb-2 text-sm font-medium"
                >
                  Cover Letter <span className="!text-[#FF2E90] ">*</span>
                </label>
                <textarea
                  {...register('coverLetter', {
                    required: 'Cover Letter is required',
                  })}
                  required
                  name="coverLetter"
                  id="coverLetter"
                  placeholder="Write a cover letter"
                  className={`placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent  
                border border-[#D9DFE3]   mb-2 rounded-md h-[16.063rem] p-3 ps-[30px] 
                w-full sm:text-sm focus:outline-none  focus:border-[#E59F00] `}
                />
                {errors.coverLetter && (
                  <span className="text-red-500 text-sm">
                    {errors.coverLetter.message}
                  </span>
                )}
              </div>

              {/* Upload your CV */}
              <div className="col-span-2 ">
                <label
                  htmlFor="uploadCV"
                  className="block mb-4 text-sm font-medium"
                >
                  Upload Your CV <span className="!text-[#FF2E90]">*</span>
                </label>

                <div
                  onClick={handleDivClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={` border-2 border-[#F8E7C0] md:border-[#D9DFE3] rounded w-full md:w-72 flex md:p-4 px-12 py-8 text-[#8198A8] md:bg-white`}
                >
                  <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    name="uploadCV"
                    id="uploadCV"
                    onChange={handleFileChange} // Handle file selection
                  />

                  <Image
                    className="w-[2rem] h-[2rem] text-[0.875rem]"
                    src={uploadCV}
                    alt="Upload CV"
                  />
                  <span className="max-w-full text-center">
                    {selectedFile ? (
                      <span className="ml-4 md:text-[#063354] text-[#8198A8] text-[15px] ">
                        {selectedFile.name}
                      </span>
                    ) : (
                      <span className="md:text-[#063354] text-[#8198A8]text-[15px] line-clamp-2">
                        Drag and drop file or click to browse file
                      </span>
                    )}
                  </span>
                </div>
                {errors.cv && (
                  <span className="text-red-500 text-sm">
                    {errors.cv.message}
                  </span>
                )}
              </div>

              <ApplyTermsAndCondition />
            </div>

            <div className="flex items-end justify-end">
              <button
                style={{
                  background:
                    'linear-gradient(90deg, rgba(243, 198, 93, 1) 0%, rgba(229, 159, 0, 1) 100%)',
                }}
                type="submit"
                className="bg-[#F3C65D] text-black font-medium w-full md:w-auto p-4 rounded-md mt-4 cursor-pointer hover:shadow-md"
              >
                Apply Now
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default ApplyThisJobForm

// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useForm } from "react-hook-form";
// import { useState, useRef } from "react";
// import Image from "next/image";
// import { toast } from "sonner";
// import { getCookie } from "@/libs/tokenUtils";
// import Container from "../../Container";
// import uploadCV from "../../../../assets/icons/carrer/uploadCV.svg";
// import CareerHeaderBgImage from "../../../../assets/career/career-header-bg.png";
// import { ApplyPlayIcon } from "@/assets/svg";
// import ApplyTermsAndCondition from "./ApplyTerms&Condition";
// import { jwtDecode } from "jwt-decode";

// const GRAPHQL_ENDPOINT = `$process.env.NEXT_PUBLIC_BASE_URL}`; // Replace with your GraphQL endpoint

// type FormValues = {
//   firstName: string;
//   lastName: string;
//   countryCode: string;
//   phoneNumber: string;
//   email: string;
//   coverLetter: string;
// };

// const ApplyThisJobForm = () => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const accessToken = getCookie("zdsl_accessToken");
//   if (!accessToken) {
//     toast.error("Login again to apply for the job");
//     return null;
//   }
//   const userDecode: any = jwtDecode(accessToken);
//   const jobId: string = userDecode?.jobId;

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       countryCode: "+880",
//       phoneNumber: "",
//       email: "",
//       coverLetter: "",
//     },
//     mode: "onSubmit",
//   });

//   const uploadFile = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     // Replace with your file upload API endpoint
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to upload file");
//     }

//     const data = await response.json();
//     return data.fileUrl; // Adjust based on the API response
//   };

//   const onSubmit = async (data: FormValues) => {
//     setIsSubmitting(true);

//     try {
//       // Upload CV
//       let uploadCv = "";
//       if (selectedFile) {
//         uploadCv = await uploadFile(selectedFile);
//       } else {
//         throw new Error("CV file is required");
//       }

//       // GraphQL Mutation
//       const graphqlQuery = {
//         query: `
//           mutation CreateJobApply(
//             $firstName: String!
//             $lastName: String!
//             $phoneNumber: String!
//             $email: String!
//             $coverLater: String!
//             $uploadCv: String!
//             $jobId: ID!
//           ) {
//             createJobApply(
//               firstName: $firstName
//               lastName: $lastName
//               phoneNumber: $phoneNumber
//               email: $email
//               coverLater: $coverLater
//               uploadCv: $uploadCv
//               jobId: $jobId
//             ) {
//               success
//               message
//             }
//           }
//         `,
//         variables: {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           phoneNumber: `${data.countryCode}${data.phoneNumber}`,
//           email: data.email,
//           coverLater: data.coverLetter,
//           uploadCv,
//           jobId,
//         },
//       };

//       const response = await fetch(GRAPHQL_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(graphqlQuery),
//       });

//       const result = await response.json();

//       if (result.data?.createJobApply?.success) {
//         toast.success("Job application submitted successfully!");
//       } else {
//         toast.error(
//           result.data?.createJobApply?.message || "Failed to apply for the job"
//         );
//       }
//     } catch (error: any) {
//       toast.error(error.message || "An unexpected error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   return (
//     <Container>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         noValidate
//         className="w-full max-w-screen mx-auto rounded-lg mb-12"
//       >
//         {/* First Name */}
//         <div>
//           <label>First Name *</label>
//           <input
//             {...register("firstName", { required: "First Name is required" })}
//             type="text"
//             placeholder="Enter First Name"
//           />
//           {errors.firstName && <span>{errors.firstName.message}</span>}
//         </div>

//         {/* Last Name */}
//         <div>
//           <label>Last Name *</label>
//           <input
//             {...register("lastName", { required: "Last Name is required" })}
//             type="text"
//             placeholder="Enter Last Name"
//           />
//           {errors.lastName && <span>{errors.lastName.message}</span>}
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label>Phone Number *</label>
//           <input
//             {...register("phoneNumber", {
//               required: "Phone Number is required",
//             })}
//             type="tel"
//             placeholder="Enter Phone Number"
//           />
//           {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
//         </div>

//         {/* Upload CV */}
//         <div>
//           <label>Upload CV *</label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             accept=".pdf,.doc,.docx"
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Apply Now"}
//         </button>
//       </form>
//     </Container>
//   );
// };

// export default ApplyThisJobForm;
