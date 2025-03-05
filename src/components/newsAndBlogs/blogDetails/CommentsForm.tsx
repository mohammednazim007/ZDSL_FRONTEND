/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Loader from '@/components/shared/Loder'
import { useCreateCommentMutation } from '@/services/comment.service'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { MdKeyboardArrowDown } from 'react-icons/md'

const codes = ['+880', '+990', '+660', '+980']

const CommentsForm = ({ postId }: { postId: string }) => {

    const [createComment, { isLoading, data, error }] = useCreateCommentMutation();
    const [openNumberCode, setOpenNumberCode] = useState<boolean>(false)
    const [numberCode, setNumberCode] = useState<string>('+880')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        content: '',
    })

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        content: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: '' }) // Clear the error when user starts typing
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Validate form fields
        const newErrors = {
            firstName: formData.firstName ? '' : 'First Name is required.',
            lastName: formData.lastName ? '' : 'Last Name is required.',
            email: formData.email ? '' : 'Email is required.',
            phone: formData.phone ? "" : "Phone Number is required",
            content: formData.content ? '' : 'Comment is required.',
        }

        setErrors(newErrors)

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some((error) => error !== '')

        if (!hasErrors) {
            // console.log('Form submitted successfully:', formData)
            try {
                const response = await createComment({
                    postId,
                    ...formData,
                }).unwrap();

                // console.log('response', response);

                if (response.data?.createComment) {
                    toast.success('Comment added successfully!');
                    setFormData({
                        firstName: '',
                        lastName: '',
                        phone: '',
                        email: '',
                        content: '',
                    });
                } else {
                    toast.error('Failed to add comment: ' + response.createComment.message);
                }
            } catch (err) {
                console.error('Error adding comment:', err);
            }
        }
    }


    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='py-4'>
            <h1 className="font-[family-name:var(--font-oswald)] font-semibold text-[20px] mb-8">
                Write your comment here
            </h1>
            {/* form start */}
            <form
                onSubmit={handleFormSubmit}
                className="grid grid-cols-2 gap-y-[1.25rem] gap-x-[1.25rem] md:gap-x-[1.25rem]"
            >
                {/* First Name */}
                <div className="bg-[#FFFFFF] col-span-2 md:col-span-1">
                    <label htmlFor="firstName">
                        First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent  
                            border border-[#D9DFE3] mb-2 rounded-md p-3 ps-[30px] 
                            h-[3.125rem] max-h-[3.125rem] w-[100%] sm:text-sm focus:outline-none 
                            focus:ring-indigo-500 focus:border-[#E59F00]"
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                </div>

                {/* Last Name */}
                <div className="bg-[#FFFFFF] col-span-2 md:col-span-1">
                    <label htmlFor="lastName">
                        Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent border border-[#D9DFE3] mb-2 rounded-md p-3 ps-[30px] 
                            h-[3.125rem] max-h-[3.125rem] w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]"
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Phone <span className="text-red-600">*</span>
                    </label>
                    <div
                        className="flex items-center border border-[#D9DFE3] bg-white rounded-md h-[3.125rem] max-h-[3.125rem] focus-within:border-[#E59F00] duration-200"
                    >
                        <div className="w-[20%] h-full relative">
                            <button
                                type="button"
                                className="relative h-full w-full text-base flex justify-center items-center ps-1 cursor-pointer hover:bg-gray-100 duration-300 rounded-l-md"
                                onClick={() => setOpenNumberCode((prev) => !prev)}
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
                                                    type="button"
                                                    className={`w-full py-2 ${item === numberCode
                                                        ? 'bg-gray-100'
                                                        : 'bg-transparent hover:bg-gray-100'
                                                        } duration-300 cursor-pointer`}
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
                            name="phone"
                            id="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-[80%] h-full placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent !border-transparent rounded-none rounded-r-md p-3 sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]"
                        />

                    </div>
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                </div>

                {/* Email */}
                <div className="bg-[#FFFFFF] col-span-2 md:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='ex: ashik@zdslbd.com'
                        value={formData.email}
                        onChange={handleInputChange}
                        className="placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent border border-[#D9DFE3] mb-2 rounded-md h-[3.125rem] max-h-[3.125rem] p-3 ps-[30px] w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Comment */}
                <div className="bg-[#FFFFFF] col-span-2">
                    <label htmlFor="comment">
                        Comment <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Write your comment here ..."
                        value={formData.content}
                        onChange={handleInputChange}
                        className="placeholder-[#9A9CA3] placeholder:text-base font-light bg-transparent  
                            border border-[#D9DFE3] rounded-md h-[9.375rem] max-h-[9.375rem] p-3
                            w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00]"
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="cursor-pointer col-span-2 flex items-center justify-end">
                    <button
                        type="submit"
                        style={{
                            backgroundImage:
                                'linear-gradient(360deg, #E59F00 0%, #F3C65D 100%)',
                        }}
                        className="md:text-base w-[14.125rem] text-[0.88rem] md:px-[1.938rem] px-7 md:py-[0.625rem] py-3 rounded-md font-medium text-black md:h-[3.125rem] h-[2.75rem] 
                            shadow-md md:max-h-[3.125rem] max-h-[2.75rem]"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentsForm
