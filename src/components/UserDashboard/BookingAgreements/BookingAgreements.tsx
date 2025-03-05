'use client'
import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ThreeDotIconAgreements from './ThreeDotIconAgreements'
import ThreeDotIconBooking from './ThreeDotIconBooking'

// GraphQL Queries

// Query for Agreements
const GET_ALL_BOOKED_SALES_FROM_USER = gql`
  query GetAllBookedSalesFromUser(
    $order: String
    $limit: Int
    $page: Int
    $sort: String
  ) {
    getAllBookedSalesFromUser(
      order: $order
      limit: $limit
      page: $page
      sort: $sort
    ) {
      success
      message
      data {
        _id
        agreementDate
        agreementTemplates {
          id
          _id
          type
          mainTitle
          pages {
            pageTitle
            content {
              header
              body
            }
          }
          projectCount
          status
          isDeleted
          isTrash
          createdAt
          updatedAt
        }
        projectId {
          _id
          projectTitle
          thumbnailImage
        }
      }
      meta {
        page
        limit
        total
        totalPage
      }
    }
  }
`

// Query for Booking Form Data (if needed)
const GET_ALL_BOOKED_SALES_BOOKING_FORM = gql`
  query GetAllSalesFromUser {
    getAllSalesFromUser {
      success
      message
      data {
        _id
        projectId {
          projectTitle
          aboutProject
          description
          expectedHandoverDate
          expectedStartDate
          projectFeatures {
            name
          }
        }
        agreementDate
      }
      meta {
        page
        limit
        total
        totalPage
      }
    }
  }
`

const trClassName =
  'px-4 py-1.5 text-sm max-w-[150px] truncate border-y border-[#dbdbdb62] cursor-pointer capitalize'

const thClassName =
  'font-medium text-gray-700 px-4 py-4 text-sm max-w-[150px] truncate border-y border-[#dbdbdb62] cursor-pointer'

const BookingAgreement = () => {
  const [filterData, setFilterData] = useState('agreement') // Track which tab is selected

  // Query data from Apollo Client based on selected filter
  const { loading, error, data } = useQuery(
    filterData === 'agreement'
      ? GET_ALL_BOOKED_SALES_BOOKING_FORM
      : GET_ALL_BOOKED_SALES_FROM_USER,
    {
      variables: {
        order: 'createdAt',
        limit: 10,
        page: 1,
        sort: 'desc',
      },
    }
  )

  // Handle loading, error, and data display
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data)
  // Data comes from either the agreement or the booking form query
  const tableData = data.getAllSalesFromUser
    ? data.getAllSalesFromUser.data
    : data.getAllBookedSalesFromUser.data

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Agreements</h1>

        <div className="p-1 border rounded-md flex justify-between items-center">
          <button
            onClick={() => setFilterData('booking')}
            className={`${filterData === 'booking' && 'bg-[#B2DADA]'} px-3 py-1 rounded-md text-sm`}
          >
            Booking Form
          </button>
          <button
            onClick={() => setFilterData('agreement')}
            className={`${filterData === 'agreement' && 'bg-[#B2DADA]'} text-sm px-3 py-1.5 rounded-md`}
          >
            Agreement
          </button>
        </div>
      </div>
      <div className="flex flex-col mx-auto max-w-6xl mt-6">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg h-svh">
              <table
                className="w-full min-w-max table-auto rounded-md text-left border-separate relative "
                style={{ borderSpacing: '0 10px' }}
              >
                <thead>
                  <tr className="bg-white border">
                    <th
                      className={`${thClassName} border-l rounded-tl-md rounded-bl-md`}
                    >
                      <div className="flex items-center gap-2">SL</div>
                    </th>
                    <th className={thClassName}>
                      <div className="flex items-center gap-2">
                        Project Name
                      </div>
                    </th>
                    <th className={thClassName}>
                      <div className="flex items-center gap-2">Create Date</div>
                    </th>
                    <th
                      className={`${thClassName} border-r rounded-tr-md rounded-br-md`}
                    >
                      <div className="flex items-center gap-2">Options</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {tableData.map((item: any, index: any) => (
                    <tr
                      key={item._id}
                      className="bg-white hover:bg-[#dddddd41] duration-200 transition-all"
                    >
                      <td
                        className={`${trClassName} border-l rounded-tl-md rounded-bl-md`}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}{' '}
                      </td>
                      <td className={trClassName}>
                        {filterData === 'agreement'
                          ? item.projectId.projectTitle
                          : item.projectId.projectTitle}
                      </td>
                      <td className={trClassName}>
                        {new Date(
                          parseInt(item.agreementDate)
                        ).toLocaleDateString()}
                      </td>
                      <td
                        className={`${trClassName} text-right border-r rounded-tr-md rounded-br-md `}
                      >
                        <div className="col-span-1 text-right ">
                          {/* <BsThreeDotsVertical className="w-5 h-5" /> */}
                          {filterData === 'agreement' ? (
                            <ThreeDotIconAgreements item={item} />
                          ) : (
                            <ThreeDotIconBooking item={item} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingAgreement
