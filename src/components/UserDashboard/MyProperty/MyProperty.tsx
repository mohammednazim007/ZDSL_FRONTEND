'use client'
import React from 'react'
import MyPropertyCard from './MyPropertyCard'
import { useQuery } from '@apollo/client'
import { GET_ALL_SALES_PROPERTY } from './property.query'
import Loader from '@/components/shared/Loder'
import { TProperty } from './propertyType'

const MyProperty = () => {
  const { data, loading, error } = useQuery(GET_ALL_SALES_PROPERTY)
  const sale_data = data?.getAllSalesFromUser?.data

  if (loading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="mt-10 space-y-4 ">
      {sale_data ? (
        sale_data?.map((property: TProperty) => (
          <MyPropertyCard key={property?._id} property={property} />
        ))
      ) : (
        <p className="text-center flex items-center justify-center h-svh text-xl font-semibold">
          Property not found{' '}
        </p>
      )}
    </div>
  )
}

export default MyProperty
