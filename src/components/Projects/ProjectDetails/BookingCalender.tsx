// "use client";

// import React, { useState } from "react";
// import { format, addDays, isToday } from "date-fns";

// // Define types for booking data and time slots
// type Booking = {
//     date: string; // "yyyy-MM-dd"
//     bookedSlots: string[]; // List of booked times for the date
// };

// type TimeSlot = string;
// type DateType = Date;

// // Fake Booking Data
// const fakeBookings: Booking[] = [
//     { date: format(addDays(new Date(), 0), "yyyy-MM-dd"), bookedSlots: ["9:00 am", "10:00 am"] },
//     { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), bookedSlots: ["12:00 am", "1:00 am", "2:00 am"] },
//     { date: format(addDays(new Date(), 2), "yyyy-MM-dd"), bookedSlots: [] },
//     { date: format(addDays(new Date(), 3), "yyyy-MM-dd"), bookedSlots: ["12:00 am", "3:00 am"] },
//     { date: format(addDays(new Date(), 4), "yyyy-MM-dd"), bookedSlots: ["10:00 am"] },
// ];

// const BookingCalendar: React.FC = () => {
//     const [selectedDate, setSelectedDate] = useState<DateType>(new Date());
//     const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);

//     // Generate an array of dates dynamically
//     const generateDates = (startDate: DateType, days: number): DateType[] => {
//         return Array.from({ length: days }, (_, i) => addDays(startDate, i));
//     };

//     const times: TimeSlot[] = ["9:00 am", "10:00 am", "11:00 am", "12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am"];
//     const dates: DateType[] = generateDates(new Date(), 7); // Generate dates for the next 7 days

//     // Check if a slot is booked
//     const isSlotBooked = (date: DateType, time: TimeSlot): boolean => {
//         const bookingForDate = fakeBookings.find((b) => b.date === format(date, "yyyy-MM-dd"));
//         return bookingForDate ? bookingForDate.bookedSlots.includes(time) : false;
//     };

//     return (
//         <div className="bg-[#fbfbfb] min-h-screen ">
//             <div className="p-6 bg-[#fbfbfb] max-w-7xl mx-auto my-auto mt-20 border border-black">
//                 <h1 className="text-xl font-bold mb-4">Book a Visit</h1>
//                 <p className="text-gray-600 mb-6">Choose a time that works for you.</p>
//                 <div className="overflow-x-auto">
//                     <div className="flex gap-4">
//                         {dates.map((date, index) => (
//                             <div
//                                 key={index}
//                                 className={`flex-shrink-0 w-32 p-2 rounded-lg ${isToday(date) ? "bg-orange-100 shadow-md" : ""
//                                     }`}
//                             >
//                                 {/* Date Header */}
//                                 <div
//                                     className={`text-center py-2 ${isToday(date)
//                                             ? "text-orange-500 font-bold"
//                                             : "text-gray-800 font-semibold"
//                                         }`}
//                                 >
//                                     <div className="text-lg">{format(date, "EEE dd")}</div>
//                                     {isToday(date) && (
//                                         <div className="text-xs bg-orange-500 text-white rounded px-2 mt-1 inline-block">
//                                             Today
//                                         </div>
//                                     )}
//                                 </div>
//                                 {/* Time Slots */}
//                                 <div className="grid grid-cols-1 gap-2 mt-2">
//                                     {times.map((time, timeIndex) => {
//                                         const booked = isSlotBooked(date, time);

//                                         return (
//                                             <button
//                                                 key={timeIndex}
//                                                 className={`py-2 text-sm border rounded ${booked
//                                                         ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Booked slots
//                                                         : format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") &&
//                                                             time === selectedTime
//                                                             ? "bg-orange-500 text-white border-orange-500" // Selected slot
//                                                             : isToday(date)
//                                                                 ? "bg-orange-50 border-orange-200 text-gray-800 hover:bg-orange-200" // Current date's unselected slots
//                                                                 : "border-gray-300 text-gray-800 hover:bg-gray-100"
//                                                     }`}
//                                                 onClick={() => {
//                                                     if (!booked) {
//                                                         setSelectedDate(date);
//                                                         setSelectedTime(time);
//                                                     }
//                                                 }}
//                                                 disabled={booked} // Disable booked slots
//                                             >
//                                                 {time}
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button
//                     className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//                     onClick={() =>
//                         alert(`Selected Date: ${format(selectedDate, "yyyy-MM-dd")}\nSelected Time: ${selectedTime}`)
//                     }
//                     disabled={!selectedTime}
//                 >
//                     Next Steps
//                 </button>
//             </div>
//         </div>

//     );
// };

// export default BookingCalendar;

'use client'

import React, { useState } from 'react'
import { format, addDays, subDays, isToday } from 'date-fns'
import { p } from 'framer-motion/client'
import Image from 'next/image'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import Link from 'next/link'

// Define types for booking data and time slots
type Booking = {
  date: string // "yyyy-MM-dd"
  bookedSlots: string[] // List of booked times for the date
}

type TimeSlot = string
type DateType = Date

