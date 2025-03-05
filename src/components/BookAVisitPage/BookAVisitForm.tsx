'use client'

import { useState } from 'react'

const BookAVisitForm: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen)

  return (
    <div className=" mb-20">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            {/* Left-side Date Picker */}
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l-2-2m0 0l-2 2m2-2v8m6-6h8m0 0l2-2m-2 2l2 2"
                />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">
                January 2023
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Book a Visit</h2>
            <p className="text-gray-500">Choose a time that works for you.</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Date/Time Section */}
          <div className="flex items-center justify-between border p-3 rounded-lg bg-gray-50">
            <div>
              <span className="block text-sm font-semibold">
                Saturday, January 14, 2023
              </span>
              <span className="text-yellow-600 font-semibold">
                12:00 PM – 1:00 PM
              </span>
            </div>
            <button type="button" className="text-sm text-yellow-600">
              Change
            </button>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <div
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border cursor-pointer"
              onClick={toggleDropdown}
            >
              <span>Zubion Windy Palace</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-full">
                <input
                  type="text"
                  placeholder="Enter Client Phone, Email Or Name"
                  className="w-full px-3 py-2 border-b focus:outline-none"
                />
                <ul className="max-h-48 overflow-y-auto">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    Zubion Windy Palace
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    Zubion Morning Breeze
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">Happy Morning</li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    Zubion Hannan Homestead
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              placeholder="Title/Subject"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Terms and Confirm Booking */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm">
              Agree with{' '}
              <a href="#" className="text-yellow-600">
                terms and conditions
              </a>
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookAVisitForm
