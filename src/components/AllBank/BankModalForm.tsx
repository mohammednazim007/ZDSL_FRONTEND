'use client'

import { IApplyForBankLoan } from "@/constants/bank/bank.const"
import { CreateLoanApplyMutation } from "@/constants/bank/bankQuery"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

const BankModalForm = ({
    selectedBank,
    projectId,
    unitId,
    projectTotalPrice,
    loanPeriod
}: any) => {
    const router = useRouter()
    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IApplyForBankLoan>()

    const onSubmit: SubmitHandler<IApplyForBankLoan> = async (data) => {
        setError(''); // Clear any existing errors

        // Sanitize the form data
        const sanitizedData = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            description: data.description || '',
            loanAmount: data.loanAmount,
            loanPeriod: loanPeriod || '',
            projectTotalPrice: projectTotalPrice,
            projectId: projectId,
            unitId: unitId,
            bankId: selectedBank._id,
        };
        console.log('sanitizedData', sanitizedData);

        try {


            // API call using fetch
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: CreateLoanApplyMutation,
                    variables: sanitizedData,
                }),
            });

            const result = await response.json();

            if (response.ok && result.data.createLoanApply.success) {
                console.log('Loan application submitted successfully:', result.data.createLoanApply.message);
                // toast ta dekhai na
                toast.info('Loan application submitted successfully!');

                setTimeout(() => {
                    router.push('/');
                }, 1500); // 1.5 seconds delay
            } else {
                console.error('Error submitting loan application:', result.errors || result.data.createLoanApply.message);
                setError(result.errors?.[0]?.message || result.data.createLoanApply.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting loan application:', error);
            setError('An unexpected error occurred while submitting the loan application.');
        }


    };



    return (
        <div className="">
            <form
                className="flex flex-col space-y-4 pt-4 font-[family-name:var(--font-poppins)]"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Full Name input */}
                <div className="relative">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        {...register('fullName', {
                            required: 'Full Name is required',
                            minLength: {
                                value: 3,
                                message: 'Full Name should be at least 3 characters long',
                            },
                        })}
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter your full name"
                        className="placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#BFCBD3] rounded-md py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] bg-primary !pl-6"
                    />
                    {errors?.fullName && (
                        <span className="text-red-500 text-sm mt-1">{errors.fullName.message}</span>
                    )}
                </div>

                {/* Phone Number and Email in one row */}
                <div className="flex space-x-4">
                    {/* Phone Number */}
                    <div className="flex-1">
                        <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            {...register('phoneNumber', {
                                required: 'Phone Number is required',
                                pattern: {
                                    value: /^[0-9]{9,11}$/, // Matches 9, 10, or 11 digit phone numbers
                                    message: 'Please enter a valid phone number (9-11 digits)',
                                },
                            })}
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            className="placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#BFCBD3] rounded-md py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] bg-primary !pl-6"
                        />
                        {errors?.phoneNumber && (
                            <span className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="youremail@example.com"
                            className="placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#BFCBD3] rounded-md py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] bg-primary !pl-6"
                        />
                        {errors?.email && (
                            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                        )}
                    </div>
                </div>

                {/* Loan Period */}
                <div className="relative">
                    <label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">Loan Amount</label>
                    <input
                        {...register('loanAmount', { required: 'Loan Period is required' })}
                        type="text"
                        name="loanAmount"
                        id="loanAmount"
                        placeholder="Enter loan amount"
                        className="placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#BFCBD3] rounded-md py-4 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] bg-primary !pl-6"
                    />
                    {errors?.loanAmount && (
                        <span className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</span>
                    )}
                </div>

                {/* Description input */}
                <div className="relative">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">Description (optional)</label>
                    <textarea
                        {...register('description')}
                        name="description"
                        id="description"
                        placeholder="Enter your message"
                        className="placeholder-[#7E7E7E] placeholder:text-base font-light bg-transparent border border-[#BFCBD3] rounded-md py-2 pe-10 w-full sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-[#E59F00] bg-primary !pl-6"
                    />
                    {errors?.description && (
                        <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
                    )}
                </div>



                {/* Submit button */}

                <div className="relative">
                    {error && (
                        <p className="text-red-500 text-sm py-4 w-full  text-center">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full relative text-black text-[0.875rem] font-[600] bg-gradient-to-b from-[#F3C65D] to-[#E59F00] py-4 px-4 rounded"
                    >
                        Apply Now
                    </button>

                </div>
            </form>
        </div>
    )
}

export default BankModalForm