// Fake Booking Data
const fakeBookings: Booking[] = [
  {
    date: format(addDays(new Date(), 0), 'yyyy-MM-dd'),
    bookedSlots: ['9:00 am', '10:00 am'],
  },
  {
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    bookedSlots: ['12:00 am', '1:00 am', '2:00 am'],
  },
  { date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), bookedSlots: [] },
  {
    date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    bookedSlots: ['12:00 am', '3:00 am'],
  },
  {
    date: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
    bookedSlots: ['10:00 am'],
  },
]

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<DateType>(new Date())
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null)

  // Navigation State
  const [startDate, setStartDate] = useState<DateType>(new Date()) // Starting date of the current batch

  // Generate a batch of dates dynamically
  const generateDates = (startDate: DateType, days: number): DateType[] => {
    return Array.from({ length: days }, (_, i) => addDays(startDate, i))
  }

  const times: TimeSlot[] = [
    '9:00 am',
    '10:00 am',
    '11:00 am',
    '12:00 am',
    '1:00 am',
    '2:00 am',
    '3:00 am',
    '4:00 am',
  ]
  const dates: DateType[] = generateDates(startDate, 7) // Display a batch of 7 dates at a time

  // Check if a slot is booked
  const isSlotBooked = (date: DateType, time: TimeSlot): boolean => {
    const bookingForDate = fakeBookings.find(
      (b) => b.date === format(date, 'yyyy-MM-dd')
    )
    return bookingForDate ? bookingForDate.bookedSlots.includes(time) : false
  }

  // Navigation Handlers
  const goToPreviousBatch = () => setStartDate((prev) => subDays(prev, 7))
  const goToNextBatch = () => setStartDate((prev) => addDays(prev, 7))

  return (
    <div className="bg-[#fbfbfb] min-h-screen">
      <div className="p-6 bg-[#fbfbfb] max-w-5xl mx-auto my-auto mt-20">
        <div className=" flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-poppins font-medium text-[#063354]">
              Book a Visit
            </h3>
            <p className="text-[#000000] mb-6 text-base">
              Choose a time that works for you.
            </p>
          </div>
          {/* for desktop device */}
          <div className="flex items-center gap-2 text-gray-800 font-semibold border border-[#d9dfe3] rounded-md hidden md:flex">
            {/* date and month*/}
            <div className=" flex items-center gap-1 border-r border-[#d9dfe3] py-2 px-2">
              <>
                <span className=" text-base font-normal text-[#063354]">
                  {format(startDate, 'MMMM')}
                </span>
                <span className=" text-base font-bold text-[#063354]">
                  {format(startDate, 'yyyy')}
                </span>
              </>
            </div>
            {/* Navigation Buttons icon*/}
            <div className=" flex gap-1 items-center pr-2">
              <button
                onClick={goToPreviousBatch}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <FaChevronLeft className=" text-xl" />
              </button>
              <button
                onClick={goToNextBatch}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <FaChevronRight className=" text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* for mobile device */}

        <div className="flex items-center justify-end gap-2 text-gray-800 font-semibold border border-[#d9dfe3] rounded-md md:hidden">
          {/* date and month*/}
          <div className=" flex items-center gap-1 border-r border-[#d9dfe3] py-2 px-2">
            <>
              <span className=" text-base font-normal text-[#063354]">
                {format(startDate, 'MMMM')}
              </span>
              <span className=" text-base font-bold text-[#063354]">
                {format(startDate, 'yyyy')}
              </span>
            </>
          </div>
          {/* Navigation Buttons icon*/}
          <div className=" flex gap-1 items-center pr-2">
            <button
              onClick={goToPreviousBatch}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <FaChevronLeft className=" text-xl" />
            </button>
            <button
              onClick={goToNextBatch}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <FaChevronRight className=" text-xl" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 max-w-5xl overflow-x-auto lg:overflow-x-hidden">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-32 p-2 rounded-lg ${
                isToday(date) ? 'bg-orange-100 shadow-md' : 'bg-white'
              }`}
            >
              {/* Date Header left side*/}
              <div
                className={`text-center py-2 ${
                  isToday(date)
                    ? 'text-orange-500 font-bold'
                    : 'text-gray-800 font-semibold'
                }`}
              >
                <div className="text-xl flex flex-col font-light">
                  <span className=" ">{format(date, 'EEE')}</span>
                  <span className=" text-3xl font-medium">
                    {format(date, 'dd')}
                  </span>
                </div>
                {isToday(date) && (
                  <div className="text-xs bg-orange-500 text-white rounded px-2 mt-1 inline-block">
                    Today
                  </div>
                )}
              </div>

              {/* Time Slots right side*/}
              <div className="grid grid-cols-1 gap-2 mt-2">
                {times.map((time, timeIndex) => {
                  const booked = isSlotBooked(date, time)

                  return (
                    <button
                      key={timeIndex}
                      className={`py-2 text-sm border rounded ${
                        booked
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' // Booked slots
                          : format(date, 'yyyy-MM-dd') ===
                                format(selectedDate, 'yyyy-MM-dd') &&
                              time === selectedTime
                            ? 'bg-orange-500 text-white border-orange-500' // Selected slot
                            : isToday(date)
                              ? 'bg-orange-50 border-orange-200 text-gray-800 hover:bg-orange-200' // Current date's unselected slots
                              : 'border-[#E9AA1A] text-gray-800 hover:bg-gray-100 shadow-sm text-lg font-bold'
                      }`}
                      onClick={() => {
                        if (!booked) {
                          setSelectedDate(date)
                          setSelectedTime(time)
                        }
                      }}
                      disabled={booked} // Disable booked slots
                    >
                      {time}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <Link href={'/book-a-visit'}>
          <button
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() =>
              alert(
                `Selected Date: ${format(selectedDate, 'yyyy-MM-dd')}\nSelected Time: ${selectedTime}`
              )
            }
            disabled={!selectedTime}
          >
            Next Steps
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BookingCalendar
