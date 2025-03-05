/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from '@/components/shared/Modal'
import { UnitDescriptionProps } from '@/interface/ProjectDetails'
import { getCookie } from '@/libs/tokenUtils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import bathroom from '../../../assets/projects/bathroom.png'
import bedroom from '../../../assets/projects/bedroom.png'
import belcony from '../../../assets/projects/belcony.png'
import car from '../../../assets/projects/car.png'
import dining from '../../../assets/projects/dining.png'
import facing from '../../../assets/projects/facing.png'
import flatSize from '../../../assets/projects/flat-size.png'

const UnitDescription: React.FC<UnitDescriptionProps> = ({
  id,
  isOpen,
  onClose,
}) => {
  // console.log('single Unit ID', id);
  const defaultUnitDetails = {
    id: '',
    project: '',
    unitPrefix: '',
    unitName: '',
    unitSuffix: '',
    flatSize: '',
    bedroomNo: 0,
    bathroomNo: 0,
    balconyNo: 0,
    floorNo: 0,
    flatFacing: '',
    pricePerSft: '',
    landSharing: '',
    diningNo: '',
    livingNo: '',

    floorPlan: [
      {
        id: '',
        path: '',
        caption: '',
      },
    ],
    isSold: false,
    isAvailable: true,
    isBooked: false,
    isReady: false,
    createdAt: '',
    updatedAt: '',
  }

  const [unitDetails, setUnitDetails] =
    useState<typeof defaultUnitDetails>(defaultUnitDetails)
  console.log(unitDetails, 'unitDetails')
  useEffect(() => {
    if (!isOpen) return

    const accessToken = getCookie('zdsl_accessToken')

    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
    }

    if (accessToken) headers['Authorization'] = accessToken

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
          query GetUnitDetailsById($getUnitDetailsByIdId: ID!) {
   getUnitDetailsById(id: $getUnitDetailsByIdId) {
    data {
      id
      project
      unitPrefix
      unitName
      unitSuffix
      flatSize
      bedroomNo
      bathroomNo
      balconyNo
      floorNo
      flatFacing
      pricePerSft
      landSharing
      
      floorPlan {
        id
        path
        caption
      }
      isSold
      isAvailable
      isBooked
      isReady
      createdAt
      updatedAt
      livingNo
      diningNo
    }
  }
}
        `,
        variables: { getUnitDetailsByIdId: id },
      }),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // console.log('single unit data', data?.getUnitDetailsById?.data);
        setUnitDetails(data?.getUnitDetailsById?.data)
      })
      .catch((error) => console.error('Error:', error))
  }, [id, isOpen])

  // console.log('unitDetails on compleed', unitDetails);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[75vh] flex flex-col gap-y-6 p-4 lg:p-6">
        <h2 className="text-2xl font-semibold">
          <span className="border-b-2 border-b-[#f2ba68] p-1">
            Project Unit Details
          </span>
          : {unitDetails?.unitName} ({unitDetails?.flatSize} sqft)
        </h2>
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-4 items-center flex-wrap">
            {/* Display unit details */}
            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={bedroom} alt="Bedroom" />
                <h2 className="font-semibold">{unitDetails?.bedroomNo}</h2>
              </div>
              <p className="text-xs mt-0.5">Bedroom</p>
            </div>

            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={bathroom} alt="Bathroom" />
                <h2 className="font-semibold">{unitDetails?.bathroomNo}</h2>
              </div>
              <p className="text-xs mt-0.5">Bathroom</p>
            </div>

            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={belcony} alt="Balcony" />
                <h2 className="font-semibold">{unitDetails?.balconyNo}</h2>
              </div>
              <p className="text-xs mt-0.5">Balcony</p>
            </div>

            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={facing} alt="Facing" />
                <h2 className="font-semibold">{unitDetails?.flatFacing}</h2>
              </div>
              <p className="text-xs mt-0.5">Facing</p>
            </div>

            {/* <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={car} alt="Car Parking" />
                <h2 className="font-semibold">{0}</h2>
              </div>
              <p className="text-xs mt-0.5">Car Parking</p>
            </div> */}

            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={flatSize} alt="Land Area" />
                <h2 className="font-semibold">{unitDetails?.flatSize}</h2>
              </div>
              <p className="text-xs mt-0.5">Land Area</p>
            </div>

            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={dining} alt="Livingroom" />
                <h2 className="font-semibold">{unitDetails?.livingNo}</h2>
              </div>
              <p className="text-xs mt-0.5">Livingroom</p>
            </div>

            <div className="py-[10px] px-3 bg-[#FBF2DF] rounded">
              <div className="flex items-center gap-x-2">
                <Image height={26} width={30} src={dining} alt="Dining" />
                <h2 className="font-semibold">{unitDetails?.diningNo}</h2>
              </div>
              <p className="text-xs mt-0.5">Dining</p>
            </div>
          </div>

          {/* Floor Plan */}
          {unitDetails?.floorPlan?.length > 0 && (
            <div className="flex flex-col gap-y-6">
              <h3 className="text-xl font-medium">
                <span className="border-b-2 border-b-[#f2ba68] p-0.5">
                  Floor Plan
                </span>
                :
              </h3>

              <div className="w-[95%] mx-auto overflow-x-hidden overflow-y-auto flex flex-col gap-2 2xl:gap-[1vh]">
                {unitDetails?.floorPlan?.map((img) => (
                  <div
                    key={img?.id}
                    className="w-full aspect-w-4 aspect-h-3 md:aspect-w-16 md:aspect-h-9 rounded overflow-hidden"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${img?.path}`}
                      alt={img?.caption || 'Floor Plan'}
                      className="object-cover w-full h-full"
                      layout="responsive"
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default UnitDescription
